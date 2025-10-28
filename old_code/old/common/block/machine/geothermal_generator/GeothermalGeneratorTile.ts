class GeothermalGeneratorTile extends Generator {
    public override defaultValues = {
        energy: 0
    } 

    public getEnergyCapacity(): number {
        return 3000;
    }

    public getScreenByName(): UI.StandartWindow {
        return GeothermalGeneratorUI;
    }

    public onDestroyBlock(coords: Callback.ItemUseCoordinates, player: number): void {
        if(this.isFullEnergy()) {
            this.blockSource.explode(this.x, this.y, this.z, 1, true);
        }
    }

    public isActiveSpout(): boolean {
        const tile = TileEntity.getTileEntity(this.x, this.y - 1, this.z) as TileEntity & VenusSpoutTile;
        return this.blockSource.getBlockID(this.x, this.y - 1, this.z) === BlockList.VENUS_SPOUT.id && tile && tile.data.active;
    }

    public onTick(): void {
        this.container.sendChanges();
        this.container.validateAll();
        this.container.setScale("geothermal_scale", this.data.energy / this.getEnergyCapacity());

        UIHelper.Machine.setEnergyDisplay(this);

        if(this.isActiveSpout() && !this.isFullEnergy()) {
            this.data.energy++;
        }
    }
}