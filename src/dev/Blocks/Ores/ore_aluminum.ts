IDRegistry.genBlockID("ore_aluminum_sc");
Block.createBlock("ore_aluminum_sc",[{name: "Ore Aluminum", texture: [["Ore Aluminum Gl", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Ore Aluminum",{
ru: "Алюминиевая руда"
})

Recipes.addFurnace(BlockID.ore_aluminum_sc, ItemID.ingot_aluminum_sc, 0);