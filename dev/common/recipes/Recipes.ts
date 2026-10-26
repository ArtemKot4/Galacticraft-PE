Recipes.addFurnace(BlockList.ORE_COPPER_EARTH.id, 0, ItemList.INGOT_COPPER.id, 0);
Recipes.addFurnace(BlockList.ORE_TIN_EARTH.id, 0, ItemList.INGOT_TIN.id, 0);
Recipes.addFurnace(BlockList.ORE_COPPER_MOON.id, 0, ItemList.INGOT_COPPER.id, 0);
Recipes.addFurnace(BlockList.ORE_TIN_MOON.id, 0, ItemList.INGOT_TIN.id, 0);
Recipes.addFurnace(BlockList.ORE_ALUMINUM_EARTH.id, 0, ItemList.INGOT_ALUMINUM.id, 0);
Recipes.addFurnace(ItemList.METEORIC_IRON_RAW.id, 0, ItemList.INGOT_METEORIC_IRON.id, 0);
Recipes.addFurnace(BlockList.MOON_SAPPHIRE.id, 0, ItemList.LUNAR_SAPPHIRE.id, 0);
Recipes.addFurnace(BlockList.MOON_CHEESE.id, 0, ItemList.CHEESE_CURD.id, 0);
Recipes.addFurnace(ItemList.BEEF_PATTY_RAW.id, 0, ItemList.BEEF_PATTY_COOKED.id, 0);

Recipes.addShaped({ id: ItemList.STEEL_PICKAXE.id, count: 1, data: 0 },
    ["YYY", " X ", " X "], ["X", VanillaItemID.stick, 0, "Y", ItemList.COMPRESSED_STEEL.id, 0]);

Recipes.addShaped({ id: ItemList.STEEL_AXE.id, count: 1, data: 0 },
    ["YY ", "YX ", " X "], ["X", VanillaItemID.stick, 0, "Y", ItemList.COMPRESSED_STEEL.id, 0]);

Recipes.addShaped({ id: ItemList.STEEL_HOE.id, count: 1, data: 0 },
    [" YY", " X ", " X "], ["X", VanillaItemID.stick, 0, "Y", ItemList.COMPRESSED_STEEL.id, 0]);

Recipes.addShaped({ id: ItemList.STEEL_SHOVEL.id, count: 1, data: 0 },
    [" Y ", " X ", " X "], ["X", VanillaItemID.stick, 0, "Y", ItemList.COMPRESSED_STEEL.id, 0]);

Recipes.addShaped({ id: ItemList.STEEL_SWORD.id, count: 1, data: 0 },
    [" Y ", " Y ", " X "], ["X", VanillaItemID.stick, 0, "Y", ItemList.COMPRESSED_STEEL.id, 0]);

Recipes.addShaped({ id: ItemID.steel_helmet, count: 1, data: 0 },
    ["XXX", "X X"], ["X", ItemList.COMPRESSED_STEEL.id, 0]);

Recipes.addShaped({ id: ItemID.steel_chestplate, count: 1, data: 0 },
    ["X X", "XXX", "XXX"], ["X", ItemList.COMPRESSED_STEEL.id, 0]);

Recipes.addShaped({ id: ItemID.steel_leggings, count: 1, data: 0 },
    ["XXX", "X X", "X X"], ["X", ItemList.COMPRESSED_STEEL.id, 0]);

Recipes.addShaped({ id: ItemID.steel_boots, count: 1, data: 0 },
    ["X X", "X X"], ["X", ItemList.COMPRESSED_STEEL.id, 0]);

Recipes.addShaped({ id: ItemList.STEEL_POLE.id, count: 2, data: 0 },
    ["X", "X", "X"], ["X", ItemList.COMPRESSED_STEEL.id, 0]);

Recipes.addShaped({ id: ItemList.SENSOR_LENS.id, count: 1, data: 0 },
    ["ZXZ", "XYX", "ZXZ"],
    ["X", VanillaBlockID.glass_pane, 0, "Y", ItemList.COMPRESSED_METEORIC_ITEM.id, 0, "Z", VanillaItemID.redstone, 0]);

