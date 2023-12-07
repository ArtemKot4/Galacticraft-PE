/*IDRegistry.genItemID("dirty_fuel_canister");
Item.createItem("dirty_fuel_canister", "Dirty Fuel Canister", {name: "bad_fuel_canister_partial", meta:6}, {stack: 1, isTech: true});
Translation.addTranslation("Dirty Fuel Canister", {
ru: "Канистра с неочищенным топливом"
});

Item.addToCreative(ItemID.dirty_fuel_canister, 1,6)

Item.registerNameOverrideFunction("dirty_fuel_canister", function(item, translation, name) {
    return Translation.translate("Dirty Fuel Canister") + Translation.translate("\n§7Filled in: ") + item.data;
});

Item.registerIconOverrideFunction("dirty_fuel_canister", function(item, data) {
        if (item.data == 6) {
            return {name: "bad_fuel_canister_partial", meta:6};
        } if (item.data == 5 ) {
            return {name: "bad_fuel_canister_partial", meta:5};
        } if (item.data == 4 ) {
            return {name: "bad_fuel_canister_partial", meta:4};
        } if (item.data == 3 ) { 
            return {name: "bad_fuel_canister_partial", meta:3};
        } if (item.data == 2 ) { 
            return {name: "bad_fuel_canister_partial" ,meta: 2};
        } if (item.data == 1 ) {
            return {name: "bad_fuel_canister_partial", meta:1};
        } if (item.data == 0 ) {
            return {name: "Empty Liquid Canister", meta:0};
        }
});
*/