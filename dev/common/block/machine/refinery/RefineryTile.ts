class RefineryTile extends MachineTile {
    public override getScreenByName(screenName?: string, container?: ItemContainer): UI.IWindow {
        return RefineryUI;
    }

    public override onTick(): void {
        if(this.data.energy <= 5) {
            return;
        }
        const oilAmount = this.liquidStorage.getAmount("oil");
        if(oilAmount < 5) {
            return;
        } 
        const fuelAmount = this.liquidStorage.getAmount("fuel");

        if(fuelAmount < this.liquidStorage.getLimit("fuel")) {
            this.data.energy = Math.max(0, this.data.energy - 5);
            this.liquidStorage.setAmount("fuel", fuelAmount + 5);
            this.liquidStorage.setAmount("oil", oilAmount - 5);
        }
    }
}