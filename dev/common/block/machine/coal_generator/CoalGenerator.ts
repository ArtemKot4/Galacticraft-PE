@ElectricMachine(EElectricMachineType.EXTRACTOR)
class CoalGenerator extends MachineBlock {
    public constructor() {
        super("coal_generator_gc", [{
            name: "tile.galacticraft.coal_generator",
            texture: [["machine", 0], ["machine", 0], ["machine", 0], ["coal_generator_gc", 0], ["machine_output", 0], ["machine", 0]],
            inCreative: true
        }]);
    }

    public override getStorageInterface(): StorageDescriptor {
        return {
            getInputSlots: () => ["coal_slot"],
            isValidInput: (item, side, tile) => Recipes.getFuelBurnDuration(item.id, item.data) != 0
        }
    }

    public override getTileEntity(): MachineTile {
        return new CoalGeneratorTile();
    }
}