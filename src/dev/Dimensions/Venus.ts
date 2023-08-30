var venus_mountains = new CustomBiome("venus_mountains")
    .setSkyColor(android.graphics.Color.rgb(894, 345, 0))
    .setCoverBlock(BlockID.venus_rock_0, 0)
    .setSurfaceBlock(BlockID.venus_rock_1, 0)
    .setFillingBlock(BlockID.venus_rock_2, 0);
var Venus = new Dimensions.CustomDimension("Venus", 2008);
Venus.setSkyColor(894, 345, 0); //(894, 345, 0);
Venus.setFogColor(894, 345, 0);
if (__config__.getBool("Generation.mountain_venus") == true) {
    Venus.setGenerator(Dimensions.newGenerator({
        biome: venus_mountains.id,
        layers: [{
            minY: 0, maxY: 100,
            yConversion: [[1, -0.99], [0.9, -.99], [.8, -0.99], [0.3, -.4], [0, 0.8]],
            material: {
                base: BlockID.venus_rock_2,
                surface: {
                    id: BlockID.venus_rock_1,
                    data: 0,
                    width: 4
                },
                cover: BlockID.venus_rock_0
            },
            noise: {
                octaves: {
                    count: 8,
                    scale: [60, 460, 20],
                    weight: 1.4
                }
            }
        }, {
            minY: 0,
            maxY: 1,
            material: {
                base: 7
            }
        }]
    }));
} else {
    Venus.setGenerator(Dimensions.newGenerator({

        layers: [{
            minY: 0, maxY: 128,
            yConversion: [[1, -0.79], [0.8, -.99], [.9, -0.99], [0.5, -.4], [0, 0.8]],
            material: {
                base: BlockID.venus_rock_2,
                surface: {
                    id: BlockID.venus_rock_1,
                    data: 0,
                    width: 4
                },
                cover: BlockID.venus_rock_0
            },
            noise: {
                octaves: {
                    count: 8,
                    scale: 420,
                    weight: 1.6
                }
            }
        }, {
            minY: 0,
            maxY: 1,
            material: {
                base: 7
            }
        }]
    }));
}


Callback.addCallback("GenerateCustomDimensionChunk", function (chunkX, chunkZ, random, dimensionId) {
    if (dimensionId != Venus.id) return;
    UniqueGen.generateOreInDimension(BlockID.ore_silicon_venus, 0, chunkX, chunkZ, random, {
        veinCounts: __config__.getFloat("Fossils.Venus.silicon_v"),
        minY: 1,
        maxY: 70,
        size: randomInt(1,7),
        mode: true,
        check: [BlockID.venus_rock_2]
    });
});

Callback.addCallback("GenerateCustomDimensionChunk", function (chunkX, chunkZ, random, dimensionId) {
    if (dimensionId != Venus.id) return;
    UniqueGen.generateOreInDimension(BlockID.ore_quartz_venus, 0, chunkX, chunkZ, random, {
        veinCounts: __config__.getFloat("Fossils.Venus.quartz_v"),
        minY: 2,
        maxY: 128,
        size: randomInt(1, 5),
        mode: true,
        check: [BlockID.venus_rock_2]
    });
});

Callback.addCallback("GenerateCustomDimensionChunk", function (chunkX, chunkZ, random, dimensionId) {
    if (dimensionId != Venus.id) return;
    UniqueGen.generateOreInDimension(BlockID.sulphuric_acid_still, 0, chunkX, chunkZ, random, {
        veinCounts: __config__.getFloat("Fossils.Venus.sulphuric_acid"),
        minY: 2,
        maxY: 120,
        size: randomInt(7, 14),
        mode: true,
        check: [BlockID.venus_rock_2]
    });
});

Callback.addCallback("GenerateCustomDimensionChunk", function (chunkX, chunkZ, random, dimensionId) {
    if (dimensionId != Venus.id) return;
    UniqueGen.generateOreInDimension(BlockID.ore_copper_venus, 0, chunkX, chunkZ, random, {
        veinCounts: __config__.getFloat("Fossils.Venus.copper_v"),
        minY: 2,
        maxY: 128,
        size: randomInt(1, 5),
        mode: true,
        check: [BlockID.venus_rock_2]
    });
});

Callback.addCallback("GenerateCustomDimensionChunk", function (chunkX, chunkZ, random, dimensionId) {
    if (dimensionId != Venus.id) return;
    UniqueGen.generateOreInDimension(BlockID.ore_tin_venus, 0, chunkX, chunkZ, random, {
        veinCounts: __config__.getFloat("Fossils.Venus.tin_v"),
        minY: 2,
        maxY: 80,
        size: randomInt(1,10),
        mode: true,
        check: [BlockID.venus_rock_2]
    });
});


