class RefineryTile extends ElectricMachine.TileEntity {
    public override getScreenByName(screenName?: string, container?: ItemContainer): UI.IWindow {
        return RefineryUI;
    }

    public override onTick(): void {
        const tier = this.getPowerTier ? this.getPowerTier() : 1;
        const energyCost = tier > 1 ? 90 : 120;

        if(this.data.energy < energyCost) {
            return;
        }
        const oilAmount = this.liquidStorage.getAmount("oil");
        if(oilAmount <= 0) {
            return;
        }
        const fuelLimit = this.liquidStorage.getLimit("fuel");
        const fuelAmount = this.liquidStorage.getAmount("fuel");

        if(fuelAmount >= fuelLimit) {
            return;
        }
        if(tier <= 1 && World.getThreadTime() % 2 != 0) {
            return;
        }
        const amount = Math.min(Math.min(oilAmount, fuelLimit - fuelAmount), 1);

        if(amount <= 0) {
            return;
        }
        this.data.energy = Math.max(0, this.data.energy - energyCost);
        this.liquidStorage.setAmount("fuel", fuelAmount + amount);
        this.liquidStorage.setAmount("oil", oilAmount - amount);
    }
}