
const OxygenCollectorUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: Translation.translate("tile.galacticraft.oxygen_collector")
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
        x: 400,
        y: 190,
        bitmap: "machine.oxygen_collector.scale_empty",
        scale: 4.3
    },
    // {
    //     type: "bitmap",
    //     x: 680,
    //     y: 130,
    //     bitmap: "machine.oxygen_icon_off",
    //     scale: 6.0
    // },
    {
        type: "bitmap",
        x: 379,
        y: 300,
        bitmap: "machine.energy_bar_empty",
        scale: 3.4
    },
    {
        type: "bitmap",
        x: 370,
        y: 300,
        bitmap: "machine.energy_icon_off",
        scale: 3.4
    }],
    elements: {
        battery_slot_discharge:
        {
            type: "slot",
            x: 400,
            y: 110,
            size: 70,
            bitmap: "machine.energy_slot"
        },
        oxygen_bar:
        {
            type: "scale",
            x: 400,
            y: 190,
            bitmap: "machine.oxygen_collector.scale_full",
            scale: 4.3,
            direction: 0
        },
        // oxygen_icon:
        // {
        //     type: "scale",
        //     x: 680,
        //     y: 130,
        //     bitmap: "machine.oxygen_icon_on",
        //     scale: 6.0,
        //     direction: 1
        // },
        // oxygen_display:
        // {
        //     type: "text",
        //     x: 480,
        //     y: 135,
        //     width: 100,
        //     height: 30,
        //     text: "Oxygen Bar"
        // },
        // Status:
        // {
        //     type: "text",
        //     x: 420,
        //     y: 250,
        //     width: 100,
        //     height: 30,
        //     text: "Статус: Нейтральный"
        // },
        // LeavesStatus:
        // {
        //     type: "text",
        //     x: 420,
        //     y: 280,
        //     width: 99,
        //     height: 20,
        //     text: "Кислорода использовано:"
        // },
        energy_bar: {
            type: "scale",
            x: 379,
            y: 300,
            bitmap: "machine.energy_bar_full",
            scale: 3.4,
            direction: 0
        },
        energy_icon: {
            type: "scale",
            x: 370,
            y: 300,
            bitmap: "machine.energy_icon_on",
            scale: 3.4,
            direction: 1
        }
    }
});