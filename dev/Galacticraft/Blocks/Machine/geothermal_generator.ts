

class GeothermalGenerator extends Generator {
  defaultValues = {
    energy: 0,
    energyMax: 3000,
    spouts: 1,
  };
  destroy(): any {
    if (this.data.energy >= 2950) {
      this.blockSource.explode(this.x, this.y, this.z, 1, true);
    }
  }
  onTick(): void {
    this.container.sendChanges();
    this.container.validateAll();
    this.container.setScale("geoscale", this.data.energy / this.data.energyMax);

    this.container.setText(
      "EnergiA",
      "Gj :" + this.data.energy + " / " + this.data.energyMax
    );

    var tile = TileEntity.getTileEntity(
      this.x,
      this.y - 1,
      this.z,
      this.blockSource
    );
    if (
      tile &&
      this.blockSource.getBlockId(this.x, this.y - 1, this.z) ==
        BlockID.venus_spout &&
      World.getThreadTime() % 1 == 0 &&
      this.data.energy != this.data.energyMax
    ) {
      if (tile.data.spout == 0) {
        this.data.energy++;
        if (__config__.getBool("Gameplay.Special_Effects") == true) {
          Particles.addParticle(
            spouticle,
            this.x + 0.4,
            this.y + 1,
            this.z + 0.4,
            Math.random() / 20,
            Math.random() / 20,
            Math.random() / 20
          );
        }
      }
    }
    if (
      !tile &&
      World.getThreadTime() % 100 == 0 &&
      __config__.getBool("Difficulty.Machine.GeothermalDischarging") == true && this.data.energy>0
    ) {
      this.data.energy -= 1;
    }
  }
}

SpacesMachine.registerStandartMachine(
  BlockID.geothermal_generator_gc,
  new GeothermalGenerator(GeothermalGeneratorUI));