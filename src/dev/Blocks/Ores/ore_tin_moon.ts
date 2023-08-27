IDRegistry.genBlockID("ore_tin_moon");
Block.createBlock("ore_tin_moon",[{name: "Lunar Tin Ore", texture: [["Ore Tin Moon", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Lunar Tin Ore",{
ru: "Лунная оловянная руда"
})

Recipes.addFurnace(BlockID.ore_tin_moon, ItemID.ingot_tin_sc, 0);