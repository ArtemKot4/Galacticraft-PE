class GearInventoryOpenButtonUI {
    public static size = UI.getScreenHeight() / 14.8;
    public static buttonY: number = 4.78;
    protected static statusOpen = false;

    public static window = new UI.Window({
        location: {
            x: 500-66 - this.size,
            y: 0,
            width: this.size, //38 примерно при 562.5 
            height: this.size + 5,
            globalScale: true
        },
        drawing: [{
            type: "background", color: android.graphics.Color.TRANSPARENT
        }],
        elements: {
            "button": {
                type: "image",
                x: 0,
                y: this.buttonY,
                bitmap: "inventory.open_button",
                width: this.size,
                height: this.size,
                clicker: {
                    onClick: (position, container) => {
                        this.closeInventoryButton();
                        Network.sendToServer("packet.galacticraft.send_open_inventory_request", {});
                        return;
                    }
                }
            }
        }
    });

    //need transfer to Fireflies
    public static isStandardWindow(window: UI.IWindow): window is UI.StandardWindow | UI.StandartWindow {
        const content = window.getContent();
        return "standard" in content || "standart" in content;
    }

    public static openInventoryButton(): void {
        this.window.close();
        const size = this.window.getLocation().width;
        this.window.content.elements["button"].y = -(size + this.buttonY);
        this.window.open();
        this.statusOpen = true;

        Threading.initThread("galacticraft:gear_inventory_open_button_ui.open_animation", () => {
            while(true) {
                const y = this.window.content.elements["button"].y;
                if(this.statusOpen == false || !this.window.isOpened() || y >= this.buttonY) {
                    break;
                }
                this.window.content.elements["button"].y = Math.min(this.buttonY, y + 0.48);
                this.window.forceRefresh();
                java.lang.Thread.sleep(2);
            }
        });
    }

    public static closeInventoryButton(): void {
        const size = this.window.getLocation().width;
        const endPoint = -(size + this.buttonY);
        this.window.open();
        this.statusOpen = false;

        Threading.initThread("galacticraft:gear_inventory_open_button_ui.close_animation", () => {
            while(true) {
                const y = this.window.content.elements["button"].y;
                if(this.statusOpen == true || !this.window.isOpened() || y <= endPoint) {
                    this.window.close();
                    break;
                }
                this.window.content.elements["button"].y = Math.max(endPoint, y - 0.48);
                this.window.forceRefresh();
                java.lang.Thread.sleep(2);
            }
        });
    }
    
    static {
        this.window.setTouchable(true);
    }
}