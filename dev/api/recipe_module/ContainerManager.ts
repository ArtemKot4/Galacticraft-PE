namespace RecipeModule {
    export class ContainerManager {}
    
    export class DefaultContainerManager extends ContainerManager {
        public hasValidOutputSlots(outputSlots: string[], recipe: ReturnType<typeof Factory.prototype.getRecipe>, container: SimpleItemContainer): boolean {
            let validOutputStack = null;

            for(const outputKey in outputSlots) {
                const slot = container.getSlot(outputSlots[outputKey]);
                const outputStack = recipe.output[outputKey];
                
                if(outputStack != null) {
                    validOutputStack = outputStack;
                }
                if(!slot.isEmpty() && (!ItemStack.contains(slot, validOutputStack) || (slot.count + outputStack.count) > Item.getMaxStackSize(validOutputStack.id))) {
                    return false;
                }
            }
            return true;
        }

        public setOutput(outputSlots: string[], recipe: ReturnType<typeof Factory.prototype.getRecipe>, container: SimpleItemContainer): void {
            let validOutputStack = null;
            
            for(const index in outputSlots) {
                const slot = container.getSlot(outputSlots[index]);
                const outputStack = (recipe.output[index] || recipe.output[outputSlots[index]]) || validOutputStack;

                if(outputStack != null) {
                    validOutputStack = outputStack;
                }
                container.setSlot(outputSlots[index], validOutputStack.id, slot.count + validOutputStack.count, slot.data + validOutputStack.data, validOutputStack.extra || slot.extra);
            }
        }

        public decreaseInputSlots(inputSlots: string[], recipe: ReturnType<typeof Factory.prototype.getRecipe>, container: SimpleItemContainer): void {
            let index = -1;

            for(const i in inputSlots) {
                const slot = container.getSlot(inputSlots[i]);
                if(slot.isEmpty()) {
                    continue;
                }
                index++;
                const input = recipe.input[i] || recipe.input[index] || {};
                container.setSlot(inputSlots[i], slot.id, slot.count - (input.count || 1), slot.data, slot.extra);
                container.validateSlot(inputSlots[i]);
            }
        }
    }

    export namespace ContainerManagers {
        export const Default = new DefaultContainerManager();
    }
}