IDRegistry.genBlockID("ore_tin_sc");
Block.createBlock("ore_tin_sc",[{name: "Ore Tin", texture: [["Ore Tin Gl", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Ore Tin",{
ru: "Оловянная руда"
})
Recipes.addFurnace(BlockID.ore_tin_sc, ItemID.ingot_tin_sc, 0);

