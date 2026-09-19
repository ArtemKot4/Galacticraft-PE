@ElectricMachine(ElectricMachine.Config.assembly(
    ElectricMachine.Config.DEFAULTS.GJ(ElectricMachine.Type.RECEIVER), 
    ElectricMachine.Config.DEFAULTS.OXYGEN(ElectricMachine.Type.EXTRACTOR))
)
class OxygenCollector extends MachineBlock {
    public constructor() {
        super("oxygen_collector_gc", [{
            name: "tile.galacticraft.oxygen_collector",
            texture: [
                ["machine_gc", 0], 
                ["machine_gc", 0], 
                ["machine_gc", 0], 
                ["oxygen_collector_gc", 0], 
                ["machine_input_gc", 0], 
                ["machine_oil_input_gc", 0]
            ],
            inCreative: true
        }]);
    }

    public override getTileEntity(): CommonTileEntity {
        return new OxygenCollectorTile();
    }
}