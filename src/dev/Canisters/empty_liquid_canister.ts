IDRegistry.genItemID("empty_liquid_canister"); 
Item.createItem("empty_liquid_canister", "Empty Liquid Canister", {name: "Empty Liquid Canister", meta: 0}, {stack: 1});
Translation.addTranslation("Empty Liquid Canister", {
ru: "Пустая жидкостная канистра"
});
Item.registerNameOverrideFunction("empty_liquid_canister", function(item, translation, name) {
    return Translation.translate("Empty Liquid Canister") + Translation.translate("\n§7Empty") 
});
Translation.addTranslation("\n§7Empty", {ru: "\n§7Пусто"});

/*LiquidRegistry.registerItem("spacescraft_oil_still",empty: {data: 0, id: ItemID.empty_liquid_canister}, full: {data: 6, id: ItemID.oil_canister});

LiquidRegistry.registerItem("spacescraft_rubber_still",empty: {data: 0, id: ItemID.empty_liquid_canister},full: {data: 6, id: ItemID.rubber_canister})

LiquidRegistry.registerItem("spacescraft_fuel_still",empty: {data: 0, id: ItemID.empty_liquid_canister},full: {data: 6, id: ItemID.fuel_canister})

LiquidRegistry.registerItem("spacescraft_cerosin_still",empty: {data: 0, id: ItemID.empty_liquid_canister},full: {data: 6, id: ItemID.cerosin_canister})
*/