class CoalGeneratorTile extends GeneratorTile {
    public defaultValues = {
        burning: 0
    }
    
    public override onLoad(): void {
        this.sendEnergyStatus();
    }

    public override getScreenByName(): UI.IWindow {
        return CoalGeneratorUI;
    }

    public override onTick(): void {
        if(World.getThreadTime() % 20 == 0) {
            this.sendEnergyStatus();
        }
    }

    public sendEnergyStatus(): void {
        this.networkData.putBoolean("has_energy", this.data.energy > 0);
        this.networkData.sendChanges();
    }
    
    public override getLocalTileEntity(): LocalTileEntity {
        return new LocalCoalGeneratorTile();
    }
}