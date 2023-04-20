IMPORT("ChargeItem");
﻿IDRegistry.genItemID("oxygen_canister_infinite"); 
Item.createItem("oxygen_canister_infinite", "Oxygen Canister Infinite", {name: "Oxygen Tank Heavy Full", meta: 0}, {stack: 64});
Translation.addTranslation("Oxygen Canister Infinite", {
ru: "Бесконечно-кислородный баллон"
});

ChargeItemRegistry.registerItem(ItemID.oxygen_canister_infinite, "ob", 500, 5, 0, true);
oxygenStorage.set(ItemID.oxygen_canister_infinite, {storage: 500});

Item.setGlint(ItemID.oxygen_canister_infinite, true);
