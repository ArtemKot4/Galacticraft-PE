abstract class MachineTile extends CommonTileEntity implements EnergyModule {
    public container: ItemContainer;
    public override useNetworkItemContainer = true;

    public getScreenByName(): UI.StandartWindow {
        return new UI.StandardWindow();
    };

    public override data = {
        energy: 0
    };
    
    public getCapacity(): number {
        return 5000;
    };

    public energyTick(type: string, src: EnergyTileNode): void {
        let output = Math.min(1, this.data.energy);
        this.data.energy += src.add(output) - output;
    };

    public energyReceive(type: string, amount: number, voltage: number): number {
        const add = Math.min(Math.min(amount, this.getCapacity() / 2), this.getCapacity() - this.data.energy);
        this.data.energy += add;
        return add;
    };
};
