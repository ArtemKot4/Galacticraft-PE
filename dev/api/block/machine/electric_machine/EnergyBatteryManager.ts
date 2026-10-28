//@ts-ignore
namespace ElectricMachine {
    export class EnergyBatteryManager implements BatteryManager {
        public constructor(public energyType?: string, public energyKey?: string) {};

        public getDefaultContainerSlots(): Record<string, batteryAction> {
            return {
                "battery_slot_charge": "charge",
                "battery_slot_discharge": "discharge"
            };
        }
        
        public isValidItemForCharge(item: ItemInstance, amount: number): boolean {
            if(!ChargeItemRegistry.isValidItem(item.id, this.energyType, 3)) {
                return false;
            }
            return amount < ChargeItemRegistry.getMaxCharge(item.id, this.energyType);
        }

        public isValidItemForDischarge(item: ItemInstance, amount: number): boolean {
            if(ChargeItemRegistry.isValidItem(item.id, this.energyType, 3)) {
                return amount > 0;
            }
            return item.extra && item.extra.getString(this.getSpecialTypeKey()) != null;
        }

        public sameBatteryData(a?: Nullable<ItemExtraData>, b?: Nullable<ItemExtraData>): boolean {
            const aAmount = a ? a.getInt("energy") : 0;
            const bAmount = b ? b.getInt("energy") : 0;
            const aType = a ? a.getString(this.getSpecialTypeKey()) : null;
            const bType = b ? b.getString(this.getSpecialTypeKey()) : null;

            return aAmount == bAmount && aType == bType;
        }

        public setSlotPolicy(tileEntity: ElectricMachine.ITileEntity, slotName: string, action: ElectricMachine.batteryAction): void {
            let policy: ElectricMachine.BatterySlotPolicy;
            if(action == "charge") {
                policy = (item, amount, type) => this.isValidItemForCharge(item, amount);
            } else {
                policy = (item, amount, type) => this.isValidItemForDischarge(item, amount);
            }
            tileEntity.container.setSlotAddTransferPolicy(slotName, (container, str, id, count, data, extra) => {
                const current = container.getSlot(slotName);

                if(current.count >= 1) {
                    return 0;
                }
                if(current.id == id && current.count > 0 && !this.sameBatteryData(current.extra, extra)) {
                    return 0;
                }
                const isBattery = policy({ id, count, data, extra }, ChargeItemRegistry.getEnergyStored(new ItemStack(id, count, data, extra || null)), extra ? extra.getString(this.getSpecialTypeKey()) as ElectricMachine.batteryAction : null);
                if(isBattery == true) {
                    tileEntity.batterySlotChecks.add(slotName + ":" + action + ":" + this.energyType);
                    return Math.min(count, 1);
                }
                return 0;
            });

            tileEntity.container.setSlotGetTransferPolicy(slotName, (container, str, id, count) => {
                tileEntity.batterySlotChecks.delete(slotName + ":" + action + ":" + this.energyType);
                return count;
            });
        }

        public getChargeRate(tileEntity: ElectricMachine.ITileEntity): number {
            const rate = typeof (tileEntity as any).getBatteryChargeRate == "function" ? (tileEntity as any).getBatteryChargeRate() : 200;

            return isFinite(rate) && rate > 0 ? rate : 200;
        }

        public charge(tileEntity: ElectricMachine.ITileEntity, slotName: string): boolean {
            const slot = tileEntity.container.getSlot(slotName);
            if(!ChargeItemRegistry.isValidItem(slot.id, this.energyType, 3)) {
                return true;
            }
            if(!slot.extra) {
                slot.extra = new ItemExtraData();
                tileEntity.container.setSlot(slotName, slot.id, slot.count, slot.data, slot.extra);
            }
            const amount = ChargeItemRegistry.getEnergyStored(slot, this.energyType);
            const capacity = ChargeItemRegistry.getMaxCharge(slot.id, this.energyType); 

            if(!isFinite(amount) || !(capacity > 0) || amount >= capacity) {
                return true;
            }
            const energy = tileEntity.getEnergy(this.energyType);
            
            if(energy <= 0) {
                return false;
            }
            const chargeRate = this.getChargeRate(tileEntity);
            const addCount = Math.min(energy >= chargeRate ? chargeRate : energy, capacity - amount);
            const added = ChargeItemRegistry.addEnergyTo(slot, this.energyType, addCount, 3);

            tileEntity.container.setSlot(slotName, slot.id, slot.count, Item.getMaxDamage(slot.id) - ((amount + added) / capacity) * 100, slot.extra.putInt("energy", amount + added));
            tileEntity.setEnergy(energy - added, this.energyType);
        }

