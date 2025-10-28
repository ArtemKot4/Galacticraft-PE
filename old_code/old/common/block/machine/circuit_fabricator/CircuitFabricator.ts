class CircuitFabricator extends MachineBlock {
    public constructor() {
        super("circuit_fabricator", [
            {
                name: "Circuit Fabricator",
                texture: [
                    ["Machine", 0],
                    ["Machine", 0],
                    ["Machine", 0],
                    ["circuit_fabricator", 0],
                    ["Machine Input", 0],
                    ["Machine", 0],
                ],
                inCreative: true,
            },
            {
                name: "Circuit Fabricator",
                texture: [
                    ["Machine", 0],
                    ["Machine", 0],
                    ["Machine", 0],
                    ["circuit_fabricator", 0],
                    ["Machine Input", 0],
                    ["Machine", 0],
                ],
                inCreative: false,
            },
            {
                name: "Circuit Fabricator",
                texture: [
                    ["Machine", 0],
                    ["Machine", 0],
                    ["Machine", 0],
                    ["circuit_fabricator", 0],
                    ["Machine Input", 0],
                    ["Machine", 0],
                ],
                inCreative: false,
            },
        ]);
    };

    public getTileEntity(): CommonTileEntity {
        return new CircuitFabricatorTile();
    };
};

