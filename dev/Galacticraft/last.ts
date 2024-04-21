IPlanet.oreGeneration();

//Callback.addCallback("LevelDisplayed", () => {
//  Galacticraft.onInitialize();
//});

//Callback.addCallback("EntityInteract", (entity) => {
 //  Rocket.onInteract(entity);
//});


ModAPI.registerAPI("GalacticraftAPI", {
  Atmosphere: Atmosphere,
  GItem: GItem,
  GBlock: GBlock,
  battery: Battery,
  SpacesMachine: SpacesMachine,
  requireGlobal: function (command) {
    return eval(command);
  },
});