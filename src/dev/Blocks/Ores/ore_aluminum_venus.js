IDRegistry.genBlockID("ore_aluminum_venus");
Block.createBlock("ore_aluminum_venus",[{name: "Ore Aluminum Venus", texture: [["Ore Aluminum Venus", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Ore Aluminum Venus",{
ru: "Венерианская алюминиевая руда"
})

Recipes.addFurnace(BlockID.ore_aluminum_venus, ItemID.ingot_aluminum_sc, 0);