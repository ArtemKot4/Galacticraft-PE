IMPORT("TileRender");
IMPORT("EnergyNet");
IMPORT("StorageInterface");
IMPORT("ScrutinyAPI");
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
                                                    Universal
                            Galacticraft developing group of mans,his team named SpacesTEAM.
                                            ArtemOn - code developer;
                                        Demerroremperror - texture worker;
                                           playvad2k620 - texture worker;
                                      nikitamorov - reporter of group in VK;
                                       group of mode - @horizonspacescraft;
                   If author give you agree to use code,you can use code of modification to your projects;
                              last version - Galacticraft Universal Pre release 1.0.0;
            If you have question and want ask,you can write to ArtemOn's email adress artemon4xxl@gmail.com;
*/

function checkDimension(thread,player?,dimensionId?){
    if( World.getThreadTime()%thread==0){
    if(
    Player.getDimension()==Moon.id||Player.getDimension()==Mars.id||Player.getDimension()==Venus.id||
    Player.getDimension()==Asteroids.id||Player.getDimension()==SpacesStation.id){return true}}};

const Click = new Sound("click.ogg");

const Bucket = new Sound("bucket.ogg");

const SpaceRace = new Sound("spacerace_jc.ogg");

const MimasS = new Sound("mimas_jc.ogg");

const MarsS = new Sound("mars_jc.ogg");

const OrbitS = new Sound("orbit_jc.ogg");

MimasS.setVolume(__config__.getFloat("Game.MusicVolume"));

SpaceRace.setVolume(__config__.getFloat("Game.MusicVolume"));

MarsS.setVolume(__config__.getFloat("Game.MusicVolume"))

OrbitS.setVolume(__config__.getFloat("Game.MusicVolume"))

Bucket.setVolume(0.6)

Click.setVolume(0.6)



const rfGroup = ICRender.getGroup("rf-wire");

const euGroup = ICRender.getGroup("ic-wire");

let sj = EnergyTypeRegistry.assureEnergyType("spacejoule", 2);
//Космическая энергия
let ob = EnergyTypeRegistry.assureEnergyType("oxygenbar", 2);

let EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);

let RF = EnergyTypeRegistry.assureEnergyType("RF", 0.25);
let ft = EnergyTypeRegistry.assureEnergyType("FutureTock", 0.25);
//Кислород
var RV;

var spouticle = Particles.registerParticleType({
    texture: "sulphuric_particle",
    render: 2,
    size: [1, .5],
    lifetime: [30, 70],
    collision: true,

    animators: {
        alpha: {
            fadeIn: 1, fadeOut: 2
        },
        size: {
            fadeOut: 0, fadeIn: 0, start: 0.2, end: 0
        }
    }
});


var rocket_particle = Particles.registerParticleType({
    texture: "sulphuric_particle",
    render: 0,
    size: [1, .5],
    lifetime: [30, 50],
    collision: false,

    animators: {
        alpha: {
            fadeIn: 1, fadeOut: 2
        },
        size: {
            fadeOut: 0, fadeIn: 0, start: 0.2, end: 0
        }
    }
});

var collecticle = Particles.registerParticleType({
    texture: "collector_particle_2",
    render: 2,
    size: [0.1, 0.1],
    lifetime: [30, 50],


    animators: {
        alpha: {
            fadeIn: .1, fadeOut: .2
        },
        size: {
            fadeOut: 0, fadeIn: 0, start: 0.2, end: 0
        }
    }
});





Callback.addCallback('LevelDisplayed', function () {
    Game.message(Translation.translate("§6Modification Galacticraft has been downloaded!\n§7Thank's for downloading this modification!\n• You can join in the group of modification: §ahttps://vk.com/horizonspacescraft"))
});

