const Galacticraft = {
  modid: "galacticraft",
  onInitialize: () => {
    Game.message(String(Ballone.IDList));
    Updatable.addUpdatable(Oxygen);
  },
  onTick: () => {
    Rocket.onTick();
    Thermal.onTick();
  },
};

Callback.addCallback("LevelDisplayed", () => {
  Galacticraft.onInitialize();
});

Callback.addCallback("LocalTick", () => {
  Galacticraft.onTick();
});

Callback.addCallback("EntityInteract", (entity) => {
   Rocket.onInteract(entity);
});
