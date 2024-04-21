
function status(container: ItemContainer, data: TileEntityBase["data"]): void {
  if (data.progress && data.progress > 0)
    return container.setText(
      "Status",
      Translation.translate("Status: working")
    );

  if (data.energy > 0) {
    return container.setText(
      "Status",
      Translation.translate("Status: have energy")
    );
  } else {
    return container.setText(
      "Status",
      Translation.translate("Status: don't have energy")
    );
  }
}

const CompressorFactory = new RecipeFactory();

function setupCompressorRecipe(obj) {
  obj = obj || {};
  for(let i = 1; i <= 9; i++) {
  obj["slot_" + i] = obj["slot_" + i] || { id: 0, count: 1, data: 0 }
  }
 CompressorFactory.set(obj)
}

class Compressor extends Machine {
  public defaultValues = {
    energy: 0,
    energy_max: 500,
    progress: 0,
    progressMax: 500,
    burning: 0,
    burning_max: 1000,
    active: false,
  };
  public setupRecipeLogic() {
    for (const i in CompressorFactory.storage) {
      const storage = CompressorFactory.storage;
      // if(this.data.progress > 0 && !RecipeFactory.getForMore(this.container, storage[i], 9)) {
      //   this.data.progress = 0;
      // };
      if (this.data.energy >= (this.data.energy_max / 2) &&
       RecipeFactory.getForMore(this.container, storage[i], 9) && 
      this.data.progress < this.data.progressMax) {
        this.data.progress++;
      };
      if(this.data.progress >= this.data.progressMax) {
        RecipeFactory.decreaseSlots(this.container, 9);
        RecipeFactory.setupResult(this.container, "result", storage[i].result);
        this.data.progress = 0;
        this.data.energy -= this.data.energy_max / 2
      };
    
      if(World.getThreadTime() % 10 === 0 && this.data.energy > 0) this.data.energy--;
    }
  };
  public onTick(): void {
    this.container.sendChanges();
    this.container.validateAll();
    this.container.setScale("progressScale", this.data.progress / this.data.progressMax);
    this.container.setScale("BurningScale", this.data.energy / this.data.energy_max);
    status(this.container, this.data)
    CoalGenerator.isCoal("coal_slot", this.container, this.data);
   this.setupRecipeLogic();
  }
 
}

TileEntity.registerPrototype(
  BlockID.compressor_gj,
  new Compressor(CompressorUI)
);