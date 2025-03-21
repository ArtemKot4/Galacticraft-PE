const WorkbencheableUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: Translation.translate("Rocketbench machine"),
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
            x: 725,
            y: 195,
            bitmap: "SignRocketbench",
            scale: 3.2,
        },
    ],
    elements: {
        chest_slot_0: {
            type: "slot",
            x: 675,
            y: 40,
            size: 50,
            bitmap: "ChestableSlot",
        },
        chest_slot_1: {
            type: "slot",
            x: 775,
            y: 40,
            size: 50,
            bitmap: "ChestableSlot",
        },
        chest_slot_2: {
            type: "slot",
            x: 875,
            y: 40,
            size: 50,
            bitmap: "ChestableSlot",
        },
        slot_0: {
            type: "slot",
            x: 550,
            y: 50,
            size: 50,
        },
        slot_1: {
            type: "slot",
            x: 525,
            y: 100,
            size: 50,
        },
        slot_2: {
            type: "slot",
            x: 575,
            y: 100,
            size: 50,
        },
        slot_3: {
            type: "slot",
            x: 525,
            y: 150,
            size: 50,
        },
        slot_4: {
            type: "slot",
            x: 575,
            y: 150,
            size: 50,
        },
        slot_5: {
            type: "slot",
            x: 525,
            y: 200,
            size: 50,
        },
        slot_6: {
            type: "slot",
            x: 575,
            y: 200,
            size: 50,
        },
        slot_7: {
            type: "slot",
            x: 525,
            y: 250,
            size: 50,
        },
        slot_8: {
            type: "slot",
            x: 575,
            y: 250,
            size: 50,
        },
        slot_9: {
            type: "slot",
            x: 550,
            y: 300,
            size: 50,
        },
        slotuer1: {
            type: "slot",
            x: 625,
            y: 250,
            size: 50,
        },
        slotuer2: {
            type: "slot",
            x: 625,
            y: 300,
            size: 50,
        },
        slotuel1: {
            type: "slot",
            x: 475,
            y: 250,
            size: 50,
        },
        slotuel2: {
            type: "slot",
            x: 475,
            y: 300,
            size: 50,
        },
        craftable: {
            type: "slot",
            x: 775,
            y: 240,
            size: 85,
            bitmap: "RocketSlots",
        },
    },
});

const ManipulatorsUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: Translation.translate("Manipulator programm"),
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
            y: 120,
            bitmap: "ShemaS",
            scale: 4.2,
        },
    ],
    elements: {
        slot1: {
            type: "slot",
            x: 583,
            y: 169,
            size: 79,
        },
        button: {
            type: "button",
            x: 415,
            y: 300,
            scale: 1.4,
            bitmap: "Button",
            bitmap2: "button_1",
            clicker: {
                onClick: function () {
                    //coming soon...
                },
            },
        },
    },
});
