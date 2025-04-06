class Ballone extends GalacticraftItem {
    public static list: Record<number, number> = {};
    public constructor(stringID: string, oxygenSize: number) {
        super(stringID, {
            name: stringID,
            meta: 0
        });

        Ballone.list[this.id] = oxygenSize;
    };

    public static is(id: number): boolean {
        return id in this.list;
    };

    public static getCapacity(id: number): number {
        return this.list[id];
    };
};

namespace Equipment {
    export const players: Record<number, ItemContainer> = {};

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

    export function createItemContainerFor(player: number) {
        const container = Equipment.players[player] = new ItemContainer();
        container.setClientContainerTypeName("galacticraft:equipment_storage:player_" + player);

        const condition = (container, str, id, count, data, extra, time) => Ballone.is(id) ? count : 0;

        container.setSlotAddTransferPolicy("ballone_left_slot", condition);
        container.setSlotAddTransferPolicy("ballone_right_slot", condition);
        container.setGlobalSlotSavingEnabled(true);

        return container;
    };

    export function getItemContainerFor(player: number): Nullable<ItemContainer> {
        return Equipment.players[player] || null;
    };

    export function getOxygenAmount(container: ItemContainer): number {
        return container.getSlot("ballone_left_slot").data + container.getSlot("ballone_right_slot").data;
    };
};

Callback.addCallback("ServerPlayerLoaded", (player: number) => {
    if(!(player in Equipment.players)) {
       Equipment.players[player] = Equipment.createItemContainerFor(player);
    };
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

    if(World.getThreadTime() % 10 === 0) {
        const container = Equipment.getItemContainerFor(playerUid);

        if(container != null) {
            const name = container.getClientContainerTypeName();
            if(name !== "oxygen_display") return;

            const left_amount = container.getSlot("ballone_left_slot").data;
            const right_amount = container.getSlot("ballone_right_slot").data;
            
            container.setClientText("oxygen_capacity_display", `${left_amount + right_amount}/5000`);

            container.setClientScale("ballone_left", left_amount/5000);
            container.setClientScale("ballone_right", right_amount/5000);

            if(left_amount + right_amount <= 0) {
                Entity.damageEntity(playerUid, 1);
            };
        };
    };
});