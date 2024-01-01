var SPC_b1 = new UI.Container();
var SPC_b2 = new UI.Container();
var SPC_b3 = new UI.Container();
var InterFace = new UI.Container();
var rocket_storage = new UI.Container();

let rocketFuel = new UI.StandartWindow({
    standard: {
      header: {
        text: {
          text: Translation.translate("Хранилище топлива"),
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
        x: 500,
        y: 130,
        bitmap: "RocketStorage1",
        scale: 5.4,
      },
    ],
    elements: {
      fuelScale: {
        type: "scale",
        x: 500,
        y: 130,
        bitmap: "RocketStorage2",
        scale: 5.4,
        direction: 1,
        
      },
    },
  });
  
  var rocketgui = new UI.Window({
    location: {
      x: 1000 / 2 - 80,
      y: 273,
      width: 48,
      height: 24,
    },
    drawing: [],
    elements: {
      exit: {
        type: "button",
        text: "Спешиться",
        x: 0,
        y: 0,
        bitmap: "SPC.SPC_button",
        bitmap2: "SPC.SPC_button2",
        scale: 250,
        clicker: {
          onClick: function () {
            SPC_b1.close();
            SPC_b2.close();
            SPC_b3.close();
            let window = getWindow(BlockID.rocket_padding, rocketFuel);
            rocket_storage.openAs(window);
          },
        },
      },
    },
  });
  
  var nextvariant = new UI.Window({
    location: {
      x: 1000 / 2 - 80,
      y: 313,
      width: 660,
      height: 24,
    },
    drawing: [],
    elements: {
      next: {
        type: "button",
        text: "варианты",
        x: 0,
        y: 0,
        bitmap: "SPC.SPC_nextleft",
        bitmap2: "SPC.SPC_nextleftPRESSED",
        scale: 2.1,
        clicker: {
          onClick: function () {
            SPC_b1.close();
            SPC_b2.close();
            SPC_b3.close();
          },
        },
      },
    },
  });
  