IDRegistry.genBlockID("ore_aluminum_asteroids");
Block.createBlock("ore_aluminum_asteroids",[{name: "Ore Aluminum Asteroids", texture: [["Ore Aluminum Asteroids", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Ore Aluminum Asteroids",{
ru: "Алюминиевая руда из астероида"
})

Recipes.addFurnace(BlockID.ore_aluminum_asteroids, ItemID.ingot_aluminum_sc, 0);