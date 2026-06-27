abstract class ProcessingTile extends MachineTile {
    public data: Scriptable & { energy: number, progress: number, active: boolean };
    abstract inputSlots: string[];
    abstract outputSlots: string[];
    public currentRecipeIndex: string;
    public currentRecipe: ReturnType<typeof RecipeFactory.prototype.getRecipe>;

    public override onInit(): void {
        super.onInit();
        this.data.active = this.data.active || false;
        this.data.progress = this.data.progress || 0;
    }

    public override onTick(): void {
        this.container.validateAll();
        this.container.sendChanges();
        StorageInterface.checkHoppers(this);
        this.container.setScale("progress_scale", this.data.progress / this.getProgressMax());
        this.onUpdate();

        if(this.data.energy < this.getRecipeEnergy() || this.data.active == false) {
            return;
        }
        else if(this.data.progress < this.getProgressMax()) {
            this.data.progress++;
        } else {
            this.recipeComplete();
        }
    }

    public setActiveIfNeeded(additionalSlotStorage: Record<string, ItemInstance> = {}): void {
        if(this.validateRecipe(additionalSlotStorage)) {   
            this.data.active = this.hasValidOutputSlots();
        }
    }

    public getSlot(name: string, additionalSlotStorage: Record<string, ItemInstance> = {}) {
        if(name in additionalSlotStorage) {
            return new ItemStack(additionalSlotStorage[name]);
        }
        return this.container.getSlot(name);
    }

    /**
     * @returns recipe is null or not
     */
    public validateRecipe(additionalSlotStorage: Record<string, ItemInstance> = {}): boolean {
        if((this.currentRecipe = this.getFactory().getRecipe({
            inputSlots: this.inputSlots, currentRecipeIndex: this.currentRecipeIndex, getSlot: (name: string) => this.getSlot(String(name), additionalSlotStorage)
        })) == null) {
            this.stop();
            return false;
        }
        return true;
    }

    public recipeComplete(): void {
        this.data.energy = Math.max(this.data.energy - this.getRecipeEnergy(), 0);
        this.decreaseInputSlots();
        this.setOutput();
        this.stop();
        this.setActiveIfNeeded();
    }

    public getRecipeEnergy(): number {
        return this.getCapacity() / 3;
    }

    public getProgressMax(): number {
        return 220;
    }

    public decreaseInputSlots(): void {
        let index = -1;

        for(const i in this.inputSlots) {
            const slot = this.container.getSlot(this.inputSlots[i]);
            if(slot.isEmpty()) {
                continue;
            }
            index++;
            const input = this.currentRecipe.input[i] || this.currentRecipe.input[index] || {};
            this.container.setSlot(this.inputSlots[i], slot.id, slot.count - (input.count || 1), slot.data, slot.extra);
        }
    }

    public hasValidOutputSlots(): boolean {
        let validOutputStack = null;

        for(const outputKey in this.outputSlots) {
            const slot = this.getSlot(this.outputSlots[outputKey]);
            const outputStack = this.currentRecipe.output[outputKey];
            
            if(outputStack != null) {
                validOutputStack = outputStack;
            }
            if(!slot.isEmpty() && !ItemStack.contains(slot, validOutputStack)) {
                return false;
            }
        }
        return true;
    }

    public setOutput(): void {
        let validOutputStack = null;
        
        for(const index in this.outputSlots) {
            const slot = this.container.getSlot(this.outputSlots[index]);
            const outputStack = this.currentRecipe.output[index] || validOutputStack;

            if(outputStack != null) {
                validOutputStack = outputStack;
            }
            this.container.setSlot(this.outputSlots[index], validOutputStack.id, slot.count + validOutputStack.count, slot.data + validOutputStack.data, validOutputStack.extra || slot.extra);
        }
    }

    public stop(): void {
        this.data.active = false;
        this.data.progress = 0;
    }

    public onLoad(): void {
        this.setActiveIfNeeded();
    }

    public onUpdate(): void {}

    abstract getFactory(): RecipeFactory<unknown>;
}