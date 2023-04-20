IDRegistry.genBlockID("ore_tin_mars");
Block.createBlock("ore_tin_mars",[{name: "Ore Tin Mars", texture: [["Ore Tin Mars", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Ore Tin Mars",{
ru: "Марсианская оловянная руда"
})

Recipes.addFurnace(BlockID.ore_tin_mars, ItemID.ingot_tin_sc, 0);