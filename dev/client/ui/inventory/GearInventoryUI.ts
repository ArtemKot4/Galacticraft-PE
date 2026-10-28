const GearInventoryUI = new UI.Window({
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
        bitmap: "classic_frame_bg_light",
        x: 500-250 + 60,
        y: 60,
        width: 500 - 60,
        height: 450,
        scale: 2.3
    }], 
    elements: {
        close_button: {
            type: "button",
            x: 711,
            y: 58,
            bitmap: "classic_close_button",
            scale: 2.7,
            clicker: {
                onClick(position, container) {
                    container.close();
                    GearInventoryOpenButtonUI.open();
                }
            }
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
GearInventoryUI.setBlockingBackground(true);
GearInventoryUI.setInventoryNeeded(true);
GearInventoryUI.setTouchable(true);