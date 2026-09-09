//@ts-ignore
namespace ElectricMachine {
    export interface Config {
        type: ElectricMachine.Type, 
        batteryManager: BatteryManager,
        /**
         * @default {}
         */
        batteryDescriptors?: ElectricMachine.BatterySlotDescriptor,
        /**
         * Key, usings in `tileEntity.data`
         * @default "energy"
         */
        energyKey: string,
        /**
         * @default 16000
         */
        capacity?: number,
        onTick?(this: ElectricMachine.TileEntity): void;
        energyReceive?(this: ElectricMachine.TileEntity, type: string, amount: number, voltage: number): number;
        isValidEnergySide?(this: ElectricMachine.TileEntity, side: number): boolean;
        setWireConnecting?(this: BasicBlock): void;
    }

    export namespace DEFAULT_CONFIGS {
        const gjCache = {};

        export function GJ(type: ElectricMachine.Type): { [GJ: string]: Config } {
            return gjCache[type] ??= { // не уверен что кеширование останется в таком виде и насколько оно нужно, пока ключи в целом одинаковы помимо type, поэтому возможно в будущем логика будет дополнена или пересмотрена
                [Galacticraft.EnergyTypes.JOULE.name]: {
                    type: type,
                    batteryManager: DEFAULT_BATTERY_MANAGERS.ENERGY_BATTERY_MANAGER,
                    energyKey: "energy"
                }
            }
        }
    }
}