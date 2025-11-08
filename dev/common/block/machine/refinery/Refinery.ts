class Refinery extends ElectricBlock {
    public constructor() {
        super("refinery_gc", [{
            name: "tile.galacticraft.refinery",
            texture: [["machine", 0], ["machine", 0], ["machine", 0], ["refinery", 0], ["machine_input", 0], ["machine_oil_input", 0]],
            inCreative: true
        }]);
    }

    public override canHasLiquid(): boolean {
        return true;
    }

    public override getTileEntity(): ElectricTile {
        return new RefineryTile();
    }
}