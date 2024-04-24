
Block.registerPlaceFunction(
  "basic_solar_panel",
  function (coords, item, block, player) {
    const region = BlockSource.getDefaultForActor(player);
    const spaces = coords.relative;

    region.setBlock(spaces.x, spaces.y, spaces.z, BlockID["basic_solar_panel"], block.data);
    region.setBlock(
      spaces.x,
      spaces.y + 1,
      spaces.z,
      BlockID["solar_panel_gc"],
      0
    );
  }
);


class SolarPanel extends Generator {
  defaultValues = {
    energy: 0,
    energy_max: 5000,
  };
  
  onTick(): void {
    const light = this.blockSource.getLightLevel(this.x, this.y + 1, this.z);
    this.container.sendChanges();
    this.container.validateAll();

    this.container.setScale("sunscale", this.data.energy / 10);
    this.container.setScale(
      "ENERGYBar",
      this.data.energy / this.data.energy_max
    );
    this.container.setScale("Energy", this.data.energy / 100);
    if (this.data.energy >= 5000) {
      this.container.setText(
        "Status",
        Translation.translate("Status: storage full")
      );
    }
    this.container.setText(
      "EnergyText",
      "Sj :" + this.data.energy + " / " + this.getCapacity()
    );

    if (
      World.getThreadTime() % 1 == 0 &&
      light == 15 &&
      this.data.energy != this.data.energy_max
    ) {
      this.data.energy += 1;
    }
    if (light >= 2) {
      this.container.setText(
        "LightLevel",
        Translation.translate("Light: normal")
      );
      this.container.setText(
        "Status",
        Translation.translate("Status: working")
      );
    }
    if (
      World.getThreadTime() % 60 == 0 &&
      light <= 1 &&
      this.data.energy <= 1
    ) {
      if (__config__.getBool("Difficulty.Machine.PanelDischarging") == true) {
        this.data.energy -= 1;
      }
      this.container.setText(
        "Status",
        Translation.translate("Status: waiting")
      );
      this.container.setText("LightLevel", Translation.translate("Light: few"));
    }
  };
  destroy(): boolean {
    this.blockSource.setBlock(this.x, this.y + 1, this.z, 0, 0);
    return false;
  }
}

SpacesMachine.registerStandartMachine(
  BlockID.basic_solar_panel,
  new SolarPanel(BasicSolarPanelUI)
);
