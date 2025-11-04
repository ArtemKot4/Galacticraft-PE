abstract class ProcessingTile extends ElectricTile {
    public override setupContainer(): void {
        const outputSlots = this.getOutputSlotNames();
        StorageInterface.setGlobalValidatePolicy(this.container, (name, id, amount, data) => {
            return outputSlots.includes(name) || this.getFactory().storage.some((recipe) => id == recipe.input[name].id);
        });
        outputSlots.forEach(name => this.container.setSlotAddTransferPolicy(name, () => 0));
    }

    public override onTick(): void {
        this.container.validateAll();
        this.container.sendChanges();
        this.setupWindowContent();
        StorageInterface.checkHoppers(this);

        const recipeEnergy = this.getRecipeEnergy();
        if(this.data.energy < recipeEnergy) {
            return;
        }
        const results = this.getFactory().getResults(this.getInputSlots());
        if(results == null) {
            this.stop();
            return;
        }  
        if(!this.isValidResultSlots(results)) {
            return;
        }
        else if(this.data.active == false) {
            this.data.active = true;
        }
        if(this.data.active == true) {
            if(this.data.progress < this.getProgressMax()) {
                this.data.progress++;
            } else {
                this.data.energy = Math.max(this.data.energy - recipeEnergy, 0);
                this.setResults(results);
                this.decreaseInputSlots();
                this.stop();
            }
        }
    }

    public getRecipeEnergy(): number {
        return this.getCapacity() / 3;
    }

    public getInputSlots(): Record<string, ItemInstance> {
        const input = this.getInputSlotNames();
        const slots = {};
        for(const i in input) {
            slots[input[i]] = this.container.getSlot(input[i]);
        }
        return slots;
    }

    public getOutputSlots(): Record<string, ItemInstance> {
        const output = this.getOutputSlotNames();
        const slots = {};
        for(const i in output) {
            slots[output[i]] = this.container.getSlot(output[i]);
        }
        return slots;
    }

    public setupWindowContent(): void {}

    public getProgressMax(): number {
        return 250;
    }

    public decreaseInputSlots(): void {
        const slots = this.getInputSlots();

        for(const i in slots) {
            const slot = slots[i];
            this.container.setSlot(i, slot.id, slot.count - 1, slot.data, slot.extra);
        }
    }

    public isValidResultSlots(results: ItemInstance[]): boolean {
        const slots = this.getOutputSlotNames();
        for(const i in slots) {
            const resultSlot = this.container.getSlot(slots[i]);
            const resultMaxStack = Item.getMaxStack(resultSlot.id, resultSlot.data);
    
            if(resultSlot.id != 0 && (resultSlot.id != results[i].id || (resultSlot.count + results[i].count > resultMaxStack))) {
                return false;
            }
        }
        return true;
    }

    public setResults(results: ItemInstance[]): void {
        const slots = this.getOutputSlotNames();

        for(const i in slots) {
            const slot = this.container.getSlot(slots[i]);
            this.container.setSlot(slots[i], results[i].id, slot.count + results[i].count, slot.data + results[i].data, results[i].extra || slot.extra || null);
        }
    }

    public stop(): void {
        this.data.active = false;
        this.data.progress = 0;
    }

    abstract getFactory(): RecipeFactory<unknown>;
    abstract getInputSlotNames(): string[];
    abstract getOutputSlotNames(): string[];
}