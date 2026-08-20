@ElectricMachine(EElectricMachineType.RECEIVER)
@LiquidMachine(
    { liquidName: "oil", action: "add" }, 
    { liquidName: "fuel", action: "get" }
)
class Refinery extends MachineBlock {
    public constructor() {
        super("refinery_gc", [{
            name: "tile.galacticraft.refinery",
            texture: [["machine_gc", 0], ["refinery_top_gc", 0], ["machine_gc", 0], ["refinery_front_gc", 0], ["refinery_side_gc", 0], ["machine_oil_input_gc", 0]],
            inCreative: true
        }]);
    }

    public override canHasLiquid(): boolean {
        return true;
    }

    public override getTileEntity(): MachineTile {
        return new RefineryTile();
    }
}