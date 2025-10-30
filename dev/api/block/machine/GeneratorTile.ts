class GeneratorTile extends ElectricTile {
    public canReceiveEnergy(side: number, type: string): boolean {
        return false;
    }

    public canExtractEnergy(side: number, type: string): boolean {
        return true;
    }

    public isFullEnergy(): boolean {
        return this.data.energy == this.getCapacity();
    }
}