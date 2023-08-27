
IMPORT("ChargeItem");
﻿IDRegistry.genItemID("oxygen_canister_infinite"); 
Item.createItem("oxygen_canister_infinite", "Oxygen Canister Infinite", {name: "Oxygen Tank Heavy Full", meta: 0}, {stack: 64});
Translation.addTranslation("Oxygen Canister Infinite", {
ru: "Бесконечно-кислородный баллон"
});

ChargeItemRegistry.registerItem(ItemID.oxygen_canister_infinite, "ob", 500, 5, 0, true);
oxygenStorage.set(ItemID.oxygen_canister_infinite, {storage: 500});

Item.setGlint(ItemID.oxygen_canister_infinite, true);

SpacesUtils.balloneRegistry("oxygentank_lightfull","Oxygen Tank Light Full","Oxygen Tank Light Full",900)
SpacesUtils.balloneRegistry("oxygentank_heavyfull","Oxygen Tank Heavy Full","Oxygen Tank Heavy Full",2700)
SpacesUtils.balloneRegistry("oxygentank_medfull","Oxygen Tank Med Full","Oxygen Tank Med Full",1800)