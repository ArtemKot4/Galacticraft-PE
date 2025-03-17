abstract class MachineStorage extends MachineTile {
    public override data = {
      energy: 0,
      energy_max: 0,
    };
    public canReceiveEnergy(side, type): boolean {
      return side == 2;
    }
  
    public canExtractEnergy(side, type): boolean {
      return side != 2;
    }
  }