namespace BlockList {
    export const VENUS_SPOUT = new VenusSpout();
    export const COAL_GENERATOR = new CoalGenerator();
    export const SOLAR_PANEL_TOP = new SolarPanelTop();
    export const BASIC_SOLAR_PANEL = new BasicSolarPanel();
    export const COMPRESSOR = new Compressor();
    export const ELECTRIC_COMPRESSOR = new ElectricCompressor();
    export const CIRCUIT_FABRICATOR = new CircuitFabricator();
    export const REFINERY = new Refinery();
    export const FUEL_LOADER = new FuelLoader();
    export const GEOTHERMAL_GENERATOR = new GeothermalGenerator();
    export const ROCKET_WORKBENCH_TOP = new RocketWorkbenchTop();
    export const CRASHED_PROBE = new CrashedProbe();
    export const OXYGEN_COLLECTOR = new OxygenCollector();

    export const GLOWSTONE_TORCH = new GlowstoneTorch();
    export const UNLIT_TORCH = new UnlitTorch();

    export const LAPIZ_MOON = new BasicBlock("lapiz_moon", [{ name: "Sapphire Block", texture: [["moonlapiz_block", 0]], inCreative: true }]);
    export const MOONORE_CHEESE = new BasicBlock("moonore_cheese", [{ name: "Lunar Cheese Ore", texture: [["Moonore Cheese", 0]], inCreative: true }]);
    export const MOONORE_SAPPHIRE = new BasicBlock("moonore_sapphire", [{ name: "Lunar Sapphire", texture: [["Moonore Sapphire", 0]], inCreative: true }]);
    export const VENUS_QUARTZ = new BasicBlock("venus_quartz", [{ name: "venus_quartz", texture: [["venus_quartz", 0]], inCreative: true }]);
    export const DECORATION_DESH = new BasicBlock("decoration_desh", [{ name: "Desh Block", texture: [["Decoration Desh", 0]], inCreative: true }]);
    export const BLOCK_TIN = new BasicBlock("block_tin_gc", [{ name: "Block Tin", texture: [["Block Tin", 0]], inCreative: true }]);
    export const BLOCK_LEAD = new BasicBlock("block_lead_gc", [{ name: "Block Lead", texture: [["Block Lead", 0]], inCreative: true }]);
    export const BLOCK_COPPER = new BasicBlock("block_copper_gc", [{ name: "Block Copper", texture: [["Block Copper", 0]], inCreative: true }]);
    export const BLOCK_ALUMINUM = new BasicBlock("block_aluminum_gc", [{ name: "Block Aluminum", texture: [["Block Aluminum", 0]], inCreative: true }]);
    export const BLOCK_CARVED_IRON_STEEL = new BasicBlock("block_carved_iron_steel_gc", [{ name: "Block Iron Steel", texture: [["Block Iron Steel", 0]], inCreative: true }]);
    export const BLOCK_BRONZE = new BasicBlock("block_bronze_gc", [{ name: "Block Of Bronze", texture: [["bronze_block", 0]], inCreative: true }]);
    export const BLOCK_STEEL = new BasicBlock("block_steel_gc", [{ name: "Block Of Steel", texture: [["block_steel_sc", 0]], inCreative: true }]);
    export const BLOCK_TITANIUM = new BasicBlock("block_titanium_gc", [{ name: "Block Titanium", texture: [["Block Titanium", 0]], inCreative: true }]);
    export const BLOCK_IRON_STEEL = new BasicBlock("block_iron_steel_gc", [
        {
            name: "Iron Steel Block",
            texture: [
                ["Iron Steel Block Side", 0],
                ["Iron Steel Block 3", 0],
                ["Iron Steel Block 2", 0],
                ["Iron Steel Block 2", 0],
                ["Iron Steel Block 2", 0],
                ["Iron Steel Block 2", 0],
            ],
            inCreative: true,
        },
    ]);
    export const DESH = new BasicBlock("desh", [{ name: "Desh Ore", texture: [["desh", 0]], inCreative: true }]);

    export const TIN_DECORATION_BLOCK = new BasicBlock("tin_decoration_block", [{ name: "Deco Block", texture: [["Deco Block", 0]], inCreative: true }]);
    export const CARVED_TIN_DECORATION_BLOCK = new BasicBlock("carved_tin_decoration_block", [
        {
            name: "Deco Tin Block",
            texture: [
                ["Deco Block Up", 0],
                ["Deco Block Up", 0],
                ["Deco Block Side", 0],
                ["Deco Block Side", 0],
                ["Deco Block Side", 0],
                ["Deco Block Side", 0],
            ],
            inCreative: true,
        },
    ]);
    export const OXYGEN_TILE = new BasicBlock("oxygen_tile", [{ name: "Oxygen Tile", texture: [["Oxygentile 3", 0]], inCreative: true }]);

    export const ENCLOSED_ALUMINUM_WIRE = new BasicBlock("enclosed_aluminum_wire", [
        {
            name: "Enclosed Aluminum Wire",
            texture: [["Enclosed Aluminum Wire", 0]],
            inCreative: true,
        },
    ]);

    EnergyTypes.GJ.registerWire(ENCLOSED_ALUMINUM_WIRE.id, 200);
    GC_WIRE_GROUP.add(ENCLOSED_ALUMINUM_WIRE.id, -1);

    export const ENCLOSED_FLUID_PIPE = new BasicBlock("enclosed_fluid_pipe", [
        {
            name: "Enclosed Oxygen Pipe",
            texture: [["Enclosed Fluid Pipe", 0]],
            inCreative: true,
        },
    ]);

    EnergyTypes.GJ.registerWire(ENCLOSED_FLUID_PIPE.id, 200);
    GC_WIRE_GROUP.add(ENCLOSED_FLUID_PIPE.id, -1);

    export const ENCLOSED_HEAVY_ALUMINUM_WIRE = new BasicBlock("enclosed_heavy_aluminum_wire", [{
        name: "Enclosed Heavy Aluminum Wire",
        texture: [["Enclosed Heavy Aluminum Wire", 0]],
        inCreative: true
    }]);

    EnergyTypes.GJ.registerWire(ENCLOSED_HEAVY_ALUMINUM_WIRE.id, 200);
    GC_WIRE_GROUP.add(ENCLOSED_HEAVY_ALUMINUM_WIRE.id, -1);
};

CrashedProbe.addItem(0.25, ItemList.CANISTER_COPPER.id, 8);
