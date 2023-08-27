IDRegistry.genBlockID("ore_copper_sc");
Block.createBlock("ore_copper_sc",[{name: "Ore Copper", texture: [["Ore Copper Gl", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Ore Copper",{
ru: "Медная руда"
})

Recipes.addFurnace(BlockID.ore_copper_sc, ItemID.ingot_copper_sc, 0);