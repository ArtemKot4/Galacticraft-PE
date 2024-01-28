abstract class MachineStorage extends Machine {
    public override defaultValues = {
      energy: 0,
      energyMax: 0,
    };
    public canReceiveEnergy(side, type): boolean {
      return side == 2;
    }
  
    public canExtractEnergy(side, type): boolean {
      return side != 2;
    }
  }