Recipes.addShaped({ id: ItemID.sensor_glasses, count: 1, data: 0 },
    ["ZWZ", "Z Z", "XYX"],
    ["W", VanillaItemID.diamond, 0, "X", ItemList.SENSOR_LENS.id, 0, "Y", ItemList.INGOT_METEORIC_IRON.id, 0, "Z", VanillaItemID.string, 0]);

Recipes.addShaped({ id: BlockList.GLOWSTONE_TORCH.id, count: 4, data: 0 },
    ["Y", "X"], ["X", VanillaItemID.stick, 0, "Y", VanillaItemID.glowstone_dust, 0]);

Recipes.addShaped({ id: BlockList.SPACE_GLASS_VANILLA.id, count: 5, data: 0 },
    ["YXY", "XXX", "YXY"], ["X", VanillaBlockID.glass, 0, "Y", ItemList.INGOT_TIN.id, 0]);

Recipes.addShaped({ id: BlockList.SPACE_GLASS_CLEAR.id, count: 5, data: 0 },
    ["YXY", "XXX", "YXY"], ["X", VanillaBlockID.glass, 0, "Y", ItemList.INGOT_ALUMINUM.id, 0]);

Recipes.addShaped({ id: BlockList.SPACE_GLASS_STRONG.id, count: 5, data: 0 },
    ["YXY", "XXX", "YXY"], ["X", VanillaBlockID.glass, 0, "Y", ItemList.COMPRESSED_ALUMINUM.id, 0]);

const PANEL_LIGHTING_MASKS = {
    square: ["XXX", "XYX", "XZX"],
    spots: ["X X", " Y ", "XZX"],
    linear: ["X X", "XYX", "XZX"],
    sf: ["   ", "XYX", " Z "],
    sfdiag: [" X ", "XY ", " Z "]
};

const PANEL_LIGHTING_ORDER = ["square", "spots", "linear", "sf", "sfdiag"];

for(let data = 0; data < PANEL_LIGHTING_ORDER.length; data++) {
    Recipes.addShaped({ id: BlockList.PANEL_LIGHTING.id, count: 1, data: data },
        PANEL_LIGHTING_MASKS[PANEL_LIGHTING_ORDER[data]],
        ["X", VanillaBlockID.glass_pane, 0, "Y", BlockList.GLOWSTONE_TORCH.id, 0, "Z", ItemList.COMPRESSED_STEEL.id, 0]);
}

Recipes.addShaped({ id: BlockList.SLAB_GC_HALF.id, count: 6, data: 0 },
    ["XXX"], ["X", BlockList.CARVED_TIN_DECORATION_BLOCK.id, 0]);

Recipes.addShaped({ id: BlockList.SLAB_GC_HALF.id, count: 6, data: 1 },
    ["XXX"], ["X", BlockList.TIN_DECORATION_BLOCK.id, 0]);

Recipes.addShaped({ id: BlockList.SLAB_GC_HALF.id, count: 6, data: 2 },
    ["XXX"], ["X", BlockList.MOON_STONE.id, 0]);

Recipes.addShaped({ id: BlockList.SLAB_GC_HALF.id, count: 6, data: 3 },
    ["XXX"], ["X", BlockList.MOON_DUNGEON_BRICK.id, 0]);

Recipes.addShapeless({ id: BlockList.GRATING.id, count: 4, data: 0 },
    [
        { id: VanillaBlockID.iron_bars, data: 0 },
        { id: VanillaBlockID.iron_bars, data: 0 },
        { id: VanillaBlockID.iron_bars, data: 0 },
        { id: VanillaBlockID.iron_bars, data: 0 }
    ]);

Recipes.addShapeless({ id: BlockList.MAGNETIC_TABLE.id, count: 1, data: 0 },
    [
        { id: VanillaBlockID.crafting_table, data: 0 },
        { id: ItemList.COMPRESSED_IRON.id, data: 0 }
    ]);

