class CircuitFabricatorTile extends ProcessingTile {
    public defaultValues = {
        energy: 0,
        progress: 0,
        active: false
    };
    public data: typeof this.defaultValues;

    public override getScreenByName(screenName?: string, container?: ItemContainer): UI.IWindow {
        return CircuitFabricatorUI;
    }

    public override setupContainer(): void {
        StorageInterface.setGlobalValidatePolicy(this.container, (name, id, amount, data) => {
            return name == "result_slot" || this.getFactory().storage.some((recipe) => id == recipe.input[name].id);
        });
        this.container.setSlotAddTransferPolicy("result_slot", () => 0);
    }

    public getFactory(): FormedRecipeFactory {
        return RecipeFactory.get<FormedRecipeFactory>("circuit");
    }

    public getInputSlots(): Record<string, ItemInstance> {
        return {
            diamond_slot: this.container.getSlot("diamond_slot"),
            fabricator_slot_1: this.container.getSlot("fabricator_slot_1"),
            fabricator_slot_2: this.container.getSlot("fabricator_slot_2"),
            dust_slot: this.container.getSlot("dust_slot"),
            plate_slot: this.container.getSlot("plate_slot")
        }
    }

    public decreaseInputSlots(): void {
        const slots = this.getInputSlots();

        for(const i in slots) {
            const slot = slots[i];
            this.container.setSlot(i, slot.id, slot.count - 1, slot.data, slot.extra);
        }
    }

    public getProgressMax(): number {
        return 250;
    }

    public isValidResultSlot(result: ItemInstance): boolean {
        const resultSlot = this.container.getSlot("result_slot");
        const resultMaxStack = Item.getMaxStack(resultSlot.id, resultSlot.data);

        return resultSlot.id == 0 || (resultSlot.id == result.id && (resultSlot.count + result.count <= resultMaxStack));
    }

    public stop(): void {
        this.data.active = false;
        this.data.progress = 0;
    }

    public override onTick(): void {
        this.container.validateAll();
        this.container.sendChanges();
        this.container.setScale("burning_scale", this.data.progress / this.getProgressMax());
        this.container.setScale("energy_bar", this.data.energy / this.getCapacity());
        this.container.setScale("energy_icon", this.data.energy / 1);
        StorageInterface.checkHoppers(this);

        if(this.data.energy < 500) {
            return;
        }
        const result = this.getFactory().getResults(this.getInputSlots());
        if(result == null) {
            this.stop();
            return;
        }  
        const resultSlot = this.container.getSlot("result_slot");
        if(!this.isValidResultSlot(result)) {
            return;
        }
        else if(this.data.active == false) {
            this.data.active = true;
        }
        if(this.data.active == true) {
            if(this.data.progress < this.getProgressMax()) {
                this.data.progress++;
            } else {
                this.data.energy = Math.max(this.data.energy - 500, 0);
                this.container.setSlot("result_slot", result.id, resultSlot.count + result.count, resultSlot.data, result.extra || resultSlot.extra || null)
                this.decreaseInputSlots();
                this.stop();
            }
        }
    }
}

FormedRecipeFactory.register("circuit").addRecipesFrom(__dir__ + "resources/assets/recipes/circuit");