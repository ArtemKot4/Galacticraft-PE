abstract class Generator extends MachineTile {
    public canReceiveEnergy(side: number, type: string): boolean {
        return false;
    }

    // public energyTick(type: string, src: EnergyTileNode): void {
    //     if(type === EnergyTypes.OB.name) return;
    //     const output = Math.min(1, this.data.energy);
    //     this.data.energy += src.add(output) - output;
    // };
}
