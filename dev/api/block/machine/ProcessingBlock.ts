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
                tilePrototype.setupContainer = this.getSetupContainerFunctionWithPolicy((name, id) => factory.storage.some((recipe) => id == recipe.input[name].id));
            }  
            else if(factory instanceof UnformedRecipeFactory) {
                tilePrototype.setupContainer = this.getSetupContainerFunctionWithPolicy((name, id) => factory.storage.some((recipe) => recipe.input.some(instance => instance.id == id)));
            }
        }
    }

    public getSetupContainerFunctionWithPolicy(policyPredicate: (name: string, id: number) => boolean): () => unknown {
        const tilePrototype = TileEntity.getPrototype(this.id) as ProcessingTile;
        const funcLast = tilePrototype.setupContainer;

        return function(this: ProcessingTile) {
            this.inputSlots.forEach((inputSlotName) => {
                this.container.setSlotGetTransferPolicy(inputSlotName, (container, name, id, count, data, extra) => {
                    if(count > 0) {
                        const resultCount = Math.max(0, this.container.getSlot(inputSlotName).count - count);
                        let resultId = id, resultData = data;

                        if(resultCount == 0) {
                            resultId = 0;
                            resultData = 0;
                        } 
                        this.setActiveIfNeeded({ [inputSlotName]: { id: resultId, count: resultCount, data: resultData } });
                    }
                    return count;
                });

                this.container.setSlotAddTransferPolicy(inputSlotName, (container, name, id, count, data, extra) => {
                    const availableCount = policyPredicate(name, id) ? count : 0;
                    if(availableCount > 0) {
                        this.setActiveIfNeeded({ [inputSlotName]: new ItemStack(id, count, data, extra) });
                    }
                    return availableCount; 
                });
            });
            this.outputSlots.forEach(outputSlotName => this.container.setSlotAddTransferPolicy(outputSlotName, () => 0));
            return funcLast.call(this);
        }
    }

    abstract getTileEntity(): ProcessingTile;
}