class CompressorTile extends MachineTile {
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
        this.container.setScale("progressScale", this.data.progress / progressMax);
        this.container.setScale("BurningScale", this.data.energy / burningMax);

        CoalGeneratorTile.setBurning("coal_slot", this);
        
        const recipe = BlockList.COMPRESSOR.factory.getForMore(this.container, 9) as Record<string, ItemStack>;

        if (this.data.energy >= capacity / 2 && recipe != null && this.data.progress < progressMax) {
            this.data.progress++;
        };

        if (this.data.progress >= progressMax) {
            RecipeFactory.decreaseSlots(this.container, 9);
            RecipeFactory.setupResult(this.container, "result", recipe.result);

            this.data.progress = 0;
            this.data.energy -= capacity / 2;
        };
    };
};
