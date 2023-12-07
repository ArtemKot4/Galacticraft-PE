IDRegistry.genBlockID("lapiz_moon");
Block.createBlock("lapiz_moon",[{name: "Sapphire Block", texture: [["moonlapiz_block", 0]], inCreative: true} ],STONE);


IDRegistry.genBlockID("moonore_cheese");
Block.createBlock("moonore_cheese",[{name: "Lunar Cheese Ore", texture: [["Moonore Cheese", 0]], inCreative: true} ],STONE);


IDRegistry.genBlockID("ore_tin_moon");
Block.createBlock("ore_tin_moon",[{name: "Lunar Tin Ore", texture: [["Ore Tin Moon", 0]], inCreative: true} ],STONE);


IDRegistry.genBlockID("ore_copper_moon");
Block.createBlock("ore_copper_moon",[{name: "Lunar Copper Ore", texture: [["Ore Copper Moon", 0]], inCreative: true} ],STONE);


IDRegistry.genBlockID("moonore_sapphire");
Block.createBlock("moonore_sapphire",[{name: "Lunar Sapphire", texture: [["Moonore Sapphire", 0]], inCreative: true} ],STONE);


Recipes.addFurnace(BlockID.ore_copper_moon, ItemID.ingot_copper_sc, 0);
Recipes.addFurnace(BlockID.ore_tin_moon, ItemID.ingot_tin_sc, 0);

Block.registerDropFunction("moonore_sapphire", function(coords, blockID){
    return [[ItemID.lunar_sapphire, 1, 0]] 
});

Block.registerDropFunction("moonore_cheese", function(coords, blockID){
    return [[ItemID.cheese_curd, randomInt(1,3), 0]] 
});
