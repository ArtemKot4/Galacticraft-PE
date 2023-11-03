abstract class Generator extends Machine {
  defaultValues = {
    energy: 0,
    energyMax: 0,
  };
  canReceiveEnergy(): boolean {
    return false;
  }

  canExtractEnergy(): boolean {
    return true;
  }
}
