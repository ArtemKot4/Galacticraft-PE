class PrelaunchChecklist extends GalacticraftItem  implements IItemUseCallback, INoTargetUseCallback {
    public fixedPoints: string[] = [];
    public SCALE: number = 2;
    public POINT_TEXT_LOCATION = 20;

    public UI: UI.Window = (() => {
        const window = new UI.Window();
        window.setBlockingBackground(true);
        window.setDynamic(true);
        window.setTouchable(true);

        return window;
    })();

    public constructor() {
        super("prelaunch_checklist", {
            name: "prelaunch_checklist",
            meta: 0
        });
    };

    public getDefaultContent = () => (
        {
            location: {
                x: 500 - (146 * this.SCALE),
                y: 50
            },
            drawing: [{
                type: "background",
                color: android.graphics.Color.TRANSPARENT
            }, {
                type: "bitmap",
                x: 0,
                y: 0,
                bitmap: "prelaunch_checklist.background",
                scale: this.SCALE
            }],
            elements: {

            }
        } satisfies UI.WindowContent
    );

    /**
     * Method to draw page
     * @param row array of points
     * @returns selected points
     */
    public drawPage(row: string[], currentPoints: string[]): string[] {
        let selectedPoints: string[] = currentPoints || [];
        const content = this.UI.getContent();

        let y = 70;

        for(let i = 0; i < row.length; i++) {
            const point = row[i];

            content.elements[point] = {
                type: "text",
                x: this.POINT_TEXT_LOCATION,
                y: y,
                text: Translation.translate("point.galacticraft." + point),
                font: {
                    size: 25,
                    color: android.graphics.Color.BLACK
                }
            };

            content.elements[point + "_selection"] = {
                type: "image",
                x: this.POINT_TEXT_LOCATION + 115.5,
                y: y - 2,
                scale: this.SCALE,
                bitmap: selectedPoints.includes(point) ? "prelaunch_checklist.selection" : "unknown"
            };

            content.elements[point + "_point"] = {
                type: "button",
                x: this.POINT_TEXT_LOCATION + 115,
                y: y,
                bitmap: "prelaunch_checklist.point",
                bitmap2: "prelaunch_checklist.point_pressed",
                scale: this.SCALE,
                clicker: {
                    onClick: () => {
                        const selection = content.elements[point + "_selection"];

                        if(!selectedPoints.includes(point)) {
                            selectedPoints.push(point);
                            selection.bitmap = "prelaunch_checklist.selection";
                        } else {
                            selectedPoints.filter(v => v !== point);
                            selection.bitmap = "unknown";
                        }
                    }
                }
            };

            y+= 20;
        };

        return selectedPoints;
    };

    public draw(item: ItemInstance) {
        this.UI.setContent(this.getDefaultContent());

        const rows: string[][] = [];

        const copy = this.fixedPoints.slice();
        for(let i = 0; i < copy.length; i++) {
            if(i % 10 === 0) {
                rows.push(copy.splice(0, i));
            };
        };

        let selectedPoints: Record<number, string[]> = {};

        let page = 0;
        const content = this.UI.getContent();

        content.elements["right_arrow"] = {
            type: "button",
            x: 20,
            y: 160,
            scale: this.SCALE,
            bitmap: "prelaunch_checklist.right_arrow",
            bitmap2: "prelaunch_checklist.right_arrow_pressed",
            clicker: {
                onClick: () => {
                    page = Math.max(0, page - 1);

                    selectedPoints[page] = this.drawPage(rows[page], this.getSelectedPoints(item));
                    this.UI.forceRefresh();
                }
            }
        };

        content.elements["left_arrow"] = {
            type: "button",
            x: 120,
            y: 160,
            scale: this.SCALE,
            bitmap: "prelaunch_checklist.left_arrow",
            bitmap2: "prelaunch_checklist.left_arrow_pressed",
            clicker: {
                onClick: () => {
                    page = Math.min(rows.length - 1, page + 1);

                    selectedPoints[page] = this.drawPage(rows[page], this.getSelectedPoints(item));
                    this.UI.forceRefresh();
                }
            }
        };

        content.elements["close_button"] = {
            type: "button",
            x: 10,
            y: 11,
            scale: this.SCALE,
            bitmap: "black_cross",
            clicker: {
                onClick: () => {
                    let all: string[] = [];

                    for(const i in selectedPoints) {
                        all.concat(selectedPoints[i]);
                    };

                    Network.sendToServer("packet.galacticraft.prelaunch_checklist_points_set", { points: all });
                    this.UI.close();
                }
            }
        };

        this.UI.forceRefresh();
    };

    public open(item: ItemInstance) {
        if(!this.UI.isOpened()) {
            this.UI.open();
        };
        this.draw(item);
        return;
    };

    public getSelectedPoints(item: ItemInstance): Nullable<string[]> {
        if(!item.extra) return null;
        const sections = item.extra.getString("points");
        if(!sections) return null;
        return sections.split(",");
    };

    public setSelectedPoints(points: string[], item: ItemInstance, playerUid: number): void {
        const extra = new ItemExtraData();
        extra.putString("points", points.join(","));
        
        Entity.setCarriedItem(playerUid, item.id, item.count, item.data, extra);
    };

    public registerPoint(point: string): void {
        this.fixedPoints.push(point);
    };

    public onNoTargetUse(item: ItemStack, player: number): void {
        const client = Network.getClientForPlayer(player);
        if(client) client.send("packet.galacticraft.open_prelaunch_checklist", item);
    };

    public onItemUse(coords: Callback.ItemUseCoordinates, item: ItemStack, block: Tile, player: number): void {
        return this.onNoTargetUse(item, player);
    };
};

Network.addClientPacket("packet.galacticraft.open_prelaunch_checklist", (data: ItemInstance) => {
    if(!data) return;
    ItemList.PRELAUNCH_CHECKLIST.open(data);
});

Network.addServerPacket("packet.galacticraft.prelaunch_checklist_points_set", (client, data: { points: string[] }) => {
    if(!client || !data) return;
    const playerUid = client.getPlayerUid();
    const item = Entity.getCarriedItem(playerUid);

    if(item.id !== ItemList.PRELAUNCH_CHECKLIST.id) {
        Debug.message("Error! Item is not prelaunch checklist");
        return;
    };

    ItemList.PRELAUNCH_CHECKLIST.setSelectedPoints(data.points, item, playerUid)
});

Translation.addTranslation("item.galacticraft.prelaunch_checklist", {
    en: "Prelaunch Checklist",
    ru: "Том по подготовке космонавтов"
});