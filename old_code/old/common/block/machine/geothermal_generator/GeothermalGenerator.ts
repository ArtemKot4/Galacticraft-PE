class GeothermalGenerator extends MachineBlock {
    public constructor() {
        super("geothermal_generator_gc", [
            {
                name: "Geothermal generator",
                texture: [
                    ["geothermal_vent", 0],
                    ["geothermal_vent", 0],
                    ["Machine", 0],
                    ["geothermal_inactive", 0],
                    ["Machine Output", 0],
                    ["Machine Output", 0],
                ],
                inCreative: true,
            },
            {
                name: "Geothermal generator",
                texture: [
                    ["geothermal_vent", 0],
                    ["geothermal_vent", 0],
                    ["Machine", 0],
                    ["geothermal", 0],
                    ["Machine Output", 0],
                    ["Machine Output", 0],
                ],
                inCreative: false,
            },
        ]);
    };

    public isWrenchable(): boolean {
        return false;
    };

    public getTileEntity(): CommonTileEntity {
        return new GeothermalGeneratorTile();
    };
};
