IPlanet.oreGeneration();

Callback.addCallback("LevelDisplayed", () => {
  Galacticraft.onInitialize();
});

Callback.addCallback("LocalTick", () => {
  //Galacticraft.onTick();
  WeatherEvent.onTick()
});

Callback.addCallback("EntityInteract", (entity) => {
   Rocket.onInteract(entity);
});


ModAPI.registerAPI("GalacticraftAPI", {
  IPlanet: IPlanet,
  GItem: GItem,
  Storage: Storage,
  CableAPI: CableAPI,
  AirCable: AirCable,
  battery: battery,
  oxygenStorage: oxygenStorage,
  SpacesMachine: SpacesMachine,
  requireGlobal: function (command) {
    return eval(command);
  },
});