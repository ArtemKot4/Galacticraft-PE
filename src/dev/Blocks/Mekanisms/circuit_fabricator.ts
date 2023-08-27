IDRegistry.genBlockID("circuit_fabricator");
Block.createBlockWithRotation("circuit_fabricator", [{
    name: "Circuit Fabricator",
    texture: [["Machine",
        0],
        ["Machine",
            0],
        ["Machine",
            0],
        ["circuit_fabricator",
            0],
        ["Machine Input",
            0],
        ["Machine",
            0]],
    inCreative: true
}, {
    name: "Circuit Fabricator",
    texture: [["Machine",
        0],
        ["Machine",
            0],
        ["Machine",
            0],
        ["circuit_fabricator",
            0],
        ["Machine Input",
            0],
        ["Machine",
            0]],
    inCreative: false
}, {
    name: "Circuit Fabricator",
    texture: [["Machine",
        0],
        ["Machine",
            0],
        ["Machine",
            0],
        ["circuit_fabricator",
            0],
        ["Machine Input",
            0],
        ["Machine",
            0]],
    inCreative: false
},
],STONE);






let CircuitFabricatorUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: Translation.translate("Circuit Fabricator")
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
        type: "bitmap",
        x: 355,
        y: 65,
        bitmap: "Others.line1_0",
        scale: 3.8
    },
        {
            type: "bitmap",
            x: 436,
            y: 295,
            bitmap: "slace_en_0",
            scale: 3.2
        },
        {
            type: "bitmap",
            x: 425,
            y: 295,
            bitmap: "en_noy",
            scale: 3.2
        },
        {
            type: "bitmap",
            x: 568,
            y: 150,
            bitmap: "Others.line2_0",
            scale: 3.8
        },
        {
            type: "bitmap",
            x: 720,
            y: 95,
            bitmap: "Others.line3_0",
            scale: 3.8
        },
        {
            type: "bitmap",
            x: 565,
            y: 65,
            bitmap: "Others.circuitfabri_scale_0",
            scale: 3.2
        }],
    elements: {
        DiamondSlot:
        {
            type: "slot",
            x: 340,
            y: 40,
            size: 60,
            bitmap: "Others.diamond_slot"
        },
        EnergySlot:
        {
            type: "slot",
            x: 330,
            y: 290,
            size: 60,
            bitmap: "Others.en_slot"
        },
        FabrSlot0:
        {
            type: "slot",
            x: 515,
            y: 135,
            size: 60,
            bitmap: "Others.fabricator_slot"
        },
        FabrSlot1:
        {
            type: "slot",
            x: 515,
            y: 195,
            size: 60,
            bitmap: "Others.fabricator_slot"
        },
        DustSlot:
        {
            type: "slot",
            x: 682,
            y: 130,
            size: 60,
            bitmap: "Others.dust_slot"
        },
        Slot1:
        {
            type: "slot",
            x: 745,
            y: 50,
            size: 60
        },
        ResultatSlot:
        {
            type: "slot",
            x: 769,
            y: 278,
            size: 60
        },
        Line1:
        {
            type: "scale",
            x: 355,
            y: 65,
            bitmap: "Others.line1_1",
            scale: 3.8,
            direction: 1
        },
        Line2:
        {
            type: "scale",
            x: 568,
            y: 150,
            bitmap: "Others.line2_1",
            scale: 3.8,
            direction: 0
        },
        Line3:
        {
            type: "scale",
            x: 720,
            y: 95,
            bitmap: "Others.line3_1",
            scale: 3.8,
            direction: 0
        },
        Burning:
        {
            type: "scale",
            x: 565,
            y: 65,
            bitmap: "Others.circuitfabri_scale_1",
            scale: 3.2,
            direction: 0,
            clicker: {
                onClick: function() {
                    RV && RV.RecipeTypeRegistry.openRecipePage("CircuitFabricator");
                }}
        },


        ENERGYBar: {
            type: "scale",
            x: 436,
            y: 295,
            bitmap: "slace_en_1",
            scale: 3.2,
            direction: 0
        },
        Energy: {
            type: "scale",
            x: 425,
            y: 295,
            bitmap: "en_yes",
            scale: 3.2,
            direction: 1
        },
        ELECTRIC: {
            type: "text",
            x: 563,
            y: 260,
            width: 100,
            height: 30,
            text: "Status:"
        },
    }
}
);



