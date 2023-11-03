abstract class MachineStorage extends Machine {
    defaultValues = {
      energy: 0,
      energyMax: 0,
    };
  
    canReceiveEnergy(side, type): boolean {
      return side == 2;
    }
  
    canExtractEnergy(side, type): boolean {
      return side != 2;
    }
  }