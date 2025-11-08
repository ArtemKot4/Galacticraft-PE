abstract class MachineTile extends CommonTileEntity implements Partial<EnergyTile> {
    public setupContainer(): void {}
    
    public override onInit(): void {
        return this.setupContainer();
    }

    public getCapacity?(): number;

    public energyTick?(type: string, node: EnergyTileNode): void;
    public energyReceive?(type: string, amount: number, voltage: number): number;
    public isConductor?(type: string): boolean;
    public canReceiveEnergy?(side: number, type: string): boolean;
    public canExtractEnergy?(side: number, type: string): boolean;
    public onUpdate?(...args: unknown[]): void;
}