        public getCountFromSpecialType(type: string, energy: number, capacity: number): number {
            if(type == "infinity") {
                return capacity - energy; 
            }
            if(type == "atomic") { 
                return 10;
            }
            Logger.Log(`ElectricMachine: unknown special type of battery: "${type}"`, "WARNING");
            return 0;
        }

        public getSpecialTypeKey(): string {
            return "battery.special_type";
        }

        public discharge(tileEntity: ElectricMachine.ITileEntity, slotName: string): boolean {
            const slot = tileEntity.container.getSlot(slotName);
            const specialType = slot.extra ? slot.extra.getString(this.getSpecialTypeKey()) : null;
            if(!ChargeItemRegistry.isValidItem(slot.id, this.energyType, 3) && specialType == null) {
                return true;
            }
            if(!slot.extra) {
                slot.extra = new ItemExtraData();
                tileEntity.container.setSlot(slotName, slot.id, slot.count, slot.data, slot.extra);
            }
            const energy = tileEntity.getEnergy(this.energyType);
            const capacity = tileEntity.getCapacity(this.energyType);
            if(energy >= capacity) {
                return false;
            }
            let amount = ChargeItemRegistry.getEnergyStored(slot, this.energyType);
            if(!isFinite(amount)) {
                amount = 0;
            }
            if(amount == 0) {
                const type = slot.extra.getString(this.getSpecialTypeKey()) as GalacticraftItem.BatteryParams["type"];
                if(type != null) {
                    tileEntity.data.poweredByTier = type == "infinity" ? 3 : (type == "atomic" ? 2 : 0);
                    tileEntity.setEnergy(Math.min(capacity, energy + this.getCountFromSpecialType(type, energy, capacity)), this.energyType);
                    return false;
                }
                return true;
            }
            const batteryData = ChargeItemRegistry.getItemData(slot.id);
            const batteryCapacity = ChargeItemRegistry.getMaxCharge(slot.id, this.energyType);
            if(!(batteryCapacity > 0)) {
                return true;
            }
            tileEntity.data.poweredByTier = batteryData ? batteryData.tier : 0;
            const canAdd = capacity - energy;
            let add = amount < 200 ? amount : 200;
            let added = canAdd < add ? canAdd : add;
            tileEntity.addEnergy(added, this.energyType);
            tileEntity.container.setSlot(slotName, slot.id, slot.count, Item.getMaxDamage(slot.id) - ((amount - added) / batteryCapacity) * 100, slot.extra.putInt("energy", amount - added));
        }

        public applyFromSlot(tileEntity: ElectricMachine.ITileEntity, slotName: string, action: ElectricMachine.batteryAction): boolean | void {
            if(
                action == "charge" && this.charge(tileEntity, slotName) === true || 
                action == "discharge" && this.discharge(tileEntity, slotName) === true
            ) {
                tileEntity.batterySlotChecks.delete(slotName + ":" + action + ":" + this.energyType);
            }
            tileEntity.container.validateSlot(slotName);
        }

        public validateCache(tileEntity: ElectricMachine.ITileEntity, slotName: string, action: ElectricMachine.batteryAction): void {
            const slot = tileEntity.container.getSlot(slotName);
            const amount = slot.extra && slot.extra.getInt("energy") || 0;
            if(
                action == "charge" && this.isValidItemForCharge(slot, amount) ||
                action == "discharge" && this.isValidItemForDischarge(slot, amount)
            ) {
                tileEntity.batterySlotChecks.add(slotName + ":" + action + ":" + this.energyType);
                return;
            }
            tileEntity.batterySlotChecks.delete(slotName + ":" + action + ":" + this.energyType);
        }
    }

    export namespace DEFAULT_BATTERY_MANAGERS {
        export const ENERGY_BATTERY_MANAGER = new EnergyBatteryManager(Galacticraft.EnergyTypes.JOULE.name, "energy");
    }
}