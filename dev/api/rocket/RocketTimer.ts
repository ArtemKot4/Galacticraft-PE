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
                        size: 40,
                        color: android.graphics.Color.RED
                    },
                    text: "0"
                }
            }
        });
        window.setAsGameOverlay(true);
        window.setTouchable(false);
        window.setDynamic(true);
        return window;
    })();

    public static init(player: number, timer: number) {
        const client = Network.getClientForPlayer(player);
        if(client != null) {
            client.send("packet.galacticraft.init_rocket_timer_thread", {
                timer
            });
        }
    };

    public static updateText(timer: number) {
        return RocketTimer.UI.getElements().get("text").setBinding("text", timer);
    };
}

Network.addClientPacket("packet.galacticraft.init_rocket_timer_thread", (data: {
    timer: number
}) => {
    RocketTimer.value = data.timer;

    if(RocketTimer.inited === false) {
        RocketTimer.UI.open();

        Threading.initThread("thread.galacticraft.rocket_timer", () => {
            while(RocketTimer.value >= 0) {
                if(RocketTimer.value < 0) {
                    RocketTimer.UI.close();
                    RocketTimer.inited = false;
                    RocketTimer.value = 0;
                    return;
                };

                RocketTimer.updateText(RocketTimer.value);

                java.lang.Thread.sleep(1000);
            };
        });
    }

    RocketTimer.inited = true;
});