IDRegistry.genItemID("oxygen_gear"); 
Item.createItem("oxygen_gear", "Oxygen Gear", {name: "Oxygen Gear", meta: 0}, {stack: 1});


IDRegistry.genItemID("oxygen_mask"); 
Item.createItem("oxygen_mask", "Oxygen mask", {name: "oxygen_mask", meta: 0}, {stack: 1});

IDRegistry.genItemID("oxygen_concentrator"); 
Item.createItem("oxygen_concentrator", "Oxygen Concentrator", {name: "Oxygen Concentrator", meta: 0}, {stack: 3});

IDRegistry.genItemID("frequency_module"); 
Item.createItem("frequency_module", "Frequency Module", {name: "Frequency Module", meta: 0}, {stack: 1});

SpacesUtils.addHint(ItemID.frequency_module,"It can receive weak sound waves and distant signals")

IDRegistry.genItemID("shield_controller"); 
Item.createItem("shield_controller", "Shield Controller", {name: "Shield Controller", meta: 0}, {stack: 1});

SpacesUtils.addHint(ItemID.shield_controller,"The shield controller protects your armor from ALL types of damage - including atmospheric corrosion")