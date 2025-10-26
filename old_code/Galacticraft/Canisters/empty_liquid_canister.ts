IDRegistry.genItemID("empty_liquid_canister"); 
Item.createItem("empty_liquid_canister", "Empty Liquid Canister", {name: "empty_liquid_canister", meta: 0}, {stack: 1});
Translation.addTranslation("Empty Liquid Canister", {
ru: "Пустая жидкостная канистра"
});
Item.registerNameOverrideFunction("empty_liquid_canister", function(item, translation, name) {
    return Translation.translate("Empty Liquid Canister") + Translation.translate("\n§7Empty") 
});
Translation.addTranslation("\n§7Empty", {ru: "\n§7Пусто"});

Item.setLiquidClip("empty_liquid_canister", true);