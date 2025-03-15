IPlanet.oreGeneration();

//Callback.addCallback("LevelDisplayed", () => {
//  Galacticraft.onInitialize();
//});

//Callback.addCallback("EntityInteract", (entity) => {
//  Rocket.onInteract(entity);
//});

ModAPI.registerAPI("GalacticraftAPI", {
    Atmosphere: Atmosphere,
    GalacticraftItem,
    GalacticraftBlock,
    battery: Battery,
    SpacesMachine: SpacesMachine,
    requireGlobal: function (command) {
        return eval(command);
    },
});

namespace BlockList {
    export const COAL_GENERATOR = new CoalGenerator();
    export const SOLAR_PANEL_TOP = new SolarPanelTop();
    export const BASIC_SOLAR_PANEL = new BasicSolarPanel();
}
