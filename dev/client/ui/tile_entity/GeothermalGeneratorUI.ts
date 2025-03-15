
const GeothermalGeneratorUI = new UI.StandartWindow({
    standard: {
      header: {
        text: {
          text: Translation.translate("Geothermal generator"),
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
        x: 340,
        y: 60,
        bitmap: "generators.geoscale_0",
        scale: 3.0,
      },
    ],
    elements: {
      geoscale: {
        type: "scale",
        x: 340,
        y: 60,
        scale: 3.0,
        bitmap: "generators.geoscale_1",
        direction: 1,
      },
      EnergiA: {
        type: "text",
        x: 390,
        y: 75,
        width: 100,
        height: 30,
        text: "Space Joule",
      },
      // button:{type:"button",x:390,y:110,scale:1.4,bitmap:"butdeact",bitmap2:"butact",          clicker: {
      //         onClick: function() {
      // Click.play();
      //         }
      // }
    },
  });