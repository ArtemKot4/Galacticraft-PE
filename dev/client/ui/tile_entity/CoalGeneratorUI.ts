const CoalGeneratorUI = new UI.StandartWindow({
  standard: {
    header: {
      text: {
        text: Translation.translate("Coal Generator"),
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
      x: 490,
      y: 110,
      bitmap: "arrow_bar_1",
      scale: 4.2,
    },
  ],
  elements: {
    coal_slot: {
      type: "slot",
      x: 400,
      y: 110,
      bitmap: "coalslot",
      size: 70,
    },
    progress_scale: {
      type: "scale",
      x: 490,
      y: 110,
      scale: 4.2,
      direction: 0,
      bitmap: "arrow_bar_scale",
      clicker: {
        onClick: function () {
          RV && RV.RecipeTypeRegistry.openRecipePage("generator 2");
        },
      },
    },
    energy_display: {
      type: "text",
      x: 400,
      y: 190,
      width: 100,
      height: 30,
      text: "Energy type is not defined",
    },
    status: {
      type: "text",
      x: 400,
      y: 220,
      width: 100,
      height: 30,
      text: "Status: energy is not defined",
    },
    // FiringStatus: {
    //     type: "text",
    //     x: 545,
    //     y: 55,
    //     width: 100,
    //     height: 30,
    //     text: "Burning: %"
    // },
  },
});
