class Compressor extends ProcessingBlock {
    public static tile = new CompressorTile();
    public constructor() {
        super("compressor_gc", [{
            name: "tile.galacticraft.compressor",
            texture: [["machine_gc", 0], ["machine_gc", 0], ["machine_gc", 0], ["compressor_gc", 0], ["machine_input_gc", 0], ["machine_gc", 0]],
            inCreative: true
        }]);
    }

    public override getStorageInterface(): StorageDescriptor {
        return {
            slots: {
                "slot_1^9": { input: true }
            }
        }
    }

    public override getTileEntity(): ProcessingTile {
        return Compressor.tile;
    }
}

UnformedRecipeFactory.register("compressor").addRecipesFrom(__dir__ + "resources/assets/recipes/compressor");