IDRegistry.genBlockID("compressor_gj");
Block.createBlockWithRotation(
  "compressor_gj",
  [
    {
      name: "Compressor",
      texture: [
        ["Machine", 0],
        ["Machine", 0],
        ["Machine", 0],
        ["Compressor", 0],
        ["Machine", 0],
        ["Machine", 0],
      ],
      inCreative: true,
    },
    {
      name: "Compressor",
      texture: [
        ["Machine", 0],
        ["Machine", 0],
        ["Machine", 0],
        ["Compressor", 0],
        ["Machine", 0],
        ["Machine", 0],
      ],
      inCreative: false,
    },
    {
      name: "Compressor",
      texture: [
        ["Machine", 0],
        ["Machine", 0],
        ["Machine", 0],
        ["Compressor", 0],
        ["Machine", 0],
        ["Machine", 0],
      ],
      inCreative: false,
    },
  ],
  STONE
);

var CompressinG = new UI.StandartWindow({
  standard: {
    header: {
      text: {
        text: Translation.translate("Compressor"),
      },
    },
    inventory: {
      standard: true,
    },
    background: {
      standard: true,
    },
  },
  drawing: [
    {
      type: "bitmap",
      x: 590,
      y: 150,
      bitmap: "compressor_background",
      scale: 4.2,
    },
    {
      type: "bitmap",
      x: 630,
      y: 150,
      bitmap: "fire_background",
      scale: 4.1,
    },
  ],
  elements: {
    progressScale: {
      type: "scale",
      x: 590,
      y: 150,
      direction: 0,
      bitmap: "compressor_slace",
      scale: 4.2,
      clicker: {
        onClick: function () {
          RV && RV.RecipeTypeRegistry.openRecipePage("Compressor");
        },
      },
    },
    BurningScale: {
      type: "scale",
      x: 630,
      y: 150,
      direction: 1,
      bitmap: "fire_scale",
      scale: 4.1,
    },

    CoalSlot: {
      type: "slot",
      x: 530,
      y: 300,
      bitmap: "coalslot",
      size: 60,
    },
    slot_1: {
      type: "slot",
      x: 410,
      y: 110,
      bitmap: "slot",
      size: 60,
    },
    slot_2: {
      type: "slot",
      x: 470,
      y: 110,
      bitmap: "slot",
      size: 60,
    },
    slot_3: {
      type: "slot",
      x: 530,
      y: 110,
      bitmap: "slot",
      size: 60,
    },

    slot_4: {
      type: "slot",
      x: 410,
      y: 170,
      bitmap: "slot",
      size: 60,
    },
    slot_5: {
      type: "slot",
      x: 470,
      y: 170,
      bitmap: "slot",
      size: 60,
    },
    slot_6: {
      type: "slot",
      x: 530,
      y: 170,
      bitmap: "slot",
      size: 60,
    },

    slot_7: {
      type: "slot",
      x: 410,
      y: 230,
      bitmap: "slot",
      size: 60,
    },
    slot_8: {
      type: "slot",
      x: 470,
      y: 230,
      bitmap: "slot",
      size: 60,
    },
    slot_9: {
      type: "slot",
      x: 530,
      y: 230,
      bitmap: "slot",
      size: 60,
    },

    slotResult: {
      type: "slot",
      x: 830,
      y: 190,
      bitmap: "slot",
      size: 70,
    },
    Status: {
      type: "text",
      x: 650,
      y: 290,
      width: 100,
      height: 30,
      text: "Status: ",
    },
  },
});

function status(container: ItemContainer, data: TileEntityBase["data"]): void {
  if (data.progress && data.progress > 0)
    return container.setText(
      "Status",
      Translation.translate("Status: working")
    );

  if (data.energy > 0) {
    return container.setText(
      "Status",
      Translation.translate("Status: have energy")
    );
  } else {
    return container.setText(
      "Status",
      Translation.translate("Status: don't have energy")
    );
  }
}

