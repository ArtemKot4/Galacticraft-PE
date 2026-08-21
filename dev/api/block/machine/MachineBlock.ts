class MachineBlock extends RotatableBlock {
    public constructor(stringID: string, variationList?: Block.BlockVariation[]) {
        super(stringID, variationList);
        const description = this.getDescription();

        if(description != null) {
            Galacticraft.ToolTips.registerTipFor(this.id, description);
        }
        const storageInterface = this.getStorageInterface();
        
        if(storageInterface != null) {
            StorageInterface.createInterface(this.id, storageInterface);
        }      
    }

    public getStorageInterface(): Nullable<StorageDescriptor> {
        return null;
    }

    public getDescription(): Nullable<string> {
        return null;
    }
}