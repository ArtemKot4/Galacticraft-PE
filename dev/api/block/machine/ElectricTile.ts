abstract class ElectricTile extends CommonTileEntity implements EnergyTile {
    public setupContainer(): void {}

    public onInit(): void {
        this.setupContainer();
    }

    public canReceiveEnergy(side: number, type: string): boolean {
        return true;
    }
    
    public canExtractEnergy(side: number, type: string): boolean {
        return false;
    }

    public getCapacity(): number {
        return 5000;
    }

    public isConductor(type: string): boolean {
        return false;
    }

    public energyTick(type: string, node: EnergyTileNode): void {}

    public energyReceive(type: string, amount: number, voltage: number): number {
        const add = Math.min(amount, this.getCapacity() - this.data.energy);
        this.data.energy += type == Galacticraft.JOULE.name ? add : add / 2;
        return add;
    }
}