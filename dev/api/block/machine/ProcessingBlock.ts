abstract class ProcessingBlock extends MachineBlock {
    public constructor(stringID: string, variationList?: Block.BlockVariation[]) {
        super(stringID, variationList);
        this.setSlotPolicyToTileEntity();
    }

    public setSlotPolicyToTileEntity(): void {
        const tilePrototype = TileEntity.getPrototype(this.id) as ProcessingTile;
        const factory = tilePrototype.getFactory();

        if(tilePrototype != null) {
            if(factory instanceof FormedRecipeFactory) {
                tilePrototype.setupContainer = this.getSetupContainerFuncWithPolicy((name, id) => factory.storage.some((recipe) => id == recipe.input[name].id));
            } else 
            if(factory instanceof UnformedRecipeFactory) {
                tilePrototype.setupContainer = this.getSetupContainerFuncWithPolicy((name, id) => factory.storage.some((recipe) => recipe.input.some(instance => instance.id == id)));
            }
        }
    }

    public getSetupContainerFuncWithPolicy(policy: (name: string, id: number) => boolean): () => unknown {
        const tilePrototype = TileEntity.getPrototype(this.id) as ProcessingTile;
        const funcLast = tilePrototype.setupContainer;

        return function() {
            const container: typeof ProcessingTile.prototype.container = this.container;
            const outputSlots: typeof ProcessingTile.prototype.outputSlots = this.outputSlots;
            
            StorageInterface.setGlobalValidatePolicy(container, (name, id) => policy(name, id));
            outputSlots.forEach(name => container.setSlotAddTransferPolicy(name, () => 0));
            return funcLast.call(this);
        }
    }


    abstract getTileEntity(): ProcessingTile;
}