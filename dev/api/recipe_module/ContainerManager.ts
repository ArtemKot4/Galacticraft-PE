namespace RecipeModule {
    export class ContainerManager {}
    
    export class DefaultContainerManager extends ContainerManager {
        public getOutputStack(outputSlots: string[], recipe: ReturnType<typeof Factory.prototype.getRecipe>): Nullable<ItemInstance> {
            for(const index in outputSlots) {
                const outputStack = recipe.output[index] || recipe.output[outputSlots[index]];

                if(outputStack != null) {
                    return outputStack;
                }
            }
            return null;
        }

        public hasValidOutputSlots(outputSlots: string[], recipe: ReturnType<typeof Factory.prototype.getRecipe>, container: SimpleItemContainer): boolean {
            const outputStack = this.getOutputStack(outputSlots, recipe);

            if(outputStack == null) {
                return false;
            }
            let space = 0;

            for(const index in outputSlots) {
                const slot = container.getSlot(outputSlots[index]);
                const maxStack = Item.getMaxStackSize(outputStack.id);

                if(slot.isEmpty()) {
                    space += maxStack;
                } else if(ItemStack.contains(slot, outputStack)) {
                    space += maxStack - slot.count;
                }
            }
            return space >= outputStack.count;
        }

        public setOutput(outputSlots: string[], recipe: ReturnType<typeof Factory.prototype.getRecipe>, container: SimpleItemContainer): void {
            const outputStack = this.getOutputStack(outputSlots, recipe);

            if(outputStack == null) {
                return;
            }
            let remaining = outputStack.count;

            for(const index in outputSlots) {
                if(remaining <= 0) {
                    break;
                }
                const slot = container.getSlot(outputSlots[index]);

                if(!slot.isEmpty() && !ItemStack.contains(slot, outputStack)) {
                    continue;
                }
                const maxStack = Item.getMaxStackSize(outputStack.id);
                const current = slot.isEmpty() ? 0 : slot.count;
                const add = Math.min(maxStack - current, remaining);

                if(add <= 0) {
                    continue;
                }
                container.setSlot(outputSlots[index], outputStack.id, current + add, outputStack.data, outputStack.extra || slot.extra);
                remaining -= add;
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
                const nextCount = slot.count - (input.count || 1);
                if(nextCount > 0) {
                    container.setSlot(inputSlots[i], slot.id, nextCount, slot.data, slot.extra);
                } else {
                    container.setSlot(inputSlots[i], 0, 0, 0, null);
                }
                container.validateSlot(inputSlots[i]);
            }
        }
    }

    export namespace ContainerManagers {
        export const Default = new DefaultContainerManager();
    }
}