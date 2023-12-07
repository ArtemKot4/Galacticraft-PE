IMPORT("ChargeItem");
﻿IDRegistry.genItemID("battery"); 
Item.createItem("battery", "Battery", {name: "Battery", meta: 0}, {stack: 1, isTech:false});
Translation.addTranslation("Battery", {
ru: "Батарейка"
});
ChargeItemRegistry.registerItem(ItemID.battery, "sj", 500, 20, 1, true);
ChargeItemRegistry.registerItem(ItemID.battery, "ft", 500, 20, 1, true);

IDRegistry.genItemID("battery_infinity"); 
Item.createItem("battery_infinity", "Battery Infinity", {name: "Oxygen Canistre Infinite", meta: 0}, {stack: 1, isTech:false});
Translation.addTranslation("Battery Infinity", {
ru: "§6Бесконечная батарейка"
});

IDRegistry.genItemID("atomic_battery"); 
Item.createItem("atomic_battery", "Atomic battery", {name: "atomic_battery", meta: 0}, {stack: 1, isTech:false});
Translation.addTranslation("Atomic battery", {
ru: "§6Атомная батарейка"
});

battery.setInfinite(ItemID.battery_infinity,0)

battery.setInfinite(ItemID.atomic_battery,25)

Item.setGlint(ItemID.battery_infinity, true);

Item.registerNameOverrideFunction(ItemID.atomic_battery, function(item, name){
    return name + Translation.translate("\n§7Infinity§6⚡\n§7Smaller energy generating")
});
Translation.addTranslation("\n§7Infinity§6⚡\n§7Smaller energy generating", {
    ru: "\n§7Бесконечность§6⚡\n§7Небольшая скорость подзарядки"
});