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

    public static sendFor(client: NetworkClient, timer: number) {
        if(client != null) {
            client.send("packet.galacticraft.init_rocket_timer_thread", {
                timer
            });
        };
    };

    public static updateText(timer: number) {
        return RocketTimer.UI.getElements().get("text").setBinding("text", String(timer));
    };

    public static close(): void {
        RocketTimer.UI.close();
        RocketTimer.inited = false;
        RocketTimer.value = 0;
    };

    public static start(): void {
        Updatable.addLocalUpdatable({
            update() {
                if(RocketTimer.value <= -1) {
                    RocketTimer.close();
                    this.remove = true;
                    return;
                };

                RocketTimer.updateText(RocketTimer.value);
            }
        });
    };
};

Network.addClientPacket("packet.galacticraft.init_rocket_timer_thread", (data: {
    timer: number
}) => {
    RocketTimer.value = data.timer;

    if(RocketTimer.inited === false) {
        RocketTimer.UI.open();
        RocketTimer.start();
    };

    RocketTimer.inited = true;
});