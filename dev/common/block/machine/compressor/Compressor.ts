class Compressor extends ProcessingBlock {
    public static tile = new CompressorTile();
    public constructor() {
        super("compressor_gc", [{
            name: "tile.galacticraft.compressor",
            texture: [
                ["machine_item_output_gc", 0], 
                ["machine_item_input_gc", 0],
                ["machine_gc", 0], 
                ["compressor_gc", 0], 
                ["machine_input_gc", 0], 
                ["machine_gc", 0]
            ],
            inCreative: true
        }]);
        StorageInterfaceHelper.addSlotInputPolicyFromContainer(this.id, "fuel_slot");
    }

    public override getTileEntity(): ProcessingTile {
        return Compressor.tile;
    }
}

RecipeModule.registerFactory("compressor", new RecipeModule.UnformedFactory()).registerRecipesFrom(__dir__ + "resources/assets/recipes/compressor");