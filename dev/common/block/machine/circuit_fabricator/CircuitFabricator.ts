@ElectricMachine(EElectricMachineType.RECEIVER)
class CircuitFabricator extends ProcessingBlock {
    public static tile = new CircuitFabricatorTile();

	public constructor() {
		super("circuit_fabricator_gc", [{
            name: "tile.galacticraft.circuit_fabricator",
            texture: [["machine_gc", 0], ["machine_gc", 0], ["machine_gc", 0], ["circuit_fabricator_gc", 0], ["machine_input_gc", 0], ["machine_gc", 0]],
            inCreative: true
		}]);
	}

    public override getStorageInterface(): StorageDescriptor {
        return {
            getInputSlots: () => ["diamond_slot", "fabricator_slot_1", "fabricator_slot_2", "dust_slot", "plate_slot"]
        }
    }

	public override getTileEntity(): ProcessingTile {
        return CircuitFabricator.tile;
	}
}