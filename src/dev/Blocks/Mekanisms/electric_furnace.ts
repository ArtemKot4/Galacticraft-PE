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

let ElectricFurnaceUI = new UI.StandartWindow(
    {
        standard: {
            header: {
                text: {
                    text: Translation.translate("Electric furnace")
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
            x: 550,
            y: 110,
            bitmap: "arrow_bar_1",
            scale: 4.2
        
       
       },
     {
        type: "bitmap",
        x: 430,
        y: 140,
        bitmap: "slace_en_0",
        scale: 3,
      },    
     {
        type: "bitmap",
        x: 415,
        y: 140,
        bitmap: "en_noy",
        scale: 3,
        
           }
    ],
    elements: {
        input: {
            type: "slot",
            x: 460,
            y: 110,
            bitmap: "coalslot",
            size: 70
        },

        ENERGYBar: {
            type: "scale",
            x: 430,
            y: 140,
            bitmap: "slace_en_1",
            scale: 3,
            direction: 0
        },
        Energy: {
            type: "scale",
            x: 415,
            y: 140,
            bitmap: "en_yes",
            scale: 3,
            direction: 1
        },
        result: {
            type: "slot",
            x: 610,
            y: 110,
            bitmap: "coalslot",
            size: 70
        },
        progress_scale: {
            type: "scale",
            x: 550,
            y: 110,
            scale: 4.2,
            direction: 0,
            bitmap: "arrow_bar_scale",
            clicker: {
                onClick: function() {
                    RV && RV.RecipeTypeRegistry.openRecipePage("generator 2");
                }}
        },
        
          
      
        ELECTRIC: {
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
