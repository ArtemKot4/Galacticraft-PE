IDRegistry.genBlockID("ore_silicon_venus");
Block.createBlock("ore_silicon_venus",[{name: "Ore Silicon Venus", texture: [["Ore Silicon Venus", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Ore Silicon Venus",{
ru: "Венерианская кремниевая руда"
})

Recipes.addFurnace(BlockID.ore_silicon_venus, ItemID.raw_silicon, 0);

Block.registerDropFunction("ore_silicon_venus", function(coords, blockID){
    return [[ItemID.raw_silicon, 1, 0]] 
});