class RefineryTile extends LiquidMachine {
    public onTick(): void {
        const capacity = this.getCapacity();
        const liquidCapacity = this.getLiquidCapacity();
        const oilAmount = this.liquidStorage.getAmount("oil");
        const fuelAmount = this.liquidStorage.getAmount("fuel");

        Battery.chargeMachine(this, "battery_slot");
        this.container.sendChanges();
        this.container.validateAll();
        this.container.setScale("energy_icon", this.data.energy / capacity / 2);
        this.container.setScale("energy_bar", this.data.energy / capacity);
        this.container.setScale("oil_scale", oilAmount / liquidCapacity);
        this.container.setScale("fuel_scale", fuelAmount / liquidCapacity);
    
        this.fillFromSlot("slot_0", "oil");
        this.fillToSlot("slot_1", "fuel");

        if(this.data.energy >= capacity / 2 && fuelAmount < liquidCapacity && oilAmount > 0 ){
            this.liquidStorage.setAmount("fuel", fuelAmount + 1);
            this.liquidStorage.setAmount("oil", oilAmount - 1);
            this.data.energy -= capacity / 2;
        };
    };

    public getScreenByName(): UI.StandartWindow {
        return RefineryUI;
    };
};