Callback.addCallback("GenerateCustomDimensionChunk", function (chunkX, chunkZ, random, dimensionId) {
    if (dimensionId != Venus.id) return;
    UniqueGen.generateOreInDimension(BlockID.ore_galena, 0, chunkX, chunkZ, random, {
        veinCounts: __config__.getFloat("Fossils.Venus.galena"),
        minY: 2,
        maxY: 80,
        size: randomInt(1, 6),
        mode: true,
        check: [BlockID.venus_rock_2]
    });
});



Callback.addCallback("GenerateCustomDimensionChunk", function (chunkX, chunkZ, random, dimensionId) {
    if (dimensionId != Venus.id) return;
    UniqueGen.generateOreInDimension(BlockID.venus_rock_3, 0, chunkX, chunkZ, random, {
        veinCounts: __config__.getFloat("Fossils.Venus.pumice_stone_underground"),
        minY: 2,
        maxY: 65,
        size: randomInt(7, 35),
        mode: true,
        check: [BlockID.venus_rock_2]
    });
});

Callback.addCallback("GenerateCustomDimensionChunk", function (chunkX, chunkZ, random, dimensionId) {
    if (dimensionId != Venus.id) return;
    UniqueGen.generateOreInDimension(BlockID.venus_rock_3, 0, chunkX, chunkZ, random, {
        veinCounts: __config__.getFloat("Fossils.Venus.pumice_stone_ground"),
        minY: 50,
        maxY: 87,
        size: randomInt(9, 35),
        mode: true,
        check: [BlockID.venus_rock_0]
    });
});


