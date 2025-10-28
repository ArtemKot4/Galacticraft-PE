class CircuitFabricatorTile extends ProcessingMachine {
    public defaultValues = {
        energy: 0,
        progress: 0
    }
    
    public getEnergyCapacity(): number {
        return 1000;
    }

    public getScreenByName(screenName?: string, container?: ItemContainer): UI.IWindow {
        return CircuitFabricatorUI;
    }

    public getProgressMax(): number {
        return 250;
    }

    public onTick(): void {
        // const capacity = this.getEnergyCapacity();
        // const progressMax = this.getProgressMax();

        // this.container.validateAll();
        // this.container.sendChanges();
        
        // UIHelper.Machine.setEnergyStatus(this);

        // if(World.getThreadTime() % 5 === 0 && this.data.progress > 0 && this.data.progress < progressMax) {
        //     this.container.setBinding("burning_scale", "bitmap", MathHelper.randomInt(0, 2));
        // };

        // this.container.setScale("energy_icon", this.data.energy / 1000);
        // this.container.setScale("burning_scale", this.data.progress / progressMax);
        // this.container.setScale("energy_bar", this.data.energy / capacity);

        // const recipe = RecipeFactory.get("gc:circuit_fabricator").getRecipeByMore(this.container, 5);

        // this.setProgress(recipe);

        // if(this.isFullProgress()) {
        //     RecipeFactory.decreaseSlots(this.container, 5);
        //     RecipeFactory.setResult(this.container, "slot_result", recipe.result as ItemInstance);
        //     this.clearProgress();

        //     this.data.energy -= capacity / 2;
        // };
    };
};
