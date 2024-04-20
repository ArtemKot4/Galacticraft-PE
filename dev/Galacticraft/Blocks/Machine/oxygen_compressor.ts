

Translation.addTranslation("Oxygen Decompressor", {
  ru: "Кислородный декомпрессор",
});

Translation.addTranslation("Oxygen Compressor", {
    ru: "Кислородный компрессор",
  });
/*EnergyTileRegistry.addEnergyTypeForId(BlockID.oxygen_decompressor, gj);
EnergyTileRegistry.addEnergyTypeForId(BlockID.oxygen_decompressor, ob);
    EnergyTileRegistry.addEnergyTypeForId(BlockID.oxygen_decompressor, EU);
    EnergyTileRegistry.addEnergyTypeForId(BlockID.oxygen_decompressor, RF);*/

const OxygenCompressorUI = new UI.StandartWindow({
  standard: {
    header: {
      text: {
        text: Translation.translate("Oxygen Compressor"),
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
      x: 400,
      y: 190,
      bitmap: "Others.Scala",
      scale: 4.3,
    },
    {
      type: "bitmap",
      x: 680,
      y: 150,
      bitmap: "o2_noy",
      scale: 4.0,
    },
  ],
  elements: {
    slot1: {
      type: "slot",
      x: 400,
      y: 120,
      size: 70,
      bitmap: "Others.O2Slot",
    },
    firstput: {
      type: "text",
      x: 470,
      y: 120,
      width: 100,
      height: 30,
      text: "Input:",
    },
    secondput: {
      type: "text",
      x: 470,
      y: 130,
      width: 100,
      height: 30,
      text: "Input:",
    },
    scala: {
      type: "scale",
      x: 400,
      y: 120,
      bitmap: "Others.Scala2",
      scale: 2.3,
      direction: 0,
    },
    o2: {
      type: "scale",
      x: 680,
      y: 150,
      bitmap: "o2_yes",
      scale: 4.0,
      direction: 1,
    },
    OXYGEN: {
      type: "text",
      x: 480,
      y: 135,
      width: 100,
      height: 30,
      text: "Oxygen Bar",
    },
  },
});
