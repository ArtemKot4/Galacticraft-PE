

IDRegistry.genItemID("StickAsteroids"); 
Item.createItem("StickAsteroids", "Stick of Asteroids", {name: "Asteroid Stick", meta: 0}, {stack: 1});
Translation.addTranslation("Stick of Asteroids", {
ru: "Трость §6Астероидов"
});

var Asteroids = new IPlanet("asteroids",["asteroids",2003],[
    {
        minY: 2,
        maxY: 100,
         yConversion: [[1, -0.9], [.55, -.99], [.99, -0.9], [.1, -.2], [0, -1]
        ],
        material: {
            base: BlockID.asteroid_stones,
            surface: {
                id: BlockID.asteroid_stones,
                data: 0,
                width: 4
            },
            cover: BlockID.asteroid_stones
        },
        noise: {
            octaves: {
               count: 1,
               scale: 25,
               weight: 0.9
               }
        }
    }]);



Callback.addCallback('ItemUse', function (coords, item, block, is, player) {
if(item.id == ItemID.StickAsteroids){
Dimensions.transfer(player, Asteroids.getPlanet()); } 
 
});

// Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId) { 
//  if (dimensionId != Asteroids.id) return; 
//  UniqueGen.generateOreInDimension(BlockID.asteroid_stones_0, 0, chunkX, chunkZ, random, { 
//  veinCounts: 10, 
//  minY:2, 
//  maxY: 100, 
//  size: randomInt(3, 15), 
//  mode: true, 
//  check: [BlockID.asteroid_stones] 
//  }); 
// });

// Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId) { 
//  if (dimensionId != Asteroids.id) return; 
//  UniqueGen.generateOreInDimension(BlockID.asteroid_stones_1, 0, chunkX, chunkZ, random, { 
//  veinCounts: 10, 
//  minY:2, 
//  maxY: 100, 
//  size: randomInt(3, 15), 
//  mode: true, 
//  check: [BlockID.asteroid_stones] 
//  }); 
// });

// Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId) { 
//  if (dimensionId != Asteroids.id) return; 
//  UniqueGen.generateOreInDimension(BlockID.ore_solar, 0, chunkX, chunkZ, random, { 
//  veinCounts: 10, 
//  minY:2, 
//  maxY: 100, 
//  size: randomInt(1,2), 
//  mode: true, 
//  check: [BlockID.asteroid_stones_1] 
//  }); 
// });

// Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId) { 
//  if (dimensionId != Asteroids.id) return; 
//  UniqueGen.generateOreInDimension(BlockID.ore_galena, 0, chunkX, chunkZ, random, { 
//  veinCounts: 10, 
//  minY:2, 
//  maxY: 100, 
//  size: randomInt(1,3), 
//  mode: true, 
//  check: [BlockID.asteroid_stones_0] 
//  }); 
// });

// Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId) { 
//  if (dimensionId != Asteroids.id) return; 
//  UniqueGen.generateOreInDimension(BlockID.ore_aluminum_asteroids, 0, chunkX, chunkZ, random, { 
//  veinCounts: 10, 
//  minY:2, 
//  maxY: 100, 
//  size: randomInt(2,7), 
//  mode: true, 
//  check: [BlockID.asteroid_stones] 
//  }); 
// });

// Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId) { 
//  if (dimensionId != Asteroids.id) return; 
//  UniqueGen.generateOreInDimension(BlockID.ore_iron_asteroids, 0, chunkX, chunkZ, random, { 
//  veinCounts: 13, 
//  minY:2, 
//  maxY: 100, 
//  size: randomInt(2,7), 
//  mode: true, 
//  check: [BlockID.asteroid_stones] 
//  }); 
// });
