Callback.addCallback("LocalTick", function(container) {
    for (var i in OS) {
        let bal1 = Equi.getSlot("Ballone1");
            let bal2 = Equi.getSlot("Ballone2");
        if (
            O2UI.isOpened() == false && Equi.getSlot("Glass").id == ItemID.oxygen_mask && Equi.getSlot("Module").id == ItemID.oxygen_gear) {
                if(__config__.getBool("Gameplay.OxygenScaleCreative")==true && Game.getGameMode()==1){
            O2UI.openAs(OxygenTILE);}
            if(Game.getGameMode()!=1){
                            O2UI.openAs(OxygenTILE);
            }
        };
        //Opening
        if (Equi.getSlot("Module").id !== ItemID.oxygen_gear && O2UI.isOpened() == true || Equi.getSlot("Glass").id !== ItemID.oxygen_mask && O2UI.isOpened() == true) {
            O2UI.close();

        };
        //Damage&Clousing
        if (Player.getDimension() !== 0 && O2UI.isOpened() == false && Game.getGameMode() !== 1) {
            Entity.damageEntity(Player.get(), 2)
            Game.tipMessage(Translation.translate("§4Warning!Air is not"))
        }
        //Warning and damage 
                  
        if (O2UI.isOpened() == true && Game.getGameMode() !== 1 && bal2.id == OS[i].id || O2UI.isOpened() == true && Game.getGameMode() !== 1 && bal1.id == OS[i].id) {
            
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
                        Item.getMaxDamage(bal2.id)/ Item.getMaxDamage(bal2.id)+Item.getMaxDamage(bal2.id)
                    );
                }
                if (bal1.id == OS[i].id) {
                    O2UI.setScale(
                        "O2ONE",
                        Item.getMaxDamage(bal1.id)/ Item.getMaxDamage(bal1.id)+Item.getMaxDamage(bal1.id)
                    );
                }}

            if (
                World.getThreadTime()%20 == 0 &&
                Item.getMaxDamage(bal1.id) <= 0 && Player.getDimension() !== 0 || World.getThreadTime()%20 == 0 &&
                 Item.getMaxDamage(bal2.id) <= 0 && Player.getDimension() !== 0) {
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


// Saver.addSavesScope("Equi", function read(scope): void {
    
//     Equi = scope? scope.Savetems: UI.Container;
// }, function save() {
//     return {
//         Savetems: Equi
//     }
// });
