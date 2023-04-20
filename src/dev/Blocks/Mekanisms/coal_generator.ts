IDRegistry.genBlockID("coal_generator");
Block.createBlockWithRotation("coal_generator", [{
    name: "Coal Generator", texture: [["Machine", 0], ["Machine", 0], ["Machine", 0], ["Coal Generator", 0], ["Machine Output", 0], ["Machine Output", 0]], inCreative: true
}, {
    name: "Coal Generator", texture: [["Machine", 0], ["Machine", 0], ["Machine", 0], ["Coal Generator", 0], ["Machine Output", 0], ["Machine Output", 0]], inCreative: false
}, {
    name: "Coal Generator", texture: [["Machine", 0], ["Machine", 0], ["Machine", 0], ["Coal Generator", 0], ["Machine Output", 0], ["Machine Output", 0]], inCreative: false
}], STONE);


IDRegistry.genItemID("soot_coal");
Item.createItem("soot_coal", "Soot", {
    name: "soot", meta: 0
}, {
    stack: 64
});
Translation.addTranslation("Soot", {
    ru: "Пепел"
});

   // if(__config__.getBool("Gameplay.Heating")==true){
let CoalEnergy = new UI.StandartWindow(
    {
        standard: {
            header: {
                text: {
                    text: Translation.translate("Coal generator")
                },
            },
            inventory: {
                standard: true
            },
            background: {
                standard: true
            }
        },
    drawing: [
    //     {
    //     type: "bitmap",
    //     x: 402,
    //     y: 45,
    //     scale: 3.4,
    //   bitmap: 
    //         "generators.coalscale1"

    //     },
        {
            type: "bitmap",
            x: 490,
            y: 110,
            bitmap: "arrow_bar_background",
            scale: 4.2
        },
        {
            type: "bitmap",
            x: 580,
            y: 110,
            bitmap: "generators.Crashed_1",
            scale: 5.0
        },
        {
            type: "bitmap",
            x: 760,
            y: 110,
            bitmap: "energy_small_background",
            scale: 5.0
        
    }],
    elements: {
        coalSlot: {
            type: "slot",
            x: 400,
            y: 110,
            bitmap: "coalslot",
            size: 70
        },
        progress_scale: {
            type: "scale",
            x: 490,
            y: 110,
            scale: 4.2,
            direction: 0,
            bitmap: "arrow_bar_scale",
            clicker: {
                onClick: function() {
                    RV && RV.RecipeTypeRegistry.openRecipePage("generator 2");
                }}
        },
        
            // firescale: {
            //     type: "scale",
            //     x: 402,
            //     y: 45,
            //     scale: 3.4,
            //     direction: 0,
            //     bitmap: "generators.coalscale0",
            //     clicker: {
            //         onClick: function() {
            //             RV && RV.RecipeTypeRegistry.openRecipePage("generator 1");
            //         }}
            // },
        crashing: {
            type: "scale",
            x: 580,
            y: 110,
            direction: 1,
            bitmap: "generators.Crashed_2",
            scale: 5.0
        },
        trash: {
            type: "slot",
            x: 670,
            y: 110,
            bitmap: "trashslot",
            size: 80
        },
        spaceJoule: {
            type: "scale",
            x: 760,
            y: 110,
            scale: 5.0,
            direction: 1,
            bitmap: "energy_small_scale"
        },
        EnergiA: {
            type: "text",
            x: 400,
            y: 190,
            width: 100,
            height: 30,
            text: "Energy type is not defined"
        },
        Status: {
            type: "text",
            x: 400,
            y: 220,
            width: 100,
            height: 30,
            text: "Status: energy is not defined"
        },
        // FiringStatus: {
        //     type: "text",
        //     x: 545,
        //     y: 55,
        //     width: 100,
        //     height: 30,
        //     text: "Burning: %"
        // },
    }
});
/*}if(__config__.getBool("Gameplay.Heating")==false){
    let CoalEnergy = new UI.StandartWindow({
    standart: {
        header: {
            text: {
                text: Translation.translate("Coal Generator")
            }
        },
        inventory: {
            standart: true
        },
        background: {
            standart: true
        }
    },
    drawing: [
        {
            type: "bitmap",
            x: 490,
            y: 110,
            bitmap: "arrow_bar_background",
            scale: 4.2
        },
        {
            type: "bitmap",
            x: 580,
            y: 110,
            bitmap: "generators.Crashed_1",
            scale: 5.0
        },
        {
            type: "bitmap",
            x: 760,
            y: 110,
            bitmap: "energy_small_background",
            scale: 5.0
        
    }],
    elements: {
        coalSlot: {
            type: "slot",
            x: 400,
            y: 110,
            bitmap: "coalslot",
            size: 70
        },
        progress_scale: {
            type: "scale",
            x: 490,
            y: 110,
            scale: 4.2,
            direction: 0,
            bitmap: "arrow_bar_scale",
            clicker: {
                onClick: function() {
                    RV && RV.RecipeTypeRegistry.openRecipePage("generator 2");
                }}
        },
        crashing: {
            type: "scale",
            x: 580,
            y: 110,
            direction: 1,
            bitmap: "generators.Crashed_2",
            scale: 5.0
        },
        trash: {
            type: "slot",
            x: 670,
            y: 110,
            bitmap: "trashslot",
            size: 80
        },
        spaceJoule: {
            type: "scale",
            x: 760,
            y: 110,
            scale: 5.0,
            direction: 1,
            bitmap: "energy_small_scale"
        },
        EnergiA: {
            type: "text",
            x: 400,
            y: 190,
            width: 100,
            height: 30,
            text: "Space Joule"
        },
        Status: {
            type: "text",
            x: 400,
            y: 220,
            width: 100,
            height: 30,
            text: "Status: don't have energy"
        },
        
    }
})}
*/

