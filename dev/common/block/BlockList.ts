namespace BlockList {
    export const COAL_GENERATOR = new CoalGenerator();
    export const ROCKET_PADDING = new RocketPadding();

    export const BLOCK_MOON_SAPPHIRE = new BasicBlock("block_moon_sapphire_gc", [{ name: "Sapphire Block", texture: [["block_moon_sapphire", 0]], inCreative: true }]);
    export const MOON_CHEESE = new BasicBlock("moon_cheese_gc", [{ name: "block.galacticraft.moon_cheese", texture: [["moon_cheese", 0]], inCreative: true }]);
    export const MOON_SAPPHIRE = new BasicBlock("moon_sapphire_gc", [{ name: "block.galacticraft.moon_sapphire", texture: [["moon_sapphire", 0]], inCreative: true }]);
    export const VENUS_QUARTZ = new BasicBlock("venus_quartz_gc", [{ name: "block.galacticraft.venus_quartz", texture: [["venus_quartz", 0]], inCreative: true }]);
    export const DECORATION_DESH = new BasicBlock("decoration_desh_gc", [{ name: "block.galacticraft.decoration_desh", texture: [["Decoration Desh", 0]], inCreative: true }]);
    export const BLOCK_TIN = new BasicBlock("block_tin_gc", [{ name: "block.galacticraft.block_tin", texture: [["Block Tin", 0]], inCreative: true }]);
    export const BLOCK_LEAD = new BasicBlock("block_lead_gc", [{ name: "block.galacticraft.block_lead", texture: [["Block Lead", 0]], inCreative: true }]);
    export const BLOCK_COPPER = new BasicBlock("block_copper_gc", [{ name: "block.galacticraft.block_copper", texture: [["Block Copper", 0]], inCreative: true }]);
    export const BLOCK_ALUMINUM = new BasicBlock("block_aluminum_gc", [{ name: "block.galacticraft.block_aluminum", texture: [["Block Aluminum", 0]], inCreative: true }]);
    export const BLOCK_CARVED_IRON_STEEL = new BasicBlock("block_carved_iron_steel_gc", [{ name: "block.galacticraft.block_iron_steel", texture: [["Block Iron Steel", 0]], inCreative: true }]);
    export const BLOCK_BRONZE = new BasicBlock("block_bronze_gc", [{ name: "block.galacticraft.bronze_block", texture: [["bronze_block", 0]], inCreative: true }]);
    export const BLOCK_STEEL = new BasicBlock("block_steel_gc", [{ name: "block.galacticraft.block_steel", texture: [["block_steel_sc", 0]], inCreative: true }]);
    export const BLOCK_TITANIUM = new BasicBlock("block_titanium_gc", [{ name: "block.galacticraft.block_titanium", texture: [["Block Titanium", 0]], inCreative: true }]);
    export const ORE_COPPER_EARTH = new BasicBlock("ore_copper_earth_gc", [{ name: "block.galacticraft.ore_copper_earth", texture: [["ore_copper_earth", 0]], inCreative: true }]);
    export const ORE_TIN_EARTH = new BasicBlock("ore_tin_earth_gc", [{ name: "block.galacticraft.ore_tin_earth", texture: [["ore_tin_earth", 0]], inCreative: true }]);
    export const ORE_SILICON_EARTH = new BasicBlock("ore_silicon_earth_gc", [{ name: "block.galacticraft.ore_silicon_earth", texture: [["ore_silicon_earth", 0]], inCreative: true }]);
    export const ORE_COPPER_MOON = new BasicBlock("ore_copper_moon_gc", [{ name: "block.galacticraft.ore_copper_moon", texture: [["ore_copper_moon", 0]], inCreative: true }]);
    export const ORE_TIN_MOON = new BasicBlock("ore_tin_moon_gc", [{ name: "block.galacticraft.ore_tin_moon", texture: [["ore_tin_moon", 0]], inCreative: true }]);
    export const DESH = new BasicBlock("desh_gc", [{ name: "block.galacticraft.desh", texture: [["desh", 0]], inCreative: true }]);
    export const TIN_DECORATION_BLOCK = new BasicBlock("tin_decoration_block", [{ name: "block.galacticraft.deco_block", texture: [["Deco Block", 0]], inCreative: true }]);
    export const OXYGEN_TILE = new BasicBlock("oxygen_tile", [{ name: "block.galacticraft.oxygen_tile", texture: [["Oxygentile 3", 0]], inCreative: true }]);

    export const BLOCK_IRON_STEEL = new BasicBlock("block_iron_steel_gc", [{
            name: "block.galacticraft.iron_steel",
            texture: [
                ["Iron Steel Block Side", 0],
                ["Iron Steel Block 3", 0],
                ["Iron Steel Block 2", 0],
                ["Iron Steel Block 2", 0],
                ["Iron Steel Block 2", 0],
                ["Iron Steel Block 2", 0],
            ],
            inCreative: true
        }
    ]);
    
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
            inCreative: true
        }
    ]);

    export const ENCLOSED_ALUMINUM_WIRE = new BasicBlock("enclosed_aluminum_wire", [
        {
            name: "Enclosed Aluminum Wire",
            texture: [["Enclosed Aluminum Wire", 0]],
            inCreative: true,
        }
    ]);

    Galacticraft.JOULE.registerWire(ENCLOSED_ALUMINUM_WIRE.id, 200);
    ICRender.getGroup("gc.wire").add(ENCLOSED_ALUMINUM_WIRE.id, -1);

    export const ENCLOSED_FLUID_PIPE = new BasicBlock("enclosed_fluid_pipe", [{
            name: "Enclosed Oxygen Pipe",
            texture: [["Enclosed Fluid Pipe", 0]],
            inCreative: true,
        }
    ]);

    Galacticraft.JOULE.registerWire(ENCLOSED_FLUID_PIPE.id, 200);
    ICRender.getGroup("gc.liquid-pipe").add(ENCLOSED_FLUID_PIPE.id, -1);

    export const ENCLOSED_HEAVY_ALUMINUM_WIRE = new BasicBlock("enclosed_heavy_aluminum_wire", [{
        name: "Enclosed Heavy Aluminum Wire",
        texture: [["Enclosed Heavy Aluminum Wire", 0]],
        inCreative: true
    }]);

    Galacticraft.JOULE.registerWire(ENCLOSED_HEAVY_ALUMINUM_WIRE.id, 200);
    ICRender.getGroup("gc.improved-wire").add(ENCLOSED_HEAVY_ALUMINUM_WIRE.id, -1);

    class Space extends BasicBlock {
        public getLightOpacity(): number {
            return 15;
        }

        public getDestroyTime(): number {
            return -1;
        }

        public constructor() {
            super("space", [{ name: "Space Air", texture: [["Black", 0]], inCreative: false }]);
        }
    }

    export const SPACE = new Space();
    export const MOON_STONE_TOP = new BasicBlock("moon_stone_top",[{ name: "Lunar Top Side", texture: [["Top Side", 0],["Top", 0],["Top Side", 0],["Top", 0],["Top Side", 0],["Top Side", 0]], inCreative: true }]);
    export const MOON_STONE = new BasicBlock("moon_stone",[{ name: "Lunar Stone", texture: [["Lunar Stone", 0]], inCreative: true }]);
    export const MOON_STONE_MIDDLE = new BasicBlock("moon_stone_middle",[{ name: "Lunar Dirt", texture: [["Middle", 0]], inCreative: true }]);
    export const VENUS_ROCK_0 = new BasicBlock("venus_rock_0", [{ name: "Venus Rock 0", texture: [["Venus Rock 0", 0]], inCreative: true }]);
    export const VENUS_ROCK_1 = new BasicBlock("venus_rock_1", [{ name: "Venus Rock venus_rock_1", texture: [["Venus Rock 1", 0]], inCreative: true }]);
    export const VENUS_ROCK_2 = new BasicBlock("venus_rock_2", [{ name: "Venus Rock 2", texture: [["Venus Rock 2", 0]], inCreative: true }]);
    export const VENUS_ROCK_3 = new BasicBlock("venus_rock_3", [{ name: "Venus Rock 3", texture: [["venus_rock", 3]], inCreative: true }]);

    export const MARS_TOP_STONE = new BasicBlock("mars_top_stone", [{ name: "block.galacticraft.mars_top_stone", texture: [["Top Mars", 0]], inCreative: true }]);
    export const MARS_MIDDLE_STONE = new BasicBlock("mars_middle_stone", [{ name: "block.galacticraft.mars_middle_stone", texture: [["Middle Mars", 0]], inCreative: true }])
    export const MARS_BOTTOM_STONE = new BasicBlock("mars_bottom_stone", [{ name: "The Martian Bottom Stone", texture: [["Bottom Mars", 0]], inCreative: true }])
    export const MARS_COBBLESTONE = new BasicBlock("mars_cobblestone",[{ name: "block.galacticraft.mars_cobblestone", texture: [["Cobblestone Mars", 0]], inCreative: true }]);
    export const DENSE_ICE = new BasicBlock("dense_ice_gc", [{ name: "block.galacticraft.dense_ice", texture: [["Dense Ice", 0]], inCreative: true }]);
    
    Block.registerDropFunction(MARS_BOTTOM_STONE.id, function(coords, blockID){
        return [[MARS_COBBLESTONE.id, 1, 0]] 
    });
    
}