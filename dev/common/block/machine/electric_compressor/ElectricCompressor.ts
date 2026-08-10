@ElectricMachine(EElectricMachineType.RECEIVER)
class ElectricCompressor extends ProcessingBlock {
    public static tile = new ElectricCompressorTile();

    public constructor() {
        super("electric_compressor_gc", [{
            name: "tile.galacticraft.electric_compressor",
            texture: [["machine_blue_gc", 0], ["machine_blue_gc", 0], ["machine_blue_gc", 0], ["electric_compressor_blue_gc", 0], ["machine_input_blue_gc", 0], ["machine_blue_gc", 0]],
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
        return ElectricCompressor.tile;
    }
}

//текстуру поменять на обычную нужно, ест 1500 gJ в секунду всегда