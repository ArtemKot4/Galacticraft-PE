abstract class MachineStorage extends MachineTile {
    public override defaultValues = {
        energy: 0,
        energyMax: 0
    }

    public data: typeof this.defaultValues;

    public canReceiveEnergy(side, type): boolean {
        return side == 2;
    }
  
    public canExtractEnergy(side, type): boolean {
        return side != 2;
    }
}