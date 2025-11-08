class ElectricCompressor extends ProcessingBlock {
    public constructor() {
        super("electric_compressor_gc", [{
            name: "tile.galacticraft.electric_compressor",
            texture: [["machine_blue", 0], ["machine_blue", 0], ["machine_blue", 0], ["electric_compressor_blue", 0], ["machine_input_blue", 0], ["machine_blue", 0]],
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
        return new ElectricCompressorTile();
    }
}

UnformedRecipeFactory.register("compressor").addRecipesFrom(__dir__ + "resources/assets/recipes/compressor");