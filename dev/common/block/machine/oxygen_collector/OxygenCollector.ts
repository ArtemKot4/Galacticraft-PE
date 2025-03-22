class OxygenCollector extends MachineBlock {
    public constructor() {
        super("oxygen_collector", [
            {
                name: "Oxygen Collector",
                texture: [["collector",
                    0],
                ["collector",
                    0],
                ["collector",
                    0],
                ["collector",
                    0],
                ["Machine Input",
                    0],
                ["Machine Oxygen Output",
                    0]],
                inCreative: true
            }, {
                name: "Oxygen Collector",
                texture: [["collector",
                    0],
                ["collector",
                    0],
                ["collector",
                    0],
                ["collector",
                    0],
                ["Machine Input",
                    0],
                ["Machine Oxygen Output",
                    0]],
                inCreative: false
            }, {
                name: "Oxygen Collector",
                texture: [["collector",
                    0],
                ["collector",
                    0],
                ["collector",
                    0],
                ["collector",
                    0],
                ["Machine Input",
                    0],
                ["Machine Oxygen Output",
                    0]],
                inCreative: false
            }
        ]);

        EnergyTileRegistry.addEnergyTypeForId(this.id, EnergyTypes.OB);
    };

    public getTileEntity(): CommonTileEntity {
        return new OxygenCollectorTile();
    };
};

BLOCK_TAG_GROUP.addTagsFor(VanillaBlockID.leaves, "leaves");
BLOCK_TAG_GROUP.addTagsFor(VanillaBlockID.leaves2, "leaves");