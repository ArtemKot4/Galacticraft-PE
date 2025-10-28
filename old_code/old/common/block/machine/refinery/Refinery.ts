class Refinery extends MachineBlock {
    public constructor() {
        super("refinery_gc", [
            {
                name: "block.galacticraft.refinery",
                texture: [
                    ["Machine", 0],
                    ["refinery_top", 0],
                    ["refinery_front", 0],
                    ["refinery_side", 0],
                    ["Machine Input", 0],
                    ["Machine Oxygen Input", 0],
                ],
                inCreative: true
            },
            {
                name: "block.galacticraft.refinery",
                texture: [
                    ["Machine", 0],
                    ["refinery_top", 0],
                    ["refinery_front", 0],
                    ["refinery_side", 0],
                    ["Machine Input", 0],
                    ["Machine Oxygen Input", 0],
                ],
                inCreative: false
            },
            {
                name: "block.galacticraft.refinery",
                texture: [
                    ["Machine", 0],
                    ["refinery_top", 0],
                    ["refinery_front", 0],
                    ["refinery_side", 0],
                    ["Machine Input", 0],
                    ["Machine Oxygen Input", 0],
                ],
                inCreative: false
            }
        ]);
    };

    public getTileEntity(): CommonTileEntity {
        return new RefineryTile();
    };
};
