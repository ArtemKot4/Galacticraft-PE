const GearInventoryOpenButtonUI = new UI.Window({
    location: {
        x: 500-104,
        y: 5,
        width: 38,
        height: 38
    },
    elements: {
        "button": {
            type: "image",
            x: 0,
            y: 0,
            bitmap: "inventory.open_button",
            width: 1000,
            height: 1000,
            clicker: {
                onClick(position, container) {
                    GearInventoryOpenButtonUI.close();
                    Network.sendToServer("packet.galacticraft.send_open_inventory_request", {});
                }
            }
        }
    }
});
GearInventoryOpenButtonUI.setTouchable(true);