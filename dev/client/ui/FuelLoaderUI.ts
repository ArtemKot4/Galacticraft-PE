const FuelLoaderUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: Translation.translate("tile.galacticraft.fuel_loader")
            }
        },
        inventory: {
            standard: true
        },
        background: {
            standard: true
        }
    },
    drawing: [
        {
            type: "bitmap",
            x: 268,
            y: 190,
            bitmap: "machine.liquid_scale",
            scale: 3.8,
        },
        {
            type: "bitmap",
            x: 550,
            y: 70,
            bitmap: "machine.energy_bar_empty",
            scale: 3,
        },
        {
            type: "bitmap",
            x: 690,
            y: 70,
            bitmap: "machine.energy_icon_off",
            scale: 3,
        }
    ],
    elements: {
        fuel_liquid_slot: {
            type: "slot",
            x: 355,
            y: 120,
            size: 70,
            bitmap: "machine.canister_slot"
        },
        fuel_liquid_scale: {
            type: "scale",
            x: 268,
            y: 190,
            bitmap: "machine.fuel_scale",
            scale: 3.8,
            direction: 1
        },
        battery_slot_discharge: {
            type: "slot",
            x: 455,
            y: 260,
            size: 70,
            bitmap: "machine.energy_slot"
        },
        energy_bar: {
            type: "scale",
            x: 550,
            y: 70,
            bitmap: "machine.energy_bar_full",
            scale: 3,
            direction: 0
        },
        energy_icon: {
            type: "scale",
            x: 690,
            y: 70,
            bitmap: "machine.energy_icon_on",
            scale: 3,
            direction: 1
        }//,
        // energy_display: {
        //     type: "text",
        //     x: 565,
        //     y: 113,
        //     width: 100,
        //     height: 30,
        //     text: "Space Joule"
        // }
    }
});
