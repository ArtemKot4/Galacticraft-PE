//@ts-ignore
namespace ElectricMachine {
    export class OxygenBatteryManager extends EnergyBatteryManager {
        public override getDefaultContainerSlots(): Record<string, batteryAction> {
            return {
                "oxygen_tank_slot_charge": "charge",
                "oxygen_tank_slot_discharge": "discharge"
            };
        }

        public override getCountFromSpecialType(type: string, energy: number, capacity: number): number {
            if(type == "infinity") {
                return capacity - energy; 
            }
            throw `ElectricMachine: Unknown special type of battery: "${type}"`;
        }

        public override getSpecialTypeKey(): string {
            return "oxygen_tank.special_type";
        }

        public override charge(tileEntity: ElectricMachine.ITileEntity, slotName: string): boolean {
            if(tileEntity.getEnergy(Galacticraft.EnergyTypes.JOULE.name) < 5) {
                return;
            }
            super.charge(tileEntity, slotName);
            tileEntity.decreaseEnergy(5, Galacticraft.EnergyTypes.JOULE.name);
        }

        public override discharge(tileEntity: ElectricMachine.ITileEntity, slotName: string): boolean {
            if(tileEntity.getEnergy(Galacticraft.EnergyTypes.JOULE.name) < 5) {
                return;
            }
            super.discharge(tileEntity, slotName);
            tileEntity.decreaseEnergy(5, Galacticraft.EnergyTypes.JOULE.name);
        }
    }

    export namespace DEFAULT_BATTERY_MANAGERS {
        export const OXYGEN_BATTERY_MANAGER = new OxygenBatteryManager(Galacticraft.EnergyTypes.OXYGEN.name, "oxygen");
    }
}