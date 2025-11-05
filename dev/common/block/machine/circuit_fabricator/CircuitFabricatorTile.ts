class CircuitFabricatorTile extends ProcessingTile {
    public override inputSlots: string[] = [
        "diamond_slot", "fabricator_slot_1", "fabricator_slot_2", "dust_slot", "plate_slot"
    ];

    public override outputSlots: string[] = [
        "result_slot"
    ];

    public override onUpdate(): void {
        if(World.getThreadTime() % 2 == 0) {
            this.container.setBinding("progress_scale", "texture", CircuitFabricatorTile.getValidScaleBitmapName(String(this.container.getBinding("progress_scale", "texture"))));
        }
        this.container.setScale("progress_scale", this.data.progress / this.getProgressMax());
    }

    public override getScreenByName(screenName?: string, container?: ItemContainer): UI.IWindow {
        return CircuitFabricatorUI;
    }

    public override getFactory(): FormedRecipeFactory {
        return RecipeFactory.get<FormedRecipeFactory>("circuit");
    }

    public static getNewScaleBitmapIndex(index: number): number {
        return index >= 3 ? 1 : index + 1;
    }

    public static getValidScaleBitmapName(bitmapName: string): string {
        return "machine.circuit_fabricator.heat_scale_" + this.getNewScaleBitmapIndex(Number(bitmapName[bitmapName.length-1]) || 1); 
    }
}

FormedRecipeFactory.register("circuit").addRecipesFrom(__dir__ + "resources/assets/recipes/circuit");