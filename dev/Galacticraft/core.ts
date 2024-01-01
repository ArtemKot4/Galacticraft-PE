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


let Snariadjenie = new UI.Container();
let O2UI = new UI.Container();
let Equi = new UI.Container();
Callback.addCallback("NativeGuiChanged", function (screenName) {
    if (screenName == "survival_inventory_screen" || screenName == "creative_inventory_screen" || screenName == "inventory_screen" || screenName == "inventory_screen_pocket") {
        Snariadjenie.openAs(openEquip);

    } else {
        Snariadjenie.close();

    }
});

const openEquip = new UI.Window({
    location: {
        x: 0,
        y: UI.getScreenHeight() / 2 - 150,
        width: 52,
        height: 52
    },

    drawing: [{
        type: "background",
        color: android.graphics.Color.argb(0, 0, 0, 0)
    }],

    elements: {
        "button": {
            type: "button",
            x: 0,
            y: 0,
            bitmap: "SPC.SPC_but",
            scale: 55,
            clicker: {
                onClick: function () {
                    Equi.openAs(EquipMent);
                    Snariadjenie.close();
                    //Click.play();
                }
            }
        }
    }
});

const EquipMent = new UI.Window({
    location: {
        x: ConfigManager.Equipment.coords / ConfigManager.Equipment.twocoords - ConfigManager.Equipment.threecoords,
        y: 60,
        width: 900,
        height: 417
    },
    drawing: [{
        type: "background",
        color: android.graphics.Color.argb(0, 0, 0, 0)
    },
    {
        type: "frame",
        bitmap: "classic_frame_bg_light",
        scale: 2,
        width: 900,
        height: 417,
        y: 0
    },
    {
        type: "bitmap",
        bitmap: "arrow_bar_1",
        scale: 3,
        x: 140,
        y: 110
    }],
    elements: {
        "Head": {
            type: "slot",
            x: 30,
            y: 30,
            size: 50,
            bitmap: "SPC.SPC_Head"
        },
        "Body": {
            type: "slot",
            x: 30,
            y: 80,
            size: 50,
            bitmap: "SPC.SPC_Body"
        },
        "Legs": {
            type: "slot",
            x: 30,
            y: 130,
            size: 50,
            bitmap: "SPC.SPC_Legs"
        },
        "Foots": {
            type: "slot",
            x: 30,
            y: 180,
            size: 50,
            bitmap: "SPC.SPC_LegTwoS"
        },
        "Ballone1": {
            type: "slot",
            x: 30,
            y: 270,
            size: 50,
            bitmap: "SPC.SPC_Tank"
        },
        "Ballone2": {
            type: "slot",
            x: 80,
            y: 270,
            size: 50,
            bitmap: "SPC.SPC_Tank"
        },
        "AntiDamage": {
            type: "slot",
            x: 160,
            y: 270,
            size: 50,
            bitmap: "SPC.SPC_AntiDamage"
        },
        "1Armor": {
            type: "invSlot",
            x: 210,
            y: 30,
            size: 50,
            index: 103
        },
        "2Armor": {
            type: "invSlot",
            x: 210,
            y: 80,
            size: 50,
            index: 102
        },
        "3Armor": {
            type: "invSlot",
            x: 210,
            y: 130,
            size: 50,
            index: 101
        },
        "4Armor": {
            type: "invSlot",
            x: 210,
            y: 180,
            size: 50,
            index: 100
        },
        "Glass": {
            type: "slot",
            x: 80,
            y: 30,
            size: 50,
            bitmap: "SPC.SPC_Glass"
        },
        "Module": {
            type: "slot",
            x: 80,
            y: 130,
            size: 50,
            bitmap: "SPC.SPC_Module"
        },
        "Frequency": {
            type: "slot",
            x: 80,
            y: 80,
            size: 50,
            bitmap: "SPC.SPC_Frequency"
        },
        "Parachute": {
            type: "slot",
            x: 80,
            y: 180,
            size: 50,
            bitmap: "SPC.SPC_Parachute"
        },
        "Inv1": {
            type: "invSlot",
            x: 250,
            y: 340,
            size: 50,
            index: 0
        },
        "Inv2": {
            type: "invSlot",
            x: 300,
            y: 340,
            size: 50,
            index: 1
        },
        "Inv3": {
            type: "invSlot",
            x: 350,
            y: 340,
            size: 50,
            index: 2
        },
        "Inv4": {
            type: "invSlot",
            x: 400,
            y: 340,
            size: 50,
            index: 3
        },
        "Inv5": {
            type: "invSlot",
            x: 450,
            y: 340,
            size: 50,
            index: 4
        },
        "Inv6": {
            type: "invSlot",
            x: 500,
            y: 340,
            size: 50,
            index: 5
        },
        "Inv7": {
            type: "invSlot",
            x: 550,
            y: 340,
            size: 50,
            index: 6
        },
        "Inv8": {
            type: "invSlot",
            x: 600,
            y: 340,
            size: 50,
            index: 7
        },
        "Inv9": {
            type: "invSlot",
            x: 650,
            y: 340,
            size: 50,
            index: 8
        },
      
        "Clousing": {
            type: "button",
            x: 20,
            y: 340,
            scale: 5,
            bitmap: "PKOf",
            clicker: {
                onClick: function () {
                    Snariadjenie.openAs(openEquip);
                    Equi.close();
                }
            }
        },
    }
}
);


const OxygenTILE = new UI.Window({
    location: {
        x: 850,
        y: 10,
        width: 145,
        height: 155
    },
    drawing: [
        {
            type: "background",
            color: android.graphics.Color.argb(0, 0, 0, 0)
        }, {
            type: "bitmap",
            x: 215,
            y: 0,
            scale: 18,
            bitmap: "SPC.OxygenTwo"
        }, {
            type: "bitmap",
            x: 575,
            y: 0,
            scale: 18,
            bitmap: "SPC.OxygenTwo"
        }, {
            type: "bitmap",
            x: 40,
            y: 0,
            scale: 18,
            bitmap: "SPC.SPC_Ox"
        }
    ],
    elements: {
        "O2ONE": {
            type: "scale",
            x: 215,
            y: 0,
            scale: 18,
            bitmap: "SPC.OxygenOne",
            direction: 1
        },
        "O2TWO": {
            type: "scale",
            x: 575,
            y: 0,
            scale: 18,
            bitmap: "SPC.OxygenOne",
            direction: 1
        },
        "Status": {
            type: "text",
            x: 240,
            y: 843,
            width: 2500,
            height: 2000,
            size: 100,
            text: "0/0",

        }
    }
}
);
OxygenTILE.setAsGameOverlay(true); OxygenTILE.setTouchable(false);


EquipMent.setInventoryNeeded(true);
