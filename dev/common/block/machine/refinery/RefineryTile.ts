class RefineryTile extends LiquidTile {
    public override liquids = {
        oil: {
            input: ["oil_slot"]
        },
        fuel: {
            output: ["fuel_slot"]
        }
    };

    public override getScreenByName(screenName?: string, container?: ItemContainer): UI.IWindow {
        return RefineryUI;
    }

    public override onUpdate(): void {
        const oilAmount = this.liquidStorage.getAmount("oil");
        const fuelAmount = this.liquidStorage.getAmount("fuel");
        const liquidCapacity = this.getLiquidCapacity();
        this.container.setScale("oil_scale", oilAmount / liquidCapacity);
        this.container.setScale("fuel_scale", fuelAmount / liquidCapacity);

        if(fuelAmount < liquidCapacity && oilAmount > 0 && this.data.energy >= 5) {
            this.data.energy = Math.max(0, this.data.energy - 5);
            this.liquidStorage.setAmount("fuel", fuelAmount + 1);
            this.liquidStorage.setAmount("oil", oilAmount - 1);
        }
    }
}