const GearInventoryOpenButton = new UI.Window({
    location: {
        x: 500-104,
        y: 5,
        width: 38,
        height: 38,
        //globalScale: true
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
                    GearInventoryOpenButton.close();
                    Network.sendToServer("packet.galacticraft.send_open_inventory_request", {});
                }
            }
        }
    }
});
GearInventoryOpenButton.setTouchable(true);