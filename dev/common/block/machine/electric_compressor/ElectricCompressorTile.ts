class ElectricCompressorTile extends ProcessingMachine {
    public data = {
        progress: 0,
        energy: 0
    };

    public getCapacity(): number {
        return 1000;
    };

    public getProgressMax(): number {
        return 250;
    };

    public getScreenByName(): UI.StandartWindow {
        return ElectricCompressorUI;
    };

    public onTick(): void {
        const capacity = this.getCapacity();
        const progressMax = this.getProgressMax();

        this.container.sendChanges();
        this.container.validateAll();

        Battery.chargeMachine(this, "battery_slot");

        this.container.setScale("progress_scale", this.data.progress / progressMax);
        this.container.setScale("energy_bar", this.data.energy / 1000);
        this.container.setScale("energy_icon", this.data.energy / 100);

        if(this.data.progress > 0) {
            this.container.setText("status", Translation.translate("Status: working"));
        } else {
            UIHelper.Machine.setEnergyStatus(this);
        };

        const recipe = BlockList.COMPRESSOR.factory.getForMore(this.container, 9);

        this.setProgress(recipe);

        if(this.isFullProgress()) {
            RecipeFactory.decreaseSlots(this.container, 9);
            RecipeFactory.setupResult(this.container, "slot_result_0", recipe.result as ItemInstance);
            RecipeFactory.setupResult(this.container, "slot_result_1", (recipe.result_2 || recipe.result) as ItemInstance);
            this.clearProgress();

            this.data.energy -= capacity / 2;
        };
    };
};
