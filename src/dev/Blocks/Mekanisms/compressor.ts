IDRegistry.genBlockID("compressor_sj");
Block.createBlockWithRotation("compressor_sj", [
    {
        name: "Compressor", texture: [["Machine", 0], ["Machine", 0], ["Machine", 0], ["Compressor", 0], ["Machine", 0], ["Machine", 0]], inCreative: true
    }, {
        name: "Compressor", texture: [["Machine", 0], ["Machine", 0], ["Machine", 0], ["Compressor", 0], ["Machine", 0], ["Machine", 0]], inCreative: false
    }, {
        name: "Compressor", texture: [["Machine", 0], ["Machine", 0], ["Machine", 0], ["Compressor", 0], ["Machine", 0], ["Machine", 0]], inCreative: false
    },], STONE);


var CompressinG = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text:  Translation.translate("Compressor")
            },
        },
        inventory: {
            standard: true
        },
        background: {
            standard: true
        }
    },
    drawing: [{
        type: "bitmap", x: 590, y: 150, bitmap: "compressor_background", scale: 4.2
    },
    {
        type: "bitmap", x: 630, y: 150, bitmap: "fire_background", scale: 4.1
    }],
    elements: {
        "progressScale": {
            type: "scale", x: 590, y: 150, direction: 0, bitmap: "compressor_slace", scale: 4.2,
            clicker: {
                onClick: function () {

                    RV && RV.RecipeTypeRegistry.openRecipePage("Compressor");

                }
            }
        },
        "BurningScale": {
            type: "scale", x: 630, y: 150, direction: 1, bitmap: "fire_scale", scale: 4.1
        },

        "CoalSlot": {
            type: "slot", x: 530, y: 300, bitmap: "coalslot", size: 60
        },
        "slot1": {
            type: "slot", x: 410, y: 110, bitmap: "slot", size: 60
        },
        "slot2": {
            type: "slot", x: 470, y: 110, bitmap: "slot", size: 60
        },
        "slot3": {
            type: "slot", x: 530, y: 110, bitmap: "slot", size: 60
        },

        "slot4": {
            type: "slot", x: 410, y: 170, bitmap: "slot", size: 60
        },
        "slot5": {
            type: "slot", x: 470, y: 170, bitmap: "slot", size: 60
        },
        "slot6": {
            type: "slot", x: 530, y: 170, bitmap: "slot", size: 60
        },

        "slot7": {
            type: "slot", x: 410, y: 230, bitmap: "slot", size: 60
        },
        "slot8": {
            type: "slot", x: 470, y: 230, bitmap: "slot", size: 60
        },
        "slot9": {
            type: "slot", x: 530, y: 230, bitmap: "slot", size: 60
        },

        "slotResult": {
            type: "slot", x: 830, y: 190, bitmap: "slot", size: 70
        },
        Status:
        {
            type: "text", x: 650, y: 290, width: 100, height: 30, text: "Status: "
        },
    }
});

TileEntity.registerPrototype(BlockID.compressor_sj, {
    useNetworkItemContainer: true,
    getScreenName() {
        return "main";
    },
    getScreenByName() {
        return CompressinG
    },
    defaultValues: {
        progress: 0,
        progressMax: 0,
        burning: 0,
        burningMax: 1000,
        energy: 0,
        active: false

    },

    tick: function () {
        this.container.sendChanges();
        this.container.validateAll();

        if (this.data.energy != 0) {
            this.container.setText("Status", Translation.translate("Status: have energy"))
        };
        if (this.data.energy == 0) {
            this.container.setText("Status", Translation.translate("Status: don't have energy"))
        };
        if (this.data.progress != 0) {
            this.container.setText("Status", Translation.translate("Status: working"))
        };
        var CoalSlot = this.container.getSlot("CoalSlot")
        for (let i in burnItems) {
            if (CoalSlot.id == burnItems[i].id && this.data.burning != 500) {
                this.data.burning += 500;
                CoalSlot.count--
                this.data.active = true;
            }
        }
        if (this.data.burning == 500 && this.data.active == true) { this.data.energy++ }
        if (this.data.energy == 500) { this.data.active = false; this.data.burning = 0 }

      
        for (let n = 0; n < 10; n++) {
            
            
var slots = this.container.getSlot("slot"+n);
                var slotResult = this.container.getSlot("slotResult")

                for (let i in compressorRecipe) {
                    if (slots.id == compressorRecipe[i].slots &&
                        this.data.energy >= 100 && this.data.progress <= 500) {
                        this.data.progress++
                        if (slotResult.id == 0 || slotResult.id == compressorRecipe[i].result) {
                            if (this.data.progress >= 500) {
                                compressorRecipe[i].count -= 1;
                                this.container.setSlot("slot" + n, slots.id, slots.count, slots.data)
                                this.data.energy -= 100;
                                this.data.progress = 0;
                                this.container.setSlot("slotResult", compressorRecipe[i].result, slotResult.count + 1, 0)
                            }
                        }
                    }
                }
            }

        this.container.setScale("progressScale", this.data.progress / 500);
        this.container.setScale("BurningScale", this.data.energy / 500);

    }, click: function (id, count, data, coords) {
        if (id == ItemID["Space wrench"]) {

            this.blockSource.setBlock(
                this.x,
                this.y,
                this.z,
                BlockID.compressor_sj, this.blockSource.getBlockData(
                    this.x,
                    this.y,
                    this.z
                ) + 1);


        }

    }
    /*
let canisterFuel = this.container.getSlot("canisterFuel");

this.container.setScale("FuelScale", this.data.liquid / 40);
this.container.setText("ELECTRIC", "Sj :" + this.data.energy + " / " + this.data.energyMax);
*/
}
);