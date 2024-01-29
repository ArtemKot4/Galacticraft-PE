const Galacticraft = {
  modid: "galacticraft",
  onInitialize: () => {
    Game.message(String(Ballone.IDList));
  //  Updatable.addUpdatable(Oxygen);
  },
  onTick: () => {
    Rocket.onTick();
    Thermal.onTick();
  },
};

