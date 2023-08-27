IDRegistry.genBlockID("ore_copper_mars");
Block.createBlock("ore_copper_mars",[{name: "Ore Copper Mars", texture: [["Ore Copper Mars", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Ore Copper Mars",{
ru: "Медная марсианская руда"
});

Recipes.addFurnace(BlockID.ore_copper_mars, ItemID.ingot_copper_sc, 0);