SpacesMachine.registerStandartMachine(BlockID.circuit_fabricator, {
    useNetworkItemContainer: true,
    getScreenName() {
        return "main";
    },
    getScreenByName() {
        return CircuitFabricatorUI
    },
    defaultValues: {
        progress: 0,
        progressMax: 0,
        active: false,
        energy: 0,
        energyMax: 1000,
    },
    getCapacity: function() {
        return 1000
    },
    energyReceive: function(type, amount, voltage) {
        amount = Math.min(amount, 1000)
        var add = Math.min(amount, this.getCapacity() - this.data.energy);
        this.data.energy += add
        return add
    },
    canReceiveEnergy: function(type, side) {
        return true;
    },

    tick: function() {
        this.container.sendChanges();
        this.container.validateAll();

        battery.add(this.container, this.data, "EnergySlot");
        battery.addInfinite(this.container, this.data, "EnergySlot")
        var DiamondSlot = this.container.getSlot("DiamondSlot")
        var FabrSlot0 = this.container.getSlot("FabrSlot0")
        var FabrSlot1 = this.container.getSlot("FabrSlot1")
        var DustSlot = this.container.getSlot("DustSlot")
        var Slot1 = this.container.getSlot("Slot1")
        var ResultatSlot = this.container.getSlot("ResultatSlot")

        for (let i in circuit) {
            if (DiamondSlot.id == circuit[i].diamond && FabrSlot1.id == circuit[i].fabricator_1 && 
                FabrSlot0.id == circuit[i].fabricator_0 && DustSlot.id == circuit[i].dust &&
                 Slot1.id == circuit[i].slot && this.data.energy >= 500 && this.data.progress <= 700) {
                this.data.progress++
            }
            if (this.data.progress >= 700 && ResultatSlot.id == 0 || this.data.progress >= 700 &&
                 ResultatSlot.id == circuit[i].resultat) {
                this.data.progress = 0;
                this.data.energy -= 500;
                DiamondSlot.count -= 1;
                FabrSlot0.count -= 1;
                FabrSlot1.count -= 1;
                DustSlot.count -= 1;
                Slot1.count -= 1;

                this.container.setSlot("DiamondSlot", DiamondSlot.id, DiamondSlot.count, DiamondSlot.data)

                this.container.setSlot("FabrSlot1", FabrSlot1.id, FabrSlot1.count, FabrSlot1.data)

                this.container.setSlot("FabrSlot0", FabrSlot0.id, FabrSlot0.count, FabrSlot0.data)

                this.container.setSlot("DustSlot", DustSlot.id, DustSlot.count, DustSlot.data)

                this.container.setSlot("Slot1", Slot1.id, Slot1.count, Slot1.data)




                this.container.setSlot("ResultatSlot", circuit[i].resultat, ResultatSlot.count+1, 0)
            }
        }



        if (this.data.energy >= 0) {
            this.container.setText("ELECTRIC", Translation.translate("Status: have energy"))};
        if (this.data.energy <= 0) {
            this.container.setText("ELECTRIC", Translation.translate("Status: don't have energy"))};
        if (this.data.progress != 0) {
            this.container.setText("ELECTRIC", Translation.translate("Status: working"))};
        this.container.setScale("Energy", this.data.energy / 1000);
        this.container.setScale("Burning", this.data.progress / 700);
        this.container.setScale("Line3", this.data.progress / 500);
        this.container.setScale("Line1", this.data.progress / 300);
        this.container.setScale("Line2", this.data.progress / 200);

        this.container.setScale("ENERGYBar", this.data.energy / 1000);
    },
    energyTick: function(type, src) {

        let output = Math.min(1000, this.data.energy)
        this.data.energy += src.add(output) - output;

    },
    click: function(id, count, data, coords) {



        if (id == ItemID["Space wrench"]) {

            this.blockSource.setBlock(
                this.x,
                this.y,
                this.z,
                BlockID.circuit_fabricator, this.blockSource.getBlockData(
                    this.x,
                    this.y,
                    this.z
                )+1);


        }

    }
});

StorageInterface.createInterface(BlockID.circuit_fabricator, {
    slots: {
        "DiamondSlot": {
            input: true,
            side: "down",
            isValid: function(item, side){
                return SpacesMachine.getCircuitRecipe();
            }
        },
        "FabrSlot0": {
            input: true,
            side: "down",
            isValid: function(item, side){
                return SpacesMachine.getCircuitRecipe();
            }
        },
        "FabrSlot1": {
            input: true,
            side: "down",
            isValid: function(item, side){
                return SpacesMachine.getCircuitRecipe();
            }
        },
        "DustSlot": {
            input: true,
            side: "down",
            isValid: function(item, side){
                return SpacesMachine.getCircuitRecipe();
            }
        },
        "Slot1": {
            input: true,
            side: "down",
            isValid: function(item, side){
                return SpacesMachine.getCircuitRecipe();
            }
        },
        "ResultatSlot": {output: true}
    }
});