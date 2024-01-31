var Moon = new IPlanet(
  "moon_plains",
  ["moon", 4],
  [
    {
      minY: 0,
      maxY: 128,
      yConversion: [
        [1, -0.99],
        [0.5, -0.99],
        [0.9, -0.99],
        [0.4, -0.4],
        [0, 0.8],
      ],
      material: {
        base: BlockID.lunar_stone,
        surface: {
          id: BlockID.lunar_middle,
          data: 0,
          width: 4,
        },
        cover: BlockID.moon_top_side,
      },
      noise: {
        octaves: {
          count: 4,
          scale: 160,
          weight: 1.5,
        },
      },
    },
    { minY: 0, maxY: 1, material: { base: 7 } },
  ],
  BlockID.lunar_stone
);

Moon.setOre(BlockID["ore_copper_moon"], {
  height: [2, 65],
  veinCounts: __config__.getFloat("Fossils.Moon.copper"),
  count: [3, 10],
});

Moon.setOre(BlockID["moonore_sapphire"], {
  height: [2, 30],
  veinCounts: __config__.getFloat("Fossils.Moon.sapphire"),
  count: [2, 5],
});

Moon.setOre(BlockID["moonore_cheese"], {
  height: [2, 65],
  veinCounts: __config__.getFloat("Fossils.Moon.cheese"),
  count: [4, 9],
});

Moon.setOre(BlockID["ore_tin_moon"], {
    height: [2,65], veinCounts: __config__.getFloat("Fossils.Moon.tin"), count: [4,12]
})

Callback.addCallback("ItemUse", function (coords, item, block, is, player) {
  if (Entity.getCarriedItem(player).id == 0 && block.id == BlockID.computer_c) {
    Dimensions.transfer(player, Moon.getPlanet());
  }
});
