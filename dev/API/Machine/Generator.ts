abstract class Generator extends Machine {
  public override defaultValues = {
    energy: 0,
    energyMax: 0,
  };
  public canReceiveEnergy(): boolean {
    return false;
  }

  public canExtractEnergy(): boolean {
    return true;
  }
}
