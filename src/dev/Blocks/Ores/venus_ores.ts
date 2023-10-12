IDRegistry.genBlockID("ore_copper_venus");
Block.createBlock("ore_copper_venus",[{name: "Ore Copper Venus", texture: [["Ore Copper Venus", 0]], inCreative: true} ],STONE);


IDRegistry.genBlockID("ore_aluminum_venus");
Block.createBlock("ore_aluminum_venus",[{name: "Ore Aluminum Venus", texture: [["Ore Aluminum Venus", 0]], inCreative: true} ],STONE);


IDRegistry.genBlockID("ore_silicon_venus");
Block.createBlock("ore_silicon_venus",[{name: "Ore Silicon Venus", texture: [["Ore Silicon Venus", 0]], inCreative: true} ],STONE);


IDRegistry.genBlockID("venus_quartz");
Block.createBlock("venus_quartz",[{name: "Venus Quartz", texture: [["Ore Quartz Venus", 0]], inCreative: true} ],STONE);


IDRegistry.genBlockID("ore_tin_venus");
Block.createBlock("ore_tin_venus",[{name: "Ore Tin Venus", texture: [["Ore Tin Venus", 0]], inCreative: true} ],STONE);


IDRegistry.genBlockID("ore_galena");
Block.createBlock("ore_galena",[{name: "Ore Galena", texture: [["Ore Galena", 0]], inCreative: true} ],STONE);

Recipes.addFurnace(BlockID.ore_galena, ItemID.ingot_lead_sc, 0);
Recipes.addFurnace(BlockID.ore_copper_venus, ItemID.ingot_copper_sc, 0);
Recipes.addFurnace(BlockID.venus_quartz, VanillaItemID.quartz, 0);
Recipes.addFurnace(BlockID.ore_silicon_venus, ItemID.raw_silicon, 0);
Recipes.addFurnace(BlockID.ore_aluminum_venus, ItemID.ingot_aluminum_sc, 0);
Recipes.addFurnace(BlockID.ore_tin_venus, ItemID.ingot_tin_sc, 0);


Block.registerDropFunction("ore_silicon_venus", function(coords, blockID){
    return [[ItemID.raw_silicon, 1, 0]] 
});


Block.registerDropFunction("venus_quartz", function(coords, blockID){
    return [[VanillaItemID.quartz, 1, 0]] 
});
