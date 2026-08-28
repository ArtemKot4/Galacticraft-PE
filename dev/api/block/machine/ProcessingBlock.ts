abstract class ProcessingBlock extends MachineBlock {
    public constructor(stringID: string, variationList?: Block.BlockVariation[]) {
        super(stringID, variationList);
        this.setSlotPolicyToTileEntity();
    }

    public setSlotPolicyToTileEntity(): void {
        const tilePrototype = TileEntity.getPrototype(this.id) as ProcessingTile;
        const factory = tilePrototype.getFactory();
        
        if(tilePrototype == null) {
            throw new ReferenceError("Processing Block does not can don't contain tile entity prototype");
        }
        let policy: (slotName: string, id: number) => boolean;
        if(factory instanceof RecipeModule.FormedFactory) {
            policy = (slotName, id) => factory.storage.some((recipe) => id == recipe.input[slotName].id);
        }  
        else if(factory instanceof RecipeModule.UnformedFactory) {
            policy = (slotName, id) => factory.storage.some((recipe) => recipe.input.some(instance => instance.id == id));
        }
        tilePrototype.init = this.getInitFunctionWithPolicy(policy);

        for(const inputSlot of tilePrototype.inputSlots) {
            StorageInterfaceHelper.addSlotInputPolicyFromContainer(this.id, inputSlot);
        }
        for(const outputSlot of tilePrototype.outputSlots) {
            StorageInterfaceHelper.addSlotOutputPolicyFromContainer(this.id, outputSlot);
        }
    }

    public getInitFunctionWithPolicy(policyPredicate: (slotName: string, id: number) => boolean): () => unknown {
        const tilePrototype = TileEntity.getPrototype(this.id) as ProcessingTile;
        const initLast = tilePrototype.init;

        return function(this: ProcessingTile) {
            this.currentRecipeIndex = "0";
            const tile = this;
            this.inputSlots.forEach((inputSlotName) => {
                this.container.setSlotGetTransferPolicy(inputSlotName, (container, slotName, id, count, data, extra) => {
                    if(count > 0) {
                        const resultCount = Math.max(0, tile.container.getSlot(inputSlotName).count - count);
                        let resultId = id, resultData = data;

                        if(resultCount == 0) {
                            resultId = resultData = 0;
                        } 
                        tile.setActiveIfNeeded({ [inputSlotName]: { id: resultId, count: resultCount, data: resultData } });
                    }
                    return count;
                });

                this.container.setSlotAddTransferPolicy(inputSlotName, (container, slotName, id, count, data, extra) => {
                    if(container.getSlot(inputSlotName).count + count > Item.getMaxStackSize(id)) {
                        return 0;
                    }
                    const availableCount = policyPredicate(inputSlotName, id) ? count : 0;
                    if(availableCount > 0) {
                        tile.setActiveIfNeeded({ [inputSlotName]: new ItemStack(id, count, data, extra) });
                    }
                    return availableCount; 
                });
            });
            this.outputSlots.forEach(outputSlotName => this.container.setSlotAddTransferPolicy(outputSlotName, () => 0));
            return initLast.call(this);
        }
    }

    abstract override getTileEntity(): ProcessingTile;
}