Recipes.addShaped({ id: BlockList.COAL_GENERATOR.id, count: 1, data: 0 },
    ["WWW", "XZX", "XYX"],
    ["W", ItemList.INGOT_COPPER.id, 0, "X", VanillaItemID.iron_ingot, 0, "Y", BlockList.ALUMINUM_WIRE.id, 0, "Z", VanillaBlockID.furnace, 0]);

Recipes.addShaped({ id: BlockList.COMPRESSOR.id, count: 1, data: 0 },
    ["WXW", "WYW", "WZW"],
    ["W", ItemList.INGOT_ALUMINUM.id, 0, "X", VanillaBlockID.anvil, 0, "Y", ItemList.INGOT_COPPER.id, 0, "Z", ItemList.WAFER_BASIC.id, 0]);

Recipes.addShaped({ id: BlockList.ELECTRIC_COMPRESSOR.id, count: 1, data: 0 },
    ["WXW", "WYW", "VZV"],
    ["V", BlockList.ALUMINUM_WIRE.id, 0, "W", ItemList.COMPRESSED_STEEL.id, 0, "X", VanillaBlockID.anvil, 0, "Y", ItemList.COMPRESSED_BRONZE.id, 0, "Z", ItemList.WAFER_ADVANCED.id, 0]);

Recipes.addShaped({ id: BlockList.CIRCUIT_FABRICATOR.id, count: 1, data: 0 },
    ["WXW", "UYU", "VZV"],
    ["U", VanillaBlockID.stone_button, 0, "V", BlockList.ALUMINUM_WIRE.id, 0, "W", ItemList.INGOT_ALUMINUM.id, 0, "X", VanillaBlockID.lever, 0, "Y", VanillaBlockID.furnace, 0, "Z", VanillaBlockID.redstone_torch, 0]);

Recipes.addShaped({ id: BlockList.DECONSTRUCTOR.id, count: 1, data: 0 },
    ["WCW", "VAV", "WBW"],
    ["A", VanillaBlockID.anvil, 0, "B", VanillaBlockID.furnace, 0, "C", VanillaItemID.shears, 0, "V", BlockList.ALUMINUM_WIRE.id, 0, "W", ItemList.COMPRESSED_STEEL.id, 0]);

Recipes.addShaped({ id: BlockList.ADVANCED_COMPRESSOR.id, count: 1, data: 0 },
    ["WXW", "WYW", "VZV"],
    ["V", BlockList.ALUMINUM_WIRE.id, 0, "W", ItemList.COMPRESSED_STEEL.id, 0, "X", VanillaBlockID.anvil, 0, "Y", ItemList.COMPRESSED_METEORIC_ITEM.id, 0, "Z", ItemList.WAFER_ADVANCED.id, 0]);

Recipes.addShaped({ id: BlockList.ENERGY_STORAGE.id, count: 1, data: 0 },
    ["SSS", "BBB", "SSS"],
    ["B", ItemList.BATTERY.id, 0, "S", ItemList.COMPRESSED_STEEL.id, 0]);

Recipes.addShaped({ id: BlockList.ELECTRIC_FURNACE.id, count: 1, data: 0 },
    ["XXX", "XZX", "WYW"],
    ["W", ItemList.COMPRESSED_ALUMINUM.id, 0, "X", ItemList.COMPRESSED_STEEL.id, 0, "Y", ItemList.WAFER_BASIC.id, 0, "Z", VanillaBlockID.furnace, 0]);

Recipes.addShaped({ id: BlockList.CLUSTER_STORAGE.id, count: 1, data: 0 },
    ["BSB", "SWS", "BSB"],
    ["B", BlockList.ENERGY_STORAGE.id, 0, "S", ItemList.COMPRESSED_STEEL.id, 0, "W", ItemList.WAFER_ADVANCED.id, 0]);

Recipes.addShaped({ id: BlockList.ARC_FURNACE.id, count: 1, data: 0 },
    ["XXX", "XZX", "WYW"],
    ["W", ItemList.INGOT_METEORIC_IRON.id, 0, "X", ItemList.HEAVY_PLATING.id, 0, "Y", ItemList.WAFER_ADVANCED.id, 0, "Z", BlockList.ELECTRIC_FURNACE.id, 0]);

