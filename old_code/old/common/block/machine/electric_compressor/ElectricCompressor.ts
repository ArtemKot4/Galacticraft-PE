class ElectricCompressor extends MachineBlock {
    public constructor() {
        super("electric_compressor_gj", [
            {
                name: "Electric compressor",
                texture: [
                    ["machine_b", 0],
                    ["machine_b", 0],
                    ["machine_b", 0],
                    ["electric_compressor", 0],
                    ["machine_input", 0],
                    ["machine_b", 0],
                ],
                inCreative: true
            },
            {
                name: "Electric compressor",
                texture: [
                    ["machine_b", 0],
                    ["machine_b", 0],
                    ["machine_b", 0],
                    ["electric_compressor", 0],
                    ["machine_input", 0],
                    ["machine_b", 0],
                ],
                inCreative: false
            },
            {
                name: "Electric compressor",
                texture: [
                    ["machine_b", 0],
                    ["machine_b", 0],
                    ["machine_b", 0],
                    ["electric_compressor", 0],
                    ["machine_input", 0],
                    ["machine_b", 0],
                ],
                inCreative: false
            }
        ]);
    };

    public getTileEntity(): CommonTileEntity {
        return new ElectricCompressorTile();
    }
};
