interface EnergyModule {
    getCapacity(): number;
    canReceiveEnergy?(side, type): boolean;
    canExtractEnergy?(side, type): boolean;
    energyTick(type: string, src: EnergyTileNode): void;
    energyReceive(type: string, amount: number, voltage: number): number;
    setWrenchable(id): any;
  }
  