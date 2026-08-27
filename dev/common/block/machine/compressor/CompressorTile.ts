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

    public override getFactory(): RecipeModule.UnformedFactory {
        return RecipeModule.getFactory<RecipeModule.UnformedFactory>("compressor");
    }

    public override spendEnergyCommon(): void {
        this.data.energy = Math.max(0, this.data.energy - 1);
    }

    public override spendRecipeEnergy(): void {};

    public override insideTick(addedHopperItem: boolean) {
        super.insideTick();
        if(addedHopperItem == true) {
            const slot = this.container.getSlot("fuel_slot");
            BurnManager.validateTile(this, slot.id, slot.data);
        }
        this.container.setScale("burning_scale", this.data.energy / this.data.energyMax);
        
        if(this.data.energy == 0) {
            let hasEnergy = false;
            if(this.data.canSpendFuel == true) {
                if(BurnManager.burn(this, "energy", "energyMax", false)) {
                    hasEnergy = true;
                }
                this.data.canSpendFuel = BurnManager.isValidFuelSlot(this);
            }
            this.networkData.putBoolean("has_energy", hasEnergy);
            this.networkData.sendChanges();
        }
        return;
    }
    
    public override clearProgressIfWrong(): boolean {
        if(this.data.energy == 0 || this.data.active == false) {
            this.data.progress = 0;
            return true;
        }
    }

    public override onInit(): void {
        BurnManager.addSlotPolicy(this);
    }

    public override getLocalTileEntity(): LocalTileEntity {
        return new LocalCoalGeneratorTile();
    }
}