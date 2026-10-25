@ElectricMachine(ElectricMachine.Config.assembly(
    ElectricMachine.Config.DEFAULTS.OXYGEN(ElectricMachine.Type.EXTRACTOR),
    ElectricMachine.Config.DEFAULTS.GJ(ElectricMachine.Type.RECEIVER)
))
class OxygenDecompressor extends MachineBlock {
   public static tile = new OxygenDecompressorTile();

    public constructor() {
        super("oxygen_decompressor_gc", [{
            name: "tile.galacticraft.oxygen_decompressor",
            texture: [
                ["machine_gc", 0],
                ["machine_gc", 0],
                ["machine_gc", 0],
                ["oxygen_decompressor_gc", 0],
                ["machine_input_gc", 0],
                ["machine_oxygen_output_gc", 0]
            ],
            inCreative: true
        }]);
    }
    
    public override getTileEntity(): OxygenDecompressorTile {
        return OxygenDecompressor.tile;
    }
}