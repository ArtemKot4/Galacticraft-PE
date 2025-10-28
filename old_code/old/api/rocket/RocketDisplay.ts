class RocketDisplay {
    public static SCALE: number = 2;
    public static UI: UI.Window = (() => {
        const window = new UI.Window({
            location: {
                x: 0,
                y: UI.getScreenHeight() / 2,
                width: 20 * this.SCALE,
                height: 242 * this.SCALE
            },
            drawing: [{
                type: "background",
                color: android.graphics.Color.TRANSPARENT
            }],
            elements: {
                background: {
                    type: "image",
                    x: 0,
                    y: 0,
                    // width: 20 * this.SCALE,
                    // height: 242 * this.SCALE,
                    bitmap: "moon_rocket_gui"
                },
                indicator: {
                    type: "image",
                    x: 0,
                    y: 242 * this.SCALE,
                    bitmap: "rocket.indicator"
                }
            }
        });
        window.setDynamic(true);
        window.setTouchable(false);
        window.setAsGameOverlay(true);
        return window;
    })();

    public static changeBackground(texture: string): void {
        this.UI.content.elements["background"].bitmap = texture;
        this.UI.forceRefresh();
    };

    public static changeHeightIndicator(height: number): void {
        return this.UI.getElements().get("indicator").setHeight(0, height);
    };

    public static startFor(client: NetworkClient, texture: string, startHeight: number, finalHeight: number, entity: number) {
        if(client != null) {
            client.send("packet.galacticraft.start_rocket_display", {
                texture,
                startHeight,
                finalHeight,
                entity
            });
        };
    };

    public static start(texture: string, startHeight: number, finalHeight: number, entity: number) {
        this.UI.open();
        this.changeBackground(texture);

        Threading.initThread("thread.galacticraft.rocket_display", () => {
            while(true) {
                const pos = Entity.getPosition(entity);
                this.changeHeightIndicator(pos.y - startHeight);

                if(pos.y >= finalHeight) {
                    this.UI.close();
                    return;
                };

                java.lang.Thread.sleep(finalHeight);
            };
        });
        return;
    };

    @SubscribeEvent(ECallback.ITEM_USE)
    debug(coords: Callback.ItemUseCoordinates, item: ItemInstance, block: Tile, isExternal: boolean, player: number) {
        if(Entity.getSneaking(player)) {
            alert("debug")
            RocketDisplay.UI.open()
        }
    }
};

Network.addClientPacket("packet.galacticraft.start_rocket_display", (data: { texture, startHeight, finalHeight, entity }) => {
    return RocketDisplay.start(data.texture, data.startHeight, data.finalHeight, data.entity);
});