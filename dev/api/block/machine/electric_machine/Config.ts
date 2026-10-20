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
        /**
         * Max energy pushed to the network per tick (EXTRACTOR/STORAGE)
         */
        maxExtract?: number,
        /**
         * Max energy accepted from the network per tick (RECEIVER/STORAGE)
         */
        maxReceive?: number,
        /**
         * Redstone signal stops the machine (kill-switch) when true
         * @default true
         */
        redstoneControl?: boolean,
        /**
         * Ticks to hold the disabled state after a redstone change
         * @default 10
         */
        redstoneCooldown?: number,
        onTick?(this: ElectricMachine.ITileEntity): void;
        energyReceive?(this: ElectricMachine.ITileEntity, type: string, amount: number, voltage: number): number;
        isValidEnergySide?(this: ElectricMachine.ITileEntity, side: number): boolean;
        /**
         * Input (receive) side. Defaults to isValidEnergySide (compatibility with
         * single-sided machines)
        */
        isValidEnergyInputSide?(this: ElectricMachine.ITileEntity, side: number): boolean;
        setWireConnecting?(this: BasicBlock): void;
    }

    export namespace Config {
        export function assembly(...configPacks: { [energyType: string]: Config }[]): { [energyType: string]: Config } {
            const resultConfig = {};

            for(const configPack of configPacks) {
                for(const configName in configPack) {
                    if(configName in resultConfig) {
                        throw new GalacticraftException(`Unexpected repeat of energy config "${configName}"`);
                    }
                    resultConfig[configName] = configPack[configName];
                }
            }
            return resultConfig;
        }

        export namespace DEFAULTS {
            export function GJ(type: ElectricMachine.Type): { [GJ: string]: Config } {
                return { 
                    [Galacticraft.EnergyTypes.JOULE.name]: {
                        type: type,
                        batteryManager: DEFAULT_BATTERY_MANAGERS.ENERGY_BATTERY_MANAGER,
                        energyKey: "energy"
                    }
                }
            }

            export function OXYGEN(type: ElectricMachine.Type): { [OB: string]: Config } {
                return {
                    [Galacticraft.EnergyTypes.OXYGEN.name]: {
                        type: type,
                        batteryManager: DEFAULT_BATTERY_MANAGERS.OXYGEN_BATTERY_MANAGER,
                        energyKey: "oxygen"
                    }
                }
            }
        }
    }
}