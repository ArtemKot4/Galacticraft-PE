IDRegistry.genBlockID("electric_compressor_sj");
Block.createBlockWithRotation("electric_compressor_sj", [
    {
    name: "Electric compressor",
    texture: [["machine_b",
        0],
        ["machine_b",
            0],
        ["machine_b",
            0],
        ["electric_compressor",
            0],
        ["machine_input",
            0],
        ["machine_b",
            0]],
    inCreative: true
},    {
    name: "Electric compressor",
    texture: [["machine_b",
        0],
        ["machine_b",
            0],
        ["machine_b",
            0],
        ["electric_compressor",
            0],
        ["machine_input",
            0],
        ["machine_b",
            0]],
    inCreative: false
},    {
    name: "Electric compressor",
    texture: [["machine_b",
        0],
        ["machine_b",
            0],
        ["machine_b",
            0],
        ["electric_compressor",
            0],
        ["machine_input",
            0],
        ["machine_b",
            0]],
    inCreative: false
},
],STONE);



var CompressinGElectric = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: Translation.translate("Electric Compressor")
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
        x: 590,
        y: 150,
        bitmap: "compressor_background",
        scale: 4.2
    },
        {
            type: "bitmap",
            x: 346,
            y: 320,
            bitmap: "slace_en_0",
            scale: 3
        },
        {
            type: "bitmap",
            x: 335,
            y: 320,
            bitmap: "en_noy",
            scale: 3
        }],
    elements: {
        "progressScale": {
            type: "scale",
            x: 590,
            y: 150,
            direction: 0,
            bitmap: "compressor_slace",
            scale: 4.2,clicker: { onClick: function() {
              RV && RV.RecipeTypeRegistry.openRecipePage("Compressor");
            }}
        },
        "Elect4": {
            type: "scale",
            x: 630,
            y: 150,
            direction: 1,
            bitmap: "fire_scale",
            scale: 4.1
        },

        "EnergySlot": {
            type: "slot",
            x: 530,
            y: 300,
            bitmap: "Others.en_slot",
            size: 60
        },
        "slot1": {
            type: "slot",
            x: 410,
            y: 110,
            bitmap: "slot",
            size: 60
        },
        "slot2": {
            type: "slot",
            x: 470,
            y: 110,
            bitmap: "slot",
            size: 60
        },
        "slot3": {
            type: "slot",
            x: 530,
            y: 110,
            bitmap: "slot",
            size: 60
        },

        "slot4": {
            type: "slot",
            x: 410,
            y: 170,
            bitmap: "slot",
            size: 60
        },
        "slot5": {
            type: "slot",
            x: 470,
            y: 170,
            bitmap: "slot",
            size: 60
        },
        "slot6": {
            type: "slot",
            x: 530,
            y: 170,
            bitmap: "slot",
            size: 60
        },

        "slot7": {
            type: "slot",
            x: 410,
            y: 230,
            bitmap: "slot",
            size: 60
        },
        "slot8": {
            type: "slot",
            x: 470,
            y: 230,
            bitmap: "slot",
            size: 60
        },
        "slot9": {
            type: "slot",
            x: 530,
            y: 230,
            bitmap: "slot",
            size: 60
        },
        ENERGYBar: {
            type: "scale",
            x: 346,
            y: 320,
            bitmap: "slace_en_1",
            scale: 3,
            direction: 0
        },
        Energy: {
            type: "scale",
            x: 335,
            y: 320,
            bitmap: "en_yes",
            scale: 3,
            direction: 1
        },
        "slotResult1": {
            type: "slot",
            x: 830,
            y: 221,
            bitmap: "slot",
            size: 60
        },
        "slotResult2": {
            type: "slot",
            x: 830,
            y: 161,
            bitmap: "slot",
            size: 60
        },
        Status:
        {
            type: "text",
            x: 650,
            y: 290,
            width: 100,
            height: 30,
            text: "Статус: "
        },
    }
});

