class AdvancedCompressorTile extends ElectricCompressorTile {
    protected override processTimeBase = 120;

    public override getScreenByName(): UI.IWindow {
        return AdvancedCompressorUI;
    }
}

@ElectricMachine(ElectricMachine.Config.DEFAULTS.GJ(ElectricMachine.Type.RECEIVER))
class AdvancedCompressor extends ProcessingBlock {
    public static tile = new AdvancedCompressorTile();

    public constructor() {
        super("advanced_compressor_gc", [{
            name: "tile.galacticraft.advanced_compressor",
            texture: [
                ["machine_item_output_blue_gc", 0],
                ["machine_item_input_blue_gc", 0],
                ["machine_blue_gc", 0],
                ["advanced_electric_compressor", 0],
                ["machine_input_blue_gc", 0],
                ["machine_blue_gc", 0]
            ],
            inCreative: true
        }]);
    }

    public override getTileEntity(): ProcessingTile {
        return AdvancedCompressor.tile;
    }
}
