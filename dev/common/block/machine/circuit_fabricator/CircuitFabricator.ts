class CircuitFabricator extends ProcessingBlock {
	public constructor() {
		super("circuit_fabricator", [{
            name: "tile.galacticraft.circuit_fabricator",
            texture: [["machine", 0], ["machine", 0], ["machine", 0], ["circuit_fabricator_gc", 0], ["machine_input", 0], ["machine", 0]],
            inCreative: true
		}]);
	}

    public override getStorageInterface(): StorageDescriptor {
        return {
            getInputSlots: () => ["diamond_slot", "fabricator_slot_1", "fabricator_slot_2", "dust_slot", "plate_slot"]
        }
    }

	public override getTileEntity(): ProcessingTile {
		return new CircuitFabricatorTile();
	}
}
