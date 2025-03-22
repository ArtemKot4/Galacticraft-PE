class FuelLoaderTile extends LiquidMachine {
    public onTick(): void {
        const capacity = this.getEnergyCapacity();
        const liquidCapacity = this.getLiquidCapacity();
        const fuelAmount = this.liquidStorage.getAmount("fuel");

        Battery.chargeMachine(this, "battery_slot");
        this.container.sendChanges();
        this.container.validateAll();
        this.container.setScale("energy_icon", this.data.energy / capacity / 2);
        this.container.setScale("energy_bar", this.data.energy / capacity);
        this.container.setScale("fuel_scale", fuelAmount / liquidCapacity);

        UIHelper.Machine.setEnergyDisplay(this);
    
        this.fillFromSlot("input_slot", "fuel");
        this.fillRocket();
    };

    public getScreenByName(): UI.StandartWindow {
        return FuelLoaderUI;
    };

    public findRocket(): unknown {
        return "null yet"
    };

    public fillRocket() {
        if(this.data.energy < this.getEnergyCapacity() / 2) return;
    };
};
