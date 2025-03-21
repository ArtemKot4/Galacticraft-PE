abstract class MachineTile extends CommonTileEntity implements EnergyTile {
    public container: ItemContainer;
    public override useNetworkItemContainer = true;

    public getScreenByName(): UI.StandartWindow {
        return new UI.StandardWindow();
    };

    public getScreenName(): string {
        return "main";
    };

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
};
