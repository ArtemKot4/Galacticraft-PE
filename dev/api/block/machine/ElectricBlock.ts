abstract class ElectricBlock extends MachineBlock {
    public constructor(stringID: string, variationList?: Block.BlockVariation[]) {
        super(stringID, variationList);
        EnergyTileRegistry.addEnergyTypeForId(this.id, Galacticraft.JOULE);
        
        const storageInterface = this.getStorageInterface();
        if(storageInterface != null) {
            StorageInterface.createInterface(this.id, storageInterface);
        }
    }

    public canRotate(): boolean {
        return true;
    }

    public getStorageInterface(): Nullable<StorageDescriptor> {
        return null;
    }

    abstract getTileEntity(): ElectricTile;
}