var mars_plains = new CustomBiome ("mars_plains")
//.setSkyColor(android.graphics.Color.rgb(755, 345, 0))


.setCoverBlock(BlockID.mars_top_stone, 0)
.setSurfaceBlock(BlockID.mars_middle_stone, 0)
.setFillingBlock(BlockID.mars_bottom_stone, 0);
var Mars = new Dimensions.CustomDimension("Mars", 2001);

Mars.setSkyColor(894+16, 345-164, 0-255);
Mars.setFogColor(16+894, 345-164, 0-255);
Mars.setGenerator(Dimensions.newGenerator({
    biome: mars_plains.id,
    layers: [
    {
        minY: 0,
        maxY: 128,
         yConversion: [[1, -0.99], [0.8, -.99], [.9, -0.99], [0.4, -.4], [0, 0.8]
        ],
        material: {
            base: BlockID.mars_bottom_stone,
            surface: {
                id: BlockID.mars_middle_stone,
                data: 0,
                width: 4
            },
            cover: BlockID.mars_top_stone
        },
        noise: {
            octaves: {
               count: 4,
               scale: 260,
               weight: 1.99
               }
        }
    },{ minY: 0,
      	maxY: 1,
      	material: {base: 7}
    }]
}));
Callback.addCallback('ItemUse', function (coords, item, block, is, player) {
if(Entity.getCarriedItem(player).id == 0 && block.id == BlockID.computer_a) {
Dimensions.transfer(player, Mars.id);        
 }
});

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId) { 
 if (dimensionId != Mars.id) return; 
 UniqueGen.generateOreInDimension(BlockID.desh, 0, chunkX, chunkZ, random, { 
 veinCounts: __config__.getFloat("Fossils.Mars.desh"), 
 minY:1, 
 maxY: 25, 
 size: randomInt(1, 6), 
 mode: true, 
 check: [BlockID.mars_bottom_stone] 
 }); 
});

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId) { 
 if (dimensionId != Mars.id) return; 
 UniqueGen.generateOreInDimension(BlockID.ore_iron_mars, 0, chunkX, chunkZ, random, { 
 veinCounts: __config__.getFloat("Fossils.Mars.iron_m"), 
 minY:2, 
 maxY: 65, 
 size: randomInt(1, 5), 
 mode: true, 
 check: [BlockID.mars_bottom_stone] 
 }); 
});

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId) { 
 if (dimensionId != Mars.id) return; 
 UniqueGen.generateOreInDimension(BlockID.ore_copper_mars, 0, chunkX, chunkZ, random, { 
 veinCounts: __config__.getFloat("Fossils.Mars.copper_m"), 
 minY:2, 
 maxY: 65, 
 size: randomInt(1, 5), 
 mode: true, 
 check: [BlockID.mars_bottom_stone] 
 }); 
});

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId) { 
 if (dimensionId != Mars.id) return; 
 UniqueGen.generateOreInDimension(BlockID.ore_tin_mars, 0, chunkX, chunkZ, random, { 
 veinCounts: __config__.getFloat("Fossils.Mars.tin_m"), 
 minY:2, 
 maxY: 65, 
 size: randomInt(1, 5), 
 mode: true, 
 check: [BlockID.mars_bottom_stone] 
 }); 
});


Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId) {
    if (dimensionId == Mars.id) {
        let coords = GenerationUtils.randomCoords(chunkX, chunkZ, 64, 120);
        if (Math.random() < __config__.getFloat("Generation.Mars.the_martian_ice")) {
            coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);

            if (World.getBlock(coords.x, coords.y+1, coords.z).id === 0 && GenerationUtils.canSeeSky(coords.x, coords.y + 1, coords.z)) {
World.setBlock(coords.x,coords.y,coords.z,BlockID.dense_ice,0);


}}}});