class MagneticTableStorage extends StorageInterface.TileEntityInterface {
    public override getSlot(name: string): ItemInstance {
        const slot = super.getSlot(name);

        if(name == "result_slot") {
            return { id: slot.id, count: slot.count, data: slot.data, extra: slot.extra };
        }
        return slot;
    }

    public override setSlot(name: string, id: number, count: number, data: number, extra?: ItemExtraData): void {
        if(name == "result_slot") {
            const current = this.container.getSlot("result_slot");
            const delta = current.count - count;

            if(delta > 0 && !(this.tileEntity as MagneticTableTile).payForTake(delta)) {
                return;
            }
        }
        super.setSlot(name, id, count, data, extra);
    }

    public override addItem(item: ItemInstance, side: number = -1, maxCount: number = 64): number {
        const tile = this.tileEntity as MagneticTableTile;
        let maxItemSlots = tile.countTargets(item.id, item.data || 0);

        if(maxItemSlots == 0) {
            return 0;
        }
        let count = 0;

        for(const name of this.getInputSlots(side)) {
            const slot = this.container.getSlot(name);

            if(slot.id == item.id && slot.data == (item.data || 0) && slot.count < Item.getMaxStackSize(item.id)) {
                count += this.addItemToSlot(name, item, maxCount - count);
                maxItemSlots--;
                if(item.count == 0 || count >= maxCount || maxItemSlots <= 0) {
                    break;
                }
            }
        }
        if(item.count > 0 && maxItemSlots > 0 && count < maxCount) {
            count += super.addItem(item, side, maxCount - count);
        }
        return count;
    }
}