const CircuitFabricatorUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: Translation.translate("Circuit Fabricator"),
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
            x: 355,
            y: 65,
            bitmap: "Others.line1_0",
            scale: 3.8,
        },
        {
            type: "bitmap",
            x: 436,
            y: 295,
            bitmap: "slace_en_0",
            scale: 3.2,
        },
        {
            type: "bitmap",
            x: 425,
            y: 295,
            bitmap: "en_noy",
            scale: 3.2,
        },
        {
            type: "bitmap",
            x: 568,
            y: 150,
            bitmap: "Others.line2_0",
            scale: 3.8,
        },
        {
            type: "bitmap",
            x: 720,
            y: 95,
            bitmap: "Others.line3_0",
            scale: 3.8,
        },
        {
            type: "bitmap",
            x: 565,
            y: 65,
            bitmap: "machine.circuit_fabricator_burning_scale_empty",
            scale: 3.2,
        },
    ],
    elements: {
        line_1: {
            type: "scale",
            x: 355,
            y: 65,
            bitmap: "Others.line1_1",
            scale: 3.8,
            direction: 1,
        },
        line_2: {
            type: "scale",
            x: 568,
            y: 150,
            bitmap: "Others.line2_1",
            scale: 3.8,
            direction: 0,
        },
        line_3: {
            type: "scale",
            x: 720,
            y: 95,
            bitmap: "Others.line3_1",
            scale: 3.8,
            direction: 0,
        },
        //diamond
        slot_0: {
            type: "slot",
            x: 340,
            y: 40,
            size: 60,
            bitmap: "Others.diamond_slot",
        },
        battery_slot: {
            type: "slot",
            x: 330,
            y: 290,
            size: 60,
            bitmap: "Others.en_slot",
        },
        //fabricator 1
        slot_1: {
            type: "slot",
            x: 515,
            y: 135,
            size: 60,
            bitmap: "Others.fabricator_slot",
        },
        //fabricator 2
        slot_2: {
            type: "slot",
            x: 515,
            y: 195,
            size: 60,
            bitmap: "Others.fabricator_slot",
        },
        //dust
        slot_3: {
            type: "slot",
            x: 682,
            y: 130,
            size: 60,
            bitmap: "Others.dust_slot",
        },
        //slot up
        slot_4: {
            type: "slot",
            x: 745,
            y: 50,
            size: 60,
        },
        slot_result: {
            type: "slot",
            x: 769,
            y: 278,
            size: 60,
        },
        burning_scale: {
            type: "scale",
            x: 565 + 1 * 3.2,
            y: 65 + 1 * 3.2,
            bitmap: "machine.circuit_fabricator_burning_scale_0",
            scale: 3.2,
            direction: 0,
            clicker: {
                onClick: function () {
                    RV && RV.RecipeTypeRegistry.openRecipePage("CircuitFabricator");
                },
            },
        },
        energy_bar: {
            type: "scale",
            x: 436,
            y: 295,
            bitmap: "slace_en_1",
            scale: 3.2,
            direction: 0,
        },
        energy_icon: {
            type: "scale",
            x: 425,
            y: 295,
            bitmap: "en_yes",
            scale: 3.2,
            direction: 1,
        },
        energy_display: {
            type: "text",
            x: 563,
            y: 260,
            width: 100,
            height: 30,
            text: "Status:",
        },
    },
});
