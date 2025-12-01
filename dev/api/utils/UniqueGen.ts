const UniqueGen = {
	randomCoords: function(random, chunkX, chunkZ, minHeight, maxHeight) {
		minHeight = minHeight || 0;
		maxHeight = maxHeight || 220;
		return {
			x: chunkX * 16 + random.nextInt(16),
			y: random.nextInt(maxHeight - minHeight + 1) - minHeight,
			z: chunkZ * 16 + random.nextInt(16),
		};
	},
	generateOre: function(id, data, chunkX, chunkZ, random, params) {
		for(let i = 0; i < params.veinCounts; i++) {
			let coords = this.randomCoords(random, chunkX, chunkZ, params.minY, params.maxY);
			GenerationUtils.generateOre(coords.x, coords.y, coords.z, id, data, params.size, false, random.nextInt());
		}
	},
	generateOreInDimension: function(id, data, chunkX, chunkZ, random, params) {
		for(let i = 0; i < params.veinCounts; i++) {
			let coords = this.randomCoords(random, chunkX, chunkZ, params.minY, params.maxY);
			GenerationUtils.generateOreCustom(coords.x, coords.y, coords.z, id, data, params.size, params.mode, params.check);
		}
	}
};

Callback.addCallback("GenerateChunkUniversal", (chunkX: number, chunkZ: number, random: java.util.Random, dimensionId: number, chunkSeed: number, worldSeed: number, dimensionSeed: number) => {
    const data = Galacticraft.getIPlanetByID(dimensionId).getOreData();
    if(data != null && data.ores != null && data.ores.length > 0) {
        for(const i in data.ores) {
            const { block, minY, maxY, veinCounts, count } = data.ores[i];
            UniqueGen.generateOreInDimension(block.id, block.data, chunkX, chunkZ, random, {
                veinCounts,
                minY,
                maxY,
                size: MathHelper.randomNumber(count[0], count[1]),
                mode: true, 
                check: data.stone || [VanillaBlockID.stone]
            });
        }
    }
});