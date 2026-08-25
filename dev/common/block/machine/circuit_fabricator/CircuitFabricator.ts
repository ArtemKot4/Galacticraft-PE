@ElectricMachine(ElectricMachine.Type.RECEIVER)
class CircuitFabricator extends ProcessingBlock {
    public static tile = new CircuitFabricatorTile();

	public constructor() {
		super("circuit_fabricator_gc", [{
            name: "tile.galacticraft.circuit_fabricator",
            texture: [
				["machine_gc", 0], 
				["machine_item_input_gc", 0],
				["machine_gc", 0], 
				["circuit_fabricator_gc", 0], 
				["machine_input_gc", 0], 
				["machine_gc", 0]
			],
            inCreative: true
		}]);
	}

	public override getTileEntity(): ProcessingTile {
        return CircuitFabricator.tile;
	}
}

FormedRecipeFactory.register("circuit").addRecipesFrom(__dir__ + "resources/assets/recipes/circuit");