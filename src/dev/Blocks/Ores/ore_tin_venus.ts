IDRegistry.genBlockID("ore_tin_venus");
Block.createBlock("ore_tin_venus",[{name: "Ore Tin Venus", texture: [["Ore Tin Venus", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Ore Tin Venus",{
ru: "Венерианская оловянная руда"
})

Recipes.addFurnace(BlockID.ore_tin_venus, ItemID.ingot_tin_sc, 0);