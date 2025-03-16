const RefineryUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: Translation.translate("Refinery"),
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
            x: 769,
            y: 190,
            bitmap: "Liquid_null",
            scale: 3.8,
        },

        {
            type: "bitmap",
            x: 500,
            y: 70,
            bitmap: "slace_en_0",
            scale: 3,
        },
        {
            type: "bitmap",
            x: 640,
            y: 70,
            bitmap: "en_noy",
            scale: 3,
        },
    ],
    elements: {
        slot_0: {
            type: "slot",
            x: 355,
            y: 120,
            size: 70,
            bitmap: "SPC.SPC_Canister",
        },
        slot_1: {
            type: "slot",
            x: 855,
            y: 120,
            size: 70,
            bitmap: "SPC.SPC_Canister",
        },
        oil_scale: {
            type: "scale",
            x: 268,
            y: 190,
            bitmap: "Liquid_oil",
            scale: 3.8,
            direction: 1,
            clicker: {
                onClick: function () {
                    /* RV && RV.RecipeTypeRegistry.openRecipePage("refinery");*/
                },
            },
        },
        fuel_scale: {
            type: "scale",
            x: 769,
            y: 190,
            bitmap: "Liquid_fuel",
            scale: 3.8,
            direction: 1,
            clicker: {
                onClick: function () {
                    /* RV && RV.RecipeTypeRegistry.openRecipePage("refinery");*/
                },
            },
        },
        energy_bar: {
            type: "scale",
            x: 500,
            y: 70,
            bitmap: "slace_en_1",
            scale: 3,
            direction: 0,
        },
        energy_icon: {
            type: "scale",
            x: 640,
            y: 70,
            bitmap: "en_yes",
            scale: 3,
            direction: 1,
        },
        energy_display: {
            type: "text",
            x: 690,
            y: 80,
            width: 100,
            height: 30,
            text: "Space Joule",
        },
        battery_slot: {
            type: "slot",
            x: 455,
            y: 260,
            size: 70,
            bitmap: "Others.en_slot",
        }
    }
});
