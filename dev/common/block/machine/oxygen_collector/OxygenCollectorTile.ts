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
        if(body != null && !body.hasOxygen()) {
            this.data.oxygenGenerate = -1;
        } else {
            this.data.oxygenGenerate = 93;
        }
    }

    public countNearbyPlants(): number {
        let plants = 0;
        const minY = Math.max(0, this.y - 5);
        const maxY = Math.min(255, this.y + 5);
        for(let x = this.x - 5; x <= this.x + 5; x++) {
            for(let z = this.z - 5; z <= this.z + 5; z++) {
                for(let y = minY; y <= maxY; y++) {
                    const blockID = this.blockSource.getBlockID(x, y, z);
                    if(blockID == 0) {
                        continue;
                    }
                    const name = IDRegistry.getNameByID(blockID) || "";
                    if(name.includes("leaves") || name == "wheat" || name == "carrots" || name == "potatoes" || name == "beetroots") {
                        plants += 0.75;
                    }
                }
            }
        }
        return Math.floor(plants);
    }

    public override onTick(): void {
        if(this.getEnergy(Galacticraft.EnergyTypes.JOULE.name) < 100) {
            return;
        }
        if(World.getThreadTime() % 10 != 0) {
            return;
        }
        const amount = this.data.oxygenGenerate == -1 ? this.countNearbyPlants() : this.data.oxygenGenerate;

        if(amount <= 0) {
            return;
        }
        this.decreaseEnergy(100, Galacticraft.EnergyTypes.JOULE.name);
        this.addEnergy(amount, Galacticraft.EnergyTypes.OXYGEN.name);
    }
}