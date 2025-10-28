class CoalGenerator extends ElectricBlock {
    public constructor() {
        super("coal_generator", [{
            name: "block.galacticraft.coal_generator",
            texture: [["Machine", 0], ["Machine", 0], ["Machine", 0], ["Coal Generator", 0], ["Machine Output", 0], ["Machine Output", 0]],
            inCreative: true
        }]);
    }

    public getTileEntity(): ElectricTile {
        return new CoalGeneratorTile();
    }
}