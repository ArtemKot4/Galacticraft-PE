
const ElectricCompressorUI = new UI.StandartWindow({
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
      result_1: {
        type: "slot",
        x: 830,
        y: 221,
        bitmap: "slot",
        size: 60,
      },
      result_2: {
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
  