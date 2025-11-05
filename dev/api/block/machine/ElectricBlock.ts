abstract class ElectricBlock extends MachineBlock {
    public constructor(stringID: string, variationList?: Block.BlockVariation[]) {
        super(stringID, variationList);
        EnergyTileRegistry.addEnergyTypeForId(this.id, Galacticraft.EnergyTypes.JOULE);
        
        const storageInterface = this.getStorageInterface();
        if(storageInterface != null) {
            StorageInterface.createInterface(this.id, storageInterface);
        }
        ICRender.getGroup("galacticraft.machine_energy_connecting_0").add(this.id, 0);
        ICRender.getGroup("galacticraft.machine_energy_connecting_1").add(this.id, 1);
        ICRender.getGroup("galacticraft.machine_energy_connecting_2").add(this.id, 2);
        ICRender.getGroup("galacticraft.machine_energy_connecting_3").add(this.id, 3);
        this.addScalesBehaviour();
    }

    public addScalesBehaviour(): void {
        const tilePrototype = TileEntity.getPrototype(this.id) as ProcessingTile;
        if(tilePrototype == null) {
            return;
        }
        const ui = tilePrototype.getScreenByName(null, tilePrototype.container);
        if(ui == null) {
            return;
        }
        if("onUpdate" in tilePrototype) {
            const elements = ui.getContent().elements;
            if("energy_bar" in elements && "energy_icon" in elements) {
                const funcLast = tilePrototype.onUpdate;
                tilePrototype.onUpdate = function() {
                    this.container.setScale("energy_bar", this.data.energy / this.getCapacity());
                    this.container.setScale("energy_icon", this.data.energy / 1);
                    return funcLast.call(this);
                }
            }
        }
    }

    public getStorageInterface(): Nullable<StorageDescriptor> {
        return null;
    }

    abstract getTileEntity(): ElectricTile;
}