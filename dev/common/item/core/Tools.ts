IMPORT("ToolLib");

ToolAPI.addToolMaterial("SteelTool", { durability: 768, level: 4, efficiency: 5, damage: 2, enchantability: 8 });

ToolAPI.setTool(ItemList.STEEL_PICKAXE.id, "SteelTool", ToolType.pickaxe);
ToolAPI.setTool(ItemList.STEEL_AXE.id, "SteelTool", ToolType.axe);
ToolAPI.setTool(ItemList.STEEL_HOE.id, "SteelTool", ToolType.hoe);
ToolAPI.setTool(ItemList.STEEL_SHOVEL.id, "SteelTool", ToolType.shovel);
ToolAPI.setTool(ItemList.STEEL_SWORD.id, "SteelTool", ToolType.sword);

IDRegistry.genItemID("steel_helmet");
IDRegistry.genItemID("steel_chestplate");
IDRegistry.genItemID("steel_leggings");
IDRegistry.genItemID("steel_boots");
IDRegistry.genItemID("sensor_glasses");

Item.createArmorItem("steel_helmet", "Steel Helmet", { name: "steel_helmet", meta: 0 }, { type: "helmet", armor: 3, durability: 390, texture: "armor/steel_1.png" });
Item.createArmorItem("steel_chestplate", "Steel Chestplate", { name: "steel_chestplate", meta: 0 }, { type: "chestplate", armor: 6, durability: 450, texture: "armor/steel_2.png" });
Item.createArmorItem("steel_leggings", "Steel Leggings", { name: "steel_leggings", meta: 0 }, { type: "leggings", armor: 8, durability: 480, texture: "armor/steel_3.png" });
Item.createArmorItem("steel_boots", "Steel Boots", { name: "steel_boots", meta: 0 }, { type: "boots", armor: 3, durability: 330, texture: "armor/steel_2.png" });

const glassContainer = new UI.Container();

const SENSOR_GLASSES_UI = new UI.Window({
    location: {
        x: 0,
        y: 0,
        width: 1000,
        height: 560
    },
    drawing: [
        { type: "background", color: android.graphics.Color.argb(0, 0, 0, 0) },
        { type: "bitmap", bitmap: "SPC.SPC_Hud", scale: 1.9, x: 0, y: 0 }
    ],
    elements: {}
});

SENSOR_GLASSES_UI.setAsGameOverlay(true);
SENSOR_GLASSES_UI.setTouchable(false);

Item.createArmorItem("sensor_glasses", "Sensor Glasses", { name: "sensor_glasses", meta: 0 }, { type: "helmet", armor: 0, durability: 2600, texture: "armor/sensor_1.png" });

Armor.registerOnTakeOnListener(ItemID.sensor_glasses, function(item, slot, player) {
    glassContainer.openAs(SENSOR_GLASSES_UI);
});

Armor.registerOnTakeOffListener(ItemID.sensor_glasses, function(item, slot, player) {
    glassContainer.close();
});

let sensorGlassesCooldown = 0;

Armor.registerOnTickListener(ItemID.sensor_glasses, function() {
    sensorGlassesCooldown++;
    if(sensorGlassesCooldown % 40 == 0) {
        glassContainer.openAs(SENSOR_GLASSES_UI);
    }
});
