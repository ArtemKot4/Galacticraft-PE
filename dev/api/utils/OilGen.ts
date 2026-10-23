namespace OilGen {
	export const DEFAULT_FACTOR = 1.8;
	export const BASE_CHANCE = 0.05;
	export const MAX_CHANCE = 0.2;
	export const MIN_R = 3;
	export const MAX_R = 7;
	export const MIN_Y = 1;
	export const MAX_Y = 254;

	let oilIdCache: number | null = null;
	let invalidOilIdLogged = false;
	let invalidConfigLogged = false;

	export interface Stats {
		ownersEvaluated: number;
		candidates: number;
		blocksWritten: number;
		neighborReads: number;
		skippedUnloaded: number;
		readErrors: number;
		invalidOilId: number;
	}

	const stats: Stats = {
		ownersEvaluated: 0,
		candidates: 0,
		blocksWritten: 0,
		neighborReads: 0,
		skippedUnloaded: 0,
		readErrors: 0,
		invalidOilId: 0
	};

	export interface Candidate {
		centerX: number;
		centerY: number;
		centerZ: number;
		r: number;
		ownerX: number;
		ownerZ: number;
	}

	export function mix32(worldSeed: number, dimensionId: number, ownerX: number, ownerZ: number): number {
		let hash = 0x811C9DC5;
		hash = Math.imul(hash ^ (worldSeed | 0), 0x01000193);
		hash = Math.imul(hash ^ (dimensionId | 0), 0x01000193);
		hash = Math.imul(hash ^ (ownerX | 0), 0x01000193);
		hash = Math.imul(hash ^ (ownerZ | 0), 0x01000193);
		hash = hash ^ (hash >>> 16);
		return hash | 0;
	}

	export function resolveOilBlockId(): number {
		if(oilIdCache != null && oilIdCache > 0) {
			return oilIdCache;
		}
		let id = 0;
		const stillId = BlockList.OIL.getStillStringID();
		const registered = BlockID[stillId];

		if(registered > 0) {
			id = registered;
		}
		if(id <= 0) {
			id = LiquidRegistry.getBlockByLiquid("oil", true);
		}
		if(!isFinite(id) || id <= 0) {
			oilIdCache = 0;
			stats.invalidOilId++;
			if(!invalidOilIdLogged) {
				invalidOilIdLogged = true;
				Logger.Log("OilGen disabled: invalid oil block id", "WARNING");
			}
			return 0;
		}
		oilIdCache = id;
		return id;
	}

	export function getStats(): Stats {
		return stats;
	}

	function isOutsideChunk(x: number, z: number, chunkX: number, chunkZ: number): boolean {
		return Math.floor(x / 16) !== chunkX || Math.floor(z / 16) != chunkZ;
	}

	function isChunkLoadedAt(region: BlockSource, x: number, z: number): boolean {
		try {
			if(typeof region.isChunkLoadedAt == "function") {
				return !!region.isChunkLoadedAt(x, z);
			}
			if(typeof region.isChunkLoaded == "function") {
				return !!region.isChunkLoaded(Math.floor(x / 16), Math.floor(z / 16));
			}
		} catch(error) {
			return true;
		}
		return true;
	}

	export function isUnsafeNeighbor(region: BlockSource, x: number, y: number, z: number, chunkX: number, chunkZ: number, oilId: number): boolean {
		if(isOutsideChunk(x, z, chunkX, chunkZ) && !isChunkLoadedAt(region, x, z)) {
			stats.skippedUnloaded++;
			return true;
		}
		let id: number;
		stats.neighborReads++;
		try {
			id = region.getBlockId(x, y, z);
		} catch(error) {
			stats.readErrors++;
			return true;
		}
		if(id == 0) {
			return true;
		}
		if(id == oilId) {
			return false;
		}
		if(id == VanillaBlockID.water || id == VanillaBlockID.flowing_water ||
			id == VanillaBlockID.lava || id == VanillaBlockID.flowing_lava) {
			return true;
		}
		try {
			const liquid = LiquidRegistry.getLiquidByBlock(id);
			if(liquid != null && liquid !== "oil") {
				return true;
			}
		} catch(error) {
			stats.readErrors++;
			return true;
		}
		return false;
	}

	export function isUnsafeAbove(region: BlockSource, x: number, y: number, z: number, chunkX: number, chunkZ: number): boolean {
		if(isOutsideChunk(x, z, chunkX, chunkZ) && !isChunkLoadedAt(region, x, z)) {
			stats.skippedUnloaded++;
			return true;
		}
		stats.neighborReads++;
		let id: number;
		try {
			id = region.getBlockId(x, y, z);
		} catch(error) {
			stats.readErrors++;
			return true;
		}
		return id == VanillaBlockID.sand || id == VanillaBlockID.gravel;
	}

	export function computeCandidate(
		ownerX: number,
		ownerZ: number,
		dimensionId: number,
		worldSeed: number,
		region: BlockSource,
		randMod: number,
		//@ts-ignore
		rng: java.util.Random
	): Candidate | null {
		const anchorX = ownerX * 16 + 15;
		const anchorZ = ownerZ * 16 + 15;
		rng.setSeed(mix32(worldSeed, dimensionId, ownerX, ownerZ));
		let baseHeight = 0;
		let isDesert = false;
		const biomeId = region.getBiome(anchorX + 8, anchorZ + 8);
		const biomeName = World.getBiomeNameById(biomeId);

		if(biomeName && biomeName.length > 0) {
			const name = biomeName.toLowerCase();
			if(name.indexOf("sky") >= 0 || name.indexOf("hell") >= 0 || name.indexOf("nether") >= 0) {
				return null;
			}
			if(name.indexOf("ocean") >= 0 || name.indexOf("deep") >= 0) {
				baseHeight = -0.6;
			} else if(
				name.indexOf("mountain") >= 0 || name.indexOf("peaks") >= 0 ||
				name.indexOf("highland") >= 0 || name.indexOf("plateau") >= 0 ||
				name.indexOf("cliff") >= 0 || name.indexOf("hills") >= 0 ||
				name.indexOf("extreme") >= 0
			) {
				baseHeight = 0.5;
			}
			isDesert = name.indexOf("desert") >= 0;
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
		const r = MIN_R + rng.nextInt(MAX_R - MIN_R + 1);

		return {
			centerX: centerX,
			centerY: centerY,
			centerZ: centerZ,
			r: r,
			ownerX: ownerX,
			ownerZ: ownerZ
		};
	}

	export function writeClipped(candidate: Candidate, currentChunkX: number, currentChunkZ: number, region: BlockSource, oilId: number): void {
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
					if(isOutsideChunk(tx, tz, currentChunkX, currentChunkZ)) {
						continue;
					}
					if(ty < MIN_Y || ty > MAX_Y) {
						continue;
					}
					if(isUnsafeNeighbor(region, tx - 1, ty, tz, currentChunkX, currentChunkZ, oilId)) {
						continue;
					}
					if(isUnsafeNeighbor(region, tx + 1, ty, tz, currentChunkX, currentChunkZ, oilId)) {
						continue;
					}
					if(isUnsafeNeighbor(region, tx, ty - 1, tz, currentChunkX, currentChunkZ, oilId)) {
						continue;
					}
					if(isUnsafeNeighbor(region, tx, ty, tz - 1, currentChunkX, currentChunkZ, oilId)) {
						continue;
					}
					if(isUnsafeNeighbor(region, tx, ty, tz + 1, currentChunkX, currentChunkZ, oilId)) {
						continue;
					}
					if(isUnsafeAbove(region, tx, ty + 1, tz, currentChunkX, currentChunkZ)) {
						continue;
					}
					region.setBlock(tx, ty, tz, oilId, 0);
					stats.blocksWritten++;
				}
			}
		}
	}

	export function generateForChunk(
		chunkX: number,
		chunkZ: number,
		dimensionId: number,
		worldSeed: number,
		region: BlockSource
	): void {
		if(dimensionId != 0) {
			return;
		}
		if(region == null) {
			return;
		}
		if(typeof region.getDimension == "function" && region.getDimension() !== 0) {
			return;
		}
		const oilId = resolveOilBlockId();
		if(oilId <= 0) {
			return;
		}

		const rawFactor = __config__.get("generation.earth.oilFactor");
		let factor = DEFAULT_FACTOR;
		if(typeof rawFactor == "number" && isFinite(rawFactor)) {
			factor = rawFactor;
		} else if(rawFactor != null) {
			if(!invalidConfigLogged) {
				invalidConfigLogged = true;
				Logger.Log("OilGen: invalid oilFactor, using 1.8", "WARNING");
			}
		}
		if(factor <= 0) {
			return;
		}
		const randMod = Math.min(MAX_CHANCE, BASE_CHANCE * factor);

		const rng = new java.util.Random(0);
		const updateFlagAvailable = typeof region.getBlockUpdateAllowed == "function"
			&& typeof region.setBlockUpdateAllowed == "function";
		let previousUpdateAllowed = true;
		try {
			if(updateFlagAvailable) {
				previousUpdateAllowed = !!region.getBlockUpdateAllowed();
				region.setBlockUpdateAllowed(false);
			}
			const owners = [
				{ x: chunkX - 1, z: chunkZ - 1 },
				{ x: chunkX - 1, z: chunkZ },
				{ x: chunkX, z: chunkZ - 1 },
				{ x: chunkX, z: chunkZ }
			];
			for(let i = 0; i < owners.length; i++) {
				const owner = owners[i];
				stats.ownersEvaluated++;
				const candidate = computeCandidate(owner.x, owner.z, dimensionId, worldSeed, region, randMod, rng);
				if(candidate != null) {
					stats.candidates++;
					writeClipped(candidate, chunkX, chunkZ, region, oilId);
				}
			}
		} finally {
			if(updateFlagAvailable) {
				region.setBlockUpdateAllowed(previousUpdateAllowed);
			}
		}
	}
}