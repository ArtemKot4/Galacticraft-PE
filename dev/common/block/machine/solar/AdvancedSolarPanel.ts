@ElectricMachine({
    [Galacticraft.EnergyTypes.JOULE.name]: {
        type: ElectricMachine.Type.EXTRACTOR,
        batteryManager: ElectricMachine.DEFAULT_BATTERY_MANAGERS.ENERGY_BATTERY_MANAGER,
        energyKey: "energy",
        capacity: 30000,
        maxExtract: 200,
        maxReceive: 200
    }
})
class AdvancedSolarPanel extends MachineBlock {
    public static tile = new AdvancedSolarPanelTile();

    public constructor() {
        super("advanced_solar_gc", [{
            name: "tile.galacticraft.advanced_solar",
            texture: [
                ["machine_gc", 0],
                ["solar_advanced", 0],
                ["solar_advanced", 1],
                ["solar_advanced", 1],
                ["machine_output_gc", 0],
                ["solar_advanced", 1]
            ],
            inCreative: true
        }]);
    }

    public override getTileEntity(): CommonTileEntity {
        return AdvancedSolarPanel.tile;
    }
}
