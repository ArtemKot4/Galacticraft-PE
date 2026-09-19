class OxygenCollectorTile extends ElectricMachine.TileEntity {
    public override defaultValues = {
        oxygenGenerate: 0
    }
    public override data: typeof this.defaultValues;

    public override getScreenByName(screenName?: string, container?: ItemContainer): Nullable<UI.IWindow> {
        return OxygenCollectorUI;
    }   

    public override onLoad(): void {
        const body = Galacticraft.getCelestialBodyByID(this.dimension);
        if(body != null && body.hasOxygen()) {
            this.data.oxygenGenerate = -1;
        }
    }

    public override onTick(): void {
        if(this.data.oxygenGenerate != 0) {
            this.decreaseEnergy(15, Galacticraft.EnergyTypes.JOULE.name);
        }
        if(this.getEnergy(Galacticraft.EnergyTypes.JOULE.name) < 15 || World.getThreadTime() % 20 != 0) {
            return;
        }
        if(this.data.oxygenGenerate == -1) {
            this.addEnergy(180, Galacticraft.EnergyTypes.OXYGEN.name);
            return;
        }
        this.addEnergy(this.data.oxygenGenerate, Galacticraft.EnergyTypes.OXYGEN.name);
    }
}