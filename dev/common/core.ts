IMPORT("TileRender");
IMPORT("EnergyNet");
IMPORT("StorageInterface");
IMPORT("ItemAnimHelper");
IMPORT("SoundLib");
IMPORT("RenderUtil");
IMPORT("ChargeItem");

/*
                _____     _     _        _     _____  _______  _   _____  _____     _     _____  _______
              / ____ \  _| |_  | |     _| |_  /  ___||___ ___|| | /  ___||   _ \  _| |_  /  ___||___ ___|  
              | |  |_| | | | | | |    | | | | | |       | |   | | | |    | |_| | | | | | | |___    | |  
              | | ___  | |_| | | |    | |_| | | |       | |   | | | |    |    _/ | |_| | |  ___|   | |  
              | |___ | | |_| | | |___ | |_| | | |___    | |   | | | |___ | |\ \  | |_| | | |       | |  
              \______| |_| |_| |_____||_| |_| \_____|   |_|   |_| \_____||_| \_\ |_| |_| |_|       |_|  
                                                    Space Race!
                               Galacticraft developed by one developer - Artem Kot
                                            Artem Kot - mod developer;
                                       group of mod - vk.com/horizonspacescraft
                               last version - Galacticraft 4 Pre release 1.0.0;
             If you have question and want ask,you can write to Artem's email adress artemon4xxl@gmail.com;
*/

type number3 = [number, number, number];

// const Click = new Sound("click.ogg");

// const Bucket = new Sound("bucket.ogg");

// const SpaceRace = new Sound("spacerace_jc.ogg");

// const MimasS = new Sound("mimas_jc.ogg");

// const MarsS = new Sound("mars_jc.ogg");

// const OrbitS = new Sound("orbit_jc.ogg");

// MimasS.setVolume(__config__.getFloat("Game.MusicVolume"));

// SpaceRace.setVolume(__config__.getFloat("Game.MusicVolume"));

// MarsS.setVolume(__config__.getFloat("Game.MusicVolume"));

// OrbitS.setVolume(__config__.getFloat("Game.MusicVolume"));

// Bucket.setVolume(0.6);

// Click.setVolume(0.6);
namespace EnergyTypes {
    export const GJ = EnergyTypeRegistry.assureEnergyType("galacticraft_joule", 2);
    export const OB = EnergyTypeRegistry.assureEnergyType("oxygen_bar", 2);
    export const EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);
    export const RF = EnergyTypeRegistry.assureEnergyType("RF", 0.25);
};


let RV;

let canisters = [];

Callback.addCallback("LevelDisplayed", function () {
    Game.message(Translation.translate("§6Modification Galacticraft has been downloaded!") + "\n" + Translation.translate("For get list of commands write /gc:help"));
});

const ConfigManager = {
    Equipment: {
        coords: __config__.getFloat("Equipment.coords"),
        twocoords: __config__.getFloat("Equipment.twocoords"),
        threecoords: __config__.getFloat("Equipment.threecoords"),
    },
};

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
            let coords = this.randomCoords(random, chunkX, chunkZ, params.minY, params.maxY);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, id, data, params.size, false);
        }
    },
    generateOreInDimension: function (id, data, chunkX, chunkZ, random, params) {
        for (let i = 0; i < params.veinCounts; i++) {
            let coords = this.randomCoords(random, chunkX, chunkZ, params.minY, params.maxY);
            GenerationUtils.generateOreCustom(coords.x, coords.y, coords.z, id, data, params.size, params.mode, params.check);
        }
    },
};

const __modelsdir__ = __dir__ + "resources/assets/models/";


const ITEM_TAG_GROUP = TagRegistry.getOrCreateGroup("items");
const BLOCK_TAG_GROUP = TagRegistry.getOrCreateGroup("blocks");

const GC_WIRE_GROUP = ICRender.getGroup("gc.wire");