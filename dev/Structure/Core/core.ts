IMPORT("TileRender");
IMPORT("EnergyNet");
IMPORT("StorageInterface");
IMPORT("ItemAnimHelper");
IMPORT("BlockEngine");
IMPORT("SoundAPI");
IMPORT("RenderUtil");

/*
                _____     _     _        _     _____  _______  _   _____  _____     _     _____  _______
              / ____ \  _| |_  | |     _| |_  /  ___||___ ___|| | /  ___||   _ \  _| |_  /  ___||___ ___|  
              | |  |_| | | | | | |    | | | | | |       | |   | | | |    | |_| | | | | | | |___    | |  
              | | ___  | |_| | | |    | |_| | | |       | |   | | | |    |    _/ | |_| | |  ___|   | |  
              | |___ | | |_| | | |___ | |_| | | |___    | |   | | | |___ | |\ \  | |_| | | |       | |  
              \______| |_| |_| |_____||_| |_| \_____|   |_|   |_| \_____||_| \_\ |_| |_| |_|       |_|  
                                                    Space Race!
                            Galacticraft developing group of mans,his team named SpacesTEAM.
                                            Artem - mod developer;
                                       group of mod - @horizonspacescraft
                               last version - Galacticraft 4 Pre release 1.0.0;
             If you have question and want ask,you can write to Artem's email adress artemon4xxl@gmail.com;
*/

function checkDimension(thread, player?, dimensionId?) {
  if (World.getThreadTime() % thread == 0) {
    if (
      Player.getDimension() == Moon.getPlanet() ||
      Player.getDimension() == Mars.getPlanet() ||
      Player.getDimension() == Venus.getPlanet() ||
      Player.getDimension() == Asteroids.getPlanet() ||
      Player.getDimension() == SpacesStation.getPlanet()
    ) {
      return true;
    }
  }
}

const Click = new Sound("click.ogg");

const Bucket = new Sound("bucket.ogg");

const SpaceRace = new Sound("spacerace_jc.ogg");

const MimasS = new Sound("mimas_jc.ogg");

const MarsS = new Sound("mars_jc.ogg");

const OrbitS = new Sound("orbit_jc.ogg");

MimasS.setVolume(__config__.getFloat("Game.MusicVolume"));

SpaceRace.setVolume(__config__.getFloat("Game.MusicVolume"));

MarsS.setVolume(__config__.getFloat("Game.MusicVolume"));

OrbitS.setVolume(__config__.getFloat("Game.MusicVolume"));

Bucket.setVolume(0.6);

Click.setVolume(0.6);

const rfGroup = ICRender.getGroup("rf-wire");

const euGroup = ICRender.getGroup("ic-wire");

let gj = EnergyTypeRegistry.assureEnergyType("GalacticraftJoule", 2);
//Космическая энергия
let ob = EnergyTypeRegistry.assureEnergyType("oxygenbar", 2);

let EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);

let RF = EnergyTypeRegistry.assureEnergyType("RF", 0.25);
let ft = EnergyTypeRegistry.assureEnergyType("FutureTock", 0.25)

let RV;

let canisters = []

Callback.addCallback("LevelDisplayed", function () {
  Game.message(
    Translation.translate("§6Modification Galacticraft has been downloaded!") +
      "\n" +
      Translation.translate("For get list of commands write /gc:help")
  );
});

var ConfigManager = {
  Equipment: {
    coords: __config__.getFloat("Equipment.coords"),
    twocoords: __config__.getFloat("Equipment.twocoords"),
    threecoords: __config__.getFloat("Equipment.threecoords"),
  },
  /* Игра: {
         ShiftHints: __config__.getBool('.ShiftHints'),
         ElectricInformation: __config__.getBool('Игра.ElectricInformation'),
         Special_Effects: __config__.getBool('Игра.Special_Effects'),
     },
     Ископаемые: {
         copper: __config__.getBool('Ископаемые.Земля.copper'),
         tin: __config__.getBool('Ископаемые.Земля.tin'),
         aluminum: __config__.getBool('Ископаемые.Земля.aluminum'),
         oil: __config__.getBool('Ископаемые.Земля.oil'),
         
         silicon: __config__.getBool('Ископаемые.Земля.silicon'),
         desh: __config__.getBool('Ископаемые.Марс.desh'),
         iron_m: __config__.getBool('Ископаемые.Марс.iron'),
         copper_m: __config__.getBool('Ископаемые.Марс.copper'),
         tin_m: __config__.getBool('Ископаемые.Марс.tin'),
         
         silicon_v: __config__.getBool('Ископаемые.Венера.silicon'),
         quartz_v: __config__.getBool('Ископаемые.Венера.quartz'),
         copper_v: __config__.getBool('Ископаемые.Венера.copper'),
         tin_v: __config__.getBool('Ископаемые.Венера.tin'),
         galena: __config__.getBool('Ископаемые.Венера.galena'),
         pumice_stone_underground: __config__.getBool('Ископаемые.Венера.pumice_stone_underground'),
         pumice_stone_ground: __config__.getBool('Ископаемые.Венера.pumice_stone_ground'),
         sulphuric_acid: __config__.getBool('Ископаемые.Венера.sulphuric_acid'),
         venus_spouts: __config__.getBool('Ископаемые.Венера.venus_spouts'),
     }*/
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const UniqueGen = {
  randomCoords: function (random, chunkX, chunkZ, minHeight, maxHeight) {
    minHeight = minHeight || 0;
    maxHeight = maxHeight || 220;
    return {
      x: chunkX * 16 + random.nextInt(16),
      y: random.nextInt(maxHeight - minHeight + 1) - minHeight,
      z: chunkZ * 16 + random.nextInt(16),
    };
  },
  generateOre: function (id, data, chunkX, chunkZ, random, params) {
    for (let i = 0; i < params.veinCounts; i++) {
      let coords = this.randomCoords(
        random,
        chunkX,
        chunkZ,
        params.minY,
        params.maxY
      );
      GenerationUtils.generateOre(
        coords.x,
        coords.y,
        coords.z,
        id,
        data,
        params.size,
        false,
        random.nextInt()
      );
    }
  },
  generateOreInDimension: function (id, data, chunkX, chunkZ, random, params) {
    for (let i = 0; i < params.veinCounts; i++) {
      let coords = this.randomCoords(
        random,
        chunkX,
        chunkZ,
        params.minY,
        params.maxY
      );
      GenerationUtils.generateOreCustom(
        coords.x,
        coords.y,
        coords.z,
        id,
        data,
        params.size,
        params.mode,
        params.check
      );
    }
  },
};
