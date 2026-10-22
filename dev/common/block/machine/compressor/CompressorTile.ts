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

    public override getProgressMax(): number {
        return 200;
    }

    public override spendEnergyCommon(): void {
        if(this.data.active != true) {
            return;
        }
        this.data.energy = Math.max(0, this.data.energy - 1);
    }

    public override spendRecipeEnergy(): void {};

    // C19 (P1): taxa de 75/tick din ProcessingTile.doProgress e modelul mașinilor electrice (F2);
    // basicul consumă combustibilul doar prin spendEnergyCommon (−1/tick) — paritate Java (1 tick/op).
    public override getRecipeEnergyPerTick(): number {
        return 0;
    }

    public override insideTick(addedHopperItem: boolean) {
        super.insideTick();
        if(addedHopperItem == true) {
            const slot = this.container.getSlot("fuel_slot");
            BurnManager.validateTileVanilla(this, slot.id, slot.data);
        }
        // C28: gard pentru 0/0 (energyMax=0 înainte de prima aprindere) — altfel binding NaN.
        this.container.setScale("burning_scale", this.data.energyMax > 0 ? this.data.energy / this.data.energyMax : 0);
        
        if(this.data.energy == 0) {
            let hasEnergy = false;
            if(this.data.canSpendFuel == true && this.data.active == true) {
                if(BurnManager.burnVanilla(this)) {
                    hasEnergy = true;
                }
                this.data.canSpendFuel = BurnManager.getVanillaFuelBurnDuration(this.container.getSlot("fuel_slot").id, this.container.getSlot("fuel_slot").data) > 0;
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
        super.onInit();
        this.data.energy ??= 0;
        this.data.energyMax ??= 0;
        this.data.canSpendFuel ??= false;
        BurnManager.addSlotPolicyVanilla(this);
        this.networkData.addVerifier("has_energy", function(key, value) {
            return (typeof value == "boolean") ? value : null;
        });
    }

    public override onLoad(): void {
        super.onLoad();
        this.networkData.putBoolean("has_energy", this.data.energy > 0);
        this.networkData.sendChanges();
    }
}