IDRegistry.genBlockID("electric_furnace");
Block.createBlockWithRotation("electric_furnace", [{
    name: "Electric furnace",
    texture: [["Machine",
        0],
        ["Machine",
            0],
        ["Machine",
            0],
        ["electric_furnace",
            0],
        ["Machine Input",
            0],
        ["Machine",
            0]],
    inCreative: true
}])


// SpacesMachine.registerStandartMachine(BlockID.electric_furnace, {
//     useNetworkItemContainer: true,
//     getScreenName() {
//         return "main";
//     },
//     getScreenByName() {
//         return ElectricFurnaceUI
//     },
//     defaultValues: {
//         progress: 0,
//         progressMax: 0,
//         active: false,
//         energy: 0,
//         energyMax: 1000,
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
//         this.container.sendChanges();
//         this.container.validateAll();

//         battery.add(this.container, this.data, "EnergySlot");
//         battery.addInfinite(this.container, this.data, "EnergySlot")
       
//   var output = this.container.getSlot("result");
//   var input = this.container.getSlot("input");
//   var recipe = Recipes.getFurnaceRecipeResult(input.id, input.data);
//    //if (output.id == recipe.id && output.count + recipe.count <= 64 || !output.id) {
//     if((output.id == recipe.id && output.count + recipe.count <= 64 ) || !output.id){
//   if(this.data.energy>=200&&this.data.progress<=200/*&&*/){
//     this.data.energy--;
//     this.data.progress++;
//   };};
//    if (this.data.progress >= 200) {
//             input.setSlot(input.id, input.count - 1, input.data);
//             output.setSlot(recipe.id, output.count + 1, recipe.data);
//             this.data.progress = 0;
//           };
//         if (this.data.energy >= 0) {
//             this.container.setText("ELECTRIC", Translation.translate("Status: have energy"))};
//         if (this.data.energy <= 0) {
//             this.container.setText("ELECTRIC", Translation.translate("Status: don't have energy"))};
//         if (this.data.progress != 0) {
//             this.container.setText("ELECTRIC", Translation.translate("Status: working"))};
//         this.container.setScale("Energy", this.data.energy / 1000);
//         this.container.setScale("Burning", this.data.progress / 200);
        
       
//         this.container.setScale("ENERGYBar", this.data.energy / 1000);
//     },
//     energyTick: function(type, src) {

//         let output = Math.min(1000, this.data.energy)
//         this.data.energy += src.add(output) - output;

//     },
//     click: function(id, count, data, coords) {



//         if (id == ItemID["Space wrench"]) {

//             this.blockSource.setBlock(
//                 this.x,
//                 this.y,
//                 this.z,
//                 BlockID.electric_furnace, this.blockSource.getBlockData(
//                     this.x,
//                     this.y,
//                     this.z
//                 )+1);


//         }

//     }
// });
