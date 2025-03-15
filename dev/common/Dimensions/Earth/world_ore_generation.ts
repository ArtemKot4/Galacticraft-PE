Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random, dimensionId){
UniqueGen.generateOre(BlockID.ore_copper_sc, 0, chunkX, chunkZ, random, 
{
veinCounts:
    __config__.getFloat("Fossils.Earth.copper"),
minY:2,
maxY:100,
size:randomInt(4,12)
});
});

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random, dimensionId){
UniqueGen.generateOre(BlockID.ore_tin_sc, 0, chunkX, chunkZ, random, 
{
veinCounts:  __config__.getFloat("Fossils.Earth.tin"),
minY:2,
maxY:100,
size:randomInt(4,12)
});
});

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random, dimensionId){
UniqueGen.generateOre(BlockID.ore_aluminum_sc, 0, chunkX, chunkZ, random, 
{
veinCounts:  __config__.getFloat("Fossils.Earth.aluminum"),
minY:2,
maxY:100,
size:randomInt(4,12)
});
});

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random, dimensionId){
UniqueGen.generateOre(BlockID.ore_silicon, 0, chunkX, chunkZ, random, 
{
veinCounts:  __config__.getFloat("Fossils.Earth.silicon"),
minY:2,
maxY:24,
size:randomInt(3,13)
});
});

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random, dimensionId){
UniqueGen.generateOre(BlockID.spacescraft_oil_still, 0, chunkX, chunkZ, random, 
{
veinCounts:  __config__.getFloat("Fossils.Earth.oil"),
minY:2,
maxY:20,
size:randomInt(3,10)
});
});