Recipes.addShaped({ id: BlockList.BASIC_SOLAR.id, count: 1, data: 0 },
    ["XYX", "XZX", "VWV"],
    ["V", BlockList.ALUMINUM_WIRE.id, 0, "W", ItemList.WAFER_BASIC.id, 0, "X", ItemList.COMPRESSED_STEEL.id, 0, "Y", ItemList.SOLAR_MODULE_1.id, 0, "Z", ItemList.STEEL_POLE.id, 0]);

Recipes.addShaped({ id: BlockList.ADVANCED_SOLAR.id, count: 1, data: 0 },
    ["XYX", "XZX", "VWV"],
    ["V", BlockList.ALUMINUM_WIRE.id, 0, "W", ItemList.WAFER_ADVANCED.id, 0, "X", ItemList.COMPRESSED_STEEL.id, 0, "Y", ItemList.SOLAR_MODULE_1.id, 0, "Z", ItemList.STEEL_POLE.id, 0]);

Recipes.addShaped({ id: BlockList.FUEL_LOADER.id, count: 1, data: 0 },
    ["XXX", "XZX", "WYW"],
    ["W", ItemList.COMPRESSED_TIN.id, 0, "X", ItemList.COMPRESSED_COPPER.id, 0, "Y", ItemList.WAFER_BASIC.id, 0, "Z", ItemList.CANISTER_TIN.id, 0]);

Recipes.addShaped({ id: BlockList.REFINERY.id, count: 1, data: 0 },
    [" Z ", "WZW", "XYX"],
    ["W", VanillaBlockID.stone, 0, "X", ItemList.COMPRESSED_STEEL.id, 0, "Y", VanillaBlockID.furnace, 0, "Z", ItemList.CANISTER_COPPER.id, 0]);

Recipes.addShaped({ id: BlockList.WORKBENCH_NASA.id, count: 1, data: 0 },
    ["XZX", "UWU", "YVY"],
    ["U", VanillaBlockID.lever, 0, "V", VanillaBlockID.redstone_torch, 0, "W", ItemList.WAFER_ADVANCED.id, 0, "X", ItemList.COMPRESSED_STEEL.id, 0, "Y", ItemList.COMPRESSED_STEEL.id, 0, "Z", VanillaBlockID.crafting_table, 0]);

Recipes.addShaped({ id: ItemList.OXYGEN_CONCENTRATOR.id, count: 1, data: 0 }, [
    "ABA", "BCB", "ADA"
], ["A", ItemList.COMPRESSED_STEEL.id, "B", ItemList.COMPRESSED_TIN.id, 0, "C", ItemList.CANISTER_TIN.id, 0, "D", ItemList.AIR_VENT.id, 0])

Recipes.addShaped({ id: BlockList.OXYGEN_DECOMPRESSOR.id, count: 1, data: 0 },
    ["ABA", "CDC", "AEA"],
    ["A", ItemList.COMPRESSED_STEEL.id, 0, "B", ItemList.AIR_FAN.id, 0, "C", ItemList.COMPRESSED_ALUMINUM.id, 0, "D", ItemList.OXYGEN_CONCENTRATOR.id, 0, "E", VanillaBlockID.redstone_torch, 0]
);

Recipes.addShaped({ id: BlockList.OXYGEN_COMPRESSOR.id, count: 1, data: 0 },
    ["ABA", "BCB", "ADA"],
    ["A", ItemList.COMPRESSED_STEEL.id, 0, "B", ItemList.COMPRESSED_ALUMINUM.id, 0, "C", ItemList.OXYGEN_CONCENTRATOR.id, 0, "D", ItemList.COMPRESSED_BRONZE.id, 0]
);

Recipes.addShaped({ id: ItemList.BATTERY.id, count: 2, data: 100 },
    [" T ", "TRT", "TCT"],
    ["T", ItemList.COMPRESSED_TIN.id, 0, "R", VanillaItemID.redstone, 0, "C", VanillaItemID.coal, 0]);

