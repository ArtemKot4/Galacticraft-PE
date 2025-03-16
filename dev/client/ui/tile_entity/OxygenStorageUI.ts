const OxygenStorageUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: Translation.translate("Кислородное хранилище"),
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
            bitmap: "Others.Scala",
            scale: 4.3,
        },
        {
            type: "bitmap",
            x: 680,
            y: 150,
            bitmap: "o2_noy",
            scale: 4.0,
        },
    ],
    elements: {
        slot: {
            type: "slot",
            x: 400,
            y: 110,
            size: 70,
            bitmap: "Others.O2Slot",
        },
        oxygen_scale: {
            type: "scale",
            x: 400,
            y: 190,
            bitmap: "Others.Scala2",
            scale: 4.3,
            direction: 0,
        },
        oxygen_icon: {
            type: "scale",
            x: 680,
            y: 150,
            bitmap: "o2_yes",
            scale: 4.0,
            direction: 1,
        },
        oxygen_display: {
            type: "text",
            x: 480,
            y: 135,
            width: 100,
            height: 30,
            text: "Oxygen Bar",
        },
    },
});
