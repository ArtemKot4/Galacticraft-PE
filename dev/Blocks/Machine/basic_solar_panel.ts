var Solarmesh = new RenderMesh();
Solarmesh.setBlockTexture("solar panel", 0);
Solarmesh.importFromFile(__dir__ + "/resources/models/solar_panel.obj", "obj", {
  translate: [0.5, 0, 0.5],
  scale: [1.6, 1.6, 1.6],
  invertV: false,
  noRebuild: false,
});
IDRegistry.genBlockID("solar_panel_sc");
Block.createBlockWithRotation("solar_panel_sc", [
  {
    name: "Solar Panel",
    texture: [
      ["solar panel", 0],
      ["solar panel", 1],
      ["solar panel", 2],
      ["solar panel", 3],
      ["solar panel", 4],
      ["solar panel", 5],
    ],
    inCreative: false,
  },
]);
var Solarender = new ICRender.Model();
Solarender.addEntry(new BlockRenderer.Model(Solarmesh));
BlockRenderer.setStaticICRender(BlockID.solar_panel_sc, 0, Solarender);

IDRegistry.genBlockID("basic_solar_panel");
Block.createBlockWithRotation(
  "basic_solar_panel",
  [
    {
      name: "Basic Solar Panel",
      texture: [
        ["machine", 0],
        ["solar_basic", 0],
        ["solar_basic", 1],
        ["solar_basic", 1],
        ["Machine Output", 0],
        ["Machine Output", 0],
      ],
      inCreative: true,
    },
    {
      name: "Solar Panel",
      texture: [
        ["machine", 0],
        ["solar_basic", 0],
        ["solar_basic", 1],
        ["solar_basic", 1],
        ["Machine Output", 0],
        ["Machine Output", 0],
      ],
      inCreative: false,
    },
    {
      name: "Solar Panel",
      texture: [
        ["machine", 0],
        ["solar_basic", 0],
        ["solar_basic", 1],
        ["solar_basic", 1],
        ["Machine Output", 0],
        ["Machine Output", 0],
      ],
      inCreative: false,
    },
  ],
  STONE
);

Block.registerPlaceFunction(
  "basic_solar_panel",
  function (coords, item, block, player) {
    var region = BlockSource.getDefaultForActor(player);
    var spaces = coords.relative;

    region.setBlock(spaces.x, spaces.y, spaces.z, item.id, item.data);
    region.setBlock(
      spaces.x,
      spaces.y + 1,
      spaces.z,
      BlockID.solar_panel_sc,
      0
    );
  }
);

let SolarGeneratorUI = new UI.StandartWindow({
  standard: {
    header: {
      text: {
        text: Translation.translate("Solar panel"),
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
      x: 380,
      y: 60,
      bitmap: "generators.sunscale_0",
      scale: 3.0,
    },
    {
      type: "bitmap",
      x: 460,
      y: 65,
      bitmap: "slace_en_0",
      scale: 3,
    },
    {
      type: "bitmap",
      x: 600,
      y: 65,
      bitmap: "en_noy",
      scale: 3,
    },
  ],
  elements: {
    sunscale: {
      type: "scale",
      x: 380,
      y: 60,
      scale: 3.0,
      bitmap: "generators.sunscale_1",
      direction: 1,
    },
    ENERGYBar: {
      type: "scale",
      x: 460,
      y: 65,
      bitmap: "slace_en_1",
      scale: 3,
      direction: 0,
    },
    Energy: {
      type: "scale",
      x: 600,
      y: 65,
      bitmap: "en_yes",
      scale: 3,
      direction: 1,
    },
    EnergyText: {
      type: "text",
      x: 450,
      y: 110,
      width: 100,
      height: 30,
      text: "Space Joule",
    },

    Status: {
      type: "text",
      x: 450,
      y: 140,
      width: 100,
      height: 30,
      text: "Status",
    },
    LightLevel: {
      type: "text",
      x: 450,
      y: 170,
      width: 100,
      height: 30,
      text: "Status",
    },

    EnergySlot: {
      type: "slot",
      x: 700,
      y: 60,
      size: 50,
      bitmap: "Others.en_slot",
    },
  },
});



class SolarPanel extends Generator {
  defaultValues = {
    energy: 0,
    energyMax: 5000,
  };
  
  onTick(): void {
    var light = this.blockSource.getLightLevel(this.x, this.y + 1, this.z);
    this.container.sendChanges();
    this.container.validateAll();

    this.container.setScale("sunscale", this.data.energy / 10);
    this.container.setScale(
      "ENERGYBar",
      this.data.energy / this.data.energyMax
    );
    this.container.setScale("Energy", this.data.energy / 100);
    if (this.data.energy >= 5000) {
      this.container.setText(
        "Status",
        Translation.translate("Status: storage full")
      );
    }
    this.container.setText(
      "EnergyText",
      "Sj :" + this.data.energy + " / " + this.getCapacity()
    );

    if (
      World.getThreadTime() % 1 == 0 &&
      light == 15 &&
      this.data.energy != this.data.energyMax
    ) {
      this.data.energy += 1;
    }
    if (light >= 2) {
      this.container.setText(
        "LightLevel",
        Translation.translate("Light: normal")
      );
      this.container.setText(
        "Status",
        Translation.translate("Status: working")
      );
    }
    if (
      World.getThreadTime() % 60 == 0 &&
      light <= 1 &&
      this.data.energy <= 1
    ) {
      if (__config__.getBool("Difficulty.Machine.PanelDischarging") == true) {
        this.data.energy -= 1;
      }
      this.container.setText(
        "Status",
        Translation.translate("Status: waiting")
      );
      this.container.setText("LightLevel", Translation.translate("Light: few"));
    }
  }
}

SpacesMachine.registerStandartMachine(
  BlockID.basic_solar_panel,
  new SolarPanel(SolarGeneratorUI)
);
