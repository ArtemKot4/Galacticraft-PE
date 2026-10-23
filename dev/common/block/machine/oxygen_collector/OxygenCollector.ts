@ElectricMachine((() => {
    const joule = ElectricMachine.Config.DEFAULTS.GJ(ElectricMachine.Type.RECEIVER);
    joule[Galacticraft.EnergyTypes.JOULE.name].redstoneControl = false;
    const oxygen = ElectricMachine.Config.DEFAULTS.OXYGEN(ElectricMachine.Type.EXTRACTOR);
    oxygen[Galacticraft.EnergyTypes.OXYGEN.name].capacity = 6000;
    return ElectricMachine.Config.assembly(joule, oxygen);
})())
class OxygenCollector extends MachineBlock {
    public static tile = new OxygenCollectorTile();

    public constructor() {
        super("oxygen_collector_gc", [{
            name: "tile.galacticraft.oxygen_collector",
            texture: [
                ["machine_gc", 0],
                ["machine_gc", 0],
                ["machine_gc", 0],
                ["oxygen_collector_gc", 0],
                ["machine_input_gc", 0],
                ["machine_oxygen_output_gc", 0]
            ],
            inCreative: true
        }]);
    }

    public override getTileEntity(): CommonTileEntity {
        return OxygenCollector.tile;
    }
}