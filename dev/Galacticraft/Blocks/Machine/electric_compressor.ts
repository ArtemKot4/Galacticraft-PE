
class ElectricCompressor extends InputMachine {
  defaultValues = {
    progress: 0,
    progress_max: 250,
    energy: 0,
    energy_max: 1000,
  };

  public setupRecipeLogic() {
    for (const i in CompressorFactory.storage) {
      const storage = CompressorFactory.storage;
      if (this.data.energy >= (this.data.energy_max / 2) && RecipeFactory.getForMore(this.container, storage[i], 9) && 
      this.data.progress < this.data.progress_max) {
        this.data.progress++;
      };
      if(this.data.progress >= this.data.progress_max) {
        RecipeFactory.decreaseSlots(this.container, 9);
        RecipeFactory.setupResult(this.container, "result_1", storage[i].result);
        RecipeFactory.setupResult(this.container, "result_2", storage[i].result_2 ?? storage[i].result);
        this.data.progress = 0;
        this.data.energy -= this.data.energy_max / 2
      };
      if(World.getThreadTime() % 10 === 0 && this.data.energy > 0) this.data.energy--;
    }
  };

  onTick(): void {
    this.container.sendChanges();
    this.container.validateAll();
this.setupRecipeLogic()
    // battery.add(this.container, this.data, "EnergySlot");
    // battery.addInfinite(this.container, this.data, "EnergySlot");
    this.container.setScale("progressScale", this.data.progress / this.data.progress_max);
    this.container.setScale("ENERGYBar", this.data.energy / 1000);
    this.container.setScale("Energy", this.data.energy / 100);
    if (this.data.energy != 0) {
      this.container.setText(
        "Status",
        Translation.translate("Status: have energy")
      );
    }
    if (this.data.energy == 0) {
      this.container.setText(
        "Status",
        Translation.translate("Status: don't have energy")
      );
    }
    if (this.data.progress > 0) {
      this.container.setText(
        "Status",
        Translation.translate("Status: working")
      );
    }
  }
}

SpacesMachine.registerStandartMachine(
  BlockID.electric_compressor_gj,
  new ElectricCompressor(ElectricCompressorUI)
);