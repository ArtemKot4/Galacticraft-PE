
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



Callback.addCallback("LocalTick", function(container) {
    for (var i in OS) {
        let bal1 = Equi.getSlot("Ballone1");
            let bal2 = Equi.getSlot("Ballone2");
        if (
            O2UI.isOpened() == false && Equi.getSlot("Glass").id == ItemID.oxygen_mask && 
            Equi.getSlot("Module").id == ItemID.oxygen_gear &&
             World.getThreadTime()%20==0) {
                if(__config__.getBool("Gameplay.OxygenScaleCreative")==true && Game.getGameMode()==1){
            O2UI.openAs(OxygenTILE);}
            if(Game.getGameMode()==0){
                            O2UI.openAs(OxygenTILE);
            }
        };
        //Opening
        if (Equi.getSlot("Module").id !== ItemID.oxygen_gear && O2UI.isOpened() == true || 
        Equi.getSlot("Glass").id !== ItemID.oxygen_mask && O2UI.isOpened() == true) {
            O2UI.close();
            
         
        };
        //Damage&Clousing
        if (checkDimension(10) && O2UI.isOpened() == false && Game.getGameMode() == 0) {
            Entity.damageEntity(Player.get(), 2)
            Game.tipMessage(Translation.translate("§4Warning!Air is not"))
        }
        //Warning and damage 
                  
        if (O2UI.isOpened() == true && Game.getGameMode() != 1 && bal2.id == OS[i].id || O2UI.isOpened() 
        == true && Game.getGameMode() != 1 && bal1.id == OS[i].id) {
            
            if (__config__.getBool("Gameplay.NewOxygenScale") == true) {
                O2UI.setText("Status", Item.getMaxDamage(bal2.id)+Item.getMaxDamage(bal1.id)+"/"+"5000");
                if (bal2.id == OS[i].id) {
                    O2UI.setScale(
                        "O2TWO",
                        Item.getMaxDamage(bal2.id)/10000
                    );
                }
                if (bal1.id == OS[i].id) {
                    O2UI.setScale(
                        "O2ONE",
                        Item.getMaxDamage(bal1.id)/ 10000
                    );
                }
            }
            if (__config__.getBool("Gameplay.NewOxygenScale") == false) {
                O2UI.setText("Status", Item.getMaxDamage(bal2.id)+Item.getMaxDamage(bal1.id)+"/"+
                Item.getMaxDamage(bal1.id)*2);
                if (bal2.id == OS[i].id) {
                    O2UI.setScale(
                        "O2TWO",
                        Item.getMaxDamage(bal2.id)/ Item.getMaxDamage(bal2.id)+Item.getMaxDamage(bal1.id)
                    );
                }
                if (bal1.id == OS[i].id) {
                    O2UI.setScale(
                        "O2ONE",
                        Item.getMaxDamage(bal1.id)/ Item.getMaxDamage(bal1.id)+Item.getMaxDamage(bal2.id)
                    );
                }}

            if (
                checkDimension(20) &&
                Item.getMaxDamage(bal1.id) <= 0  || checkDimension(20) &&
                 Item.getMaxDamage(bal2.id) <= 0) {
                Entity.damageEntity(Player.get(), 2);
                    Game.tipMessage(Translation.translate("§4Warning!Air is not"))
                }

            
           /* if (World.getThreadTime%80 == 0 && Player.getDimension() !== 0) {
                Item.setMaxDamage(bal1.id, bal1.data -= 1)
                Item.setMaxDamage(bal2.id, bal2.data -= 1)

            }*/






        }
        if (Game.getGameMode() == 1 && __config__.getBool("Gameplay.OxygenScaleCreative")==true) {
            O2UI.setScale(
                "O2ONE",
                1/1
            );
            O2UI.setScale(
                "O2TWO",
                1/1
            );
            O2UI.setText("Status", Translation.translate("Infinity"));
        }; 
        
        
               if (O2UI.isOpened() == true &&bal1.id == 0 
               && bal2.id == 0 && Game.getGameMode() != 1 && Player.getDimension()!=0) {
            O2UI.setText("Status", Translation.translate("Empty"));
            O2UI.setScale(
                "O2TWO",
                0
            );
            O2UI.setScale(
                "O2ONE",
                0
            );
            if(Player.getDimension()!=0) Entity.damageEntity(Player.get(),2)
            Game.tipMessage(Translation.translate("§4Warning!Air is not"))
        };

    }
});


Saver.addSavesScope("Equi", function read(scope): void {
    
    Equi = scope? scope.Savetems: UI.Container;
}, function save() {
    return {
        Savetems: Equi
    }
});

//C:\\Users\\\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\\Desktop\\\u0418\u0433\u0440\u044b\\HORIZON MODDING KERNEL\\Galacticraft 4 PE developing\\toolchain\\build\\project\\sources\\main.js

