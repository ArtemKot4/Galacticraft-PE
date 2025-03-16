const EnergyStorageUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: Translation.translate("Energy Storage Module"),
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
            bitmap: "arrow_bar_2",
            scale: 4.2,
        },
        {
            type: "bitmap",
            x: 490,
            y: 210,
            bitmap: "arrow_bar_1",
            scale: 4.2,
        },
        {
            type: "bitmap",
            x: 590,
            y: 255,
            scale: 4.3,
            bitmap: "Others.Scala",
        },
    ],
    elements: {
        battery_slot_charge: {
            type: "slot",
            x: 400,
            y: 110,
            size: 70,
        },
        battery_slot_discharge: {
            type: "slot",
            x: 400,
            y: 210,
            size: 70,
        },
        energy_scale: {
            type: "scale",
            x: 590,
            y: 255,
            scale: 4.3,
            direction: 0,
            bitmap: "Others.Scale1",
            clicker: {
                onClick: function () {},
            },
        },
        energy_display: {
            type: "text",
            x: 750,
            y: 190,
            width: 100,
            height: 30,
            text: "Energy type is defined or i sleeping?",
        },
        energy_display_max: {
            type: "text",
            x: 680,
            y: 220,
            width: 100,
            height: 30,
            text: "Status: Energy is defined?",
        },
    },
});
