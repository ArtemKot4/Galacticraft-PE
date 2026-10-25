@ElectricMachine(ElectricMachine.Config.assembly(
    ElectricMachine.Config.DEFAULTS.GJ(ElectricMachine.Type.RECEIVER),
    ElectricMachine.Config.DEFAULTS.OXYGEN(ElectricMachine.Type.RECEIVER)
))
class OxygenCompressor extends MachineBlock {
   public static tile = new OxygenCompressorTile();

    public constructor() {
        super("oxygen_compressor_gc", [{
            name: "tile.galacticraft.oxygen_compressor",
            texture: [
                ["machine_gc", 0],
                ["machine_gc", 0],
                ["machine_gc", 0],
                ["oxygen_compressor_gc", 0],
                ["machine_input_gc", 0],
                ["machine_oxygen_output_gc", 0]
            ],
            inCreative: true
        }]);
    }
    
    public override getTileEntity(): OxygenCompressorTile {
        return OxygenCompressor.tile;
    }
}