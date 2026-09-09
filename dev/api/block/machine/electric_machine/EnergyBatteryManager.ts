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
            if(!ChargeItemRegistry.isValidItem(item.id, this.energyType, 0)) {
                return false;
            }
            return amount < ChargeItemRegistry.getMaxCharge(item.id, this.energyType);
        }

        public isValidItemForDischarge(item: ItemInstance, amount: number): boolean {
            if(ChargeItemRegistry.isValidItem(item.id, this.energyType, 0)) {
                return amount > 0;
            }
            return item.extra && item.extra.getString("battery.special_type") != null;
        }

        public setSlotPolicy(tileEntity: ElectricMachine.ITileEntity, slotName: string, action: ElectricMachine.batteryAction): void {
            let policy: ElectricMachine.BatterySlotPolicy;
            if(action == "charge") {
                policy = (item, amount, type) => this.isValidItemForCharge(item, amount);
            } else {
                policy = (item, amount, type) => this.isValidItemForDischarge(item, amount);
            }
            tileEntity.container.setSlotAddTransferPolicy(slotName, (container, str, id, count, data, extra) => {
                if(!extra || container.getSlot(slotName).count + count > Item.getMaxStackSize(id)) {
                    return 0;
                }
                const isBattery = policy(id, ChargeItemRegistry.getEnergyStored(new ItemStack(id, count, data, extra)), extra.getString("battery.special_type") as ElectricMachine.batteryAction);
                if(isBattery == true) {
                    tileEntity.batterySlotChecks.add(slotName + ":" + action + ":" + this.energyType);
                    return count;
                }
                return 0;
            });

            tileEntity.container.setSlotGetTransferPolicy(slotName, (container, str, id, count) => {
                tileEntity.batterySlotChecks.delete(slotName + ":" + action + ":" + this.energyType);
                return count;
            });
        }

        public charge(tileEntity: ElectricMachine.ITileEntity, slotName: string): boolean {
            const slot = tileEntity.container.getSlot(slotName);
            if(!ChargeItemRegistry.isValidItem(slot.id, this.energyType, 0) || !slot.extra) {
                return true;
            }
            const amount = ChargeItemRegistry.getEnergyStored(slot, this.energyType);
            const capacity = ChargeItemRegistry.getMaxCharge(slot.id, this.energyType); 

            if(amount >= capacity) {
                return true;
            }
            const energy = tileEntity.getEnergy(this.energyType);
            
            if(energy <= 0) {
                return false;
            }
            const added = ChargeItemRegistry.addEnergyTo(slot, this.energyType,  energy >= 100 ? 100 : energy, 0);
            tileEntity.container.setSlot(slotName, slot.id, slot.count, Item.getMaxDamage(slot.id) - ((amount + added) / capacity) * 100, slot.extra.putInt("energy", amount + added));
            tileEntity.setEnergy(energy - added, this.energyType);
        }

        public discharge(tileEntity: ElectricMachine.ITileEntity, slotName: string): boolean {
            const slot = tileEntity.container.getSlot(slotName);
            if(!slot.extra) {
                return true;
            }
            const energy = tileEntity.getEnergy(this.energyType);
            const capacity = tileEntity.getCapacity(this.energyType);
            if(energy >= capacity) {
                return false;
            }
            const type = slot.extra.getString("battery.special_type") as GalacticraftItem.BatteryParams["type"];
            if(type != null) {
                let count;
                switch(type) {
                    case "infinity": count = capacity - energy; break;
                    case "atomic": count = 10; break;
                    default: throw `ElectricMachine: Unknown special type of battery: "${type}"`;
                }
                tileEntity.setEnergy(Math.min(capacity, energy + count), this.energyType);
                return false;
            }
            const amount = ChargeItemRegistry.getEnergyStored(slot, this.energyType);
            if(amount == 0) {
                return true;
            }
            const canAdd = capacity - energy;
            let add = amount < 100 ? amount : 100;
            let added = canAdd < add ? canAdd : add;
            tileEntity.addEnergy(added, this.energyType);
            tileEntity.container.setSlot(slotName, slot.id, slot.count, Item.getMaxDamage(slot.id) - ((amount - added) / capacity) * 100, slot.extra.putInt("energy", amount - added));
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
                action == "charge" && this.isValidItemForCharge(slot.id, amount) ||
                action == "discharge" && this.isValidItemForDischarge(slot.id, amount)
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