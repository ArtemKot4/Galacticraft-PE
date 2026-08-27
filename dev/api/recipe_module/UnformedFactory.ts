namespace RecipeModule {
    type UnformedStorageFormat = IDefaultRecipe<ItemInstance[], ItemInstance[]>;
    
    export class UnformedFactory extends Factory<UnformedStorageFormat> implements IManageContainer {
        public getContainerManager(): ContainerManager {
            return ContainerManagers.Default;    
        }

        public getRecipe(tileEntity: ProcessingTile, slotGetter: (slotName: string) => ItemStack | ItemContainerSlot): Nullable<UnformedStorageFormat> {
            if(this.isRightValues(tileEntity, slotGetter)) {
                return this.storage[tileEntity.currentRecipeIndex];
            }
            for(const i in this.storage) {
                if(this.isRightValues(tileEntity, slotGetter, i)) {
                    tileEntity.currentRecipeIndex = i;
                    return this.storage[i];
                }
            }
            return null;
        }

        protected isRightValues(tileEntity: TileEntity, slotGetter: (slotName: string) => ItemStack | ItemContainerSlot, recipeIndex: string = tileEntity.currentRecipeIndex || "0"): boolean {
            const recipeInput = this.storage[recipeIndex].input;
            let index = -1;

            for(const inputSlotName of tileEntity.inputSlots) {
                const slot = slotGetter(inputSlotName);
                if(slot.id == 0) {
                    continue;
                }
                index++;
                if(!ItemStack.contains(slot, recipeInput[index] || {} as ItemInstance)) {
                    return false;
                }
            }
            if(index != recipeInput.length - 1) {
                return false;
            }
            return true;
        }
    }
}