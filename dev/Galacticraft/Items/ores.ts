﻿new GItem("carbon_fragments")

new GItem("emerald_shard");

new GItem("desh_plate");

new GItem("desh_stick")

new GItem("dust_titanium");

new GItem("lunar_sapphire");

new GItem("meteoric_iron_raw");

new GItem("raw_desh");

new GItem("raw_silicon");

new GItem("iron_steel_dust");


// new ItemOre("compressed", "aluminum");

// new ItemOre("compressed", "lead");

// new ItemOre("ingot", "bronze");

// new ItemOre("compressed", "bronze")

// new ItemOre("compressed", "copper")

// new ItemOre("compressed", "iron")

// new ItemOre("compressed", "iron_steel");

// new ItemOre("compressed", "metheoric_item");

// new ItemOre("compressed", "steel");

// new ItemOre("compressed", "tin");

// new ItemOre("compressed", "titanium");

// new ItemOre("ingot", "aluminum");

// new ItemOre("ingot", "copper");

// new ItemOre("ingot", "desh");

// new ItemOre("ingot", "lead");

// new ItemOre("ingot", "tin")

// new ItemOre("ingot", "titanium")

// new ItemOre("shard", "tin");

// new ItemOre("shard", "copper");

// new ItemOre("shard", "aluminum");

// new ItemOre("shard", "iron_steel");

// new ItemOre("shard", "meteoric_iron");

// new ItemOre("shard", "titanium")

// new ItemOre("ingot", "iron_steel");

// new ItemOre("ingot","steel")

// new ItemOre("ingot", "meteoric_iron");

// new ItemOre("shard", "steel");

// new ItemOre("shard", "iron");

// new ItemOre("shard", "titanium");

new GItem("solar_dust")


Block.registerDropFunction("ore_solar_asteroids", function(coords, blockID){
    return [[ItemID.solar_dust_gc, 1, 0]] 
});


Block.registerDropFunction("ore_iron_asteroids", function(coords, blockID){
    return [[ItemID.shard_iron, 1, 0]] 
});


Block.registerDropFunction("desh", function(coords, blockID){
    return [[ItemID.raw_desh, 1, 0]] 
});


Block.registerDropFunction("ore_iron_mars", function(coords, blockID){
    return [[ItemID.shard_iron, 1, 0]] 
});


Block.registerDropFunction("ore_silicon_venus", function(coords, blockID){
    return [[ItemID.raw_silicon, 1, 0]] 
});


Block.registerDropFunction("venus_quartz", function(coords, blockID){
    return [[VanillaItemID.quartz, 1, 0]] 
});



Block.registerDropFunction("ore_silicon_earth", function(coords, blockID){
    return [[ItemID.raw_silicon, 1, 0]] 
});



Block.registerDropFunction("moonore_sapphire", function(coords, blockID){
    return [[ItemID.lunar_sapphire, 1, 0]] 
});

Block.registerDropFunction("moonore_cheese", function(coords, blockID){
    return [[ItemID.cheese_curd, randomInt(1,3), 0]] 
});