Recipes.addShaped({ id: ItemList.CANISTER_TIN.id, count: 2, data: 0 },
    ["X X", "X X", "XXX"], ["X", ItemList.INGOT_TIN.id, 0]);

Recipes.addShaped({ id: ItemList.CANISTER_COPPER.id, count: 2, data: 0 },
    ["X X", "X X", "XXX"], ["X", ItemList.INGOT_COPPER.id, 0]);

Recipes.addShaped({ id: ItemList.BUGGYMAT_WHEEL.id, count: 1, data: 0 },
    [" W ", "WXW", " W "],
    ["W", VanillaItemID.leather, 0, "X", ItemList.COMPRESSED_STEEL.id, 0]);

Recipes.addShaped({ id: ItemList.BUGGYBMAT_SIT.id, count: 1, data: 0 },
    ["  Y", " ZY", "XXX"],
    ["X", ItemList.COMPRESSED_STEEL.id, 0, "Y", ItemList.COMPRESSED_STEEL.id, 0, "Z", ItemList.COMPRESSED_IRON.id, 0]);

Recipes.addShaped({ id: ItemList.BUGGYMAT_STORAGE.id, count: 1, data: 0 },
    ["XXX", "YZY", "XXX"],
    ["X", ItemList.COMPRESSED_STEEL.id, 0, "Y", ItemList.COMPRESSED_IRON.id, 0, "Z", VanillaBlockID.chest, 0]);

Recipes.addShaped({ id: ItemList.CANVAS.id, count: 1, data: 0 },
    [" XY", "XXX", "YX "],
    ["X", VanillaItemID.string, 0, "Y", VanillaItemID.stick, 0]);

Recipes.addShaped({ id: ItemList.ENGINE_TIER_1.id, count: 1, data: 0 },
    [" YV", "XWX", "XZX"],
    ["V", VanillaBlockID.stone_button, 0, "W", ItemList.CANISTER_TIN.id, 0, "X", ItemList.HEAVY_PLATING.id, 0, "Y", VanillaItemID.flint_and_steel, 0, "Z", ItemList.AIR_VENT.id, 0]);

Recipes.addShaped({ id: ItemList.ROCKET_FINS.id, count: 1, data: 0 },
    [" Y ", "XYX", "X X"],
    ["X", ItemList.HEAVY_PLATING.id, 0, "Y", ItemList.COMPRESSED_STEEL.id, 0]);

Recipes.addShaped({ id: ItemList.NOSE_CONE.id, count: 1, data: 0 },
    [" Y ", " X ", "X X"],
    ["X", ItemList.HEAVY_PLATING.id, 0, "Y", VanillaBlockID.redstone_torch, 0]);

Recipes.addShaped({ id: ItemList.MACHINE_WRENCH.id, count: 1, data: 0 },
    ["  Y", " X ", "X  "],
    ["X", ItemList.COMPRESSED_BRONZE.id, 0, "Y", ItemList.COMPRESSED_STEEL.id, 0]);

Recipes.addShaped({ id: ItemList.AIR_FAN.id, count: 1, data: 0 },
    ["Z Z", " Y ", "ZXZ"],
    ["Z", ItemList.COMPRESSED_STEEL.id, 0, "Y", ItemList.WAFER_BASIC.id, 0, "X", VanillaItemID.redstone, 0]);

Recipes.addShapeless({ id: ItemList.AIR_VENT.id, count: 1, data: 0 },
    [
        { id: ItemList.COMPRESSED_TIN.id, data: 0 },
        { id: ItemList.COMPRESSED_TIN.id, data: 0 },
        { id: ItemList.COMPRESSED_TIN.id, data: 0 },
        { id: ItemList.COMPRESSED_STEEL.id, data: 0 }
    ]);

Recipes.addShaped({ id: BlockList.CARVED_TIN_DECORATION_BLOCK.id, count: 4, data: 0 },
    ["XX ", "XXY"],
    ["X", VanillaBlockID.stone, 0, "Y", ItemList.COMPRESSED_TIN.id, 0]);