SpacesMachine.registerStandartMachine(BlockID.electric_compressor_sj, {
    useNetworkItemContainer: true,
    getScreenName() {
        return "main";
    },
    getScreenByName() {
        return CompressinGElectric
    },
    defaultValues: {
        progress: 0,
        progressMax: 500,
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
    tick: function() {
        this.container.sendChanges();
        this.container.validateAll();
        
        battery.add(this.container, this.data, "EnergySlot")
       battery.addInfinite(this.container,this.data,"EnergySlot")
        this.container.setScale("progressScale", this.data.progress / 500);
        this.container.setScale("ENERGYBar", this.data.energy / 1000);
        this.container.setScale("Energy", this.data.energy / 100);
        if (this.data.energy != 0) {
            this.container.setText("Status", Translation.translate("Status: have energy"))};
        if (this.data.energy == 0) {
            this.container.setText("Status", Translation.translate("Status: don't have energy"))};
        if (this.data.progress != 0) {
            this.container.setText("Status", Translation.translate("Status: working"))};

       var slot1 = this.container.getSlot("slot1");
        var slot2 = this.container.getSlot("slot2");
                var slot3 = this.container.getSlot("slot3");
                        var slot4 = this.container.getSlot("slot4");
                                var slot5 = this.container.getSlot("slot5");
                                        var slot6 = this.container.getSlot("slot6");
                                                var slot7 = this.container.getSlot("slot7");
                                                        var slot8 = this.container.getSlot("slot8");
                                                                var slot9 = this.container.getSlot("slot9");
                                                                var slotResult2 = this.container.getSlot("slotResult2")
            var slotResult1 = this.container.getSlot("slotResult1")
        
                for(let i in compressorRecipe){
             if(slot1.id == compressorRecipe[i].id1 && slot2.id == compressorRecipe[i].id2 && slot3.id == compressorRecipe[i].id3 && slot4.id == compressorRecipe[i].id4 && slot5.id == compressorRecipe[i].id5 && slot6.id == compressorRecipe[i].id6 && slot7.id == compressorRecipe[i].id7 && slot8.id == compressorRecipe[i].id8 &&
             slot9.id == compressorRecipe[i].id9 &&
             this.data.energy >= 100 && this.data.progress<=500){
         this.data.progress++
         if(this.data.progress>=500){
                      if(slotResult1.id && slotResult2.id == 0 || slotResult1.id && slotResult2.id == compressorRecipe[i].recept0){
           slot1.count-=1;
           slot2.count-=1;
           slot3.count-=1;
           slot4.count-=1;
           slot5.count-=1;
           slot6.count-=1;
           slot7.count-=1;
           slot8.count-=1;
           slot9.count-=1;
           
           this.container.setSlot("slot1",slot1.id,slot1.count,slot1.data)
           
           this.container.setSlot("slot2",slot2.id,slot2.count,slot2.data)
           
           this.container.setSlot("slot3",slot3.id,slot3.count,slot3.data)
           
        this.container.setSlot("slot4",slot4.id,slot4.count,slot4.data)
        
 this.container.setSlot("slot5",slot5.id,slot5.count,slot5.data)
 
  this.container.setSlot("slot6",slot6.id,slot6.count,slot6.data)
  
         this.container.setSlot("slot7",slot7.id,slot7.count,slot7.data)   
         
        this.container.setSlot("slot8",slot8.id,slot8.count,slot8.data)  
         
         this.container.setSlot("slot9",slot9.id,slot9.count,slot9.data) 
         
         
            this.data.energy-=100;
            this.data.progress=0;
            
            
            this.container.setSlot("slotResult2",compressorRecipe[i].recept0,slotResult2.count+1,0);
            this.container.setSlot("slotResult1",compressorRecipe[i].recept0,slotResult1.count+1,0)
           
           
            }
        }}
         
          
    }
    },
    energyTick: function(type, src) {

        let output = Math.min(1000, this.data.energy)
        this.data.energy += src.add(output) - output;

    },click: function(id, count, data, coords){

        
       
          if(id==ItemID["Space wrench"]){
              
                    this.blockSource.setBlock(
        this.x,
        this.y, 
        this.z, 
        BlockID.electric_compressor_sj, this.blockSource.getBlockData(
            this.x, 
            this.y, 
            this.z
              )+1);
              
              
          }

     }
    /*
let canisterFuel = this.container.getSlot("canisterFuel");

this.container.setScale("FuelScale", this.data.liquid / 40);
this.container.setText("ELECTRIC", "Sj :" + this.data.energy + " / " + this.data.energyMax);
*/
}
);
﻿
﻿