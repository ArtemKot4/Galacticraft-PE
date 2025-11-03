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
    }

    public getStorageInterface(): Nullable<StorageDescriptor> {
        return null;
    }

    abstract getTileEntity(): ElectricTile;
}