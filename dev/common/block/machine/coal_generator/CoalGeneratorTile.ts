//короче тут оказывается есть нагрев до 100%, нужно реализовать. При нагреве вырабатывается 120 энергии в тик (нарастание на примерно 4 единицы в секунду)

class CoalGeneratorTile extends GeneratorTile {
    public defaultValues = {
        active: false,
        canDecreaseItem: false,
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
        this.container.setSlotAddTransferPolicy("coal_slot", (container, str, id, count, data) => {
            const burningDuration = Recipes.getFuelBurnDuration(id, data);
            if(burningDuration != 0) {
                this.data.canDecreaseItem = true;
                return Item.getMaxStack(id, data);
            }
            return 0;
        });
    }
    
    public override onLoad(): void {
        this.showEnergyStatus();
        if(this.canBurn()) {
            this.burn();
        }
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

        if(World.getThreadTime() % 40 == 0) {
            Game.message("\n\nгенератор: \n" + JSON.stringify(this.data));
        }

        if(this.data.canDecreaseItem == true && this.canBurn()) {
            this.data.canDecreaseItem = !this.burn();
        }
        if(!this.data.active) return; 
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
            if(this.data.energyTick < maxEnergyTick && World.getThreadTime() % 4 == 0) {
                this.data.energyTick = Math.min(this.data.energyTick + 4, maxEnergyTick);
            }
            this.data.energy = this.data.energyTick;
            this.data.burning--;
        }
    }

    public burn(burningDuration?: number): boolean {
        const slot = this.container.getSlot("coal_slot");
        burningDuration ??= Recipes.getFuelBurnDuration(slot.id, slot.data);
        
        if(burningDuration != 0 && this.data.energyTick == 0) {
            this.data.burning = this.data.burningMax = burningDuration;
            this.data.active = true;
            this.container.setSlot("coal_slot", slot.id, slot.count - 1, slot.data);
            this.container.validateSlot("coal_slot");
            return true;
        }
        return false;
    }

    public isValidFuel(): boolean {
        const slot = this.container.getSlot("coal_slot");
        return Recipes.getFuelBurnDuration(slot.id, slot.data) != 0;
    }

    public validateActive(): boolean {
        return this.data.active = this.data.burning > 0 || this.isValidFuel();
    }

    public decreaseBurning(): void {
        if(World.getThreadTime() % 60 != 0) return;

        if(this.data.burning > 0) {
            this.data.burning--;
        } else {
            if(this.data.canDecreaseItem = !(this.data.active = this.burn())) {
                this.clearData();
                this.showEnergyStatus();
                this.sendEnergyStatus(false);
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
    en: "Heat: ",
    ru: "Нагрев: "
});