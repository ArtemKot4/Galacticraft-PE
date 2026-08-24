abstract class MachineTile extends CommonTileEntity implements Partial<EnergyTile> {
    public energyTick?(type: string, node: EnergyTileNode): void;
    public energyReceive?(type: string, amount: number, voltage: number): number;
    public isConductor?(type: string): boolean;
    public canReceiveEnergy?(side: number, type: string): boolean;
    public canExtractEnergy?(side: number, type: string): boolean;
}