

/*cableAPI.addGroup(BlockID.geothermalGenerator);
cableAPI.addGroup(BlockID.genWindMill);*/





ModAPI.addAPICallback("VampirismAPI", function(api){
	IDRegistry.genItemID("vampirism_battery");
Item.createItem("vampirism_battery", "Vampirism battery", {name: "blood_battery", meta: 0}, {stack: 1});
battery.set(ItemID.vampirism_battery, {storage: 600});
Translation.addTranslation("Vampirism battery",{
ru: "§4Батарейка Вампира"
})
Recipes.addShaped({id: ItemID.vampirism_battery, count: 1, data: 0}, [
    " g ",
    "gbg",
    "gag"
], ['a', ItemID.bloodBottle, 3, 'b', ItemID.humanHeart, 0, 'g', ItemID.compressed_titanium, 0]);
});


/*Callback.addCallback("LocalTick", function() {

	if(Player.getDimension()==Moon.id){
	if(World.getThreadTime%300 == 2)	SpaceRace.play();
	}
});
*/

ModAPI.addAPICallback("ForestryAPI", function(api){ 
    Callback.addCallback("LevelCreated", function() {
Recipes.addShaped({id: ItemID.ingotCopper, count: 1, data: 0}, [
    "",
    " a ",
    ""
], ['a', ItemID.ingot_copper_sc, 0]);

Recipes.addShaped({id: ItemID.ingotTin, count: 1, data: 0}, [
    "",
    " a ",
    ""
], ['a', ItemID.ingot_tin_sc, 0]);

Recipes.addShaped({id: ItemID.ingot_copper_sc, count: 1, data: 0}, [
    "",
    " a ",
    ""
], ['a', ItemID.ingotCopper, 0]);

Recipes.addShaped({id: ItemID.ingot_tin_sc, count: 1, data: 0}, [
    "",
    " a ",
    ""
], ['a', ItemID.ingotTin, 0]);


Recipes.addShaped({id: BlockID.compressor_sj, count: 1, data: 0}, [
    "baf",
    "aca",
    "aea"
], ['a', ItemID.ingot_aluminum_sc, 0, 'b', VanillaBlockID.anvil, 0, 'c', ItemID.ingotCopper, 0, 'e', ItemID.wafer_basic, 0,'f',BlockID.mekanism_block_ports,0]);

Recipes.addShaped({id: ItemID.gear_wheel_tin, count: 1, data: 0}, [
    "bab",
    "a a",
    "bab"
], ['a', ItemID.ingotTin, 0, 'b', ItemID.tin_shard, 0]);

SpacesMachine.addReceptForElectricCompressor({slot_1:ItemID.ingotCopper,
    slot_2:ItemID.ingotTin,slot_3:0,slot_4:0,slot_5:0,slot_6:0,slot_7:0,slot_8:0,slot_9:0},{result:ItemID.compressed_bronze,}
    
   
    )

Recipes.addShaped({id: BlockID.coal_generator, count: 1, data: 0}, [
    "aaa",
    "bcb",
    "aea"
], ['a', ItemID.ingotCopper, 0, 'b', VanillaItemID.iron_ingot, 0, 'c', VanillaBlockID.furnace, 0, 'e', BlockID.AluminumWire, 0]);

Recipes.addShaped({id: BlockID.compressor_sj, count: 1, data: 0}, [
    "baf",
    "aca",
    "aea"
], ['a', ItemID.ingot_aluminum_sc, 0, 'b', VanillaBlockID.anvil, 0, 'c', ItemID.ingotCopper, 0, 'e', ItemID.wafer_basic, 0,'f',BlockID.mekanism_block_ports,0]);












})
}); 