Recipes.addShaped({ id: BlockList.TIN_DECORATION_BLOCK.id, count: 4, data: 0 },
    ["XX ", "XX ", " Y "],
    ["X", VanillaBlockID.stone, 0, "Y", ItemList.COMPRESSED_TIN.id, 0]);

Recipes.addShaped({ id: BlockList.BLOCK_COPPER.id, count: 1, data: 0 },
    ["XXX", "XXX", "XXX"], ["X", ItemList.INGOT_COPPER.id, 0]);

Recipes.addShaped({ id: BlockList.BLOCK_TIN.id, count: 1, data: 0 },
    ["XXX", "XXX", "XXX"], ["X", ItemList.INGOT_TIN.id, 0]);

Recipes.addShaped({ id: BlockList.BLOCK_ALUMINUM.id, count: 1, data: 0 },
    ["XXX", "XXX", "XXX"], ["X", ItemList.INGOT_ALUMINUM.id, 0]);

Recipes.addShaped({ id: BlockList.BLOCK_METEORIC_IRON.id, count: 1, data: 0 },
    ["XXX", "XXX", "XXX"], ["X", ItemList.INGOT_METEORIC_IRON.id, 0]);

Recipes.addShaped({ id: BlockList.BLOCK_SILICON.id, count: 1, data: 0 },
    ["XXX", "XXX", "XXX"], ["X", ItemList.RAW_SILICON.id, 0]);

Recipes.addShapeless({ id: ItemList.INGOT_COPPER.id, count: 9, data: 0 }, [{ id: BlockList.BLOCK_COPPER.id, data: 0 }]);
Recipes.addShapeless({ id: ItemList.INGOT_TIN.id, count: 9, data: 0 }, [{ id: BlockList.BLOCK_TIN.id, data: 0 }]);
Recipes.addShapeless({ id: ItemList.INGOT_ALUMINUM.id, count: 9, data: 0 }, [{ id: BlockList.BLOCK_ALUMINUM.id, data: 0 }]);
Recipes.addShapeless({ id: ItemList.INGOT_METEORIC_IRON.id, count: 9, data: 0 }, [{ id: BlockList.BLOCK_METEORIC_IRON.id, data: 0 }]);
Recipes.addShapeless({ id: ItemList.RAW_SILICON.id, count: 9, data: 0 }, [{ id: BlockList.BLOCK_SILICON.id, data: 0 }]);

Recipes.addShaped({ id: ItemList.SOLAR_MODULE_0.id, count: 2, data: 0 },
    ["XXX", "YYY", "ZZZ"],
    ["X", VanillaBlockID.glass, 0, "Y", ItemList.WAFER_SOLAR.id, 0, "Z", BlockList.ALUMINUM_WIRE.id, 0]);

Recipes.addShaped({ id: ItemList.SOLAR_MODULE_1.id, count: 1, data: 0 },
    ["XXX", "YYY", "XXX"],
    ["X", ItemList.SOLAR_MODULE_0.id, 0, "Y", BlockList.ALUMINUM_WIRE.id, 0]);

Recipes.addShaped({ id: ItemList.FREQUENCY_MODULE.id, count: 1, data: 0 },
    [" X ", "YUY", "ZWZ"],
    ["U", VanillaBlockID.unpowered_repeater, 0, "W", ItemList.WAFER_BASIC.id, 0, "X", ItemList.COMPRESSED_ALUMINUM.id, 0, "Y", ItemList.COMPRESSED_IRON.id, 0, "Z", VanillaItemID.redstone, 0]);

Recipes.addShaped({ id: BlockList.MOON_CHEESE.id, count: 1, data: 0 },
    ["YYY", "YXY", "YYY"],
    ["X", VanillaItemID.milk_bucket, 0, "Y", ItemList.CHEESE_CURD.id, 0]);

