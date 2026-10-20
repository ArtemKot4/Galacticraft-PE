@ElectricMachine(ElectricMachine.Config.DEFAULTS.GJ(ElectricMachine.Type.RECEIVER))
@LiquidMachine(
    { liquidName: "oil", action: "add", liquidCapacity: 24000 }, 
    { liquidName: "fuel", action: "get", liquidCapacity: 24000 }
)
class Refinery extends MachineBlock {
    public static tile = new RefineryTile();

    public constructor() {
        super("refinery_gc", [{
            name: "tile.galacticraft.refinery",
            texture: [
                ["machine_gc", 0],
                ["refinery_top_gc", 0],
                ["refinery_side_gc", 0],
                ["refinery_front_gc", 0],
                ["machine_input_gc", 0],
                ["machine_oil_input_gc", 0]
            ],
            inCreative: true
        }]);
    }

    public override getTileEntity(): RefineryTile {
        return Refinery.tile;
    }
}

