IDRegistry.genBlockID("ore_copper_moon");
Block.createBlock("ore_copper_moon",[{name: "Lunar Copper Ore", texture: [["Ore Copper Moon", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Lunar Copper Ore",{
ru: "Лунная медная руда"
})

Recipes.addFurnace(BlockID.ore_copper_moon, ItemID.ingot_copper_sc, 0);