const FuelLoaderUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: Translation.translate("Fuel Loader"),
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
            x: 550,
            y: 70,
            bitmap: "slace_en_0",
            scale: 3,
        },
        {
            type: "bitmap",
            x: 690,
            y: 70,
            bitmap: "en_noy",
            scale: 3,
        },
    ],
    elements: {
        input_slot: {
            type: "slot",
            x: 355,
            y: 120,
            size: 70,
            bitmap: "SPC.SPC_Canister",
        },
        fuel_scale: {
            type: "scale",
            x: 268,
            y: 190,
            bitmap: "Liquid_fuel",
            scale: 3.8,
            direction: 1,
        },
        battery_slot: {
            type: "slot",
            x: 455,
            y: 260,
            size: 70,
            bitmap: "Others.en_slot",
        },
        energy_bar: {
            type: "scale",
            x: 550,
            y: 70,
            bitmap: "slace_en_1",
            scale: 3,
            direction: 0,
        },
        energy_icon: {
            type: "scale",
            x: 690,
            y: 70,
            bitmap: "en_yes",
            scale: 3,
            direction: 1,
        },
        energy_display: {
            type: "text",
            x: 565,
            y: 113,
            width: 100,
            height: 30,
            text: "Space Joule",
        },
    },
});
