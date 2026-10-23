@ElectricMachine({
    [Galacticraft.EnergyTypes.JOULE.name]: {
        type: ElectricMachine.Type.EXTRACTOR,
        batteryManager: ElectricMachine.DEFAULT_BATTERY_MANAGERS.ENERGY_BATTERY_MANAGER,
        energyKey: "energy",
        capacity: 16000,
        maxExtract: 200,
        maxReceive: 200
    }
})
class BasicSolarPanel extends MachineBlock {
    public static tile = new SolarPanelTile();

    public constructor() {
        super("basic_solar_gc", [{
            name: "tile.galacticraft.basic_solar",
            texture: [
                ["machine_gc", 0],
                ["solar_basic", 0],
                ["solar_basic", 1],
                ["solar_basic", 1],
                ["machine_output_gc", 0],
                ["solar_basic", 1]
            ],
            inCreative: true
        }]);
    }

    public override getTileEntity(): CommonTileEntity {
        return BasicSolarPanel.tile;
    }
}