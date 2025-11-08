class GeneratorTile extends MachineTile {
    public isFullEnergy(): boolean {
        return this.data.energy == this.getCapacity();
    }
}