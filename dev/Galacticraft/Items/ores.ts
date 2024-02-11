﻿new GItem("carbon_fragments")

new GItem("emerald_shard");

new GItem("desh_plate");

new GItem("desh_stick")

new GItem("dust_titanium");

new ItemOre("compressed", "aluminum");

new ItemOre("compressed", "lead");

new ItemOre("ingot", "bronze");

new ItemOre("compressed", "bronze")

new ItemOre("compressed", "copper")

new ItemOre("compressed", "iron")

new ItemOre("compressed", "iron_steel");

new ItemOre("compressed", "metheoric_item");

new ItemOre("compressed", "steel");

new ItemOre("compressed", "tin");

new ItemOre("compressed", "titanium");

new ItemOre("ingot", "aluminum");

new ItemOre("ingot", "copper");

new ItemOre("ingot", "desh");

new ItemOre("ingot", "lead");

new ItemOre("ingot", "tin")

new ItemOre("ingot", "titanium")

new ItemOre("shard", "tin");

new ItemOre("shard", "copper");


IDRegistry.genItemID("aluminum_shard"); 
Item.createItem("aluminum_shard", "Aluminum shard", {name: "aluminum_shard", meta: 0}, {stack: 64});

IDRegistry.genItemID("iron_steel_shard"); 
Item.createItem("iron_steel_shard", "Iron steel shard", {name: "iron_steel_shard", meta: 0}, {stack: 64});

IDRegistry.genItemID("meteoric_iron_shard"); 
Item.createItem("meteoric_iron_shard", "Meteoric iron shard", {name: "meteoric_iron_shard", meta: 0}, {stack: 64});

IDRegistry.genItemID("shard_titanium"); 
Item.createItem("shard_titanium", "Titanium shard", {name: "titanium_shard", meta: 0}, {stack: 64});


IDRegistry.genItemID("iron_steel_dust"); 
Item.createItem("iron_steel_dust", "Iron Steel Dust", {name: "Iron Steel Dust", meta: 0}, {stack: 64});

IDRegistry.genItemID("iron_steel_ingot"); 
Item.createItem("iron_steel_ingot", "Iron Steel Ingot", {name: "Iron Steel Ingot", meta: 0}, {stack: 64});


IDRegistry.genItemID("ingot_steel"); 
Item.createItem("ingot_steel", "Steel Ingot", {name: "Steel Don't Mekanism", meta: 0}, {stack: 64});


IDRegistry.genItemID("meteoric_iron_ingot"); 
Item.createItem("meteoric_iron_ingot", "Meteoric Iron Ingot", {name: "Meteoric Iron Ingot", meta: 0}, {stack: 64});


IDRegistry.genItemID("steel_shards");
Item.createItem("steel_shards", "Steel Shards", {name: "Steel Shards", meta: 0}, {stack: 64});


IDRegistry.genItemID("lunar_sapphire"); 
Item.createItem("lunar_sapphire", "Lunar Sapphire", {name: "Lunar Sapphire", meta: 0}, {stack: 64});


﻿IDRegistry.genItemID("meteoric_iron_raw"); 
Item.createItem("meteoric_iron_raw", "Meteoric Iron Raw", {name: "Meteoric Iron Raw", meta: 0}, {stack: 64});


﻿IDRegistry.genItemID("raw_desh"); 
Item.createItem("raw_desh", "Raw Desh", {name: "Raw Desh", meta: 0}, {stack: 64});


IDRegistry.genItemID("raw_silicon"); 
Item.createItem("raw_silicon", "Raw Silicon", {name: "Raw Silicon", meta: 0}, {stack: 64});

IDRegistry.genItemID("reinforced_plate_t2"); 
Item.createItem("reinforced_plate_t2", "Reinforced Plate 2 lvl", {name: "Reinforced Plate T2", meta: 0}, {stack: 64});


﻿IDRegistry.genItemID("reinforced_plate_t3"); 
Item.createItem("reinforced_plate_t3", "Reinforced Plate 3 lvl", {name: "Reinforced Plate T3", meta: 0}, {stack: 64});


IDRegistry.genItemID("shard_iron"); 
Item.createItem("shard_iron", "Shard Iron", {name: "Shard Iron", meta: 0}, {stack: 64});


IDRegistry.genItemID("shard_titanium"); 
Item.createItem("shard_titanium", "Shard Titanium", {name: "Shard Titanium", meta: 0}, {stack: 64});


IDRegistry.genItemID("solar_dust_sc"); 
Item.createItem("solar_dust_sc", "Solar Dust", {name: "Solar Dust", meta: 0}, {stack: 64});



Recipes.addFurnace(ItemID.raw_desh, 0, ItemID.ingot_desh, 0);

Recipes.addFurnace(ItemID.shard_iron, 0, VanillaItemID.iron_ingot, 0);

Recipes.addFurnace(ItemID.meteoric_iron_raw, 0, ItemID.meteoric_iron_ingot, 0);