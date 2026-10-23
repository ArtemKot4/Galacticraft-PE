interface OilGenCandidate {
	centerX: number;
	centerY: number;
	centerZ: number;
	r: number;
	ownerX: number;
	ownerZ: number;
}

interface OilGenStats {
	ownersEvaluated: number;
	candidates: number;
	blocksWritten: number;
	neighborReads: number;
	skippedUnloaded: number;
	readErrors: number;
	invalidOilId: number;
}

const OilGen = {
	DEFAULT_FACTOR: 1.8,
	BASE_CHANCE: 0.05,
	MAX_CHANCE: 0.2,
	MIN_R: 3,
	MAX_R: 7,
	MIN_Y: 1,
	MAX_Y: 254,

	_oilId: null as number,
	_invalidOilIdLogged: false,
	_invalidConfigLogged: false,
	_stats: {
		ownersEvaluated: 0,
		candidates: 0,
		blocksWritten: 0,
		neighborReads: 0,
		skippedUnloaded: 0,
		readErrors: 0,
		invalidOilId: 0
	} as OilGenStats,

	imul32: function(a: number, b: number): number {
		if(typeof (Math as any).imul === "function") {
			return (Math as any).imul(a, b) | 0;
		}
		const ah = (a >>> 16) & 0xffff;
		const al = a & 0xffff;
		const bh = (b >>> 16) & 0xffff;
		const bl = b & 0xffff;
		return (al * bl + (((ah * bl + al * bh) << 16) >>> 0)) | 0;
	},

	mix32: function(worldSeed: number, dimensionId: number, ownerX: number, ownerZ: number): number {
		let hash = 0x811C9DC5;
		hash = OilGen.imul32(hash ^ (worldSeed | 0), 0x01000193);
		hash = OilGen.imul32(hash ^ (dimensionId | 0), 0x01000193);
		hash = OilGen.imul32(hash ^ (ownerX | 0), 0x01000193);
		hash = OilGen.imul32(hash ^ (ownerZ | 0), 0x01000193);
		hash = hash ^ (hash >>> 16);
		return hash | 0;
	},

	resolveOilBlockId: function(): number {
		if(this._oilId != null && this._oilId > 0) {
			return this._oilId;
		}
		let id = 0;
		try {
			const stillId = BlockList.OIL.getStillStringID();
			const registered = BlockID[stillId];
			if(typeof registered === "number" && registered > 0) {
				id = registered;
			}
		} catch(error) {
			id = 0;
		}
		if(id <= 0) {
			try {
				id = LiquidRegistry.getBlockByLiquid("oil", true);
			} catch(error) {
				id = 0;
			}
		}
		if(typeof id !== "number" || !isFinite(id) || id <= 0) {
			this._oilId = 0;
			this._stats.invalidOilId++;
			if(!this._invalidOilIdLogged) {
				this._invalidOilIdLogged = true;
				Logger.Log("OilGen disabled: invalid oil block id", "WARNING");
			}
			return 0;
		}
		this._oilId = id;
		return id;
	},

	getStats: function(): OilGenStats {
		return this._stats;
	},

	_isOutsideChunk: function(x: number, z: number, chunkX: number, chunkZ: number): boolean {
		return Math.floor(x / 16) !== chunkX || Math.floor(z / 16) !== chunkZ;
	},

	_isChunkLoadedAt: function(region: BlockSource, x: number, z: number): boolean {
		try {
			if(typeof (region as any).isChunkLoadedAt === "function") {
				return !!(region as any).isChunkLoadedAt(x, z);
			}
			if(typeof (region as any).isChunkLoaded === "function") {
				return !!(region as any).isChunkLoaded(Math.floor(x / 16), Math.floor(z / 16));
			}
		} catch(error) {
			return true;
		}
		return true;
	},

	isUnsafeNeighbor: function(region: BlockSource, x: number, y: number, z: number, chunkX: number, chunkZ: number, oilId: number): boolean {
		if(this._isOutsideChunk(x, z, chunkX, chunkZ)) {
			if(!this._isChunkLoadedAt(region, x, z)) {
				this._stats.skippedUnloaded++;
				return true;
			}
		}
		let id: number;
		this._stats.neighborReads++;
		try {
			id = region.getBlockId(x, y, z);
		} catch(error) {
			this._stats.readErrors++;
			return true;
		}
		if(id === 0) {
			return true;
		}
		if(id === oilId) {
			return false;
		}
		if(id === VanillaBlockID.water || id === VanillaBlockID.flowing_water ||
			id === VanillaBlockID.lava || id === VanillaBlockID.flowing_lava) {
			return true;
		}
		try {
			const liquid = LiquidRegistry.getLiquidByBlock(id);
			if(liquid != null && liquid !== "oil") {
				return true;
			}
		} catch(error) {
			this._stats.readErrors++;
			return true;
		}
		return false;
	},

	isUnsafeAbove: function(region: BlockSource, x: number, y: number, z: number, chunkX: number, chunkZ: number): boolean {
		if(this._isOutsideChunk(x, z, chunkX, chunkZ)) {
			if(!this._isChunkLoadedAt(region, x, z)) {
				this._stats.skippedUnloaded++;
				return true;
			}
		}
		this._stats.neighborReads++;
		let id: number;
		try {
			id = region.getBlockId(x, y, z);
		} catch(error) {
			this._stats.readErrors++;
			return true;
		}
		return id === VanillaBlockID.sand || id === VanillaBlockID.gravel;
	},

	computeCandidate: function(ownerX: number, ownerZ: number, dimensionId: number, worldSeed: number, region: BlockSource, randMod: number, rng: java.util.Random): OilGenCandidate {
		const anchorX = ownerX * 16 + 15;
		const anchorZ = ownerZ * 16 + 15;
		rng.setSeed(this.mix32(worldSeed, dimensionId, ownerX, ownerZ));

		let baseHeight = 0;
		let isDesert = false;
		try {
			const biomeId = region.getBiome(anchorX + 8, anchorZ + 8);
			const biomeName = World.getBiomeNameById(biomeId);
			if(typeof biomeName === "string" && biomeName.length > 0) {
				const name = biomeName.toLowerCase();
				if(name.indexOf("sky") >= 0 || name.indexOf("hell") >= 0 || name.indexOf("nether") >= 0) {
					return null;
				}
				if(name.indexOf("ocean") >= 0 || name.indexOf("deep") >= 0) {
					baseHeight = -0.6;
				} else if(name.indexOf("mountain") >= 0 || name.indexOf("peaks") >= 0 || name.indexOf("highland") >= 0 || name.indexOf("plateau") >= 0 || name.indexOf("cliff") >= 0 || name.indexOf("hills") >= 0 || name.indexOf("extreme") >= 0) {
					baseHeight = 0.5;
				}
				isDesert = name.indexOf("desert") >= 0;
			}
		} catch(error) {
			baseHeight = 0;
			isDesert = false;
			this._stats.readErrors++;
		}

		let localMod = randMod;
		if(baseHeight >= 0.45) {
			localMod = localMod / 2;
		}
		if(baseHeight < -0.5) {
			localMod = localMod * 1.8;
		}
		if(isDesert) {
			localMod = localMod * 1.8;
		}

		const flag1 = rng.nextDouble() <= localMod;
		const flag2 = rng.nextDouble() <= localMod;
		if(!flag1 && !flag2) {
			return null;
		}

		const centerY = 17 + rng.nextInt(10) + rng.nextInt(5);
		const centerX = anchorX + 8 - rng.nextInt(16);
		const centerZ = anchorZ + 8 - rng.nextInt(16);
		const r = this.MIN_R + rng.nextInt(this.MAX_R - this.MIN_R + 1);

		return {
			centerX: centerX,
			centerY: centerY,
			centerZ: centerZ,
			r: r,
			ownerX: ownerX,
			ownerZ: ownerZ
		};
	},

	writeClipped: function(candidate: OilGenCandidate, currentChunkX: number, currentChunkZ: number, region: BlockSource, oilId: number): void {
		const r = candidate.r;
		const r2 = r * r;
		const minChunkX = currentChunkX * 16;
		const maxChunkX = minChunkX + 15;
		const minChunkZ = currentChunkZ * 16;
		const maxChunkZ = minChunkZ + 15;
		const minBx = Math.max(-r, minChunkX - candidate.centerX);
		const maxBx = Math.min(r, maxChunkX - candidate.centerX);
		const minBz = Math.max(-r, minChunkZ - candidate.centerZ);
		const maxBz = Math.min(r, maxChunkZ - candidate.centerZ);
		if(minBx > maxBx || minBz > maxBz) {
			return;
		}
		for(let bx = minBx; bx <= maxBx; bx++) {
			const bx2 = bx * bx;
			for(let by = -r + 2; by <= r - 2; by++) {
				const plane2 = bx2 + 3 * by * by;
				for(let bz = minBz; bz <= maxBz; bz++) {
					if(plane2 + bz * bz > r2) {
						continue;
					}
					const tx = candidate.centerX + bx;
					const ty = candidate.centerY + by;
					const tz = candidate.centerZ + bz;
					if(this._isOutsideChunk(tx, tz, currentChunkX, currentChunkZ)) {
						continue;
					}
					if(ty < this.MIN_Y || ty > this.MAX_Y) {
						continue;
					}
					if(this.isUnsafeNeighbor(region, tx - 1, ty, tz, currentChunkX, currentChunkZ, oilId)) {
						continue;
					}
					if(this.isUnsafeNeighbor(region, tx + 1, ty, tz, currentChunkX, currentChunkZ, oilId)) {
						continue;
					}
					if(this.isUnsafeNeighbor(region, tx, ty - 1, tz, currentChunkX, currentChunkZ, oilId)) {
						continue;
					}
					if(this.isUnsafeNeighbor(region, tx, ty, tz - 1, currentChunkX, currentChunkZ, oilId)) {
						continue;
					}
					if(this.isUnsafeNeighbor(region, tx, ty, tz + 1, currentChunkX, currentChunkZ, oilId)) {
						continue;
					}
					if(this.isUnsafeAbove(region, tx, ty + 1, tz, currentChunkX, currentChunkZ)) {
						continue;
					}
					region.setBlock(tx, ty, tz, oilId, 0);
					this._stats.blocksWritten++;
				}
			}
		}
	},

	generateForChunk: function(chunkX: number, chunkZ: number, dimensionId: number, worldSeed: number, region: BlockSource): void {
		if(dimensionId !== 0) {
			return;
		}
		if(region == null) {
			return;
		}
		if(typeof region.getDimension === "function" && region.getDimension() !== 0) {
			return;
		}
		const oilId = this.resolveOilBlockId();
		if(oilId <= 0) {
			return;
		}

		const rawFactor = __config__.get("generation.earth.oilFactor");
		let factor = this.DEFAULT_FACTOR;
		if(typeof rawFactor === "number" && isFinite(rawFactor)) {
			factor = rawFactor;
		} else if(rawFactor != null) {
			if(!this._invalidConfigLogged) {
				this._invalidConfigLogged = true;
				Logger.Log("OilGen: invalid oilFactor, using 1.8", "WARNING");
			}
		}
		if(factor <= 0) {
			return;
		}
		const randMod = Math.min(this.MAX_CHANCE, this.BASE_CHANCE * factor);

		const rng = new java.util.Random(0);
		const updateFlagAvailable = typeof (region as any).getBlockUpdateAllowed === "function"
			&& typeof (region as any).setBlockUpdateAllowed === "function";
		let previousUpdateAllowed = true;
		try {
			if(updateFlagAvailable) {
				previousUpdateAllowed = !!(region as any).getBlockUpdateAllowed();
				(region as any).setBlockUpdateAllowed(false);
			}
			const owners = [
				{ x: chunkX - 1, z: chunkZ - 1 },
				{ x: chunkX - 1, z: chunkZ },
				{ x: chunkX, z: chunkZ - 1 },
				{ x: chunkX, z: chunkZ }
			];
			for(let i = 0; i < owners.length; i++) {
				const owner = owners[i];
				this._stats.ownersEvaluated++;
				const candidate = this.computeCandidate(owner.x, owner.z, dimensionId, worldSeed, region, randMod, rng);
				if(candidate != null) {
					this._stats.candidates++;
					this.writeClipped(candidate, chunkX, chunkZ, region, oilId);
				}
			}
		} finally {
			if(updateFlagAvailable) {
				(region as any).setBlockUpdateAllowed(previousUpdateAllowed);
			}
		}
	}
};