class Compressor extends Machine {
  defaultValues = {
    energy: 0,
    progress: 0,
    burning: 0,
    burningMax: 1000,
    active: false,
  };
  onTick(): void {
    this.container.sendChanges();
    this.container.validateAll();
    status(this.container, this.data);
    const result = this.container.getSlot("slotResult");
    const coal = this.container.getSlot("CoalSlot");
    for (var i in burnItems) {
      if (coal.id == burnItems[i].id && this.data.burning != 500) {
        this.data.burning += 500;
        coal.count--;

        this.data.active = true;
      }
    }
    if (this.data.burning == 500 && this.data.active == true) {
      this.data.energy++;
    }
    if (this.data.energy == 500) {
      this.data.active = false;
      this.data.burning = 0;
    }

    this.container.setScale("progressScale", this.data.progress / 500);
    this.container.setScale("BurningScale", this.data.energy / 500);
   
  }
}

TileEntity.registerPrototype(
  BlockID.compressor_gj,
  new Compressor(CompressinG)
);
// {   useNetworkItemContainer: true,
//   getScreenName() {
//     return "main";
//   },
//   getScreenByName() {
//     return CompressinG;
//   },
//   defaultValues: {
//     progress: 0,
//     progressMax: 0,
//     burning: 0,
//     burningMax: 1000,
//     energy: 0,
//     active: false,
//   },
//   getRecipe: function () {
//     // for (var n = 0; n <= 9; n++) {
//     //   for (var i in compressorRecipe) {
//     //   }
//     // }
//   },
//   tick: function () {
//     this.container.sendChanges();
//     this.container.validateAll();

//     if (this.data.energy != 0) {
//       this.container.setText(
//         "Status",
//         Translation.translate("Status: have energy")
//       );
//     } else if (this.data.energy == 0) {
//       this.container.setText(
//         "Status",
//         Translation.translate("Status: don't have energy")
//       );
//     }
//     if (this.data.progress != 0) {
//       this.container.setText(
//         "Status",
//         Translation.translate("Status: working")
//       );
//     }
//     let slotResult = this.container.getSlot("slotResult");
//     var CoalSlot = this.container.getSlot("CoalSlot");
//     for (var i in burnItems) {
//       if (CoalSlot.id == burnItems[i].id && this.data.burning != 500) {
//         this.data.burning += 500;
//         this.container.getSlot("CoalSlot").count -= 1;
//         CoalSlot.count--;

//         this.data.active = true;
//       }
//     }
//     if (this.data.burning == 500 && this.data.active == true) {
//       this.data.energy++;
//     }
//     if (this.data.energy == 500) {
//       this.data.active = false;
//       this.data.burning = 0;
//     }
//     //let slots = ["slot_1","slot_2","slot_3","slot_4","slot_5","slot_6","slot_7","slot_8","slot_9"];
//     for (var i in compressorRecipe) {
//       let recipe = compressorRecipe[i];
//       for (var n = 0; n <= 9; n++) {
//         if (
//           this.container.getSlot("slot_" + n).id == recipe["slot_" + n] &&
//           this.data.energy >= 100 &&
//           this.data.progress < 500
//         ) {
//           this.data.progress++;
//         }
//         if (
//           slotResult.id == 0 ||
//           (slotResult.id == compressorRecipe[i].result &&
//             this.data.progress >= 500)
//         ) {
//           this.data.energy -= 100;
//           this.data.progress = 0;
//           this.container.getSlot("slot_" + n).count -= 1;
//           this.container.setSlot(
//             this.container.getSlot("slot_" + n),
//             this.container.getSlot("slot_" + n).id,
//             this.container.getSlot("slot_" + n).count,
//             this.container.getSlot("slot_" + n).data
//           );

//           this.container.setSlot(
//             "slotResult",
//             recipe.result,
//             (slotResult.count += 1),
//             0
//           );
//         }
//       }
//     }

//     this.container.setScale("progressScale", this.data.progress / 500);
//     this.container.setScale("BurningScale", this.data.energy / 500);
//   },

/*
let canisterFuel = this.container.getSlot("canisterFuel");

this.container.setScale("FuelScale", this.data.liquid / 40);
this.container.setText("ELECTRIC", "Sj :" + this.data.energy + " / " + this.data.energyMax);

});
 */

// StorageInterface.createInterface(BlockID.compressor_gj, {
//     slots: {
//         "slot^1-9": {
//             input: true,
//             side: "down",
//             isValid: function(item, side){
//                 return SpacesMachine.getCompressorRecipe();
//             }
//         },
//         "CoalSlot": {
//             input: true,
//             side: "horizontal",
//             isValid: function(item, side){
//                 return SpacesMachine.getCoal();
//             }
//         },
//         "slotResult": {output: true}
//     }
// });
