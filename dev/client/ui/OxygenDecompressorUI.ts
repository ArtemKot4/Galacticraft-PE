const OxygenDecompressorUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: Translation.translate("tile.galacticraft.oxygen_decompressor")
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
        x: 510,
        y: 110,
        bitmap: "machine.bar_empty",
        scale: 3.4
    },
    {
        type: "bitmap",
        x: 520-9,
        y: 120,
        bitmap: "machine.oxygen_icon_off",
        scale: 3.4
    },
    {
        type: "bitmap",
        x: 510,
        y: 160,
        bitmap: "machine.bar_empty",
        scale: 3.4
    },
    {
        type: "bitmap",
        x: 510-9,
        y: 160,
        bitmap: "machine.energy_icon_off",
        scale: 3.4
    }],
    elements: {
        battery_slot_discharge:
        {
            type: "slot",
            x: 410,
            y: 130,
            size: 70,
            bitmap: "machine.energy_slot"
        },
        oxygen_tank_slot_discharge: {
            type: "slot",
            x: 560,
            y: 250,
            size: 70
        },
        oxygen_bar:
        {
            type: "scale",
            x: 510,
            y: 110,
            bitmap: "machine.oxygen_bar_full",
            scale: 3.4,
            direction: 0
        },
        oxygen_icon:
        {
            type: "scale",
            x: 520-9,
            y: 120,
            bitmap: "machine.oxygen_icon_on",
            scale: 3.4,
            direction: 1
        },
        energy_bar: {
            type: "scale",
            x: 510,
            y: 160,
            bitmap: "machine.energy_bar_full",
            scale: 3.4,
            direction: 0
        },
        energy_icon: {
            type: "scale",
            x: 510-9,
            y: 160,
            bitmap: "machine.energy_icon_on",
            scale: 3.4,
            direction: 1
        }
    }
});