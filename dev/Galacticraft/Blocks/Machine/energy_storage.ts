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
                    InfiniteBattery.addInfinite(this.container, this.data, "EnergySlot")
                
                }
    
}

SpacesMachine.registerStandartMachine(BlockID.energy_storage_module,new EnergyStorage(EnergyStorageUI));
