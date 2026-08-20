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
        const fuelLimit = this.liquidStorage.getLimit("fuel");
        const oilLimit = this.liquidStorage.getLimit("oil");

        if(fuelAmount < fuelLimit && oilAmount > 0) {
            this.data.energy = Math.max(0, this.data.energy - 5);
            this.liquidStorage.setAmount("fuel", fuelAmount + 5);
            this.liquidStorage.setAmount("oil", oilAmount - 5);
        }

        if(World.getThreadTime() % 20 == 0) {
            Game.message(this.data.energy);
        }
    }
}