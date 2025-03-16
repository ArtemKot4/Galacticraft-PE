class CompressorTile extends ProcessingMachine {
    public data = {
        energy: 0,
        progress: 0,
        burning: 0,
        active: false,
    };

    public getCapacity(): number {
        return 500;
    };

    public getProgressMax(): number {
        return 500;
    };

    public getBurningMax(): number {
        return 500;
    };

    public getScreenByName(): UI.StandartWindow {
        return CompressorUI;
    };

    public onTick(): void {
        const progressMax = this.getProgressMax();
        const burningMax = this.getBurningMax();
        const capacity = this.getCapacity();

        this.container.sendChanges();
        this.container.validateAll();
        this.container.setScale("progress_scale", this.data.progress / progressMax);
        this.container.setScale("burning_scale", this.data.energy / burningMax);

        CoalGeneratorTile.setBurning("coal_slot", this);
        
        const recipe = BlockList.COMPRESSOR.factory.getForMore(this.container, 9) as Record<string, ItemInstance>;

        this.setProgress(recipe);

        if(this.isFullProgress()) {
            RecipeFactory.decreaseSlots(this.container, 9);
            RecipeFactory.setupResult(this.container, "slot_result", recipe.result_0);
            this.clearProgress();

            this.data.energy -= capacity / 2;
        };
    };
};
