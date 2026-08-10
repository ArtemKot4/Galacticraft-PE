class CoalGeneratorTile extends GeneratorTile {
    public defaultValues = {
        active: false,
        canSpendFuel: false,
        burning: 0,
        burningMax: 0,
        energyTick: 0,
        heat: 0
    };
    public data: typeof this.defaultValues & { energy: number };

    public override getScreenByName(): UI.IWindow {
        return CoalGeneratorUI;
    }

    public override setupContainer(): void {
        BurnManager.addSlotPolicy(this);
    }
    
    public override onLoad(): void {
        this.showEnergyStatus();
        if(this.canBurn()) {
            BurnManager.burn(this);
        } else this.noupdate = true;
    }

    public getCapacity(): number {
        return 120;
    }

    public canBurn(): boolean {
        return this.data.active == false && this.data.burning == 0;
    }

    public override onTick(): void {
        StorageInterface.checkHoppers(this);
        this.container.sendChanges();

        if(this.data.canSpendFuel == true && this.canBurn()) {
            this.data.canSpendFuel = !BurnManager.burn(this);
        }
        if(this.data.active == false) return; 
        if(this.data.heat <= 100) {
            if(this.data.heat == 100) {
                this.sendEnergyStatus(true);
            }
            this.showHeatStatus();
            if(World.getThreadTime() % 3 == 0) this.data.heat += 1;
            return;
        }
        this.showEnergyStatus();
        this.doEnergy();
        this.decreaseBurning();
    }

    public showHeatStatus(): void {
        this.container.setText("energy_display", Translation.translate("message.galacticraft.heat") + this.data.heat + "%");
    }

    public sendEnergyStatus(status: boolean): void {
        this.networkData.putBoolean("has_energy", status || this.data.energyTick > 0);
        this.networkData.sendChanges();
    }

    public showEnergyStatus(): void {
        this.container.setText("energy_display", this.data.energyTick + " gJ/T");   
    }

    public getMaxEnergyTick(): number {
        return 120;
    }

    public doEnergy(): void {
        if(this.data.burning > 0) {
            const maxEnergyTick = this.getMaxEnergyTick();
            if(this.data.energyTick < maxEnergyTick && World.getThreadTime() % 2 == 0) {
                this.data.energyTick = Math.min(this.data.energyTick + 1, maxEnergyTick);
            }
            this.data.energy = this.data.energyTick;
        }
    }

    public validateActive(): boolean {
        return this.data.active = this.data.burning > 0 || BurnManager.isValidFuel(this);
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
        this.data.energy = 0;
        this.data.energyTick = 0;
    }
    
    public override getLocalTileEntity(): LocalTileEntity {
        return new LocalCoalGeneratorTile();
    }
}

Translation.addTranslation("message.galacticraft.heat", {
    en: "Heat machine base: ",
    ru: "Нагрев корпуса: "
});