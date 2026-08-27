const WorkbenchNasaRocketTier1UI = new UI.StandartWindow(   
    {
        standard: {
            header: {
                text: {
                    text: Translation.translate("block.galacticraft.workbench_nasa")
                },
            },
            inventory: {
                standard: true
            },
            background: {
                standard: true
            }
        }, drawing: [{
            type: "bitmap", x: 725, y: 195, bitmap: "rocket.sign", scale: 3.2
        }
    ], 
    elements: {
        chest_1: {
            type: "slot", 
            x: 675, 
            y: 40, 
            size: 50, 
            bitmap: "rocket.storage_slot",
            iconScale: 0.9
        }, 
        chest_2: {
            type: "slot", 
            x: 775, 
            y: 40, 
            size: 50, 
            bitmap: "rocket.storage_slot",
            iconScale: 0.9
        }, 
        chest_3: {
            type: "slot", 
            x: 875, 
            y: 40, 
            size: 50, 
            bitmap: "rocket.storage_slot",
            iconScale: 0.9
        }, 
        nose_cone: {
            type: "slot", 
            x: 550, 
            y: 50, 
            size: 50,
            iconScale: 0.9
        }, 
        plate_1: {
            type: "slot", 
            x: 525, 
            y: 100, 
            size: 50,
            iconScale: 0.9
        }, 
        plate_2: {
            type: "slot", 
            x: 575, 
            y: 100, 
            size: 50,
            iconScale: 0.9
        }, 
        plate_3: {
            type: "slot", 
            x: 525, 
            y: 150, 
            size: 50,
            iconScale: 0.9
        }, 
        plate_4: {
            type: "slot", 
            x: 575, 
            y: 150, 
            size: 50,
            iconScale: 0.9
        }, 
        plate_5: {
            type: "slot", 
            x: 525, 
            y: 200, 
            size: 50,
            iconScale: 0.9
        }, 
        plate_6: {
            type: "slot", 
            x: 575, 
            y: 200, 
            size: 50,
            iconScale: 0.9
        }, 
        plate_7: {
            type: "slot", 
            x: 525, 
            y: 250, 
            size: 50,
            iconScale: 0.9
        }, 
        plate_8: {
            type: "slot", 
            x: 575, 
            y: 250,
            size: 50,
            iconScale: 0.9
        }, 
        fin_1: {
            type: "slot", 
            x: 625, 
            y: 250, 
            size: 50,
            iconScale: 0.9
        }, 
        fin_2: {
            type: "slot", 
            x: 625, 
            y: 300, 
            size: 50,
            iconScale: 0.9
        }, 
        fin_3: {
            type: "slot", 
            x: 475, 
            y: 250, 
            size: 50,
            iconScale: 0.9
        }, 
        fin_4: {
            type: "slot", 
            x: 475, 
            y: 300, 
            size: 50,
            iconScale: 0.9
        }, 
        engine: {
            type: "slot", 
            x: 550, 
            y: 300, 
            size: 50,
            iconScale: 0.9
        }, 
        result_slot: {
            type: "slot", 
            x: 775, 
            y: 240, 
            size: 85, 
            bitmap: "rocket.result_slot",
            iconScale: 0.9
        }
    }
});

const WorkbenchSchemeValidatorUI = new UI.StandartWindow(
    {
        standard: {
            header: {
                text: {
                    text: Translation.translate("Manipulator programm")
                },
            },
            inventory: {
                standard: true
            },
            background: {
                standard: true
            }
        },
    drawing: [{
        type: "bitmap",
        x: 500,
        y: 120,
        bitmap: "ShemaS",
        scale: 4.2
    }],
    elements: {
        schema_validator_slot: {
            type: "slot",
            x: 583,
            y: 169,
            size: 79,
            iconScale: 0.9
        },
        button: {
            type: "button",
            x: 415,
            y: 300,
            scale: 1.4,
            bitmap: "Button",
            bitmap2: "button_1",
            // clicker: {
            //     onClick: function() {
            //         Click.play();
            //     }
            // }
        }},
});