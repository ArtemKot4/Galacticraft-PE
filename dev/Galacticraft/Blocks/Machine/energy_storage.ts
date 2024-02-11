IDRegistry.genBlockID("energy_storage_module");
Block.createBlockWithRotation("energy_storage_module", [{
    name: "Energy Storage Module",
    texture: [["Machine",
        0],
        ["Machine",
            0],
        ["Machine",
            0],
        ["Oxygen Storage Module",
            0],
        ["Machine Input",
            0],
        ["Machine Input",
            0]],
    inCreative: true
}])

let EnergyStorageUI = new UI.StandartWindow(
    {
        standard: {
            header: {
                text: {
                    text: Translation.translate("Energy Storage Module")
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
            bitmap: "arrow_bar_2",
            scale: 4.2
        
       
    },  {
        type: "bitmap",
        x: 490,
        y: 210,
        bitmap: "arrow_bar_1",
        scale: 4.2
},{
    type: "bitmap",
    x: 590,
     y: 255,
       scale: 4.3,
            bitmap: "Others.Scala",
}],
    elements: {
        EnergySlot: {
            type: "slot",
            x: 400,
            y: 110,
        
            size: 70
        },
        
        EnergySlot_1: {
            type: "slot",
            x: 400,
            y: 210,
        
            size: 70
        },

        EnergyScale: {
            type: "scale",
            x: 590,
            y: 255,
            scale: 4.3,
            direction: 0,
            bitmap: "Others.Scale1",
            clicker: {
                onClick: function() {
                 
                }}
        },
        
          
      
        Energy: {
            type: "text",
            x: 750,
            y: 190,
            width: 100,
            height: 30,
            text: "Energy type is defined or i sleeping?"
        },
        MaxEnergy: {
            type: "text",
            x: 680,
            y: 220,
            width: 100,
            height: 30,
            text: "Status: Energy is defined?"
        },
    }
});

class EnergyStorage extends MachineStorage {
    defaultValues = { energy: 0, energyMax: 2500000 };
    onTick(): void {
        this.container.setScale("EnergyScale",this.data.energy / this.data.energyMax)
            this.container.setText("MaxEnergy",Translation.translate("out: ")+ this.data.energy)
        // for(var i in batt){
        //     if(this.container.getSlot("EnergySlot").id==batt[i].id){
        //         this.data.energyMax = 27500000;
                  
        //     }else{ this.data.energyMax = 2500000;
                
        //     }};
                 //   battery.add(this.container, this.data, "EnergySlot");
                    Battery.addInfinite(this.container, this.data, "EnergySlot")
                
                }
    
}

SpacesMachine.registerStandartMachine(BlockID.energy_storage_module,new EnergyStorage(EnergyStorageUI));
