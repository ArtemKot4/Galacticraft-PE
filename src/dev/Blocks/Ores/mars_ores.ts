IDRegistry.genBlockID("desh");
Block.createBlock("desh",[{name: "Desh Ore", texture: [["Desh", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Desh Ore",{
ru: "Деш"
})

Block.registerDropFunction("desh", function(coords, blockID){
    return [[ItemID.raw_desh, 1, 0]] 
});

IDRegistry.genBlockID("ore_tin_mars");
Block.createBlock("ore_tin_mars",[{name: "Ore Tin Mars", texture: [["Ore Tin Mars", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Ore Tin Mars",{
ru: "Марсианская оловянная руда"
})

Recipes.addFurnace(BlockID.ore_tin_mars, ItemID.ingot_tin_sc, 0);

IDRegistry.genBlockID("ore_iron_mars");
Block.createBlock("ore_iron_mars",[{name: "Ore Iron Mars", texture: [["Ore Iron Mars", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Ore Iron Mars",{
ru: "Железная марсианская руда"
})

Block.registerDropFunction("ore_iron_mars", function(coords, blockID){
    return [[ItemID.shard_iron, 1, 0]] 
});

IDRegistry.genBlockID("ore_copper_mars");
Block.createBlock("ore_copper_mars",[{name: "Ore Copper Mars", texture: [["Ore Copper Mars", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Ore Copper Mars",{
ru: "Медная марсианская руда"
});

Recipes.addFurnace(BlockID.ore_copper_mars, ItemID.ingot_copper_sc, 0);