SpacesMachine.registerStandartMachine(BlockID.coal_generator, {
    useNetworkItemContainer: true,
    getScreenName() {
        return "main";
    },
    getScreenByName() {
        return CoalEnergy
    },
    defaultValues: {
        burn: 0,
        burnMax: 0,
        active: false,
        energy: 0,
        soot: 0,
        energyMax: 6000,
        isActive: false,
        fire: 0,
    },

    tick: function() {
        this.container.sendChanges();
        if (this.data.fire >= 1 && __config__.getBool("Gameplay.Special_Effects")==true && __config__.getBool("Gameplay.Heating")==true) {
                Particles.addParticle(
                    7, this.x + 0.1,
                    this.y + 0.8,
                    this.z + 0.1,
                    Math.random()/20,
                    Math.random()/20,
                    Math.random()/20);
            };

        let coalSlot = this.container.getSlot("coalSlot");
        var energyStorage = this.getEnergyStorage(); for (var i in burnItems) {

            if (this.data.burn <= 0 && this.data.energy + 15 < energyStorage && (coalSlot.id == burnItems[i].id && coalSlot.count >= 1 && coalSlot.data == 0)) {
                coalSlot.count -= 1;
                this.container.validateSlot("coalSlot");
                this.data.burn = this.data.burnMax = 1600 / 4
            }}
        if (this.data.burn > 0 && this.data.energy + 15 < energyStorage) {
            this.data.energy += 15;
            this.data.burn--;
        }
        if (this.data.energy >= 6000 && this.container.getSlot("trash").count == 0 && this.data.soot == 0) {
            this.container.setSlot("trash", ItemID.soot_coal, 1, 0); this.data.soot = 1;
        }
        this.data.energy = Math.min(this.data.energy, energyStorage);

        this.container.setScale("progress_scale", this.data.energy / 6000);

        this.container.setScale("spaceJoule", this.data.energy / 6000);
        this.container.setText("EnergiA", "Sj :" + this.data.energy + " / " + this.data.energyMax);

        this.container.setScale("crashing", this.data.energy / 6000);
        if (this.data.energy >= 0) {
            this.container.setText("Status", Translation.translate("Status: working"));
        }
       else if (this.data.energy <= 0) {
            this.container.setText("Status", Translation.translate("Status: fuel empty"));
            this.data.soot = 0;
        };

        if (this.data.energy >= 6000) {
            this.container.setText("Status", Translation.translate("Status: storage full"));
            if (__config__.getBool("Gameplay.Heating")==true) {
                // this.container.setScale("firescale", this.data.fire / 100);
                // this.container.setText("FiringStatus", Translation.translate("Heating : ") + this.data.fire + "%");

                if (this.data.fire >= 100) {
                    this.blockSource.explode(this.x, this.y, this.z, 1, true)}
                if (World.getThreadTime()%100 == 0 && __config__.getBool("Gameplay.Heating")==true) {
                    this.data.fire += 1
                };
                for (var i in Colding) {

                    if (this.container.getSlot("trash").id == Colding[i].id && this.data.fire >= 1 && __config__.getBool("Gameplay.Heating")==true
                    ) {
                        this.container.setSlot("trash", 325, 1, 0);
                        this.data.fire = this.data.fire / 2
                    }}
                }}},

    
    getEnergyStorage: function() {
        return 6015
    },
    destroy: function () {
        if (this.data.fire >= 75 && __config__.getBool("Gameplay.Heating")==true) {
            this.blockSource.explode(this.x, this.y, this.z, 1, true)}
    },
    canReceiveEnergy: function() {
        return false;
    },

    canExtractEnergy: function() {
        return true;
    },

    energyTick: function(type, src) {
        let output = Math.min(30, this.data.energy);
        this.data.energy += src.add(output) - output;
    },
    click: function(id, count, data, coords, player) {



        if (id == ItemID["Space wrench"] && Entity.getSneaking(player)) {

            this.blockSource.setBlock(
                this.x,
                this.y,
                this.z,
                BlockID.coal_generator, this.blockSource.getBlockData(
                    this.x,
                    this.y,
                    this.z
                )+1);


        }

    }

});
    
SpacesMachine.addIce({ice: VanillaItemID.water_bucket});


/*
 #1 - slot1
 cr - crashing scale
 =» - progress scale
 $ - trashslot
 √ - spaceJoule
 -----------------
 #1 =» cr $ √
 ---------------
 */