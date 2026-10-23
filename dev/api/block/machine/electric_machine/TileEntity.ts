//@ts-ignore
namespace ElectricMachine {
    export interface ITileEntity extends EnergyTile {
        readonly container: ItemContainer;
        batterySlotChecks?: Set<string>
        bindingCache?: { [key: string]: number };
        getCapacity?(energyType: string): number;
        /**
         * Returns added energy
         */
        addEnergy?(amount: number, type: string): number;
        setEnergy?(count: number, type: string): void;
        decreaseEnergy?(amount: number, type: string): void;
        getEnergy?(type: string): number;
        isDisabled?(): boolean;
        getPowerTier?(): number;
        redstone(params: Callback.RedstoneSignalParams): void;
    }

    export class TileEntity extends CommonTileEntity implements ElectricMachine.TileEntity {
        batterySlotChecks?: Set<string>
        bindingCache?: { [key: string]: number };
        getCapacity?(energyType: string): number;
        addEnergy?(amount: number, type: string): number;
        setEnergy?(count: number, type: string): void;
        decreaseEnergy?(amount: number, type: string): void;
        getEnergy?(type: string): number;
        isDisabled?(): boolean;
        getPowerTier?(): number;
    }
}