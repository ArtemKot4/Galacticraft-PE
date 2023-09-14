IDRegistry.genBlockID("electric_compressor_gj");
Block.createBlockWithRotation(
  "electric_compressor_gj",
  [
    {
      name: "Electric compressor",
      texture: [
        ["machine_b", 0],
        ["machine_b", 0],
        ["machine_b", 0],
        ["electric_compressor", 0],
        ["machine_input", 0],
        ["machine_b", 0],
      ],
      inCreative: true,
    },
    {
      name: "Electric compressor",
      texture: [
        ["machine_b", 0],
        ["machine_b", 0],
        ["machine_b", 0],
        ["electric_compressor", 0],
        ["machine_input", 0],
        ["machine_b", 0],
      ],
      inCreative: false,
    },
    {
      name: "Electric compressor",
      texture: [
        ["machine_b", 0],
        ["machine_b", 0],
        ["machine_b", 0],
        ["electric_compressor", 0],
        ["machine_input", 0],
        ["machine_b", 0],
      ],
      inCreative: false,
    },
  ],
  STONE
);

var CompressinGElectric = new UI.StandartWindow({
  standard: {
    header: {
      text: {
        text: Translation.translate("Electric Compressor"),
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
      x: 346,
      y: 320,
      bitmap: "slace_en_0",
      scale: 3,
    },
    {
      type: "bitmap",
      x: 335,
      y: 320,
      bitmap: "en_noy",
      scale: 3,
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
    Elect4: {
      type: "scale",
      x: 630,
      y: 150,
      direction: 1,
      bitmap: "fire_scale",
      scale: 4.1,
    },

    EnergySlot: {
      type: "slot",
      x: 530,
      y: 300,
      bitmap: "Others.en_slot",
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
    ENERGYBar: {
      type: "scale",
      x: 346,
      y: 320,
      bitmap: "slace_en_1",
      scale: 3,
      direction: 0,
    },
    Energy: {
      type: "scale",
      x: 335,
      y: 320,
      bitmap: "en_yes",
      scale: 3,
      direction: 1,
    },
    slotResult1: {
      type: "slot",
      x: 830,
      y: 221,
      bitmap: "slot",
      size: 60,
    },
    slotResult2: {
      type: "slot",
      x: 830,
      y: 161,
      bitmap: "slot",
      size: 60,
    },
    Status: {
      type: "text",
      x: 650,
      y: 290,
      width: 100,
      height: 30,
      text: "Статус: ",
    },
  },
});

class ElectricCompressor extends InputMachine {
  defaultValues = {
    progress: 0,

    energy: 0,
    energyMax: 1000,
  };
  onTick(): void {
    this.container.sendChanges();
    this.container.validateAll();

    // battery.add(this.container, this.data, "EnergySlot");
    // battery.addInfinite(this.container, this.data, "EnergySlot");
    this.container.setScale("progressScale", this.data.progress / 500);
    this.container.setScale("ENERGYBar", this.data.energy / 1000);
    this.container.setScale("Energy", this.data.energy / 100);
    if (this.data.energy != 0) {
      this.container.setText(
        "Status",
        Translation.translate("Status: have energy")
      );
    }
    if (this.data.energy == 0) {
      this.container.setText(
        "Status",
        Translation.translate("Status: don't have energy")
      );
    }
    if (this.data.progress != 0) {
      this.container.setText(
        "Status",
        Translation.translate("Status: working")
      );
    }

    var slotResult = this.container.getSlot("slotResult2");
    var slotResult1 = this.container.getSlot("slotResult1");

for (var i in compressorRecipe) {
          let recipe = compressorRecipe[i];
          for (var n = 0; n <= 9; n++) {
            if (
              this.container.getSlot("slot_" + n).id == recipe["slot_" + n] &&
              this.data.energy >= 100 &&
              this.data.progress < 500
            ) {
              this.data.progress++;
            }

    if (slotResult.id == 0 || slotResult.id == compressorRecipe[i].result && this.data.progress >= 500) {
    
        
            this.container.getSlot("slot_" + n).count -= 1;

            this.container.setSlot(
              "slot_" + n,
              this.container.getSlot("slot_" + n).id,
              this.container.getSlot("slot_" + n).count,
              this.container.getSlot("slot_" + n).data
            );
            this.data.energy -= 100;
            this.data.progress = 0;
            this.container.setSlot(
              "slotResult1",
              compressorRecipe[i].result,
              slotResult1.count + 1,
              0
            );
            this.container.setSlot(
              "slotResult2",
              compressorRecipe[i].result,
              slotResult.count + 1,
              0
            );
          }
      }
    }
  }
}

SpacesMachine.registerStandartMachine(BlockID.electric_compressor_gj, new ElectricCompressor(CompressinGElectric))
//   useNetworkItemContainer: true,
//   getScreenName() {
//     return "main";
//   },
//   getScreenByName() {
//     return CompressinGElectric;
//   },
//   defaultValues: {
//     progress: 0,

//     energy: 0,
//     energyMax: 1000,
//   },
//   getCapacity: function () {
//     return 1000;
//   },
//   energyReceive: function (type, amount, voltage) {
//     amount = Math.min(amount, 1000);
//     var add = Math.min(amount, this.getCapacity() - this.data.energy);
//     this.data.energy += add;
//     return add;
//   },
//   tick: function () {
//     this.container.sendChanges();
//     this.container.validateAll();

//     // battery.add(this.container, this.data, "EnergySlot");
//     // battery.addInfinite(this.container, this.data, "EnergySlot");
//     this.container.setScale("progressScale", this.data.progress / 500);
//     this.container.setScale("ENERGYBar", this.data.energy / 1000);
//     this.container.setScale("Energy", this.data.energy / 100);
//     if (this.data.energy != 0) {
//       this.container.setText(
//         "Status",
//         Translation.translate("Status: have energy")
//       );
//     }
//     if (this.data.energy == 0) {
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

//     var slotResult = this.container.getSlot("slotResult2");
//     var slotResult1 = this.container.getSlot("slotResult1");

// for (var i in compressorRecipe) {
//           let recipe = compressorRecipe[i];
//           for (var n = 0; n <= 9; n++) {
//             if (
//               this.container.getSlot("slot_" + n).id == recipe["slot_" + n] &&
//               this.data.energy >= 100 &&
//               this.data.progress < 500
//             ) {
//               this.data.progress++;
//             }

//     if (slotResult.id == 0 || slotResult.id == compressorRecipe[i].result && this.data.progress >= 500) {
    
        
//             this.container.getSlot("slot_" + n).count -= 1;

//             this.container.setSlot(
//               this.container.getSlot("slot_" + n),
//               this.container.getSlot("slot_" + n).id,
//               this.container.getSlot("slot_" + n).count,
//               this.container.getSlot("slot_" + n).data
//             );
//             this.data.energy -= 100;
//             this.data.progress = 0;
//             this.container.setSlot(
//               "slotResult1",
//               compressorRecipe[i].result,
//               slotResult1.count + 1,
//               0
//             );
//             this.container.setSlot(
//               "slotResult2",
//               compressorRecipe[i].result,
//               slotResult.count + 1,
//               0
//             );
//           }
//       }
//     }
//   },
//   energyTick: function (type, src) {
//     let output = Math.min(1000, this.data.energy);
//     this.data.energy += src.add(output) - output;
//   },

//   /*
// let canisterFuel = this.container.getSlot("canisterFuel");

// this.container.setScale("FuelScale", this.data.liquid / 40);
// this.container.setText("ELECTRIC", "Sj :" + this.data.energy + " / " + this.data.energyMax);
// */
// });
// StorageInterface.createInterface(BlockID.electric_compressor_gj, {
//     slots: {
//         "slot^1-9": {
//             input: true,
//             side: "verctical",
//             isValid: function(item, side){
//                 return SpacesMachine.getCompressorRecipe();
//             }
//         },

//         "slotResult1": {output: true},
//         "slotResult2": {output: true},
//     }
// });
