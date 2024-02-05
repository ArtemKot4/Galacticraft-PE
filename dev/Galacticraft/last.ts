IPlanet.oreGeneration();

//Callback.addCallback("LevelDisplayed", () => {
//  Galacticraft.onInitialize();
//});

Callback.addCallback("LocalTick", () => {
  //Galacticraft.onTick();
  VWeatherEvent.onTick()
});

//Callback.addCallback("EntityInteract", (entity) => {
 //  Rocket.onInteract(entity);
//});


ModAPI.registerAPI("GalacticraftAPI", {
  IPlanet: IPlanet,
  DimensionEvent: DimensionEvent,
  GItem: GItem,
  GBlock: GBlock,
  Storage: Storage,
  CableAPI: CableAPI,
  AirCable: AirCable,
  battery: battery,
  oxygenStorage: oxygenStorage,
  SpacesMachine: SpacesMachine,
  PLANETS: PLANETS,
  requireGlobal: function (command) {
    return eval(command);
  },
});