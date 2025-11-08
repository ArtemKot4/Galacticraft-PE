namespace ItemList {
    class GalacticraftItem extends BasicItem {
        public override getName(): string {
            return "item.galacticraft." + this.stringID;
        }
    }

    export const ROCKET_TIER_1 = new GalacticraftItem("rocket_tier_1", { name: "rocket_tier_1", meta: 0 }, { stack: 1 });

    export const RAW_SILICON = new GalacticraftItem("raw_silicon", { name: "raw_silicon", meta: 0 });
    export const WAFER_BASIC = new GalacticraftItem("wafer_basic", { name: "wafer_basic", meta: 0 });
    export const WAFER_SOLAR = new GalacticraftItem("wafer_solar", { name: "wafer_solar", meta: 16 });
    export const WAFER_ADVANCED = new GalacticraftItem("wafer_advanced", { name: "wafer_advanced", meta: 0 });
    export const INGOT_ALUMINUM = new GalacticraftItem("ingot_aluminum_gc", { name: "ingot_aluminum_gc", meta: 0 });
    export const ALIEN_FLESH = new BasicItem<Item.FoodParams>("alien_flesh",{ name: "alien_flesh", meta: 0 }, { food: 6 });

    export const BUGGYBMAT_SIT = new GalacticraftItem("buggymat_sit", { name: "buggymat_sit", meta: 0 });

    export const ROCKET_FINS = new GalacticraftItem("rocket_fins", { name: "rocket_fins", meta: 4 });

    export const NOSE_CONE = new GalacticraftItem("nose_cone", { name: "nose_cone", meta: 4 });

    export const ROCKET_FINS_2 = new GalacticraftItem("rocket_fins_2", { name: "rocket_fins_2", meta: 2 });

    export const BUGGYMAT_STORAGE = new GalacticraftItem("buggymat_storage", { name: "buggymat_storage", meta: 1 });

    export const ENGINE_TIER_1_BOOSTER = new GalacticraftItem("engine_tier_1_booster", { name: "engine_tier_1_booster", meta: 0 });

    export const ENGINE_TIER_1 = new GalacticraftItem("engine_tier_1", { name: "engine_tier_1", meta: 1 });

    export const HEAVY_PLATING = new GalacticraftItem("heavy_plating", { name: "heavy_plating", meta: 0 });

    export const BUGGYMAT_WHEEL = new GalacticraftItem("buggymat_wheel", { name: "buggymat_wheel", meta: 0 });

    export const AIR_FAN = new GalacticraftItem("air_fan", { name: "air_fan", meta: 16 });

    export const AIR_VENT = new GalacticraftItem("air_vent", { name: "air_vent", meta: 16 });

    export const THERMAL_CONTROLLER = new GalacticraftItem("thermal_controller", { name: "thermal_controller", meta: 1 });

    export const CANVAS = new GalacticraftItem("canvas", { name: "canvas", meta: 0 });

    export const SOLAR_MODULE_1 = new GalacticraftItem("solar_module_1", { name: "solar_module_1", meta: 1 });

    export const SOLAR_MODULE_0 = new GalacticraftItem("solar_module_0", { name: "solar_module_0", meta: 0 });

    export const FLAG_CANE = new GalacticraftItem("flag_cane", { name: "flag_cane", meta: 0 });

    export const CANISTER_COPPER = new GalacticraftItem("canister_copper", { name: "canister_copper", meta: 16 });

    export const CANISTER_TIN = new GalacticraftItem("canister_tin", { name: "canister_tin", meta: 16 });

    export const IRON_STEEL_CANISTER = new GalacticraftItem("iron_steel_canister", { name: "iron_steel_canister", meta: 16 });

    export const REINFORCED_PLATE_T2 = new GalacticraftItem("reinforced_plate_t2", { name: "reinforced_plate_t2", meta: 0 });

    export const REINFORCED_PLATE_T3 = new GalacticraftItem("reinforced_plate_t3", { name: "reinforced_plate_t3", meta: 0 });

    export const CARBON_FRAGMENTS = new GalacticraftItem("carbon_fragments", { name: "carbon_fragments", meta: 0 });

    export const EMERALD_SHARD = new GalacticraftItem("emerald_shard", { name: "emerald_shard", meta: 0 });

    export const DESH_PLATE = new GalacticraftItem("desh_plate", { name: "desh_plate", meta: 0 });

    export const DESH_STICK = new GalacticraftItem("desh_stick", { name: "desh_stick", meta: 0 });

    export const DUST_TITANIUM = new GalacticraftItem("dust_titanium", { name: "dust_titanium", meta: 0 });

    export const LUNAR_SAPPHIRE = new GalacticraftItem("lunar_sapphire", { name: "lunar_sapphire", meta: 0 });

    export const METEORIC_IRON_RAW = new GalacticraftItem("meteoric_iron_raw", { name: "meteoric_iron_raw", meta: 0 });

    export const RAW_DESH = new GalacticraftItem("raw_desh", { name: "raw_desh", meta: 0 });

    export const IRON_STEEL_DUST = new GalacticraftItem("iron_steel_dust", { name: "iron_steel_dust", meta: 0 });

    export const COMPRESSED_ALUMINUM = new GalacticraftItem("compressed_aluminum", { name: "compressed_aluminum", meta: 0 });

    export const COMPRESSED_LEAD = new GalacticraftItem("compressed_lead", { name: "compressed_lead", meta: 0 });

    export const INGOT_BRONZE = new GalacticraftItem("ingot_bronze", { name: "ingot_bronze", meta: 0 });

    export const COMPRESSED_BRONZE = new GalacticraftItem("compressed_bronze", { name: "compressed_bronze", meta: 0 });

    export const COMPRESSED_COPPER = new GalacticraftItem("compressed_copper", { name: "compressed_copper", meta: 0 });

    export const COMPRESSED_IRON = new GalacticraftItem("compressed_iron", { name: "compressed_iron", meta: 0 });
    
    export const COMPRESSED_IRON_STEEL = new GalacticraftItem("compressed_iron_steel", { name: "compressed_iron_steel", meta: 0 });

    export const COMPRESSED_METHEORIC_ITEM = new GalacticraftItem("compressed_metheoric_item", { name: "compressed_metheoric_item", meta: 0 });

    export const COMPRESSED_STEEL = new GalacticraftItem("compressed_steel", { name: "compressed_steel", meta: 0 });

    export const COMPRESSED_TIN = new GalacticraftItem("compressed_tin", { name: "compressed_tin", meta: 0 });

    export const COMPRESSED_TITANIUM = new GalacticraftItem("compressed_titanium", { name: "compressed_titanium", meta: 0 });

    export const INGOT_COPPER = new GalacticraftItem("ingot_copper_gc", { name: "ingot_copper_gc", meta: 0 });

    export const INGOT_DESH = new GalacticraftItem("ingot_desh_gc", { name: "ingot_desh", meta: 0 });

    export const INGOT_LEAD = new GalacticraftItem("ingot_lead_gc", { name: "ingot_lead_gc", meta: 0 });

    export const INGOT_TIN = new GalacticraftItem("ingot_tin_gc", { name: "ingot_tin_gc", meta: 0 });

    export const INGOT_TITANIUM = new GalacticraftItem("ingot_titanium_gc", { name: "ingot_titanium", meta: 0 });

    export const SHARD_TIN = new GalacticraftItem("shard_tin", { name: "shard_tin", meta: 0 });

    export const SHARD_COPPER = new GalacticraftItem("shard_copper", { name: "shard_copper", meta: 0 });

    export const SHARD_ALUMINUM = new GalacticraftItem("shard_aluminum", { name: "shard_aluminum", meta: 0 });

    export const SHARD_IRON_STEEL = new GalacticraftItem("shard_iron_steel", { name: "shard_iron_steel", meta: 0 });

    export const SHARD_METEORIC_IRON = new GalacticraftItem("shard_meteoric_iron", { name: "shard_meteoric_iron", meta: 0 });

    export const SHARD_TITANIUM = new GalacticraftItem("shard_titanium", { name: "shard_titanium", meta: 0 });

    export const INGOT_IRON_STEEL = new GalacticraftItem("ingot_iron_steel", { name: "ingot_iron_steel", meta: 0 });

    export const INGOT_STEEL = new GalacticraftItem("ingot_steel", { name: "ingot_steel", meta: 0 });

    export const INGOT_METEORIC_IRON = new GalacticraftItem("ingot_meteoric_iron", { name: "ingot_meteoric_iron", meta: 0 });

    export const SHARD_STEEL = new GalacticraftItem("shard_steel", { name: "shard_steel", meta: 0 });

    export const SHARD_IRON = new GalacticraftItem("shard_iron", { name: "shard_iron", meta: 0 });

    export const SHARD_TITANIUM_2 = new GalacticraftItem("shard_titanium", { name: "shard_titanium", meta: 0 });

    export const SOLAR_DUST = new GalacticraftItem("solar_dust", { name: "solar_dust", meta: 0 });

    export const BEEF_PATTY_COOKED = new GalacticraftItem("beef_patty_cooked", { name: "Beef Patty Cooked", meta: 0 });
    
    export const FRIED_ALIEN_FLESH = new GalacticraftItem("fried_alien_flesh", { name: "Fried Alien Flesh", meta: 0 });
    
    export const GRID_GROUND_BEEF = new GalacticraftItem("grid_ground_beef", { name: "Grid Ground Beef", meta: 0 });
    
    export const DEHYDRATED_POTATO = new GalacticraftItem("dehydrated_potato", { name: "Dehydrated Potato", meta: 0 });
    
    export const DEHYDRATED_MELON = new GalacticraftItem("dehydrated_melon", { name: "Dehydrated Mel", meta: 0 });
    
    export const DEHYDRATED_CARROT = new GalacticraftItem("dehydrated_carrot", { name: "Dehydrated Carrot", meta: 0 });
    
    export const DEHYDRATED_APPLE = new GalacticraftItem("dehydrated_apple", { name: "Dehydrated Apple", meta: 0 });
    
    export const CHEESEBURGER = new GalacticraftItem("cheeseburger", { name: "CheeseBurger", meta: 0 });
    
    export const CHEESE_SLICE = new GalacticraftItem("cheese_slice", { name: "Cheese Slice", meta: 0 });
    
    export const CHEESE_CURD = new GalacticraftItem("cheese_curd", { name: "Cheese Curd", meta: 0 });
    
    export const CANNED_BEEF = new GalacticraftItem("canned_beef", { name: "Canned Beef", meta: 0 });
    
    export const BURGER_BUN = new GalacticraftItem("burger_bun", { name: "Burger Bun", meta: 0 });
    
    export const BEEF_PATTY_RAW = new GalacticraftItem("beef_patty_raw", { name: "Beef Patty Raw", meta: 0 });

    export const RADIOISOTOPE_CORE = new GalacticraftItem("radioisotope_core", { name: "Radioisotope Core", meta: 0 });

    export const SCHEMATIC_BUGGY = new GalacticraftItem("schematic_buggy", { name: "schematic_buggy", meta: 0 });

    export const SCHEMATIC_ROCKET_2 = new GalacticraftItem("schematic_rocket_2", { name: "schematic_rocket_2", meta: 2 });
    
    export const SCHEMATIC_ROCKET_3 = new GalacticraftItem("schematic_rocket_3", { name: "schematic_rocket_3", meta: 3 });    

    export const OXYGEN_GEAR = new GalacticraftItem("oxygen_gear", {name: "oxygen_gear", meta: 0});
    
    export const OXYGEN_MASK = new GalacticraftItem("oxygen_mask", {name: "oxygen_mask", meta: 0});
    
    export const OXYGEN_CONCENTRATOR = new GalacticraftItem("oxygen_concentrator", {name: "oxygen_concentrator", meta: 0});
    
    export const FREQUENCY_MODULE = new GalacticraftItem("frequency_module", {name: "frequency_module", meta: 0});  
}