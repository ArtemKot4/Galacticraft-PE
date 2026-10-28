const OxygenTanksUI = (() => {
    const scale = 2.4;
    const tanksWidth = 19 * scale;
    const pressureWidth = 9 * scale;
    const space = 3;
    const height = 47 * scale;

    const window = new UI.Window({
        location: {
            x: 865,
            y: 25,
            width: pressureWidth + space + tanksWidth + space + tanksWidth + space,
            height: height + 20,
            globalScale: true
        }, 
        drawing: [{
            type: "background",
            color: android.graphics.Color.TRANSPARENT
        }, {
            type: "bitmap",
            x: pressureWidth + space,
            y: 0,
            width: tanksWidth,
            height: height,
            bitmap: "inventory.oxygen_tank_empty"
        }, {
            type: "bitmap",
            x: pressureWidth + space + tanksWidth + space,
            y: 0,
            width: tanksWidth,
            height: height,
            bitmap: "inventory.oxygen_tank_empty"
        }],
        elements: {
            pressure: {
                type: "image",
                x: 0,
                y: 0,
                width: pressureWidth,
                height: height,
                bitmap: "inventory.pressure"
            },
            oxygen_tank_left: {
                type: "scale",
                x: pressureWidth + space,
                y: 0,
                width: tanksWidth,
                height: height,
                bitmap: "inventory.oxygen_tank_full",
                direction: 1
            },
            oxygen_tank_right: {
                type: "scale",
                x: pressureWidth + space + tanksWidth + space,
                y: 0,
                width: tanksWidth,
                height: height,
                bitmap: "inventory.oxygen_tank_full",
                direction: 1
            }
        }
    } satisfies UI.WindowContent);
    return window;
})();
OxygenTanksUI.setAsGameOverlay(true);
OxygenTanksUI.setTouchable(false);
OxygenTanksUI.setDynamic(true);