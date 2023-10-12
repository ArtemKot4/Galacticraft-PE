IDRegistry.genBlockID("ore_tin_sc");
Block.createBlock("ore_tin_sc",[{name: "Ore Tin", texture: [["Ore Tin Gl", 0]], inCreative: true} ],STONE);

Recipes.addFurnace(BlockID.ore_tin_sc, ItemID.ingot_tin_sc, 0);

IDRegistry.genBlockID("ore_aluminum_sc");
Block.createBlock("ore_aluminum_sc",[{name: "Ore Aluminum", texture: [["Ore Aluminum Gl", 0]], inCreative: true} ],STONE);

Recipes.addFurnace(BlockID.ore_aluminum_sc, ItemID.ingot_aluminum_sc, 0);

IDRegistry.genBlockID("ore_copper_sc");
Block.createBlock("ore_copper_sc",[{name: "Ore Copper", texture: [["Ore Copper Gl", 0]], inCreative: true} ],STONE);


Recipes.addFurnace(BlockID.ore_copper_sc, ItemID.ingot_copper_sc, 0);

IDRegistry.genBlockID("ore_silicon");
Block.createBlock("ore_silicon",[{name: "Ore Silicon", texture: [["Ore Silicon", 0]], inCreative: true} ],STONE);

Recipes.addFurnace(BlockID.ore_silicon, ItemID.raw_silicon, 0);

Block.registerDropFunction("ore_silicon", function(coords, blockID){
    return [[ItemID.raw_silicon, 1, 0]] 
});
