class GeneratorTile extends ElectricTile {
    public canReceiveEnergy(side: number, type: string): boolean {
        return false;
    }

    public canExtractEnergy(side: number, type: string): boolean {
        return true;
    }

    public energyTick(type: string, src: EnergyTileNode): void {
        const output = Math.min(1, this.data.energy);
        this.data.energy += src.add(output) - output;
    }

    public isFullEnergy(): boolean {
        return this.data.energy == this.getCapacity();
    }
}