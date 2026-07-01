class RocketTimer {
    public static value: number = -1;
    public static inited: boolean = false;

    public static UI: UI.Window = (() => {
        const window = new UI.Window({
            drawing: [
                {
                    type: "background",
                    color: android.graphics.Color.TRANSPARENT
                }
            ],
            elements: {
                "text": {
                    type: "text",
                    y: UI.getScreenHeight() / 2 - 20,
                    x: 500 - 20,
                    font: {
                        size: 50,
                        color: android.graphics.Color.RED,
                        shadow: 0.25
                    },
                    text: ""
                }
            }
        });
        window.setAsGameOverlay(true);
        window.setTouchable(false);
        window.setDynamic(true);
        return window;
    })();

    public static sendFor(client: NetworkClient, timer: number) {
        if(client != null) {
            client.send("packet.galacticraft.init_rocket_timer_thread", {
                timer
            });
        }
    }

    public static updateText(text: string): void {
        if(RocketTimer.UI.isOpened()) {
            return RocketTimer.UI.getElements().get("text").setBinding("text", String(text));
        }
    }

    public static close(): void {
        RocketTimer.UI.close();
    }

    @SubscribeEvent
    public static onNativeGuiChanged(screenName: string): void {
        if(screenName == EScreenName.IN_GAME_PLAY_SCREEN) {
            if(RocketTimer.value != -1 && !RocketTimer.UI.isOpened()) {
                RocketTimer.UI.open();
            }
        } else {
            RocketTimer.UI.close();
        }
    }
}
Network.addClientPacket("packet.galacticraft.init_rocket_timer_thread", (data: {
    timer: number
}) => {
    RocketTimer.value = data.timer;
    if(data.timer == -1) {
        RocketTimer.updateText("");
        RocketTimer.close();
        return;
    }
    if(RuntimeData.local.screenName == EScreenName.IN_GAME_PLAY_SCREEN && !RocketTimer.UI.isOpened()) {
        RocketTimer.UI.open();
    }
    RocketTimer.updateText(String(data.timer));
});