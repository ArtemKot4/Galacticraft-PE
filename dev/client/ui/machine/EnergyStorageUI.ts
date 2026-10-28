
function createGalacticraftEnergyStorageUI(titleKey: string): UI.IWindow {
    return new UI.StandartWindow(
        {
            standard: {
                header: {
                    text: {
                        text: Translation.translate(titleKey)
                    },
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
            x: 490,
            y: 110,
            bitmap: "arrow_bar_2",
            scale: 4.2
        },
        {
            type: "bitmap",
            x: 490,
            y: 210,
            bitmap: "arrow_bar_1",
            scale: 4.2
        },
        {
            type: "bitmap",
            x: 590,
            y: 255,
            scale: 4.3,
            bitmap: "Others.Scala"
        }
    ],
    elements: {
        battery_slot_charge: {
            type: "slot",
            x: 400,
            y: 110,
            size: 70
        },

        battery_slot_discharge: {
            type: "slot",
            x: 400,
            y: 210,
            size: 70
        },

        energy_bar: {
            type: "scale",
            x: 590,
            y: 255,
            scale: 4.3,
            direction: 0,
            bitmap: "Others.Scala1"
        }
    }
    });
}

const EnergyStorageUI = createGalacticraftEnergyStorageUI("tile.galacticraft.energy_storage");
const ClusterStorageUI = createGalacticraftEnergyStorageUI("tile.galacticraft.cluster_storage");
