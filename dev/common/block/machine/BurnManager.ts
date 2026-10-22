namespace BurnManager {
    Recipes.registerSpecialFuelBurnDuration(VanillaItemID.coal, 0, 320);
    Recipes.registerSpecialFuelBurnDuration(VanillaItemID.coal, 1, 160);
    Recipes.registerSpecialFuelBurnDuration(VanillaItemID.charcoal, 0, 160);
    Recipes.registerSpecialFuelBurnDuration(VanillaBlockID.coal_block, 0, 3200);

    export function burn(tileEntity: ElectricMachine.TileEntity, burningKeyName: string = "burning", burningMaxKeyName: string = "burningMax", changeActive: boolean = true, fuelSlotName: string = "fuel_slot", burningDuration?: number): boolean {
        const slot = tileEntity.container.getSlot(fuelSlotName);
        burningDuration ??= Recipes.getSpecialFuelBurnDuration(slot.id, slot.data);
        
        if(burningDuration != 0) {
            tileEntity.data[burningKeyName] = tileEntity.data[burningMaxKeyName] = burningDuration;
            if(changeActive == true) {
                tileEntity.data.active = true;
            }
            let item = Recipes.getFuelBurnDurationResult(slot.id);

            if(item == null) {
                item = { id: slot.id, count: slot.count - 1, data: slot.data };
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

   
    export function getVanillaFuelBurnDuration(id: number, data: number): number {
        return Recipes.getFuelBurnDuration(id, data) || 0;
    }

    export function burnVanilla(tileEntity: ElectricMachine.TileEntity, burningKeyName: string = "energy", burningMaxKeyName: string = "energyMax", fuelSlotName: string = "fuel_slot"): boolean {
        const slot = tileEntity.container.getSlot(fuelSlotName);
        const burningDuration = getVanillaFuelBurnDuration(slot.id, slot.data);

        if(burningDuration <= 0) {
            return false;
        }
        tileEntity.data[burningKeyName] = tileEntity.data[burningMaxKeyName] = burningDuration;
        let item = Recipes.getFuelBurnDurationResult(slot.id);

        if(item == null) {
            item = { id: slot.id, count: slot.count - 1, data: slot.data };
        }
        tileEntity.container.setSlot(fuelSlotName, item.id, item.count, item.data);
        tileEntity.container.validateSlot(fuelSlotName);
        return true;
    }

    export function validateTileVanilla(tileEntity: BurnTile, id: number, data: number): boolean {
        if(getVanillaFuelBurnDuration(id, data) > 0) {
            tileEntity.data.canSpendFuel = true;
            tileEntity.noupdate = false;
            return true;
        }
        return false;
    }

    export function addSlotPolicyVanilla(tileEntity: BurnTile, fuelSlotName: string = "fuel_slot"): void {
        tileEntity.container.setSlotAddTransferPolicy(fuelSlotName, (container, str, id, count, data) => {
            if(container.getSlot(fuelSlotName).count + count > Item.getMaxStackSize(id)) {
                return 0;
            }
            if(validateTileVanilla(tileEntity, id, data)) {
                return count;
            }
            return 0;
        });
    }

    export function isValidFuelSlot(tileEntity: TileEntity.TileEntityPrototype, fuelSlotName: string = "fuel_slot"): boolean {
        const slot = tileEntity.container.getSlot(fuelSlotName);
        return Recipes.getSpecialFuelBurnDuration(slot.id, slot.data) != 0;
    }
    
    export type BurnTile = TileEntity & { data: { canSpendFuel: boolean } & Scriptable, container: ItemContainer };

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
            if(container.getSlot(fuelSlotName).count + count > Item.getMaxStackSize(id)) {
                return 0;
            }
            if(validateTile(tileEntity, id, data)) {
                return count;
            }
            return 0;
        });
    }
}