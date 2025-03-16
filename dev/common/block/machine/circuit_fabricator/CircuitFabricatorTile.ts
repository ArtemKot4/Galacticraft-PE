class CircuitFabricatorTile extends ProcessingMachine {
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

    public onTick(): void {
        const capacity = this.getCapacity();
        const progressMax = this.getProgressMax();

        this.container.validateAll();
        this.container.sendChanges();
        
        UIHelper.Machine.setEnergyStatus(this);

        if(World.getThreadTime() % 5 === 0 && this.data.progress > 0 && this.data.progress < progressMax) {
            this.container.setBinding("burning_scale", "bitmap", MathHelper.randomInt(0, 2));
        };

        this.container.setScale("energy_icon", this.data.energy / 1000);
        this.container.setScale("burning_scale", this.data.progress / progressMax);
        this.container.setScale("energy_bar", this.data.energy / capacity);

        const recipe = BlockList.CIRCUIT_FABRICATOR.factory.getForMore(this.container, 5) as Record<string, ItemInstance>;

        this.setProgress(recipe);

        if(this.isFullProgress()) {
            RecipeFactory.decreaseSlots(this.container, 5);
            RecipeFactory.setupResult(this.container, "slot_result", recipe.result);
            this.clearProgress();

            this.data.energy -= capacity / 2;
        };
    };
};
