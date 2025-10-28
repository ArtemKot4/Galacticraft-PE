class FuelLoader extends MachineBlock {
    public constructor() {
        super("fuel_loader", [
            {
                name: "block.galacticraft.fuel_loader",
                texture: [
                    ["Machine", 0],
                    ["Machine", 0],
                    ["refinery_front", 0],
                    ["Fuel Loader", 0],
                    ["Machine Output", 0],
                    ["Machine Output", 0],
                ],
                inCreative: true
            },
            {
                name:"block.galacticraft.fuel_loader",
                texture: [
                    ["Machine", 0],
                    ["Machine", 0],
                    ["refinery_front", 0],
                    ["Fuel Loader", 0],
                    ["Machine Output", 0],
                    ["Machine Output", 0],
                ],
                inCreative: false
            },
            {
                name: "block.galacticraft.fuel_loader",
                texture: [
                    ["Machine", 0],
                    ["Machine", 0],
                    ["refinery_front", 0],
                    ["Fuel Loader", 0],
                    ["Machine Output", 0],
                    ["Machine Output", 0],
                ],
                inCreative: false
            }
        ]);
    };

    public getTileEntity(): CommonTileEntity {
        return new FuelLoaderTile();
    };
};
