abstract class ProcessingBlock extends ElectricBlock {
    public constructor(stringID: string, variationList?: Block.BlockVariation[]) {
        super(stringID, variationList);
        const tilePrototype = TileEntity.getPrototype(this.id) as ProcessingTile;
        const factory = tilePrototype.getFactory();

        if(tilePrototype != null) {
            const funcLast = tilePrototype.setupContainer;    
            const setupContainerWithPolicy = function(predicate: (name: string, id: number) => boolean) {
                return function() {
                    const container: typeof ProcessingTile.prototype.container = this.container;
                    const outputSlots: typeof ProcessingTile.prototype.outputSlots = this.outputSlots;
                    
                    StorageInterface.setGlobalValidatePolicy(container, (name, id) => predicate(name, id));
                    outputSlots.forEach(name => container.setSlotAddTransferPolicy(name, () => 0));
                    return funcLast.call(this);
                }
            }

            if(factory instanceof FormedRecipeFactory) {
                tilePrototype.setupContainer = setupContainerWithPolicy((name, id) => factory.storage.some((recipe) => id == recipe.input[name].id));
            } else 
            if(factory instanceof UnformedRecipeFactory) {
                tilePrototype.setupContainer = setupContainerWithPolicy((name, id) => factory.storage.some((recipe) => recipe.input.some(instance => instance.id == id)));
            }
        }
    }

    abstract getTileEntity(): ProcessingTile;
}