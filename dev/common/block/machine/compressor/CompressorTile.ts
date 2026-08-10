class CompressorTile extends ProcessingTile {
    public override defaultValues = {
        energy: 0,
        energyMax: 0,
        canSpendFuel: false
    };

    public override data: typeof ProcessingTile.prototype.data & typeof this.defaultValues;

    public override inputSlots: string[] = MathHelper.range(1, 10).map(v => "slot_" + v);

    public override outputSlots: string[] = [
        "result_slot"
    ];

    public override getScreenByName(screenName?: string, container?: ItemContainer): UI.IWindow {
        return CompressorUI;
    }

    public override getFactory(): UnformedRecipeFactory {
        return RecipeFactory.get<UnformedRecipeFactory>("compressor");
    }

    public override spendEnergyCommon(): void {
        this.data.energy = Math.max(0, this.data.energy - 1);
    }

    public override spendRecipeEnergy(): void {};

    public override processTick() {
        super.processTick();
        this.container.setScale("burning_scale", this.data.energy / this.data.energyMax);
        
        if(this.data.energy == 0 && this.data.canSpendFuel == true) {
            BurnManager.burn(this, "energy", "energyMax", false);
            this.data.canSpendFuel = BurnManager.isValidFuel(this);
            alert("беру топливо")
        }
        return;
    }
    
    protected override needClearProgress(): boolean {
        return this.data.energy == 0 || this.data.active == false;
    }

    public override setupContainer(): void {
        BurnManager.addSlotPolicy(this);
    }
}