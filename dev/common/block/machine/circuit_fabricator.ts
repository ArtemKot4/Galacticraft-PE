


const CircuitFabricatorFactory = new RecipeFactory();

class CircuitFabricator extends InputMachine {
  defaultValues = {
    progress: 0,
    progress_max: 250,

    energy: 0,
    energy_max: 1000,
  };

 public setupRecipeLogic() {
  for (const i in CircuitFabricatorFactory.storage) {
    const storage = CircuitFabricatorFactory.storage;
    if (this.data.energy >= (this.data.energy_max / 2) &&
     RecipeFactory.getForMore(this.container, storage[i], 5) && 
    this.data.progress < this.data.progress_max) {
      this.data.progress++;
    };

    if(this.data.progress >= this.data.progress_max) {
      RecipeFactory.decreaseSlots(this.container, 5);
      RecipeFactory.setupResult(this.container, "result", storage[i].result);
      this.data.progress = 0;
      this.data.energy -= this.data.energy_max / 2
    };
  }
 }

  onTick(): void {
 this.container.validateAll();
 this.container.sendChanges();
   this.setupRecipeLogic();
    status(this.container, this.data)
    this.container.setScale("Energy", this.data.energy / 1000);
    this.container.setScale("Burning", this.data.progress / this.data.progress_max);
    // this.container.setScale("Line3", this.data.progress / 230);
    // this.container.setScale("Line1", this.data.progress / 130);
    // this.container.setScale("Line2", this.data.progress / 30);

    this.container.setScale("ENERGYBar", this.data.energy / this.data.energy_max);
  }
}

SpacesMachine.registerStandartMachine(
  BlockID.circuit_fabricator,
  new CircuitFabricator(CircuitFabricatorUI)
);