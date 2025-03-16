abstract class LiquidMachine extends InputMachine {
    public getLiquidCapacity(): number {
        return 1000;
    };

    public fillFromSlot(slotName: string, liquidName: string) {
        if(this.liquidStorage.getAmount(liquidName) > this.getLiquidCapacity()) {
            return;
        };

        const item = this.container.getSlot(slotName);

        if(item.id === ItemList.CANISTER.id) {
            if(!item.extra) return;
            const type = item.extra.getString("type");

            if(type != liquidName) return;
            const amount = item.extra.getInt("amount");

            if(amount <= 0) return;
            if(World.getThreadTime() % 20 === 0 && amount != 0) {
                const extra = item.extra;
                
                this.liquidStorage.addLiquid(liquidName, amount <= 100 ? amount : amount - 100)
                extra.putInt("amount", amount <= 100 ? 0 : amount - 100);

                this.container.setSlot(slotName, item.id, item.count, item.data, extra);
            };
        } else {
            const empty = LiquidRegistry.getEmptyItem(item.id, item.data);
            
            if(empty && empty.liquid === liquidName) {
                this.liquidStorage.addLiquid(liquidName, this.getLiquidCapacity() - this.liquidStorage.getAmount(liquidName))
                this.container.setSlot(slotName, empty.id, 1, 0);
            };
        };
    };
};