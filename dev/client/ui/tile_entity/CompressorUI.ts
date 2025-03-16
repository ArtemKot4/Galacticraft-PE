const CompressorUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: Translation.translate("Compressor"),
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
            x: 630,
            y: 150,
            bitmap: "fire_background",
            scale: 4.1,
        },
    ],
    elements: {
        progress_scale: {
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
        burning_scale: {
            type: "scale",
            x: 630,
            y: 150,
            direction: 1,
            bitmap: "fire_scale",
            scale: 4.1,
        },
        coal_slot: {
            type: "slot",
            x: 530,
            y: 300,
            bitmap: "coalslot",
            size: 60,
        },
        slot_0: {
            type: "slot",
            x: 410,
            y: 110,
            bitmap: "slot",
            size: 60,
        },
        slot_1: {
            type: "slot",
            x: 470,
            y: 110,
            bitmap: "slot",
            size: 60,
        },
        slot_2: {
            type: "slot",
            x: 530,
            y: 110,
            bitmap: "slot",
            size: 60,
        },

        slot_3: {
            type: "slot",
            x: 410,
            y: 170,
            bitmap: "slot",
            size: 60,
        },
        slot_4: {
            type: "slot",
            x: 470,
            y: 170,
            bitmap: "slot",
            size: 60,
        },
        slot_5: {
            type: "slot",
            x: 530,
            y: 170,
            bitmap: "slot",
            size: 60,
        },
        slot_6: {
            type: "slot",
            x: 410,
            y: 230,
            bitmap: "slot",
            size: 60,
        },
        slot_7: {
            type: "slot",
            x: 470,
            y: 230,
            bitmap: "slot",
            size: 60,
        },
        slot_8: {
            type: "slot",
            x: 530,
            y: 230,
            bitmap: "slot",
            size: 60,
        },
        slot_result: {
            type: "slot",
            x: 830,
            y: 190,
            bitmap: "slot",
            size: 70,
        },
        status: {
            type: "text",
            x: 650,
            y: 290,
            width: 100,
            height: 30,
            text: "Status: ",
        },
    },
});