Recipes.addShaped({ id: VanillaBlockID.furnace, count: 1, data: 0 },
    ["XXX", "X X", "XXX"], ["X", BlockList.MOON_STONE.id, 0]);

Recipes.addShaped({ id: BlockList.ALUMINUM_WIRE.id, count: 6, data: 0 },
    ["WWW", "CCC", "WWW"], ["C", ItemList.INGOT_ALUMINUM.id, 0, "W", VanillaBlockID.wool, -1]);

Recipes.addShaped({ id: BlockList.IMPROVED_WIRE.id, count: 1, data: 0 },
    ["X", "Y", "Z"], ["X", VanillaBlockID.wool, -1, "Y", BlockList.ALUMINUM_WIRE.id, 0, "Z", ItemList.INGOT_ALUMINUM.id, 0]);

Recipes.addShaped({ id: BlockList.ROCKET_PADDING.id, count: 9, data: 0 },
    ["YYY", "XXX"], ["X", VanillaBlockID.iron_block, 0, "Y", ItemList.COMPRESSED_IRON.id, 0]);

Recipes.addShapeless({ id: ItemList.DEHYDRATED_APPLE.id, count: 1, data: 0 },
    [{ id: ItemList.CANISTER_TIN.id, data: 0 }, { id: VanillaItemID.apple, data: 0 }, { id: VanillaItemID.apple, data: 0 }]);

Recipes.addShapeless({ id: ItemList.DEHYDRATED_CARROT.id, count: 1, data: 0 },
    [{ id: ItemList.CANISTER_TIN.id, data: 0 }, { id: VanillaItemID.carrot, data: 0 }, { id: VanillaItemID.carrot, data: 0 }]);

Recipes.addShapeless({ id: ItemList.DEHYDRATED_MELON.id, count: 1, data: 0 },
    [{ id: ItemList.CANISTER_TIN.id, data: 0 }, { id: VanillaItemID.melon, data: 0 }, { id: VanillaItemID.melon, data: 0 }]);

Recipes.addShapeless({ id: ItemList.DEHYDRATED_POTATO.id, count: 1, data: 0 },
    [{ id: ItemList.CANISTER_TIN.id, data: 0 }, { id: VanillaItemID.potato, data: 0 }, { id: VanillaItemID.potato, data: 0 }]);

Recipes.addShapeless({ id: ItemList.CHEESE_SLICE.id, count: 6, data: 0 },
    [{ id: ItemList.CHEESE_CURD.id, data: 0 }]);

Recipes.addShapeless({ id: ItemList.BURGER_BUN.id, count: 2, data: 0 },
    [{ id: 296, data: 0 }, { id: 296, data: 0 }, { id: VanillaItemID.egg, data: 0 }, { id: VanillaItemID.milk_bucket, data: 0 }]);

Recipes.addShapeless({ id: ItemList.BEEF_PATTY_RAW.id, count: 2, data: 0 },
    [{ id: VanillaItemID.beef, data: 0 }]);

Recipes.addShapeless({ id: ItemList.CHEESEBURGER.id, count: 1, data: 0 },
    [{ id: ItemList.CHEESE_SLICE.id, data: 0 }, { id: ItemList.BEEF_PATTY_COOKED.id, data: 0 }, { id: ItemList.BURGER_BUN.id, data: 0 }]);

Recipes.addShapeless({ id: ItemList.CANNED_BEEF.id, count: 1, data: 0 },
    [{ id: ItemList.CANISTER_TIN.id, data: 0 }, { id: ItemList.BEEF_PATTY_RAW.id, data: 0 }, { id: ItemList.BEEF_PATTY_RAW.id, data: 0 }]);

// IMP-705: Java arclamp recipe (desh_ingot x4 + glowstone dust x4 + battery); desh becomes obtainable after Mars (b129)
Recipes.addShaped({ id: BlockList.ARCLAMP.id, count: 1, data: 0 },
    ["XYX", "YZY", "XYX"],
    ["X", ItemList.INGOT_DESH.id, 0, "Y", VanillaItemID.glowstone_dust, 0, "Z", ItemList.BATTERY.id, 0]);
