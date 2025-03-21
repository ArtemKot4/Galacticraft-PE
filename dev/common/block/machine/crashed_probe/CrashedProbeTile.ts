class CrashedProbeTile extends CommonTileEntity {
    public container: ItemContainer;
    public data = {
        lock: false
    };

    public getScreenByName(): UI.StandartWindow {
        return new UI.StandardWindow({
            elements: (() => {
                const obj: UI.ElementSet = {};
                let x = 380;
                let y = 110;

                for(let i = 0; i < this.getSize(); i++) {
                    obj[String(i)] = {
                        type: "slot",
                        size: 70,
                        x: x,
                        y: y,
                    };
                    x += 70;
                    if(i % 10 === 0) {
                        y += 70;
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
        if(this.data.lock) return;
        this.setItems();
        this.lock();
    };
};