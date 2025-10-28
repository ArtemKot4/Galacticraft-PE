abstract class LiquidMachine extends InputMachine {
    public getLiquidCapacity(): number {
        return 600;
    }

    public isFullLiquid(liquidName: string): boolean {
        return this.liquidStorage.getAmount(liquidName) >= this.getLiquidCapacity();
    }

    public fillFromSlot(slotName: string, liquidName: string): boolean {
        if(this.isFullLiquid(liquidName)) {
            return;
        }

        const item = this.container.getSlot(slotName);

        if(
            World.getThreadTime() % 20 === 0 &&
            item.id === ItemList.CANISTER.id && 
            this.isValidCanister(item, liquidName) && 
            item.extra.getInt("amount") >= 100
        ) {
            const amount = item.extra.getInt("amount");
            
            this.liquidStorage.addLiquid(liquidName, amount <= 100 ? amount : amount - 100)
            item.extra.putInt("amount", amount <= 100 ? 0 : amount - 100);

            this.container.setSlot(slotName, item.id, item.count, item.data, item.extra);
            return true;
        } else {
            const empty = LiquidRegistry.getEmptyItem(item.id, item.data);
            
            if(empty && empty.liquid === liquidName) {
                this.liquidStorage.addLiquid(liquidName, this.getLiquidCapacity() - this.liquidStorage.getAmount(liquidName))
                this.container.setSlot(slotName, empty.id, 1, 0);
                return true;
            }
            return false;
        }
    }

    public isValidCanister(item: ItemInstance, liquidName: string): boolean {
        return item.extra && item.extra.getString("type") == liquidName;
    }

    public fillToSlot(slotName: string, liquidName: string): boolean {
        const liquidAmount = this.liquidStorage.getAmount(liquidName);
        if(liquidAmount <= 0) return false;

        const item = this.container.getSlot(slotName);

        if(
            World.getThreadTime() % 20 === 0 &&
            item.id === ItemList.CANISTER.id && 
            this.isValidCanister(item, liquidName) && 
            item.extra.getInt("amount") < this.getLiquidCapacity() && 
            liquidAmount >= 100
        ) {
            this.liquidStorage.addLiquid(liquidName, liquidAmount - 100)
            item.extra.putInt("amount", Math.min(this.getLiquidCapacity(), item.extra.getInt("amount") + 100));
            return true;
        } else {
            if(liquidAmount >= this.getLiquidCapacity()) {
                const bucket = LiquidRegistry.getFullItem(item.id, item.data, liquidName);

                this.container.setSlot(slotName, bucket.id, item.count, bucket.data,    item.extra);
                this.liquidStorage.setAmount(liquidName, 0);
                return true;
            }
            return false;
        }
    }
}