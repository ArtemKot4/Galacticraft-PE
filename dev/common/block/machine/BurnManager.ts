namespace BurnManager {
    export function burn(tileEntity: MachineTile, burningKeyName: string = "burning", burningMaxKeyName: string = "burningMax", changeActive: boolean = true, fuelSlotName: string = "fuel_slot", burningDuration?: number): boolean {
        const slot = tileEntity.container.getSlot(fuelSlotName);
        burningDuration ??= Recipes.getSpecialFuelBurnDuration(slot.id, slot.data);
        
        if(burningDuration != 0) {
            tileEntity.data[burningKeyName] = tileEntity.data[burningMaxKeyName] = burningDuration;
            if(changeActive == true) {
                tileEntity.data.active = true;
            }
            let item = Recipes.getFuelBurnDurationResult(slot.id);

            if(item == null) {
                item = slot;
                item.count -= 1;
            }
            tileEntity.container.setSlot(fuelSlotName, item.id, item.count, item.data);
            tileEntity.container.validateSlot(fuelSlotName);
            return true;
        }
        return false;
    }

    export function isValidFuel({ id, data }: ItemInstance): boolean {
        return Recipes.getSpecialFuelBurnDuration(id, data) != 0;
    }

    export function isValidFuelSlot(tileEntity: TileEntity.TileEntityPrototype | MachineTile, fuelSlotName: string = "fuel_slot"): boolean {
        const slot = tileEntity.container.getSlot(fuelSlotName);
        return Recipes.getSpecialFuelBurnDuration(slot.id, slot.data) != 0;
    }
    
    export type BurnTile = TileEntity & { data: { canSpendFuel: boolean } & Scriptable };

    export function validateTile(tileEntity: BurnTile, id: number, data: number): boolean {
        const burningDuration = Recipes.getSpecialFuelBurnDuration(id, data);
        if(burningDuration != 0) {
            tileEntity.data.canSpendFuel = true;
            tileEntity.noupdate = false;
            return true;
        }
        return false;
    }

    export function addSlotPolicy(tileEntity: BurnTile, fuelSlotName: string = "fuel_slot"): void {
        tileEntity.container.setSlotAddTransferPolicy(fuelSlotName, (container, str, id, count, data) => {
            if(validateTile(tileEntity, id, data)) {
                return count;
            }
            return 0;
        });
    }
}