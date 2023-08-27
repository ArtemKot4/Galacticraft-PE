IDRegistry.genBlockID("ore_copper_venus");
Block.createBlock("ore_copper_venus",[{name: "Ore Copper Venus", texture: [["Ore Copper Venus", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Ore Copper Venus",{
ru: "Венерианская медная руда"
})

Recipes.addFurnace(BlockID.ore_copper_venus, ItemID.ingot_copper_sc, 0);