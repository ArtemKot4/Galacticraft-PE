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

const CompressinG = new UI.StandartWindow({
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

    coal_slot: {
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

    result: {
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

const CompressorFactory = new RecipeFactory();

function setupCompressorRecipe(obj) {
  obj = obj || {};
  for(let i = 1; i <= 9; i++) {
  obj["slot_" + i] = obj["slot_" + i] || { id: 0, count: 1, data: 0 }
  }
 CompressorFactory.set(obj)
}

class Compressor extends Machine {
  public defaultValues = {
    energy: 0,
    energyMax: 500,
    progress: 0,
    progressMax: 500,
    burning: 0,
    burningMax: 1000,
    active: false,
  };
  public setupRecipeLogic() {
    for (const i in CompressorFactory.storage) {
      const storage = CompressorFactory.storage;
      // if(this.data.progress > 0 && !RecipeFactory.getForMore(this.container, storage[i], 9)) {
      //   this.data.progress = 0;
      // };
      if (this.data.energy >= (this.data.energyMax / 2) && RecipeFactory.getForMore(this.container, storage[i], 9) && 
      this.data.progress < this.data.progressMax) {
        this.data.progress++;
      };
      if(this.data.progress >= this.data.progressMax) {
        RecipeFactory.decreaseSlots(this.container, 9);
        RecipeFactory.setupResult(this.container, "result", storage[i].result);
        this.data.progress = 0;
        this.data.energy -= this.data.energyMax / 2
      };
      if(World.getThreadTime() % 10 === 0 && this.data.energy > 0) this.data.energy--;
    }
  };
  public onTick(): void {
    this.container.sendChanges();
    this.container.validateAll();
    this.container.setScale("progressScale", this.data.progress / this.data.progressMax);
    this.container.setScale("BurningScale", this.data.energy / this.data.energyMax);
    status(this.container, this.data)
    CoalGenerator.isCoal("coal_slot", this.container, this.data);
   this.setupRecipeLogic();
  }
 
}

TileEntity.registerPrototype(
  BlockID.compressor_gj,
  new Compressor(CompressinG)
);