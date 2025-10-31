class CoalGenerator extends ElectricBlock implements IClickCallback {
    public constructor() {
        super("coal_generator", [{
            name: "block.galacticraft.coal_generator",
            texture: [["machine", 0], ["machine", 0], ["machine", 0], ["coal_generator_gc", 0], ["machine_output", 0], ["machine_output", 0]],
            inCreative: true
        }]);
    }

    public override getStorageInterface(): StorageDescriptor {
        return {
            slots: {
                coal_slot: { input: true }
            },
            isValidInput: (item, side, tile) => Recipes.getFuelBurnDuration(item.id, item.data) != 0
        }
    }

    public onClick(coords: Callback.ItemUseCoordinates, item: ItemStack, block: Tile, player: number): void {
        Game.message(block.data);
    }

    public override getTileEntity(): ElectricTile {
        return new CoalGeneratorTile();
    }
}