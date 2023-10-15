IDRegistry.genBlockID("ore_solar");
Block.createBlock("ore_solar",[{name: "Ore Solar", texture: [["Ore Solar", 0]], inCreative: true} ],STONE);


IDRegistry.genBlockID("ore_iron_asteroids");
Block.createBlock("ore_iron_asteroids",[{name: "Ore Iron Asteroids", texture: [["Ore Iron Asteroids", 0]], inCreative: true} ],STONE);


IDRegistry.genBlockID("ore_ilmenite");
Block.createBlock("ore_ilmenite",[{name: "Ore Ilmenite", texture: [["Ore Ilmenite", 0]], inCreative: true} ],STONE);


IDRegistry.genBlockID("ore_aluminum_asteroids");
Block.createBlock("ore_aluminum_asteroids",[{name: "Ore Aluminum Asteroids", texture: [["Ore Aluminum Asteroids", 0]], inCreative: true} ],STONE);


Recipes.addFurnace(BlockID.ore_aluminum_asteroids, ItemID.ingot_aluminum_sc, 0);
Recipes.addFurnace(BlockID.ore_ilmenite, ItemID.ingot_titanium, 0);

Block.registerDropFunction("ore_solar", function(coords, blockID){
    return [[ItemID.solar_dust_sc, 1, 0]] 
});


Block.registerDropFunction("ore_iron_asteroids", function(coords, blockID){
    return [[ItemID.shard_iron, 1, 0]] 
});
