ModAPI.addAPICallback("FuturepackAPI", function(api: any){
	var Futurepack = api.Futurepack;
	ChargeItemRegistry.registerItem(ItemID.battery_I, "GalacticraftJoule", 300, 20, 0, true)
	ChargeItemRegistry.registerItem(ItemID.battery_n, "GalacticraftJoule", 420, 20, 0, true);
	ChargeItemRegistry.registerItem(ItemID.neon_battery, "GalacticraftJoule", 1000, 20, 0, true);
	ChargeItemRegistry.registerItem(ItemID.energie_zelle, "GalacticraftJoule", 760, 20, 0, true);
	ChargeItemRegistry.registerItem(ItemID.compact_energie_zelle, "GalacticraftJoule", 760, 20, 0, true);
	ChargeItemRegistry.registerItem(ItemID.kristall_energie_zelle, "GalacticraftJoule", 860, 20, 0, true);
   
	var batCryst = ["bioterium_battery","glowtite_batareika","wakurum_battery","neon_battery","quantanium_battery","retium_battery"]
	var batTranslat = ["Bioterium Battery","Glowtite Battery","Wakurum Battery","Neon Battery","Quantanium Battery","Retium Battery"]
	var energa = [550,320,575,800,765,590]
	for(var crystal in batCryst){var bat = batCryst[crystal];
		var bt = batTranslat[crystal];
		var en = energa[crystal];
		IDRegistry.genItemID(bat); 
Item.createItem(bat, bt, {name: bat, meta: 0}, {stack: 1, isTech:false});
		ChargeItemRegistry.registerItem(ItemID[bat], "gj", en, 20, 0, true);
		ChargeItemRegistry.registerItem(ItemID[bat], "ft", en, 20, 0, true);
	};
		
		
    Callback.addCallback("PostLoaded", function() {
			
		Futurepack.addFuturetock(ItemID.bioterium_battery, {futock: 550});
		Futurepack.addFuturetock(ItemID.glowtite_batareika, {futock: 320});
		Futurepack.addFuturetock(ItemID.wakurum_battery, {futock: 575});
		Futurepack.addFuturetock(ItemID.neon_battery, {futock: 800});
		Futurepack.addFuturetock(ItemID.quantanium_battery, {futock: 765});
		Futurepack.addFuturetock(ItemID.retium_battery, {futock: 590});});
		Callback.addCallback("LevelCreated", function() {
		Recipes.addShaped({id: ItemID.bioterium_battery, count: 1, data: 0}, [
    " g ",
    "gbg",
    "gag"
], ['a', ItemID.crystal_bioterium_1, 0, 'b', ItemID.dust_bioterium, 0, 'g', ItemID.compressed_tin, 0]);

Recipes.addShaped({id: ItemID.neon_battery, count: 1, data: 0}, [
    " g ",
    "gbg",
    "gag"
], ['a', ItemID.crystal_neon_1, 0, 'b', ItemID.dust_neon, 0, 'g', ItemID.compressed_tin, 0]);

Recipes.addShaped({id: ItemID.glowtite_batareika, count: 1, data: 0}, [
    " g ",
    "gbg",
    "gag"
], ['a', ItemID.crystal_glowtite_1, 0, 'b', ItemID.dust_glowtite, 0, 'g', ItemID.compressed_tin, 0]);

Recipes.addShaped({id: ItemID.retium_battery, count: 1, data: 0}, [
    " g ",
    "gbg",
    "gag"
], ['a', ItemID.crystal_retium_1, 0, 'b', ItemID.dust_retium, 0, 'g', ItemID.compressed_tin, 0]);

Recipes.addShaped({id: ItemID.quantanium_battery, count: 1, data: 0}, [
    " g ",
    "gbg",
    "gag"
], ['a', ItemID.ingot_quantanium, 0, 'b', ItemID.dust_quantanium, 0, 'g', ItemID.compressed_tin, 0]);

Recipes.addShaped({id: ItemID.wakurum_battery, count: 1, data: 0}, [
    " g ",
    "gbg",
    "gag"
], ['a', ItemID.ingot_wakurum, 0, 'b', ItemID.dust_wakurum, 0, 'g', ItemID.compressed_tin, 0]);});

Translation.addTranslation("Bioterium Battery",{
ru: "Биотериумовая батарейка"
})

Translation.addTranslation("Retium Battery",{
ru: "Ретиумовая батарейка"
})

Translation.addTranslation("Wakurum Battery",{
ru: "Вакурумовая батарейка "
})

Translation.addTranslation("Neon Battery",{
ru: "Неоновая батарейка"
})

Translation.addTranslation("Glowtite Battery",{
ru: "Светящаяся батарейка"
})

Translation.addTranslation("Quantanium Battery",{
ru: "Квантаниумовая батарейка"
})


});
﻿