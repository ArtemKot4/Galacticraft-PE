IMPORT("ToolLib");
/*﻿IDRegistry.genItemID("blade"); 
Item.createItem("blade", "Blade", {name: "Knife", meta: 0}, {stack: 3});
Translation.addTranslation("Blade", {
ru: "Лезвие"
});
Recipes.addShaped({id: ItemID.blade, count: 1, data: 0}, [
    "a",
    "a",
    ""
], ['a', VanillaItemID.iron_ingot, 0]);
*/
var toolspace = ["Steel axe","Steel sword","Steel hoe","Steel shovel","Steel pickaxe","Desh pickaxe slime","Desh spade","Desh sword","Desh hoe","Desh axe","Desh pickaxe","Titanium sword","Titanium shovel","Titanium pickaxe","Titanium hoe","Titanium axe","Volcanic pickaxe","Iron Steel Shovel","Iron Steel Sword","Iron Steel Hoe","Iron Steel Pickaxe","Iron Steel Axe","Space wrench"]
for(var i in toolspace){
    ﻿IDRegistry.genItemID(toolspace[i]); 
Item.createItem(toolspace[i], toolspace[i], {name: toolspace[i], meta: 0}, {stack: 1, isTech:true});
}









var glasstainer = new UI.Container()
var ARMORGLASSES = new UI.Window({
	location: {
    	x: 0,
        y: 0,
        width: 1000,
        height: 560
    },
    drawing: [{type: "background", color: android.graphics.Color.argb(0, 0, 0, 0)},{type: "bitmap", bitmap:"SPC.SPC_Hud", scale: 1.9,x: 0,y: 0}],
    elements: {
      /* "closeButton": {type: "closeButton", x: 
       100, y: 0, global: false, bitmap: "slot_empty", scale: 10},*/
     }
  }
);

ARMORGLASSES.setAsGameOverlay(true);  ARMORGLASSES.setTouchable(false);


IDRegistry.genItemID("sensor_glasses");
Item.createArmorItem("sensor_glasses", "Sensor glasses", {name: "Sensor glasses"}, {type: "helmet", armor: 2, durability: 150, texture: "armor/sensor_1.png"});

Translation.addTranslation("Sensor glasses", {
ru: "§aСенсорные очки"
});

    

Armor.registerOnTakeOnListener(ItemID.sensor_glasses, function(item, slot, player) {
glasstainer.openAs(ARMORGLASSES)
});
Armor.registerOnTakeOffListener(ItemID.sensor_glasses, function(item, slot, player) {
glasstainer.close();
});




IDRegistry.genItemID("gear_wheel_tin"); 
Item.createItem("gear_wheel_tin", "Standart gear wheel", {name: "gear_wheel_tin", meta: 0}, {stack: 64});
Translation.addTranslation("Standart gear wheel", {
ru: "Стандартная зубчатая шестерёнка"
});


// IDRegistry.genItemID("chip_industrialization"); 
// Item.createItem("chip_industrialization", "Chip industrialization", {name: "chip", meta: 0}, {stack: 64});
// Translation.addTranslation("Chip industrialization", {
// ru: "§6Программный чип"
// });

// IDRegistry.genItemID("motherboard_sc"); 
// Item.createItem("motherboard_sc", "Motherboard", {name: "motherboard", meta: 0}, {stack: 64});
// Translation.addTranslation("Motherboard", {
// ru: "§6Материнская плата"
// });

ToolAPI.addToolMaterial("IronSteelPickaxe", {durability: 300, level: 3, efficiency: 3, damage: 2, //enchantability6
});

ToolAPI.addToolMaterial("SteelPickaxe", {durability: 350, level: 3, efficiency: 4, damage: 2, //enchantability6
});

ToolAPI.addToolMaterial("DeshPickaxe", {durability: 1700, level: 4, efficiency: 6, damage: 2, //enchantability8
});

ToolAPI.addToolMaterial("VolcanicPickaxe", {durability: 1750, level: 4, efficiency: 6, damage: 2, //enchantability:8
});

ToolAPI.addToolMaterial("TitaniumPickaxe", {durability: 1850, level: 4, efficiency: 6, damage: 3, //enchantability:10
});




ToolAPI.addToolMaterial("IronSteelSword", {durability: 300, level: 3, efficiency: 3, damage: 4, //enchantability:6
});

ToolAPI.addToolMaterial("SteelSword", {durability: 350, level: 3, efficiency: 4, damage: 4, //enchantability:6
});

