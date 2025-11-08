abstract class ProcessingTile extends ElectricTile {
    public data: Scriptable & { energy: number, progress: number, active: boolean };
    abstract inputSlots: string[];
    abstract outputSlots: string[];

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
        
        const object = this.getFactory().getObject(this.getInputSlots());
        this.onUpdate(object);

        const recipeEnergy = this.getRecipeEnergy();
        if(this.data.energy < recipeEnergy) {
            return;
        }
        if(object == null) {
            this.stop();
            return;
        }  
        if(!this.hasValidOutputSlots(object.output)) {
            return;
        }
        if(this.data.active == false) {
            this.data.active = true;
        }
        else if(this.data.progress < this.getProgressMax()) {
            this.data.progress++;
        } else {
            this.recipeComplete(object);
        }
    }

    public recipeComplete(object: IRecipeStorageFormat<unknown>): void {
        this.data.energy = Math.max(this.data.energy - this.getRecipeEnergy(), 0);
        this.decreaseInputSlots(Object.values(object.input));
        this.setOutput(object.output);
        this.stop();
    }

    public getRecipeEnergy(): number {
        return this.getCapacity() / 3;
    }

    public getSlotsBy(list: string[]): Record<string, ItemInstance> {
        const slots = {};
        for(const i in list) {
            slots[list[i]] = this.container.getSlot(list[i]);
        }
        return slots;
    }

    public getInputSlots(): Record<string, ItemInstance> {
        return this.getSlotsBy(this.inputSlots);
    }

    public getOutputSlots(): Record<string, ItemInstance> {
        return this.getSlotsBy(this.outputSlots);
    }

    public getProgressMax(): number {
        return 250;
    }

    public decreaseInputSlots(input: ItemInstance[]): void {
        for(const i in this.inputSlots) {
            const slot = this.container.getSlot(this.inputSlots[i]);
            this.container.setSlot(this.inputSlots[i], slot.id, slot.count - ((i in input && input[i].count) || 1), slot.data, slot.extra);
        }
    }

    public hasValidOutputSlots(output: ItemInstance[]): boolean {
        for(const i in this.outputSlots) {
            const outputSlot = this.container.getSlot(this.outputSlots[i]);
            const resultMaxStack = Item.getMaxStack(outputSlot.id, outputSlot.data);
            
            if(!(i in output)) {
                output[i] = output[Number(i)-1];
            }
            if(outputSlot.id != 0 && (outputSlot.id != output[i].id || (outputSlot.count + output[i].count > resultMaxStack))) {
                return false;
            }
        }
        return true;
    }

    public setOutput(output: ItemInstance[]): void {
        for(const i in this.outputSlots) {
            const slot = this.container.getSlot(this.outputSlots[i]);
            
            if(!(i in output)) {
                output[i] = output[Number(i) - 1];
            }
            this.container.setSlot(this.outputSlots[i], output[i].id, slot.count + output[i].count, slot.data + output[i].data, output[i].extra || slot.extra || null);
        }
    }

    public stop(): void {
        this.data.active = false;
        this.data.progress = 0;
    }

    public onUpdate(object: Nullable<IRecipeStorageFormat<unknown>>): void {}

    abstract getFactory(): RecipeFactory<unknown>;
}