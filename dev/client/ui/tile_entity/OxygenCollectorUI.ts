const OxygenCollectorUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: Translation.translate("Oxygen Collector"),
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
            bitmap: "Others.collector_scale_0",
            scale: 4.3,
        },
        {
            type: "bitmap",
            x: 680,
            y: 130,
            bitmap: "o2_noy",
            scale: 6.0,
        },
        {
            type: "bitmap",
            x: 379,
            y: 300,
            bitmap: "slace_en_0",
            scale: 3.4,
        },
        {
            type: "bitmap",
            x: 370,
            y: 300,
            bitmap: "en_noy",
            scale: 3.4,
        },
    ],
    elements: {
        slot: {
            type: "slot",
            x: 400,
            y: 110,
            size: 70,
            bitmap: "Others.en_slot",
        },
        oxygen_scale: {
            type: "scale",
            x: 400,
            y: 190,
            bitmap: "Others.collector_scale_1",
            scale: 4.3,
            direction: 0,
            clicker: {
                onClick: function () {
                    RV && RV.RecipeTypeRegistry.openRecipePage("Collector");
                },
            },
        },
        oxygen_icon: {
            type: "scale",
            x: 680,
            y: 130,
            bitmap: "o2_yes",
            scale: 6.0,
            direction: 1,
        },
        // oxygen_status: {
        //     type: "text",
        //     x: 480,
        //     y: 135,
        //     width: 100,
        //     height: 30,
        //     text: "Oxygen Bar",
        // },
        oxygen_display: {
            type: "text",
            x: 420,
            y: 250,
            width: 100,
            height: 30,
            text: "Status: none yet",
        },
        // leaves_display: {
        //     type: "text",
        //     x: 420,
        //     y: 280,
        //     width: 99,
        //     height: 20,
        //     text: "Кислорода использовано:",
        // },
        energy_icon: {
            type: "scale",
            x: 370,
            y: 300,
            bitmap: "en_yes",
            scale: 3.4,
            direction: 1,
        },
        energy_bar: {
            type: "scale",
            x: 379,
            y: 300,
            bitmap: "slace_en_1",
            scale: 3.4,
            direction: 0,
        },
    },
});
