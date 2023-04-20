IDRegistry.genBlockID("ore_ilmenite");
Block.createBlock("ore_ilmenite",[{name: "Ore Ilmenite", texture: [["Ore Ilmenite", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Ore Ilmenite",{
ru: "Ильменитовая руда"
})
Recipes.addFurnace(BlockID.ore_ilmenite, ItemID.ingot_titanium, 0);