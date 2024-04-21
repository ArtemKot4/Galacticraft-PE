


const CircuitFabricatorFactory = new RecipeFactory();

class CircuitFabricator extends InputMachine {
  defaultValues = {
    progress: 0,
    progressMax: 500,

    energy: 0,
    energy_max: 1000,
  };

 public setupRecipeLogic() {
  for (const i in CircuitFabricatorFactory.storage) {
    const storage = CircuitFabricatorFactory.storage;
    if (this.data.energy >= (this.data.energy_max / 2) &&
     RecipeFactory.getForMore(this.container, storage[i], 5) && 
    this.data.progress < this.data.progressMax) {
      this.data.progress++;
    };

    if(this.data.progress >= this.data.progressMax) {
      RecipeFactory.decreaseSlots(this.container, 5);
      RecipeFactory.setupResult(this.container, "result", storage[i].result);
      this.data.progress = 0;
      this.data.energy -= this.data.energy_max / 2
    };
  }
 }

  onTick(): void {
 this.container.validateAll();
 this.container.sendChanges();
   this.setupRecipeLogic();
    status(this.container, this.data)
    this.container.setScale("Energy", this.data.energy / 1000);
    this.container.setScale("Burning", this.data.progress / 250);
    this.container.setScale("Line3", this.data.progress / 230);
    this.container.setScale("Line1", this.data.progress / 130);
    this.container.setScale("Line2", this.data.progress / 30);

    this.container.setScale("ENERGYBar", this.data.energy / this.data.energy_max);
  }
}

SpacesMachine.registerStandartMachine(
  BlockID.circuit_fabricator,
  new CircuitFabricator(CircuitFabricatorUI)
);
//  {   useNetworkItemContainer: true,
//     getScreenName() {
//         return "main";
//     },
//     getScreenByName() {
//         return CircuitFabricatorUI
//     },
//     defaultValues: {
//         progress: 0,
//         progressMax: 500,
//         active: false,
//         energy: 0,
//         energy_max: 1000,
//     },
//     getCapacity: function() {
//         return 1000
//     },
//     energyReceive: function(type, amount, voltage) {
//         amount = Math.min(amount, 1000)
//         var add = Math.min(amount, this.getCapacity() - this.data.energy);
//         this.data.energy += add
//         return add
//     },
//     canReceiveEnergy: function(type, side) {
//         return true;
//     },

//     tick: function() {
//         for(var i in circuit[i]){
//         for(var n; n<=5; n++){
//             var fabricator = circuit[i]
//             var slots = this.container.getSlot("slot_"+n)
//         this.container.sendChanges();
//         this.container.validateAll();

//         for (let i in circuit) {
//             if (slots.id == fabricator["slot_"+n]
//             && this.data.energy >= 500 && this.data.progress <= 700) {
//                 this.data.progress++
//             }
//             if (this.data.progress >= 700 && this.container.getSlot("result_slot").id == 0 || this.data.progress >= 700 &&
//             this.container.getSlot("result_slot").id == circuit[i].result) {
//                 this.data.progress = 0;
//                 this.data.energy -= 500;
//                 this.container.getSlot("slot_"+n).count-=1

//                 this.container.setSlot(slots, slots.id, slots.count, slots.data)

//                 this.container.setSlot("result_slot", circuit[i].result, this.container.getSlot("result_slot").count+1, 0)
//             }
//         }
//     }}

//         if (this.data.energy >= 0) {
//             this.container.setText("ELECTRIC", Translation.translate("Status: have energy"))}
//             else if (this.data.energy <= 0) {
//             this.container.setText("ELECTRIC", Translation.translate("Status: don't have energy"))};
//         if (this.data.progress > 0) {
//             this.container.setText("ELECTRIC", Translation.translate("Status: working"))};
//         this.container.setScale("Energy", this.data.energy / 1000);
//         this.container.setScale("Burning", this.data.progress / 700);
//         this.container.setScale("Line3", this.data.progress / 500);
//         this.container.setScale("Line1", this.data.progress / 300);
//         this.container.setScale("Line2", this.data.progress / 200);

//         this.container.setScale("ENERGYBar", this.data.energy / 1000);
//     },
//     energyTick: function(type, src) {

//         let output = Math.min(1000, this.data.energy)
//         this.data.energy += src.add(output) - output;

//     },

// });

// StorageInterface.createInterface(BlockID.circuit_fabricator, {
//     slots: {
//         "DiamondSlot": {
//             input: true,
//             side: "down",
//             isValid: function(item, side){
//                 return SpacesMachine.getCircuitRecipe();
//             }
//         },
//         "FabrSlot0": {
//             input: true,
//             side: "down",
//             isValid: function(item, side){
//                 return SpacesMachine.getCircuitRecipe();
//             }
//         },
//         "FabrSlot1": {
//             input: true,
//             side: "down",
//             isValid: function(item, side){
//                 return SpacesMachine.getCircuitRecipe();
//             }
//         },
//         "DustSlot": {
//             input: true,
//             side: "down",
//             isValid: function(item, side){
//                 return SpacesMachine.getCircuitRecipe();
//             }
//         },
//         "Slot1": {
//             input: true,
//             side: "down",
//             isValid: function(item, side){
//                 return SpacesMachine.getCircuitRecipe();
//             }
//         },
//         "ResultatSlot": {output: true}
//     }
// })
