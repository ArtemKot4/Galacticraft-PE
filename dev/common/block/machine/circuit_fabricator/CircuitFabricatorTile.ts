class CircuitFabricatorTile extends ProcessingTile {
    public defaultValues = {
        energy: 0,
        progress: 0,
        active: false
    };
    public data: typeof this.defaultValues;

    public override setupWindowContent(): void {
        this.container.sendEvent("update_heating_scale_bitmap", {});
        this.container.setScale("heating_scale", this.data.progress / this.getProgressMax());
    }

    public override getScreenByName(screenName?: string, container?: ItemContainer): UI.IWindow {
        return CircuitFabricatorUI;
    }

    public override getFactory(): FormedRecipeFactory {
        return RecipeFactory.get<FormedRecipeFactory>("circuit");
    }

    public override getInputSlotNames(): string[] {
        return [
            "diamond_slot", "fabricator_slot_1", "fabricator_slot_2", "dust_slot", "plate_slot"
        ];
    }

    public override getOutputSlotNames(): string[] {
        return [
            "result_slot"
        ];
    }

    public override getLocalTileEntity(): LocalTileEntity {
        return new LocalCircuitFabricatorTile();
    }
}

FormedRecipeFactory.register("circuit").addRecipesFrom(__dir__ + "resources/assets/recipes/circuit");