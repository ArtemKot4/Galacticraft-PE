class Refinery extends InputMachine {
  defaultValues = {
    energy: 0,
    energy_max: 500,
    fuel: 0,
    oil: 0,
    liquid_max: 60
  };
  onTick(): void {
    this.discharge("EnergySlot");
    this.container.sendChanges();
    this.container.validateAll();
    this.container.setScale("energy", this.data.energy / this.data.energy_max);
    this.container.setScale("energy_bar", this.data.energy / this.data.energy_max);
    this.container.setScale("oil_scale", this.data.oil / this.data.liquid_max);
    this.container.setScale("fuel_scale", this.data.fuel / this.data.liquid_max);
    this.container.setText(
      "ELECTRIC",
      "gJ :" + this.data.energy + " / " + this.data.energy_max
    );
    
    if (this.data.energy >= 50) {

      if(World.getThreadTime() % 2 === 0) {
        Particles.addParticle(ESpaceParticle.SMOKE, this.x + 0.5, this.y + 1.05, this.z + 0.5, 0, 0.05, 0);
        Particles.addParticle(EParticleType.SMOKE2, this.x + 0.5, this.y + 1.05, this.z + 0.5, 0, 0.05, 0);
      }


      Canister.input({
        slot: "slot_1",
        input: Canister.get("oil"),
        output: ItemID.empty_liquid_canister,
        liquid: "oil"
      },this.container,this.data);
      Canister.output({
        slot: "slot_2",
        input: ItemID.empty_liquid_canister,
        output: Canister.get("fuel"),
        liquid: "fuel"
      },this.container,this.data);

      if(this.data.fuel < this.data.liquid_max && this.data.oil > 0 ){
        this.data.fuel += 1;
        this.data.oil -= 1;
      };
    };
  
 
}
}

SpacesMachine.registerStandartMachine(
  BlockID.refinery_gc,
  new Refinery(RefineryUI)

);
