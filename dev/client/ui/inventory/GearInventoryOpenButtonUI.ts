const GearInventoryOpenButtonUI = (() => {
    const size = UI.getScreenHeight() / 14.8;

    const window = new UI.Window({
        location: {
            x: 500-66 - size,
            y: 0,
            width: size, //38 примерно при 562.5 
            height: size + 5,
            globalScale: true
        },
        drawing: [{
            type: "background", color: android.graphics.Color.TRANSPARENT
        }],
        elements: {
            "button": {
                type: "image",
                x: 0,
                y: 4.78,
                bitmap: "inventory.open_button",
                width: size,
                height: size,
                clicker: {
                    onClick(position, container) {
                        GearInventoryOpenButtonUI.close();
                        Network.sendToServer("packet.galacticraft.send_open_inventory_request", {});
                        return;
                    }
                }
            }
        }
    });
    window.setTouchable(true);
    return window;
})();