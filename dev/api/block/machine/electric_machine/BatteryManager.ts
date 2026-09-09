declare namespace ElectricMachine {
    export type batteryAction = "charge" | "discharge";

    export interface BatterySlotDescriptor {
        [slotName: string]: batteryAction
    }

    export interface BatterySlotPolicy {
        (item: ItemInstance, amount: number, type: Nullable<ElectricMachine.batteryAction>): boolean;
    }

    export interface BatteryManager {
        energyType?: string, 
        energyKey?: string

        isValidItemForCharge(item: ItemInstance, amount: number): boolean;
        isValidItemForDischarge(item: ItemInstance, amount: number): boolean;
        /**
         * Charging battery
         * @param tileEntity current tile entity
         * @param slotName name of slot
         * @param energyKey `energyKey` from {@link Config}, use like name of key energy value of battery of {@link ItemExtraData}
         */
        charge(tileEntity: ElectricMachine.ITileEntity, slotName: string): boolean;
        /**
         * Discharging battery
         * @param tileEntity current tile entity
         * @param slotName name of slot
         * @param 
         */
        discharge(tileEntity: ElectricMachine.ITileEntity, slotName: string): boolean;
        setSlotPolicy(tileEntity: ElectricMachine.ITileEntity, slotName: string, action: ElectricMachine.batteryAction): void
        applyFromSlot(tileEntity: ElectricMachine.ITileEntity, slotName: string, action: ElectricMachine.batteryAction): boolean | void;
        /**
         * Default slots can be found and applied automatically
         */
        getDefaultContainerSlots(): Record<string, batteryAction>;

        validateCache(tileEntity: ElectricMachine.ITileEntity, slotName: string, action: ElectricMachine.batteryAction): void;
    }
}