var Venus = new IPlanet(
  "venus_mountains",
  ["venus", 2008],
  [{
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
}],
  BlockID["venus_rock_2"], [894, 345, 0,894, 345, 0]
);

Venus.setOre(BlockID["ore_silicon_venus"], {
  height: [1, 70],
  veinCounts: __config__.getFloat("Fossils.Venus.silicon_v"),
  count: [1, 7],
});

Venus.setOre(BlockID["ore_quartz_venus"], {
  height: [2, 128],
  veinCounts: __config__.getFloat("Fossils.Venus.quartz_v"),
  count: [1, 7],
});

Venus.setOre(BlockID["sulphuric_acid_still"], {
  height: [2, 120],
  veinCounts: __config__.getFloat("Fossils.Venus.sulphuric_acid"),
  count: [6, 14],
});

Venus.setOre(BlockID["ore_copper_venus"], {
  height: [2, 128],
  veinCounts: __config__.getFloat("Fossils.Venus.copper_v"),
  count: [1, 12],
});

Venus.setOre(BlockID["ore_tin_venus"], {
  height: [2, 80],
  veinCounts: __config__.getFloat("Fossils.Venus.tin_v"),
  count: [1, 12],
});

Venus.setOre(BlockID["ore_galena"], {
  height: [2, 80],
  veinCounts: __config__.getFloat("Fossils.Venus.galena"),
  count: [1, 7],
});

Venus.setOre(BlockID["venus_rock_3"], {
  height: [2, 55],
  veinCounts: __config__.getFloat("Fossils.Venus.pumice_stone_underground"),
  count: [7, 35],
});

Venus.setOre(BlockID["venus_rock_3"], {
  height: [50, 102],
  veinCounts: __config__.getFloat("Fossils.Venus.pumice_stone_ground"),
  count: [9, 50],
  stone: BlockID["venus_rock_0"],
});

