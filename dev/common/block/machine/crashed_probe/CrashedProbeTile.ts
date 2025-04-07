class CrashedProbeTile extends CommonTileEntity {
    public data = {
        lock: false
    };

    public getScreenByName(): UI.StandartWindow {
        return new UI.StandardWindow({
            standard: {
                header: {
                    text: {
                        text: Translation.translate("block.galacticraft.crashed_probe"),
                    },
                },
                inventory: {
                    standard: true,
                },
                background: {
                    standard: true,
                },
            },
            elements: (() => {
                const obj: UI.ElementSet = {};
                let x = 290;
                let y = 110;

                for(let i = 1; i <= this.getSize(); i++) {
                    obj[String(i)] = {
                        type: "slot",
                        size: 80,
                        x: x,
                        y: y,
                    };
                    x += 80;
                    if(i % 10 === 0) {
                        y += 80;
                    };
                };
                return obj;
            })()
        });
    };

    public getSize(): number {
        return 9;
    };

    public lock(): void {
        this.data.lock = true;
    };

    public getRandomItems(): ItemInstance[] {
        const list: ItemInstance[] = [];
        for(let i = 0; i < this.getSize(); i++) {
            let item = {
                id: VanillaBlockID.web,
                count: MathHelper.randomInt(1, 8),
                data: 0
            };
            const current = CrashedProbe.getRandomItem();

            if(Math.random() > current.chance) {
                item = current;
            };
            list.push(item);
        };
        return list;
    };

    public setItems(): void {
        const items = this.getRandomItems();
        for(let i = 0; i < this.getSize(); i++) {
            const item = items[i];
            this.container.setSlot(String(i), item.id, item.count, item.data);
        };
    };

    public onClick(coords: Callback.ItemUseCoordinates, item: ItemStack, player: number): boolean | void {
        if(this.data.lock) return false;
        this.setItems();
        this.lock();
        return false;
    };
};