var SpacesConfiguration = {
    Equipment: {
        coords: __config__.getFloat('Equipment.coords'),
        twocoords: __config__.getFloat('Equipment.twocoords'),
        threecoords: __config__.getFloat('Equipment.threecoords')
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

let Snariadjenie = new UI.Container();
let O2UI = new UI.Container();
var Equi = new UI.Container();
Callback.addCallback("NativeGuiChanged", function (screenName) {
    if (screenName == "survival_inventory_screen" || screenName == "creative_inventory_screen" || screenName == "inventory_screen" || screenName == "inventory_screen_pocket") {
        Snariadjenie.openAs(openEquip);

    } else {
        Snariadjenie.close();

    }
});

let openEquip = new UI.Window({
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

var EquipMent = new UI.Window({
    location: {
        x: SpacesConfiguration.Equipment.coords / SpacesConfiguration.Equipment.twocoords - SpacesConfiguration.Equipment.threecoords,
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
        "Boots": {
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
        /*"Info": {
            type: "button",
            x: 20,
            y: 340,
            scale: 5,
            bitmap:"PKOn",
            clicker: {
            onClick: function(player){
            ScrutinyAPI.open(player, "SpacesCraftTab");
            }
        }
        },	*/
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


var OxygenTILE = new UI.Window({
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




var BLOCK_TYPE_STAIRS_GL = Block.createSpecialType({
    lightopacity: 1,
    destroytime: .4,
    sound: "glass"
});

var BLOCK_TYPE_FENCE_GL = Block.createSpecialType({
    lightopacity: 1,
    renderlayer: 1,
    rendertype: 11,
    sound: "glass"
});

var BLOCK_TYPE_FENCEE_GL = Block.createSpecialType({
    lightopacity: 1,
    renderlayer: 1,
    rendertype: 32,
    sound: "glass"
});

var BLOCK_TYPE_GLASS = Block.createSpecialType({
    explosionres: 0.5,
    lightopacity: 1,
    destroytime: .4,
    renderlayer: 1,
    sound: "glass"
});

var BLOCK_TYPE_STAIRS = Block.createSpecialType({
    lightopacity: 15,
    destroytime: .6,
    material: 4
});

var BLOCK_TYPE_FENCE = Block.createSpecialType({

    renderlayer: 2,
    rendertype: 11
});

var BLOCK_TYPE_FENCEE = Block.createSpecialType({

    renderlayer: 2,
    rendertype: 32
});

var BLOCK_TYPE_PLANE = Block.createSpecialType({
    lightopacity: 15,
    renderlayer: 1,
    rendertype: 87,
    translucency: 1,
    sound: "glass"
});

var BLOCK_TYPE_STAIRS_WD = Block.createSpecialType({

    destroytime: .4,
    sound: "wood",
    material: 4
});

var BLOCK_TYPE_FENCE_WD = Block.createSpecialType({

    renderlayer: 2,
    rendertype: 11,
    sound: "wood",
    material: 4
});

const TORCH_SPACETYPE = Block.createSpecialType({
    destroytime: 0,
    explosionres: 0,
    renderlayer: 3,
    rendertype: 2,
    translucency: 1,
    lightopacity: 15,
    lightlevel: 14,
    material: 4
});

const TORCH_OFFSPACETYPE = Block.createSpecialType({
    destroytime: 0,
    explosionres: 0,
    renderlayer: 3,
    rendertype: 2,
    translucency: 1,
    lightlevel: 0,
    material: 4
});

const TORCH_SPACESTYPE = Block.createSpecialType({
    destroytime: 0,
    explosionres: 0,
    rendertype: 91,
    translucency: 1,
    lightopacity: 15,
    lightlevel: 14,
    material: 4
});

const WEB = Block.createSpecialType({
    explosionres: 20,
    rendertype: 91,
    translucency: 0.8,
    lightopacity: 1,
    sound: "grass",
    solid: false,
    material: 4
});

var STONE = Block.createSpecialType({
    solid: true,
    material: 4,
    destroytime: 5,
    renderlayer: 3,
    rendertype: 0,
    translucency: 0,
    lightopacity: 15
});

const WPPTYPE = Block.createSpecialType({
    destroytime: 0,
    explosionres: 0,
    translucency: 1,
    lightopacity: 15,
    lightlevel: 7
});

const WIRE = Block.createSpecialType({
    destroytime: 0.1,
    explosionres: 0.5,
    sound: "cloth",

});



BlockRegistry.createBlockType("oxygentile_stairs", {
    renderLayer: 3,
});


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
            z: chunkZ * 16 + random.nextInt(16)
        }
    },
    generateOre: function (id, data, chunkX, chunkZ, random, params) {
        for (let i = 0; i < params.veinCounts; i++) {
            let coords = this.randomCoords(random, chunkX, chunkZ, params.minY, params.maxY);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, id, data, params.size, false, random.nextInt());
        }
    },
    generateOreInDimension: function (id, data, chunkX, chunkZ, random, params) {
        for (let i = 0; i < params.veinCounts; i++) {
            let coords = this.randomCoords(random, chunkX, chunkZ, params.minY, params.maxY);
            GenerationUtils.generateOreCustom(coords.x, coords.y, coords.z, id, data, params.size, params.mode, params.check);
        }
    }
};