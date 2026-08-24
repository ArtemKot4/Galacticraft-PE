@ElectricMachine(ElectricMachine.Type.EXTRACTOR)
class CoalGenerator extends MachineBlock {
    public static tile = new CoalGeneratorTile();
    
    public constructor() {
        super("coal_generator_gc", [{
            name: "tile.galacticraft.coal_generator",
            texture: [["machine_gc", 0], ["machine_gc", 0], ["machine_gc", 0], ["coal_generator_gc", 0], ["machine_output_gc", 0], ["machine_gc", 0]],
            inCreative: true
        }]);
    }

    public override getTileEntity(): MachineTile {
        return CoalGenerator.tile;
    }
}