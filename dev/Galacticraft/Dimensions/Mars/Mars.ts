
var Mars = new IPlanet(
  "mars_plains",
  ["mars",2001],
  [
    {
      minY: 0,
      maxY: 128,
      yConversion: [
        [1, -0.99],
        [0.8, -0.99],
        [0.9, -0.99],
        [0.4, -0.4],
        [0, 0.8],
      ],
      material: {
        base: BlockID.mars_bottom_stone,
        surface: {
          id: BlockID.mars_middle_stone,
          data: 0,
          width: 4,
        },
        cover: BlockID.mars_top_stone,
      },
      noise: {
        octaves: {
          count: 4,
          scale: 260,
          weight: 1.99,
        },
      },
    },
    { minY: 0, maxY: 1, material: { base: 7 } },
  ],
  BlockID.mars_bottom_stone,
  [894 + 16, 345 - 164, 16 + 894,16+894, 345 - 164, 0 - 255]
);

Mars.setOre(BlockID["desh"], {
  height: [1, 25],
  veinCounts: __config__.getFloat("Fossils.Mars.desh"),
  count: [1, 6],
});

Mars.setOre(BlockID["ore_copper_mars"], {
  height: [2,65],
  veinCounts: __config__.getFloat("Fossils.Mars.copper_m"),
  count: [1,12]
})

Mars.setOre(BlockID["ore_iron_mars"], {
    height: [2,65],
    veinCounts: __config__.getFloat("Fossils.Mars.iron_m"),
    count: [1,12]
  })
  
  Mars.setOre(BlockID["ore_tin_mars"], {
    height: [2,65],
    veinCounts: __config__.getFloat("Fossils.Mars.iron_m"),
    count: [1,12]
  })
  

Callback.addCallback("ItemUse", function (coords, item, block, is, player) {
  if (Entity.getCarriedItem(player).id == 0 && block.id == BlockID.computer_a) {
    Dimensions.transfer(player, Mars.getPlanet());
  }
});


Callback.addCallback(
  "GenerateCustomDimensionChunk",
  function (chunkX, chunkZ, random, dimensionId) {
    if (dimensionId == Mars.getPlanet()) {
      let coords = GenerationUtils.randomCoords(chunkX, chunkZ, 64, 120);
      if (
        Math.random() < __config__.getFloat("Generation.Mars.the_martian_ice")
      ) {
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);

        if (
          World.getBlock(coords.x, coords.y + 1, coords.z).id === 0 &&
          GenerationUtils.canSeeSky(coords.x, coords.y + 1, coords.z)
        ) {
          World.setBlock(coords.x, coords.y, coords.z, BlockID.dense_ice, 0);
        }
      }
    }
  }
);
