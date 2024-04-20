
class Refinery extends InputMachine {
  defaultValues = {
    energy: 0,
    energyMax: 500,
    fuel: 0,
    oil: 0,
  };
  onTick(): void {
    this.discharge("EnergySlot");
    this.container.sendChanges();
    this.container.validateAll();

    this.container.setScale("energy", this.data.energy / 500);
    this.container.setScale("energy_bar", this.data.energy / 500);
    this.container.setScale("oil_scale", this.data.oil / 40);
    this.container.setScale("fuel_scale", this.data.fuel / 40);
    this.container.setText(
      "ELECTRIC",
      "Gj :" + this.data.energy + " / " + this.data.energyMax
    );
    
    if (this.data.energy >= 50) {
      Canister.input("canister_1","oil",this.container,this.data);
      Canister.output("canister_2","fuel",this.container,this.data)
      if(this.data.fuel < 40 && this.data.oil >= 5 ){
        this.data.fuel +=5;
        this.data.oil -=5;
      };
    };
  
 
}
}

SpacesMachine.registerStandartMachine(
  BlockID.refinery_sc,
  new Refinery(RefineryUI)

);
