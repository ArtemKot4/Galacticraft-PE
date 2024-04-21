
class FuelLoader extends InputMachine {
  defaultValues = {
    energy: 0,
    energy_max: 1000,
    liquid: 0,
  };
 
  onTick(): void {
    this.discharge("EnergySlot");
    this.container.sendChanges();
    this.container.validateAll();

    let canisterFuel = this.container.getSlot("canisterFuel");
    this.container.setScale("Energy", this.data.energy / 1000);
    this.container.setScale("ENERGYBar", this.data.energy / 1000);
    this.container.setScale("FuelScale", this.data.liquid / 40);

    this.container.setText(
      "ELECTRIC",
      "Gj :" + this.data.energy + " / " + this.data.energy_max
    );
    if (
      (canisterFuel.id == ItemID.bucket_of_fuel &&
        this.data.liquid <= 40 &&
        this.data.energy >= 50) ||
      (canisterFuel.id == ItemID.fuel_canister &&
        canisterFuel.data == 6 &&
        this.data.liquid <= 40 &&
        this.data.energy >= 50)
    ) {
      if (canisterFuel.id == ItemID.bucket_of_fuel) {
        this.container.setSlot("canisterFuel", 325, 1, 0);
      } else if (
        canisterFuel.id == ItemID.fuel_canister &&
        canisterFuel.data == 6
      ) {
        this.container.setSlot(
          "canisterFuel",
          ItemID.empty_liquid_canister,
          1,
          0
        );
      }
      this.data.energy -= 50;

      this.data.liquid += 5;
      Bucket.play();
    }

  //  if(rocketActive==true&&fuel<500&&fuel>=0&&this.data.liquid>=1){
  //   fuel++;
  //   this.data.liquid--;
  //  if(rocket_storage.isOpened) rocket_storage.setScale("fuelScale",fuel/500)
  //  }
    
  }

  

}

SpacesMachine.registerStandartMachine(
  BlockID.fuel_loader,
  new FuelLoader(FuelLoaderUI)
)