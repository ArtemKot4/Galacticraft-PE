new GBlock("coal_generator", [{
    name: "Coal Generator", texture: [["Machine", 0], ["Machine", 0], ["Machine", 0], ["Coal Generator", 0], ["Machine Output", 0], ["Machine Output", 0]], inCreative: true
}, {
    name: "Coal Generator", texture: [["Machine", 0], ["Machine", 0], ["Machine", 0], ["Coal Generator", 0], ["Machine Output", 0], ["Machine Output", 0]], inCreative: false
}, {
    name: "Coal Generator", texture: [["Machine", 0], ["Machine", 0], ["Machine", 0], ["Coal Generator", 0], ["Machine Output", 0], ["Machine Output", 0]], inCreative: false
}], STONE).createWithRotation().info("4 gJ/ s");


// if(__config__.getBool("Difficulty.Machine.Heating")==true){


const CoalFactory = new RecipeFactory();
CoalFactory.set({"coal_slot": {
    id: VanillaItemID.coal, count: 1, data: 0, extra: null
},
"power": 3000})


CoalFactory.set({"coal_slot": {
    id: VanillaItemID.stick, count: 1, data: 0, extra: null
},
"power": 150})


class CoalGenerator extends Generator {

    public defaultValues = {
        energy: 0,
        energy_max: 3000,
        burning_max: 3000,
        burning: 0,
        active: false
    };

   public static isCoal(slot: name, container: ItemContainer, data: TileEntity['data']): void {

        const _slot = container.getSlot(slot);
        for (const i in CoalFactory.storage) {
            const recipe = RecipeFactory.get(container, CoalFactory.storage[i]); 
          //  if (_slot.id === burnItems[i].id && data.burning != data.burningMax) {
            if (recipe("coal_slot", "id") && data.burning !== data.burning_max) {
                data.burning += data.burning_max
            
                _slot.count--

                data.active = true;
            }
        }
        if (data.burning === data.burning_max && data.active === true && data.energy <= data.energy_max) { 
            data.energy += 1 }
        if (data.energy === data.energy_max) { data.active = false; data.burning = 0 }

    };

   public clientTick(): void {
    if(this.data.energy <= 0) return;
       if(World.getThreadTime() % 15 === 0) {
       return (
       Particles.addParticle(
            EParticleType.FLAME, this.x + 0.5,
            this.y + 0.5,
            this.z + 0.5,
            Math.random() / 20,
            Math.random() / 20,
            Math.random() / 20),

            Particles.addParticle(
                EParticleType.CLOUD, this.x + 0.5,
                this.y + 0.5,
                this.z + 0.5,
                Math.random() / 20,
                Math.random() / 20,
                Math.random() / 20)
       )
       }
   };

    public onTick(): void {
        this.container.sendChanges();
        this.container.validateAll();

      

        CoalGenerator.isCoal("coal_slot", this.container, this.data)
        

        this.container.setScale("progress_scale", this.data.energy / this.data.energy_max);


        this.container.setText("EnergyText", "gJ :" + this.data.energy + " / " + this.getCapacity());


        if (this.data.energy > 0) {
            if(World.getThreadTime() % 15 === 0) {


            }
            this.container.setText("Status", Translation.translate("Status: working"));
        }
        else {
            this.container.setText("Status", Translation.translate("Status: fuel empty"));

        };

        if (this.data.energy >= this.data.energy_max) {
            this.container.setText("Status", Translation.translate("Status: storage full"));
           
        }
    };

}


SpacesMachine.registerStandartMachine(BlockID.coal_generator, new CoalGenerator(CoalGeneratorUI))

// StorageInterface.createInterface(BlockID.coal_generator, {
//     slots: {
//         "coalSlot": {
//             input: true,
//             side: "down",
//             isValid: function (item, side) {
//                 return SpacesMachine.getCoal();
//             }
//         },
//     }
// });
