enum ECallback {
    GC_ON_FREQUENCY_CHANGED = "gc_onFrequencyChanged"
}

namespace Galacticraft {
    export class PlayerData {
        public frequencyContainer: ItemContainer;

        public constructor(public playerUid: number) {
            this.frequencyContainer = new ItemContainer();
            this.frequencyContainer.setGlobalSlotSavingEnabled(true);
        }
    }

    @SerializeableStorage({ "scopeName": "galacticraft.player_storage" })
    export class PlayerManager {
        public static data: Record<number, Galacticraft.PlayerData> = {};

        public static has(playerUid: number): boolean {
            return playerUid in this.data;
        }

        public static set(playerUid: number): void {
            this.data[playerUid] = new Galacticraft.PlayerData(playerUid);
        }
    }

    Network.addClientPacket("packet.galacticraft.register_frequency_screen_factory", () => {
        ItemContainer.registerScreenFactory("galacticraft.frequency.player:" + Player.getLocal(), (container, screenName) => {
            if(screenName == "frequency_container") {
                return //...
            }
            if(screenName == "oxygen_bars") {
                return //...
            }
            return new UI.Window(); //заглушка
        });
    });

    export class PlayerEvents {
        @SubscribeEvent
        public static onServerPlayerLoaded(playerUid: number) {
            if(!PlayerManager.has(playerUid)) {
                PlayerManager.set(playerUid);
            }
        }

        @SubscribeEvent
        public static gc_onFrequencyChanged(playerUid: number, previousItem: ItemInstance, currentItem: ItemInstance) {

        }
    }

    function generatePlayerInventoryBase(x: number, y: number, size: number, hotbar: {
        space: number
    } | true = { space: 20 }, transformator?: (offsetX: number, offsetY: number, index: number) => Partial<UI.IInvSlotElement>): UI.ElementSet {
        const elements: UI.ElementSet = {};
        let yEnd = 3 + (hotbar != null ? 1 : 0);

        for(let yOffset = 0; yOffset < yEnd; yOffset++) {
            for(let xOffset = 0; xOffset < 9; xOffset++) {
                const index = (yOffset * 9) + xOffset;
                let element: UI.UIInvSlotElement = {
                    type: "invSlot",
                    x: x + (xOffset * size),
                    y: y + (yOffset * size) + (yOffset == 3 ? ((hotbar && (hotbar as Scriptable).space) ?? 20) : 0),
                    size: size,
                    index: index
                }
                elements["slot_" + index] = element;

                if(transformator != null) {
                    Object.assign(element, transformator(yOffset, xOffset, index));
                }
            }
        }
        return elements;
    }

    const gearInventory = new UI.Window({
        location: {
            width: 1000,
            height: UI.getScreenHeight(),
            x: 0,
            y: 0
        },
        drawing: [{
            type: "background", color: android.graphics.Color.TRANSPARENT
        }, {
            type: "frame",
            "bitmap": "classic_frame_bg_light",
            x: 500-250 + 60,
            y: 60,
            width: 500 - 60,
            height: 450,
            "scale": 2.3
        }], 
        elements: {
            "close_button": {
                type: "closeButton",
                x: 711,
                y: 58,
                "bitmap": "classic_close_button",
                scale: 2.7
            },
            ...generatePlayerInventoryBase(260 + 67, 190 + 110, 45, { space: 10 }),
            ...(() => {
            const slotSize = 45;
            const space = 20;
            const halfSlot = slotSize / 2;

            const windowWidth = 500;
            const panelWidth = 250;
            const panelOffset = 60;
            const layoutTrim = 20;

            const startY = 90;
            const startX =
                (windowWidth - panelWidth + panelOffset)
                + (windowWidth - panelOffset) / 2
                - space / 2
                - layoutTrim;

            const row = (n: number) => startY + slotSize * n;

            const armorX = startX - slotSize;
            const rightX = startX + space / 2 + slotSize;
            const centerX = startX + space / 2;
            const farRightX = startX + space / 2 + slotSize * 2;
            const tankLeftX = startX + space / 2 + halfSlot;
            const tankRightX = tankLeftX + slotSize;

            const slots: UI.ElementSet = {
                thermal_head: { type: "slot", x: armorX, y: row(0), bitmap: "inventory.thermal_head", size: slotSize },
                thermal_chestplate: { type: "slot", x: armorX, y: row(1), bitmap: "inventory.thermal_chestplate", size: slotSize },
                thermal_leggings: { type: "slot", x: armorX, y: row(2), bitmap: "inventory.thermal_leggings", size: slotSize },
                thermal_boots: { type: "slot", x: armorX, y: row(3), bitmap: "inventory.thermal_boots", size: slotSize },

                shield_controller: { type: "slot", x: rightX, y: row(0), bitmap: "inventory.shield_controller", size: slotSize },
                glass: { type: "slot", x: rightX, y: row(1), bitmap: "inventory.glass", size: slotSize },
                oxygen_gear: { type: "slot", x: rightX, y: row(2), bitmap: "inventory.oxygen_gear", size: slotSize },

                frequency_module: { type: "slot", x: centerX, y: row(1), bitmap: "inventory.frequency_module", size: slotSize },
                parachute: { type: "slot", x: farRightX, y: row(1), bitmap: "inventory.parachute", size: slotSize },

                oxygen_tank_left: { type: "slot", x: tankLeftX, y: row(3), bitmap: "inventory.oxygen_tank", size: slotSize },
                oxygen_tank_right: { type: "slot", x: tankRightX, y: row(3), bitmap: "inventory.oxygen_tank", size: slotSize },
            };
                return slots;
            })()
        }
    });
    gearInventory.setBlockingBackground(true);
    gearInventory.setInventoryNeeded(true);
    gearInventory.setTouchable(true);

    // ? debug
    Callback.addCallback("ItemUseLocal", (c, i, b, p) => {
        if(i.id == VanillaItemID.stick) {
            //if(Entity.get*Sneaking(p) == false) {
                gearInventory.open();
            //}

        }
    })
}
