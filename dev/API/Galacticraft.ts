const Galacticraft = {
  modid: "galacticraft",
  onInitialize: () => {
    Game.message(String(Ballone.IDList));
    Updatable.addUpdatable(Oxygen);
  },
  onTick: () => {},
};

Callback.addCallback("LevelDisplayed", () => {
  Galacticraft.onInitialize();
});

Callback.addCallback("LocalTick", () => {
  Galacticraft.onTick();
});
