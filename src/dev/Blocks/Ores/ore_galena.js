IDRegistry.genBlockID("ore_galena");
Block.createBlock("ore_galena",[{name: "Ore Galena", texture: [["Ore Galena", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Ore Galena",{
ru: "Галеновая руда"
})

Recipes.addFurnace(BlockID.ore_galena, ItemID.ingot_lead_sc, 0);