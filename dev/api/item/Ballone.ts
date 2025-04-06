class Ballone extends GalacticraftItem {
    public static list: Record<number, number> = {};
    public constructor(stringID: string, public capacity: number) {
        super(stringID, {
            name: stringID,
            meta: 0
        });

        Ballone.list[this.id] = capacity;
    };

    public static is(id: number): boolean {
        return id in this.list;
    };

    public static getCapacity(id: number): number {
        return this.list[id];
    };
};

namespace Equipment {
    export let list: Record<number, ItemContainer> = {};

    export const GEAR_WINDOW = (() => {
        const content = {
            location: {
                x: 500 - (500 / 2),
                y: 60,
                width: 500,
                height: 400,
            },
            drawing: [
                {
                    type: "background",
                    color: android.graphics.Color.argb(0, 0, 0, 0),
                },
                {
                    type: "frame",
                    bitmap: "classic_frame_bg_light",
                    width: 500,
                    height: 400
                },
                {
                    type: "bitmap",
                    bitmap: "arrow_bar_1",
                    scale: 3,
                    x: 140,
                    y: 110,
                }
            ],
            elements: {
                close_button: {
                    type: "button",
                    x: 10,
                    y: 10,
                    bitmap: "classic_close_button",
                    clicker: {
                        onClick(coords, container) {
                            container.close();
                            OPEN_BUTTON_WINDOW.open();
                        }
                    }
                },
                shield_controller_slot: {
                    type: "slot",
                    x: 500 - 250 + (50 / 2),
                    y: 10,
                    size: 50,
                    bitmap: "equipment.shield_controller"
                },
                frequency_slot: {
                    type: "slot",
                    x: 500 - 250 - (50 / 2),
                    y: 10 + 50,
                    size: 50,
                    bitmap: "equipment.frequency"
                },
                mask_slot: {
                    type: "slot",
                    x: 500 - 250 + (50 / 2),
                    y: 10 + 50 + 50,
                    size: 50,
                    bitmap: "equipment.mask"           
                },
                parachute_slot: {
                    type: "slot",
                    x: 500 - 250 + (50 / 2) + 50,
                    y: 10 + 50 + 50 + 50,
                    size: 50,
                    bitmap: "equipment.parachute"
                },
                oxygen_gear_slot: {
                    type: "slot",
                    x: 500 - 250 + (50 / 2),
                    y: 10 + 50 + 50 + 50 + 50,
                    size: 50,
                    bitmap: "equipment.oxygen_gear"
                },
                ballone_left_slot: {
                    type: "slot",
                    x: 500 - 250 + (50 / 2) - 50,
                    y: 10 + 50 + 50 + 50 + 50 + 50,
                    size: 50,
                    bitmap: "equipment.ballone"
                },
                ballone_right_slot: {
                    type: "slot",
                    x: 500 - 250 + (50 / 2) + 50,
                    y: 10 + 50 + 50 + 50 + 50 + 50 + 50,
                    size: 50,
                    bitmap: "equipment.ballone"
                }
            }
        } satisfies UI.WindowContent;

        let heightY = 390;
        let isHotbar = true;

        for(let i = 1; i <= 36; i++) {
            if(i % 9 === 0) {
                if(isHotbar) {
                    isHotbar = false
                    heightY -= 15;
                };
                heightY -= 50;
            };

            content.elements["slot_" + i] = {
                type: "invslot",
                x: 10 + (i * 50),
                y: heightY,
                size: 50
            } satisfies UI.UIInvSlotElement;  
        };

        const ui = new UI.Window(content);
        ui.setInventoryNeeded(true);
        ui.setBlockingBackground(true);

        return ui;
    })();

    export const OXYGEN_DISPLAY_WINDOW = (() => {
        const window = new UI.Window({
            location: {
                x: 850,
                y: 10,
                width: 145,
                height: 155,
            },
            drawing: [
                {
                    type: "background",
                    color: android.graphics.Color.argb(0, 0, 0, 0),
                },
                {
                    type: "bitmap",
                    x: 215,
                    y: 0,
                    scale: 18,
                    bitmap: "SPC.OxygenTwo",
                },
                {
                    type: "bitmap",
                    x: 575,
                    y: 0,
                    scale: 18,
                    bitmap: "SPC.OxygenTwo",
                },
                {
                    type: "bitmap",
                    x: 40,
                    y: 0,
                    scale: 18,
                    bitmap: "SPC.SPC_Ox",
                },
            ],
            elements: {
                ballone_left: {
                    type: "scale",
                    x: 215,
                    y: 0,
                    scale: 18,
                    bitmap: "SPC.OxygenOne",
                    direction: 1,
                },
                ballone_right: {
                    type: "scale",
                    x: 575,
                    y: 0,
                    scale: 18,
                    bitmap: "SPC.OxygenOne",
                    direction: 1,
                },
                oxygen_capacity_display: {
                    type: "text",
                    x: 240,
                    y: 843,
                    width: 2500,
                    height: 2000,
                    size: 100,
                    text: "0/0",
                },
            }
        });
        window.setAsGameOverlay(true);
        window.setTouchable(false);
        window.setDynamic(true);

        return window;
    })();

