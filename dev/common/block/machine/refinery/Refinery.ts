@ElectricMachine(EElectricMachineType.RECEIVER)
class Refinery extends MachineBlock {
    public constructor() {
        super("refinery_gc", [{
            name: "tile.galacticraft.refinery",
            texture: [["machine", 0], ["machine", 0], ["machine", 0], ["refinery_front", 0], ["refinery_side", 0], ["machine_oil_input", 0]],
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