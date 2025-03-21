class GalacticraftLiquid {
    public static types: string[] = [];
    public constructor(public type: string) {
        GalacticraftLiquid.types.push(type);
    };

    public createBlock(still_texture: string, flow_texture: string, block_type?: string): this {
        Block.createLiquidBlock(
            "liquid_galacticraft_" + this.type,
            {
              name: "block.galacticraft.liquid." + this.type,
              still: {
                texture: [still_texture, 0],
                id: "liquid_galacticraft_" + this.type + "_still",
              },
              flowing: {
                texture: [flow_texture, 0],
                id: "liquid_galacticraft_" + this.type + "_flow",
              }
            },
            block_type || {
                solid: false,
                renderlayer: 1,
                explosionres: 10000
            }
        );
        return this;
    };

    public static isValidType(type: string): boolean {
        return GalacticraftLiquid.types.includes(type);
    };

    public static getLiquidBlock(type: string) {
        return LiquidRegistry.getBlockByLiquid("liquid_galacticraft_" + type);
    };

    public static getLiquidTypeByBlock(block: Tile): Nullable<string> {
        const liquid = LiquidRegistry.getLiquidByBlock(block.id)
        if(!liquid) return null;
        if(liquid.includes("liquid_galacticraft")) {
            const splited = liquid.split("_");
            return splited.slice(2).join("_");
        };
        return null;
    };
};

namespace LiquidList {
    export const OIL = new GalacticraftLiquid("oil").createBlock("oil_still", "oil_flow");
    export const FUEL = new GalacticraftLiquid("fuel").createBlock("fuel_still", "fuel_flow");
};
