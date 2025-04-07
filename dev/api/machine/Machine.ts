abstract class MachineTile extends CommonTileEntity implements EnergyTile {
    public override data = {
        energy: 0
    };
    
    public getEnergyCapacity(): number {
        return 5000;
    };

    public isConductor(type: string): boolean {
        return false;
    };

    public canReceiveEnergy(side: any, type: string): boolean {
        return true;
    };

    public canExtractEnergy(side: any, type: string): boolean {
        return true;
    };

    public energyTick(type: string, src: EnergyTileNode): void {
        // const output = Math.min(1, this.data.energy);
        // this.data.energy += src.add(output) - output;
    };

    public energyReceive(type: string, amount: number, voltage: number): number {
        const add = Math.min(amount, this.getEnergyCapacity() - this.data.energy);
        this.data.energy += add;
        return add;
    };

    public isFullEnergy(): boolean {
        return this.data.energy >= this.getEnergyCapacity();
    };

    // public isWrenchable(): boolean {
    //     return true;
    // };

    // public onItemClick(id: number, count: number, data: number, coords: Callback.ItemUseCoordinates, player: number, extra: ItemExtraData): boolean {
    //     super.onItemClick(id, count, data, coords, player, extra);

    //     if(this.isWrenchable() && Utils.getItemTags(id).includes("wrench")) {
    //         const block = this.blockSource.getBlock(coords.x, coords.y, coords.z);
    //         BlockSource.getDefaultForActor(player).setBlock(coords.x, coords.y, coords.z, block.id, block.data >= 4 ? 1 : block.data + 1);
    //         TileEntity.addTileEntity(this.x, this.y, this.z, this.blockSource);

    //         return true;
    //     };
    // };
};
