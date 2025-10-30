class CoalGeneratorTile extends GeneratorTile {
    public defaultValues = {
        energy: 0,
        burning: 0,
        burningMax: 0
    }

    public data: typeof this.defaultValues;

    public override getScreenByName(): UI.IWindow {
        return CoalGeneratorUI;
    }

    public override setupContainer(): void {
        StorageInterface.setSlotValidatePolicy(this.container, "coal_slot", (name, id, amount, data) => {
            return Recipes.getFuelBurnDuration(id, data) != 0;
        });
    }

    public sendEnergyStatus(): void {
        this.networkData.putBoolean("has_energy", this.data.energy > 0);
        this.networkData.sendChanges();
    }
    
    public override onLoad(): void {
        this.sendEnergyStatus();
    }

    public override onTick(): void {
        StorageInterface.checkHoppers(this);

        this.sendEnergyStatus();
        this.container.validateSlot("coal_slot");
        this.container.sendChanges();

        const capacity = this.getCapacity();
        const slot = this.container.getSlot("coal_slot");
        const burningDuration = Recipes.getFuelBurnDuration(slot.id, slot.data);

        if(this.data.burning > 0 && !this.isFullEnergy()) {
            this.data.energy = Math.min(this.data.energy + 1, capacity);
            this.data.burning--;
        }
        if(this.data.burning == 0 && burningDuration != 0 && this.data.energy < capacity) {
            this.data.burning = this.data.burningMax = burningDuration;
            this.container.setSlot("coal_slot", slot.id, slot.count - 1, slot.data);
        }
        if(World.getThreadTime() % 60 == 0 && this.isFullEnergy() && this.data.burning > 0) {
            this.data.burning--;
        }
        this.container.setScale("progress_scale", this.data.energy / capacity);
        this.container.setText("energy_display", this.data.energy + " / " + this.getCapacity() + " gJ");   
    }
    
    public override getLocalTileEntity(): LocalTileEntity {
        return new LocalCoalGeneratorTile();
    }
}