Callback.addCallback("GenerateCustomDimensionChunk", function (chunkX, chunkZ, random, dimensionId) {
    if (dimensionId == Venus.id) {
        let coords = GenerationUtils.randomCoords(chunkX, chunkZ, 64, 120);
        if (Math.random() < __config__.getFloat("Generation.Venus.venus_spouts")) {
            coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);

            if (World.getBlock(coords.x, coords.y + 1, coords.z).id === 0 && 
            GenerationUtils.canSeeSky(coords.x, coords.y + 1, coords.z)) {




                World.setBlock(coords.x, coords.y, coords.z, BlockID.venus_rock_0,0); 
                World.setBlock(coords.x - 1, coords.y, coords.z, BlockID.venus_rock_0,0);
                World.setBlock(coords.x - 2, coords.y, coords.z, BlockID.venus_rock_0,0);
                World.setBlock(coords.x, coords.y, coords.z - 1, BlockID.venus_rock_0,0); 
                World.setBlock(coords.x - 1, coords.y, coords.z - 1, BlockID.venus_spout,0); 
                World.setBlock(coords.x - 2, coords.y, coords.z - 1, BlockID.venus_rock_0,0); 
                World.setBlock(coords.x, coords.y, coords.z - 2, BlockID.venus_rock_0,0); 
                World.setBlock(coords.x - 1, coords.y, coords.z - 2, BlockID.venus_rock_0,0);
                 World.setBlock(coords.x - 2, coords.y, coords.z - 2, BlockID.venus_rock_0,0);
                  World.setBlock(coords.x - 2, coords.y, coords.z - 1, BlockID.venus_rock_0,0);

                World.setBlock(coords.x, coords.y - 1, coords.z, 0,0);
                 World.setBlock(coords.x - 1, coords.y - 1, coords.z, 0,0);
                  World.setBlock(coords.x - 2, coords.y - 1, coords.z, 0,0);
                   World.setBlock(coords.x, coords.y - 1, coords.z - 1, 0,0); 
                   World.setBlock(coords.x - 1, coords.y - 1, coords.z - 1, 0,0);
                    World.setBlock(coords.x - 2, coords.y - 1, coords.z - 1, 0,0);
                     World.setBlock(coords.x, coords.y - 1, coords.z - 2, 0,0);
                      World.setBlock(coords.x - 1, coords.y - 1, coords.z - 2, 0,0); 
                      World.setBlock(coords.x - 2, coords.y - 1, coords.z - 2, 0,0);
                       World.setBlock(coords.x - 2, coords.y - 1, coords.z - 1, 0,0);

                World.setBlock(coords.x, coords.y - 2, coords.z, 0,0);
                 World.setBlock(coords.x - 1, coords.y - 2, coords.z, 0,0);
                  World.setBlock(coords.x - 2, coords.y - 2, coords.z, 0,0); 
                  World.setBlock(coords.x, coords.y - 2, coords.z - 1, 0,0);
                   World.setBlock(coords.x - 1, coords.y - 2, coords.z - 1, 0,0); 
                   World.setBlock(coords.x - 2, coords.y - 2, coords.z - 1, 0,0); 
                   World.setBlock(coords.x, coords.y - 2, coords.z - 2, 0,0); 
                   World.setBlock(coords.x - 1, coords.y - 2, coords.z - 2, 0,0);
                    World.setBlock(coords.x - 2, coords.y - 2, coords.z - 2, 0,0);
                     World.setBlock(coords.x - 2, coords.y - 2, coords.z - 1, 0,0);

                World.setBlock(coords.x, coords.y - 3, coords.z, 0,0);
                 World.setBlock(coords.x - 1, coords.y - 3, coords.z, 0,0); 
                 World.setBlock(coords.x - 2, coords.y - 3, coords.z, 0,0);
                  World.setBlock(coords.x, coords.y - 3, coords.z - 1, 0,0);
                   World.setBlock(coords.x - 1, coords.y - 3, coords.z - 1, 0,0);
                    World.setBlock(coords.x - 2, coords.y - 3, coords.z - 1, 0,0);
                     World.setBlock(coords.x, coords.y - 3, coords.z - 2, 0,0);
                      World.setBlock(coords.x - 1, coords.y - 3, coords.z - 2, 0,0);
                       World.setBlock(coords.x - 2, coords.y - 3, coords.z - 2, 0,0); 
                       World.setBlock(coords.x - 2, coords.y - 3, coords.z - 1, 0,0);
                World.setBlock(coords.x, coords.y - 5, coords.z, BlockID.sulphuric_acid_still,0);
                 World.setBlock(coords.x - 1, coords.y - 5, coords.z, BlockID.sulphuric_acid_still,0); 
                 World.setBlock(coords.x - 2, coords.y - 5, coords.z, BlockID.sulphuric_acid_still,0); 
                 World.setBlock(coords.x, coords.y - 5, coords.z - 1, BlockID.sulphuric_acid_still,0);
                  World.setBlock(coords.x - 1, coords.y - 5, coords.z - 1, BlockID.sulphuric_acid_still,0); 
                  World.setBlock(coords.x - 2, coords.y - 5, coords.z - 1, BlockID.sulphuric_acid_still,0); 
                  World.setBlock(coords.x, coords.y - 5, coords.z - 2, BlockID.sulphuric_acid_still,0);
                   World.setBlock(coords.x - 1, coords.y - 5, coords.z - 2, BlockID.sulphuric_acid_still,0); 
                   World.setBlock(coords.x - 2, coords.y - 5, coords.z - 2, BlockID.sulphuric_acid_still,0);
                    World.setBlock(coords.x - 2, coords.y - 5, coords.z - 1, BlockID.sulphuric_acid_still,0);

                World.setBlock(coords.x, coords.y - 4, coords.z, BlockID.sulphuric_acid_still,0); 
                World.setBlock(coords.x - 1, coords.y - 4, coords.z, BlockID.sulphuric_acid_still,0); 
                World.setBlock(coords.x - 2, coords.y - 4, coords.z, BlockID.sulphuric_acid_still,0);
                 World.setBlock(coords.x, coords.y - 4, coords.z - 1, BlockID.sulphuric_acid_still,0);
                  World.setBlock(coords.x - 1, coords.y - 4, coords.z - 1, BlockID.sulphuric_acid_still,0);
                   World.setBlock(coords.x - 2, coords.y - 4, coords.z - 1, BlockID.sulphuric_acid_still,0); 
                   World.setBlock(coords.x, coords.y - 4, coords.z - 2, BlockID.sulphuric_acid_still,0); 
                   World.setBlock(coords.x - 1, coords.y - 4, coords.z - 2, BlockID.sulphuric_acid_still,0); 
                   World.setBlock(coords.x - 2, coords.y - 4, coords.z - 2, BlockID.sulphuric_acid_still,0); 
                   World.setBlock(coords.x - 2, coords.y - 4, coords.z - 1, BlockID.sulphuric_acid_still,0);
            }

        }

    }

}
);

Translation.addTranslation("Venus stick(§aCREATIVE)", {
    ru: "Трость Венеры(§aКРЕАТИВНАЯ)"
});
IDRegistry.genItemID("venus_stick");
Item.createItem("venus_stick", "Venus stick(§aCREATIVE)", {
    name: "venus_stick",
    meta: 0
}, {
    stack: 64
});


Callback.addCallback('ItemUse', function (coords, item, block, is, player) {
    if (item.id == ItemID.venus_stick) {
        Dimensions.transfer(player, Venus.id);
    }

});


