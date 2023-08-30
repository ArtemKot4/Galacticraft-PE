IDRegistry.genBlockID("coal_generator");
Block.createBlockWithRotation("coal_generator", [{
    name: "Coal Generator", texture: [["Machine", 0], ["Machine", 0], ["Machine", 0], ["Coal Generator", 0], ["Machine Output", 0], ["Machine Output", 0]], inCreative: true
}, {
    name: "Coal Generator", texture: [["Machine", 0], ["Machine", 0], ["Machine", 0], ["Coal Generator", 0], ["Machine Output", 0], ["Machine Output", 0]], inCreative: false
}, {
    name: "Coal Generator", texture: [["Machine", 0], ["Machine", 0], ["Machine", 0], ["Coal Generator", 0], ["Machine Output", 0], ["Machine Output", 0]], inCreative: false
}], STONE);


// if(__config__.getBool("Difficulty.Machine.Heating")==true){
let CoalGeneratorUI = new UI.StandartWindow(
    {
        standard: {
            header: {
                text: {
                    text: Translation.translate("Coal Generator")
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
                bitmap: "arrow_bar_1",
                scale: 4.2


            }],
        elements: {
            CoalSlot: {
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
                    onClick: function () {
                        RV && RV.RecipeTypeRegistry.openRecipePage("generator 2");
                    }
                }
            },



            EnergyText: {
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

class CoalGenerator extends Generator {
    defaultValues = {
        energy: 0,
        energyMax: 3000,
        burning: 0,
        active: false,
        fire: 0
    };
    onTick(): void {
        this.container.sendChanges();
        this.container.validateAll();
        if(__config__.getBool("Gameplay.Special_Effects") == true &&
            __config__.getBool("Difficulty.Machine.Heating") == false&&this.data.energy>0){
                Particles.addParticle(
                    7, this.x + 0.1,
                    this.y + 0.6,
                    this.z + 0.1,
                    Math.random() / 20,
                    Math.random() / 20,
                    Math.random() / 20);
                   
            }
    
        if (
            this.data.fire >= 1 &&
            __config__.getBool("Gameplay.Special_Effects") == true &&
            __config__.getBool("Difficulty.Machine.Heating") == true) {
            Particles.addParticle(
                7, this.x + 0.1,
                this.y + 0.6,
                this.z + 0.1,
                Math.random() / 20,
                Math.random() / 20,
                Math.random() / 20);
        };


        var CoalSlot = this.container.getSlot("CoalSlot");

        for (let i in burnItems) {
            if (CoalSlot.id == burnItems[i].id && this.data.burning != 3000) {
                this.data.burning += 3000;
                this.container.getSlot("CoalSlot").count -= 1;
                CoalSlot.count--

                this.data.active = true;
            }
        }
        if (this.data.burning == 3000 && this.data.active == true && this.data.energy <= this.data.energyMax) { 
            this.data.energy += 1 }
        if (this.data.energy == this.data.energyMax) { this.data.active = false; this.data.burning = 0 }


        this.container.setScale("progress_scale", this.data.energy / this.data.energyMax);


        this.container.setText("EnergyText", "Sj :" + this.data.energy + " / " + this.getCapacity());


        if (this.data.energy > 0) {
            this.container.setText("Status", Translation.translate("Status: working"));
        }
        else {
            this.container.setText("Status", Translation.translate("Status: fuel empty"));

        };

        if (this.data.energy >= this.data.energyMax) {
            this.container.setText("Status", Translation.translate("Status: storage full"));
            if (__config__.getBool("Difficulty.Machine.Heating") == true) {
                // this.container.setScale("firescale", this.data.fire / 100);
                // this.container.setText("FiringStatus", Translation.translate("Heating : ") + this.data.fire + "%");

                if (this.data.fire >= 100) {
                    this.blockSource.explode(this.x, this.y, this.z, 1, true)
                }
                if (World.getThreadTime() % 200 == 0 && __config__.getBool("Difficulty.Machine.Heating") == true &&
                    this.data.energy >= 3000) {
                    this.data.fire += 1
                } else if (this.data.fire > 0) { this.data.fire-- }

            }
        }
    };

}



SpacesMachine.registerStandartMachine(BlockID.coal_generator, new CoalGenerator(CoalGeneratorUI))

StorageInterface.createInterface(BlockID.coal_generator, {
    slots: {
        "coalSlot": {
            input: true,
            side: "down",
            isValid: function (item, side) {
                return SpacesMachine.getCoal();
            }
        },
    }
});