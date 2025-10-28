abstract class Generator extends Machine {
  public override defaultValues = {
    energy: 0,
    energy_max: 0,
  };
  public canReceiveEnergy(): boolean {
    return false;
  }

  public canExtractEnergy(): boolean {
    return true;
  }
}
