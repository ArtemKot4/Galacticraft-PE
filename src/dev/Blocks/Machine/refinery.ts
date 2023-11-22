IDRegistry.genBlockID("refinery_sc");
Block.createBlockWithRotation(
  "refinery_sc",
  [
    {
      name: "Refinery",
      texture: [
        ["Machine", 0],
        ["refinery_top", 0],
        ["refinery_front", 0],
        ["refinery_side", 0],
        ["Machine Input", 0],
        ["Machine Oxygen Input", 0],
      ],
      inCreative: true,
    },
    {
      name: "Refinery",
      texture: [
        ["Machine", 0],
        ["refinery_top", 0],
        ["refinery_front", 0],
        ["refinery_side", 0],
        ["Machine Input", 0],
        ["Machine Oxygen Input", 0],
      ],
      inCreative: false,
    },
    {
      name: "Refinery",
      texture: [
        ["Machine", 0],
        ["refinery_top", 0],
        ["refinery_front", 0],
        ["refinery_side", 0],
        ["Machine Input", 0],
        ["Machine Oxygen Input", 0],
      ],
      inCreative: false,
    },
  ],
  STONE
);

let ClearFuel = new UI.StandartWindow({
  standard: {
    header: {
      text: {
        text: Translation.translate("Refinery"),
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
      x: 268,
      y: 190,
      bitmap: "Liquid_null",
      scale: 3.8,
    },
    {
      type: "bitmap",
      x: 769,
      y: 190,
      bitmap: "Liquid_null",
      scale: 3.8,
    },

    {
      type: "bitmap",
      x: 500,
      y: 70,
      bitmap: "slace_en_0",
      scale: 3,
    },
    {
      type: "bitmap",
      x: 640,
      y: 70,
      bitmap: "en_noy",
      scale: 3,
    },
  ],
  elements: {
    canister_1: {
      type: "slot",
      x: 355,
      y: 120,
      size: 70,
      bitmap: "SPC.SPC_Canister",
    },
    oil_scale: {
      type: "scale",
      x: 268,
      y: 190,
      bitmap: "Liquid_oil",
      scale: 3.8,
      direction: 1,
      clicker: {
        onClick: function () {
          /* RV && RV.RecipeTypeRegistry.openRecipePage("refinery");*/
        },
      },
    },

    fuel_scale: {
      type: "scale",
      x: 769,
      y: 190,
      bitmap: "Liquid_fuel",
      scale: 3.8,
      direction: 1,
      clicker: {
        onClick: function () {
          /* RV && RV.RecipeTypeRegistry.openRecipePage("refinery");*/
        },
      },
    },
    canister_2: {
      type: "slot",
      x: 855,
      y: 120,
      size: 70,
      bitmap: "SPC.SPC_Canister",
    },

    energy_bar: {
      type: "scale",
      x: 500,
      y: 70,
      bitmap: "slace_en_1",
      scale: 3,
      direction: 0,
    },
    energy: {
      type: "scale",
      x: 640,
      y: 70,
      bitmap: "en_yes",
      scale: 3,
      direction: 1,
    },
    ELECTRIC: {
      type: "text",
      x: 690,
      y: 80,
      width: 100,
      height: 30,
      text: "Space Joule",
    },
    EnergySlot: {
      type: "slot",
      x: 455,
      y: 260,
      size: 70,
      bitmap: "Others.en_slot",
    },
  },
});

class Refinery extends InputMachine {
  defaultValues = {
    energy: 0,
    energyMax: 500,
    fuel: 0,
    oil: 0,
  };
  onTick(): void {
    this.discharge("EnergySlot");
    this.container.sendChanges();
    this.container.validateAll();

    this.container.setScale("energy", this.data.energy / 500);
    this.container.setScale("energy_bar", this.data.energy / 500);
    this.container.setScale("oil_scale", this.data.oil / 40);
    this.container.setScale("fuel_scale", this.data.fuel / 40);
    this.container.setText(
      "ELECTRIC",
      "Gj :" + this.data.energy + " / " + this.data.energyMax
    );
    
    if (this.data.energy >= 50) {
      Canister.input("canister_1","oil",this.container,this.data);
      Canister.output("canister_2","fuel",this.container,this.data)
      if(this.data.fuel < 40 && this.data.oil >= 5 ){
        this.data.fuel +=5;
        this.data.oil -=5;
      };
    };
  }
}

SpacesMachine.registerStandartMachine(
  BlockID.refinery_sc,
  new Refinery(ClearFuel)

);
