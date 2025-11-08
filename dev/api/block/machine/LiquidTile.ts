abstract class LiquidTile extends MachineTile {
    /**
     * Value is list of slots
     */
    abstract liquids: {
        [name: string]: {
            input?: string[],
            output?: string[]
        } 
    }

    public getLiquidCapacity(): number {
        return 5000;
    }

    public hasFullLiquid(liquidName: string): boolean {
        return this.liquidStorage.getAmount(liquidName) >= this.getLiquidCapacity();
    }

    public override setupContainer(): void {
        StorageInterface.setGlobalValidatePolicy(this.container, (name, id, amount, data, extra, container) => {
            return Object.entries(this.liquids).some(([liquidName, slots]) => ((slots.input || []).includes(name) || (slots.output || []).includes(name)) && liquidName == LiquidRegistry.getItemLiquid(id, data)); 
        });
    }

    public onUpdate(): void {}

    public onTick(): void {
        this.container.validateAll();
        this.container.sendChanges();
        StorageInterface.checkHoppers(this);
    }
}