Callback.addCallback(
  "GenerateCustomDimensionChunk",
  function (chunkX, chunkZ, random, dimensionId) {
    if (dimensionId == Venus.getPlanet()) {
      let coords = GenerationUtils.randomCoords(chunkX, chunkZ, 64, 120);
      if (
        Math.random() < __config__.getFloat("Generation.Venus.venus_spouts")
      ) {
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);

        if (
          World.getBlock(coords.x, coords.y + 1, coords.z).id === 0 &&
          GenerationUtils.canSeeSky(coords.x, coords.y + 1, coords.z)
        ) {
          World.setBlock(coords.x, coords.y, coords.z, BlockID.venus_rock_0, 0);
          World.setBlock(
            coords.x - 1,
            coords.y,
            coords.z,
            BlockID.venus_rock_0,
            0
          );
          World.setBlock(
            coords.x - 2,
            coords.y,
            coords.z,
            BlockID.venus_rock_0,
            0
          );
          World.setBlock(
            coords.x,
            coords.y,
            coords.z - 1,
            BlockID.venus_rock_0,
            0
          );
          World.setBlock(
            coords.x - 1,
            coords.y,
            coords.z - 1,
            BlockID.venus_spout,
            0
          );
          World.setBlock(
            coords.x - 2,
            coords.y,
            coords.z - 1,
            BlockID.venus_rock_0,
            0
          );
          World.setBlock(
            coords.x,
            coords.y,
            coords.z - 2,
            BlockID.venus_rock_0,
            0
          );
          World.setBlock(
            coords.x - 1,
            coords.y,
            coords.z - 2,
            BlockID.venus_rock_0,
            0
          );
          World.setBlock(
            coords.x - 2,
            coords.y,
            coords.z - 2,
            BlockID.venus_rock_0,
            0
          );
          World.setBlock(
            coords.x - 2,
            coords.y,
            coords.z - 1,
            BlockID.venus_rock_0,
            0
          );

          World.setBlock(coords.x, coords.y - 1, coords.z, 0, 0);
          World.setBlock(coords.x - 1, coords.y - 1, coords.z, 0, 0);
          World.setBlock(coords.x - 2, coords.y - 1, coords.z, 0, 0);
          World.setBlock(coords.x, coords.y - 1, coords.z - 1, 0, 0);
          World.setBlock(coords.x - 1, coords.y - 1, coords.z - 1, 0, 0);
          World.setBlock(coords.x - 2, coords.y - 1, coords.z - 1, 0, 0);
          World.setBlock(coords.x, coords.y - 1, coords.z - 2, 0, 0);
          World.setBlock(coords.x - 1, coords.y - 1, coords.z - 2, 0, 0);
          World.setBlock(coords.x - 2, coords.y - 1, coords.z - 2, 0, 0);
          World.setBlock(coords.x - 2, coords.y - 1, coords.z - 1, 0, 0);

          World.setBlock(coords.x, coords.y - 2, coords.z, 0, 0);
          World.setBlock(coords.x - 1, coords.y - 2, coords.z, 0, 0);
          World.setBlock(coords.x - 2, coords.y - 2, coords.z, 0, 0);
          World.setBlock(coords.x, coords.y - 2, coords.z - 1, 0, 0);
          World.setBlock(coords.x - 1, coords.y - 2, coords.z - 1, 0, 0);
          World.setBlock(coords.x - 2, coords.y - 2, coords.z - 1, 0, 0);
          World.setBlock(coords.x, coords.y - 2, coords.z - 2, 0, 0);
          World.setBlock(coords.x - 1, coords.y - 2, coords.z - 2, 0, 0);
          World.setBlock(coords.x - 2, coords.y - 2, coords.z - 2, 0, 0);
          World.setBlock(coords.x - 2, coords.y - 2, coords.z - 1, 0, 0);

          World.setBlock(coords.x, coords.y - 3, coords.z, 0, 0);
          World.setBlock(coords.x - 1, coords.y - 3, coords.z, 0, 0);
          World.setBlock(coords.x - 2, coords.y - 3, coords.z, 0, 0);
          World.setBlock(coords.x, coords.y - 3, coords.z - 1, 0, 0);
          World.setBlock(coords.x - 1, coords.y - 3, coords.z - 1, 0, 0);
          World.setBlock(coords.x - 2, coords.y - 3, coords.z - 1, 0, 0);
          World.setBlock(coords.x, coords.y - 3, coords.z - 2, 0, 0);
          World.setBlock(coords.x - 1, coords.y - 3, coords.z - 2, 0, 0);
          World.setBlock(coords.x - 2, coords.y - 3, coords.z - 2, 0, 0);
          World.setBlock(coords.x - 2, coords.y - 3, coords.z - 1, 0, 0);
          World.setBlock(
            coords.x,
            coords.y - 5,
            coords.z,
            BlockID.sulphuric_acid_still,
            0
          );
          World.setBlock(
            coords.x - 1,
            coords.y - 5,
            coords.z,
            BlockID.sulphuric_acid_still,
            0
          );
          World.setBlock(
            coords.x - 2,
            coords.y - 5,
            coords.z,
            BlockID.sulphuric_acid_still,
            0
          );
          World.setBlock(
            coords.x,
            coords.y - 5,
            coords.z - 1,
            BlockID.sulphuric_acid_still,
            0
          );
          World.setBlock(
            coords.x - 1,
            coords.y - 5,
            coords.z - 1,
            BlockID.sulphuric_acid_still,
            0
          );
          World.setBlock(
            coords.x - 2,
            coords.y - 5,
            coords.z - 1,
            BlockID.sulphuric_acid_still,
            0
          );
          World.setBlock(
            coords.x,
            coords.y - 5,
            coords.z - 2,
            BlockID.sulphuric_acid_still,
            0
          );
          World.setBlock(
            coords.x - 1,
            coords.y - 5,
            coords.z - 2,
            BlockID.sulphuric_acid_still,
            0
          );
          World.setBlock(
            coords.x - 2,
            coords.y - 5,
            coords.z - 2,
            BlockID.sulphuric_acid_still,
            0
          );
          World.setBlock(
            coords.x - 2,
            coords.y - 5,
            coords.z - 1,
            BlockID.sulphuric_acid_still,
            0
          );

          World.setBlock(
            coords.x,
            coords.y - 4,
            coords.z,
            BlockID.sulphuric_acid_still,
            0
          );
          World.setBlock(
            coords.x - 1,
            coords.y - 4,
            coords.z,
            BlockID.sulphuric_acid_still,
            0
          );
          World.setBlock(
            coords.x - 2,
            coords.y - 4,
            coords.z,
            BlockID.sulphuric_acid_still,
            0
          );
          World.setBlock(
            coords.x,
            coords.y - 4,
            coords.z - 1,
            BlockID.sulphuric_acid_still,
            0
          );
          World.setBlock(
            coords.x - 1,
            coords.y - 4,
            coords.z - 1,
            BlockID.sulphuric_acid_still,
            0
          );
          World.setBlock(
            coords.x - 2,
            coords.y - 4,
            coords.z - 1,
            BlockID.sulphuric_acid_still,
            0
          );
          World.setBlock(
            coords.x,
            coords.y - 4,
            coords.z - 2,
            BlockID.sulphuric_acid_still,
            0
          );
          World.setBlock(
            coords.x - 1,
            coords.y - 4,
            coords.z - 2,
            BlockID.sulphuric_acid_still,
            0
          );
          World.setBlock(
            coords.x - 2,
            coords.y - 4,
            coords.z - 2,
            BlockID.sulphuric_acid_still,
            0
          );
          World.setBlock(
            coords.x - 2,
            coords.y - 4,
            coords.z - 1,
            BlockID.sulphuric_acid_still,
            0
          );
        }
      }
    }
  }
);

Translation.addTranslation("Venus stick(§aCREATIVE)", {
  ru: "Трость Венеры(§aКРЕАТИВНАЯ)",
});
IDRegistry.genItemID("venus_stick");
Item.createItem(
  "venus_stick",
  "Venus stick(§aCREATIVE)",
  {
    name: "venus_stick",
    meta: 0,
  },
  {
    stack: 1,
  }
);

Callback.addCallback("ItemUse", function (coords, item, block, is, player) {
  if (item.id == ItemID.venus_stick) {
    Dimensions.transfer(player, Venus.getPlanet());
  }
});
