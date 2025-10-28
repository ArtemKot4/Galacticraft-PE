class ElectricCompressorTile extends ProcessingMachine {
    public defaultValues = {
        energy: 0,
        progress: 0
    }
    
    public getEnergyCapacity(): number {
        return 1000;
    }

    public getProgressMax(): number {
        return 250;
    }

    public getScreenByName(): UI.StandartWindow {
        return ElectricCompressorUI;
    }

    public onTick(): void {
        // const capacity = this.getEnergyCapacity();
        // const progressMax = this.getProgressMax();

        // this.container.sendChanges();
        // this.container.validateAll();

        // Battery.chargeMachine(this, "battery_slot");

        // this.container.setScale("progress_scale", this.data.progress / progressMax);
        // this.container.setScale("energy_bar", this.data.energy / 1000);
        // this.container.setScale("energy_icon", this.data.energy / 100);

        // if(this.data.progress > 0) {
        //     this.container.setText("status", Translation.translate("Status: working"));
        // } else {
        //     UIHelper.Machine.setEnergyStatus(this);
        // }

        // const recipe = RecipeFactory.get("gc:compressor").getRecipeByMore(this.container, 9);

        // this.setProgress(recipe);

        // if(this.isFullProgress()) {
        //     RecipeFactory.decreaseSlots(this.container, 9);
        //     RecipeFactory.setResult(this.container, "slot_result_0", recipe.result as ItemInstance);
        //     RecipeFactory.setResult(this.container, "slot_result_1", (recipe.result_2 || recipe.result) as ItemInstance);
        //     this.clearProgress();

        //     this.data.energy -= capacity / 2;
        // }
    }
}
