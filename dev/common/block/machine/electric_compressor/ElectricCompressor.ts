@ElectricMachine(ElectricMachine.DEFAULT_CONFIGS.GJ(ElectricMachine.Type.RECEIVER))
class ElectricCompressor extends ProcessingBlock {
    public static tile = new ElectricCompressorTile();

    public constructor() {
        super("electric_compressor_gc", [{
            name: "tile.galacticraft.electric_compressor",
            texture: [
                ["machine_item_output_gc", 0], 
                ["machine_item_input_gc", 0],
                ["machine_gc", 0], 
                ["electric_compressor_gc", 0], 
                ["machine_input_gc", 0], 
                ["machine_gc", 0]
            ],
            inCreative: true
        }]);
    }
    
    public override getTileEntity(): ProcessingTile {
        return ElectricCompressor.tile;
    }
}