ToolAPI.addToolMaterial("DeshSword", {durability: 1000, level: 4, efficiency: 6, damage: 7, //enchantability:8
});

ToolAPI.addToolMaterial("TitaniumSword", {durability: 1550, level: 4, efficiency: 6, damage: 9, //enchantability:10
});



ToolAPI.addToolMaterial("IronSteelShovel", {durability: 300, level: 2, efficiency: 3, damage: 1, //enchantability:6
});

ToolAPI.addToolMaterial("SteelShovel", {durability: 350, level: 2, efficiency: 4, damage: 1, //enchantability:6
});

ToolAPI.addToolMaterial("DeshSpade", {durability: 700, level: 2, efficiency: 6, damage: 2, //enchantability:8
});

ToolAPI.addToolMaterial("TitaniumShovel", {durability: 750, level: 2, efficiency: 6, damage: 3, //enchantability:10
});




ToolAPI.addToolMaterial("IronSteelHoe", {durability: 300, level: 2, efficiency: 3, damage: 1, //enchantability:6
});

ToolAPI.addToolMaterial("SteelHoe", {durability: 350, level: 2, efficiency: 4, damage: 1, //enchantability:6
});

ToolAPI.addToolMaterial("DeshHoe", {durability: 700, level: 2, efficiency: 6, damage: 2, //enchantability:8
});

ToolAPI.addToolMaterial("TitaniumHoe", {durability: 750, level: 3, efficiency:
   6, damage: 3, 
   //enchantability:10
});







ToolAPI.addToolMaterial("IronSteelAxe", {durability: 300, level: 2, efficiency: 3, damage: 1, //enchantability:6
});

ToolAPI.addToolMaterial("SteelAxe", {durability: 350, level: 2, efficiency: 4, damage: 1, //enchantability:6
});

ToolAPI.addToolMaterial("DeshAxe", {durability: 700, level: 3, efficiency: 6, damage: 2, //enchantability:8
});

ToolAPI.addToolMaterial("TitaniumAxe", {durability: 750, level: 3, 
  efficiency: 6, damage: 3,
   //enchantability: 10
});




ToolAPI.setTool(ItemID["Steel axe"], "SteelAxe", ToolType.axe);
ToolAPI.setTool(ItemID["Desh axe"], "DeshAxe", ToolType.axe);
ToolAPI.setTool(ItemID["Titanium axe"], "TitaniumAxe", ToolType.axe);
ToolAPI.setTool(ItemID["Iron Steel Axe"], "IronSteelAxe", ToolType.axe);


ToolAPI.setTool(ItemID["Steel shovel"], "SteelShovel", ToolType.shovel);
ToolAPI.setTool(ItemID["Desh spade"], "DeshSpade", ToolType.shovel);
ToolAPI.setTool(ItemID["Titanium shovel"], "TitaniumShovel", ToolType.shovel);
ToolAPI.setTool(ItemID["Iron Steel Shovel"], "IronSteelShovel", ToolType.shovel);


ToolAPI.setTool(ItemID["Steel hoe"], "SteelHoe", ToolType.hoe);
ToolAPI.setTool(ItemID["Desh hoe"], "DeshHoe", ToolType.hoe);
ToolAPI.setTool(ItemID["Titanium hoe"], "TitaniumHoe", ToolType.hoe);
ToolAPI.setTool(ItemID["Iron Steel Hoe"], "IronSteelHoe", ToolType.hoe);


ToolAPI.setTool(ItemID["Steel sword"], "SteelSword", ToolType.sword);
ToolAPI.setTool(ItemID["Desh sword"], "DeshSword", ToolType.sword);
ToolAPI.setTool(ItemID["Titanium sword"], "TitaniumSword", ToolType.sword);
ToolAPI.setTool(ItemID["Iron Steel Sword"], "IronSteelSword", ToolType.sword);



ToolAPI.setTool(ItemID["Steel pickaxe"], "SteelPickaxe", ToolType.pickaxe);
ToolAPI.setTool(ItemID["Desh pickaxe"], "DeshPickaxe", ToolType.pickaxe);
ToolAPI.setTool(ItemID["Desh pickaxe slime"], "DeshPickaxe", ToolType.pickaxe);
ToolAPI.setTool(ItemID["Volcanic pickaxe"], "VolcanicPickaxe", ToolType.pickaxe);
ToolAPI.setTool(ItemID["Titanium pickaxe"], "TitaniumPickaxe", ToolType.pickaxe);
ToolAPI.setTool(ItemID["Iron Steel Pickaxe"], "IronSteelPickaxe", ToolType.pickaxe);
