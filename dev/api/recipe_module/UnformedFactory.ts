namespace RecipeModule {
    type UnformedStorageFormat = IDefaultRecipe<ItemInstance[], ItemInstance[]>;
    
    export class UnformedFactory<CachedStorage extends ICachedStorage = ICachedStorage> extends Factory<UnformedStorageFormat, CachedStorage> implements IManageContainer {
        public getContainerManager(): typeof ContainerManagers.Default {
            return ContainerManagers.Default;    
        }

        public getRecipe(cachedStorage: CachedStorage, slotGetter: (slotName: string) => ItemStack | ItemContainerSlot): Nullable<UnformedStorageFormat> {
            if(this.isRightValues(cachedStorage, slotGetter)) {
                return this.storage[cachedStorage.currentRecipeIndex];
            }
            for(const i in this.storage) {
                if(this.isRightValues(cachedStorage, slotGetter, i)) {
                    cachedStorage.currentRecipeIndex = i;
                    return this.storage[i];
                }
            }
            return null;
        }

        protected isRightValues(cachedStorage: ICachedStorage, slotGetter: (slotName: string) => ItemStack | ItemContainerSlot, recipeIndex: string = cachedStorage.currentRecipeIndex || "0"): boolean {
            const recipeInput = this.storage[recipeIndex].input;
            let index = -1;

            for(const inputSlotName of cachedStorage.inputSlots) {
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