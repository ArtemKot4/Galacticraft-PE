//@ts-ignore
namespace ElectricMachine {
    export interface ITileEntity extends Omit<EnergyTile, 'blockSource'> {
        batterySlotChecks?: Set<string>
        getCapacity?(energyType: string): number;
        /**
         * Returns added energy
         */
        addEnergy?(amount: number, type: string): number;
        setEnergy?(count: number, type: string): void;
        getEnergy?(type: string): number;
    }

    export class TileEntity extends CommonTileEntity implements ElectricMachine.TileEntity {
        batterySlotChecks?: Set<string>
        getCapacity?(energyType: string): number;
        addEnergy?(amount: number, type: string): number;
        setEnergy?(count: number, type: string): void;
        getEnergy?(amount: number, type: string): number;
    }
}