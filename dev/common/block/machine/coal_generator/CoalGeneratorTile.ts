class CoalGeneratorTile extends ElectricMachine.TileEntity {
    public override defaultValues = {
        active: false,
        canSpendFuel: false,
        burning: 0,
        burningMax: 0,
        energyTick: 0,
        heat: 0
    };
    public override data: typeof this.defaultValues;

    public override getScreenByName(): UI.IWindow {
        return CoalGeneratorUI;
    }

    public override onInit(): void {
        this.data.active ??= false;
        this.data.canSpendFuel ??= false;
        this.data.burning ??= 0;
        this.data.burningMax ??= 0;
        this.data.energyTick ??= 0;
        this.data.heat ??= 0;
        BurnManager.addSlotPolicy(this);
        this.networkData.addVerifier("has_energy", function(key, value: Object) {
            return (typeof value == "boolean") ? value : null;
        });
    }
    
    public override onLoad(): void {
        this.showEnergyStatus();
        this.sendEnergyStatus();
        
        if(this.canBurn()) {
            BurnManager.burn(this);
        } else {
            this.noupdate = true;
        }
    }

    public override getCapacity(): number {
        return 120;
    }

    public canBurn(): boolean {
        return this.data.active == false && this.data.burning == 0;
    }

    public override onTick(): void {
        if(StorageInterface.checkHoppers(this) == true) {
            const slot = this.container.getSlot("fuel_slot");
            BurnManager.validateTile(this, slot.id, slot.data);
        }
        this.container.validateAll();
        this.container.sendChanges();

        if(this.data.canSpendFuel == true && this.canBurn()) {
            this.data.canSpendFuel = !BurnManager.burn(this);
        }
        if(this.data.active == false) {
            // Java: idle -> heat decays with 0.3/t until zero
            if(this.data.heat > 0) {
                this.data.heat = Math.max(0, this.data.heat - 0.3);
                this.showHeatStatus();
                if(this.data.heat <= 0) {
                    this.clearData();
                    this.showHeatStatus();
                    this.sendEnergyStatus(false);
                    this.noupdate = true;
                }
            } else {
                this.noupdate = true;
            }
            return;
        }
        // Java ramp: heat += max(heat * 0.005, 0.3) while burning, cap MAX (150)
        this.data.heat = Math.min(this.data.heat + Math.max(this.data.heat * 0.005, 0.3), this.getMaxEnergyTick());
        // Java output: additive (heat - MIN) into buffer (does NOT overwrite unextracted energy)
        this.addEnergy(Math.max(0, this.data.heat - this.getMinEnergyTick()), Galacticraft.EnergyTypes.JOULE.name);
        this.showEnergyStatus();
        this.container.setScale("progress_scale", this.data.burningMax > 0 ? this.data.burning / this.data.burningMax : 0);

        if(this.data.burning > 0) {
            this.data.burning--;
        } else {
            this.data.active = BurnManager.burn(this, "burning", "burningMax", false);
            if(this.data.active == true) {
                this.data.canSpendFuel = false;
            } else if(this.data.heat <= 0) {
                this.clearData();
                this.showHeatStatus();
                this.sendEnergyStatus(false);
                this.noupdate = true;
            }
        }
        this.sendEnergyStatus(this.data.heat > this.getMinEnergyTick());
    }

    public showHeatStatus(): void {
        const display = Translation.translate("message.galacticraft.heat") + Math.floor(this.data.heat / this.getMaxEnergyTick() * 100) + "%";
        if(display == this.lastHeatDisplay) {
            return;
        }
        this.lastHeatDisplay = display;
        this.container.setText("energy_display", display);
    }

    public sendEnergyStatus(status?: boolean): void {
        const hasEnergy = status || this.data.heat > this.getMinEnergyTick();
        if(hasEnergy == this.lastHasEnergy) {
            return;
        }
        this.lastHasEnergy = hasEnergy;
        this.networkData.putBoolean("has_energy", hasEnergy);
        this.networkData.sendChanges();
    }

    public showEnergyStatus(): void {
        const display = Math.floor(this.data.heat) + " gJ/T";
        if(display == this.lastEnergyDisplay) {
            return;
        }
        this.lastEnergyDisplay = display;
        this.container.setText("energy_display", display);
    }

    protected lastHasEnergy = false;
    protected lastHeatDisplay = "";
    protected lastEnergyDisplay = "";

    public getMaxEnergyTick(): number {
        return 150;
    }

    public getMinEnergyTick(): number {
        return 30;
    }

    public doEnergy(): void {
        if(this.data.burning > 0) {
            const maxEnergyTick = this.getMaxEnergyTick();
            if(this.data.energyTick < maxEnergyTick && World.getThreadTime() % 2 == 0) {
                this.data.energyTick = Math.min(this.data.energyTick + 1, maxEnergyTick);
            }
            this.setEnergy(Math.max(0, this.data.energyTick - this.getMinEnergyTick()), Galacticraft.EnergyTypes.JOULE.name);
        }
    }

    public validateActive(): boolean {
        return this.data.active = this.data.burning > 0 || BurnManager.isValidFuelSlot(this);
    }

    public decreaseBurning(): void {
        if(this.data.burning > 0) {
            this.data.burning--;
        } else {
            this.data.active = BurnManager.burn(this, "burning", "burningMax", false);
            
            if(this.data.active == true) {
                this.data.canSpendFuel = false;
            } else {
                this.clearData();
                this.showHeatStatus();
                this.sendEnergyStatus(false);
                this.noupdate = true;
            }
        }
    }

    public clearData(): void {
        this.data.heat = 0;
        this.data.energyTick = 0;
        this.setEnergy(0, Galacticraft.EnergyTypes.JOULE.name);
    }
    
    public override getLocalTileEntity(): LocalTileEntity {
        return new LocalCoalGeneratorTile();
    }
}

Translation.addTranslation("message.galacticraft.heat", {
    en: "Heat of machine base: ",
    ru: "Нагрев корпуса: "
});