    export const OPEN_BUTTON_WINDOW = new UI.Window({
        location: {
            x: 10,
            y: 10,
            width: 50,
            height: 50,
        },
        drawing: [
            {
                type: "background",
                color: android.graphics.Color.argb(0, 0, 0, 0),
            },
        ],
        elements: {
            button: {
                type: "button",
                x: 0,
                y: 0,
                bitmap: "equipment.mask",
                width: 50,
                height: 50,
                clicker: {
                    onClick(coords, container) {
                        container.close();

                        Network.sendToServer("packet.galacticraft.open_equipment_screen", {
                            screenName: "gear"
                        });
                    }
                }
            }
        }
    });

    export function createItemContainerFor(player: number) {
        const container = Equipment.list[player] = new ItemContainer();
        container.setClientContainerTypeName("galacticraft:equipment_storage:player_" + player);

        const condition = (container, str, id, count, data, extra, time) => Ballone.is(id) ? count : 0;

        container.setSlotAddTransferPolicy("ballone_left_slot", condition);
        container.setSlotAddTransferPolicy("ballone_right_slot", condition);
        container.setGlobalSlotSavingEnabled(true);

        return container;
    };

    export function getItemContainerFor(player: number): ItemContainer {
        return Equipment.list[player] ??= Equipment.createItemContainerFor(player);
    };

    export function getOxygenAmount(container: ItemContainer): number {
        return container.getSlot("ballone_left_slot").data + container.getSlot("ballone_right_slot").data;
    };

    Network.addServerPacket("packet.galacticraft.open_equipment_screen", (client, data: {
        screenName: string
    }) => {
        if(client === null || !data.screenName) return;

        const container = Equipment.getItemContainerFor(client.getPlayerUid());

        if(data.screenName === "oxygen_display" && Equipment.getOxygenAmount(container) <= 0) {
            return;
        };
        container.openFor(client, data.screenName);
    });

    Network.addServerPacket("packet.galacticraft.close_equipment_screen", (client, data) => {
        if(client === null) return;

        Equipment.getItemContainerFor(Player.getLocal()).closeFor(client);
    });
};

Callback.addCallback("ServerPlayerLoaded", (player) => {
    if(!(player in Equipment.list)) {
       Equipment.list[player] = Equipment.createItemContainerFor(player);
    };
});

Callback.addCallback("LocalLevelLeft", () => {
    Equipment.list = {};
});

Callback.addCallback("LocalPlayerLoaded", (player) => {
    ItemContainer.registerScreenFactory("galacticraft:equipment_storage:player_" + player, (container: ItemContainer, screenName: string) => {
        if(screenName === "gear") {
            return Equipment.GEAR_WINDOW;
        };

        if(screenName === "oxygen_display") {
            return Equipment.OXYGEN_DISPLAY_WINDOW;
        };
    });
});

Callback.addCallback("ServerPlayerTick", (playerUid, isPlayerDead) => {
    if(isPlayerDead) return;

    const noOxygen = Utils.getDimensionTags(Entity.getDimension(playerUid)).includes("no_oxygen");
    if(!noOxygen) return;

    if(World.getThreadTime() % 20 === 0) {
        const container = Equipment.getItemContainerFor(playerUid);

        if(container != null) {
            const window = container.getWindow();
            if(!window.isOpened()) return;

            const leftAmount = container.getSlot("ballone_left_slot").data;
            const rightAmount = container.getSlot("ballone_right_slot").data;
            const amount = leftAmount + rightAmount;
            
            container.setClientText("oxygen_capacity_display", `${amount} / 5000`);
            container.setClientScale("ballone_left", leftAmount / 5000);
            container.setClientScale("ballone_right", rightAmount / 5000);

            if(amount <= 0) {
                Entity.damageEntity(playerUid, 1);
                Game.titleMessage(Native.Color.RED + Translation.translate("message.galacticraft.no_oxygen_danger"))
            };
        };
    };
});

Callback.addCallback("NativeGuiChanged", function (screenName) {
    if(screenName == "survival_inventory_screen" || screenName == "creative_inventory_screen" || screenName == "inventory_screen" || screenName == "inventory_screen_pocket") {
        Equipment.OPEN_BUTTON_WINDOW.open();
    } else {
        Equipment.OPEN_BUTTON_WINDOW.close();

        if(screenName === EScreenName.IN_GAME_PLAY_SCREEN) {
            Network.sendToServer("packet.galacticraft.open_equipment_screen", {
                screenName: "oxygen_display"
            });
        } else {
            Network.sendToServer("packet.galacticraft.close_equipment_screen", {});
        };
    };
});

Translation.addTranslation("message.galacticraft.no_oxygen_danger", {
    en: "Danger! Not enough oxygen",
    ru: "Опасно! Недостаточно кислорода"
});