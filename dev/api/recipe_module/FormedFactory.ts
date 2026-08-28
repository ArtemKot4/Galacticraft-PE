namespace RecipeModule {
    export class FormedFactory<CachedStorage extends ICachedStorage = ICachedStorage> extends Factory<IDefaultRecipe, CachedStorage> implements IManageContainer {
        public getContainerManager(): typeof ContainerManagers.Default {
            return ContainerManagers.Default;    
        }

        public getRecipe(cachedStorage: CachedStorage, slotGetter: (slotName: string) => ItemStack | ItemContainerSlot): Nullable<IDefaultRecipe> {
            if(this.isRightValues(cachedStorage, slotGetter, cachedStorage.currentRecipeIndex)) {
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

        protected isRightValues(cachedStorage: CachedStorage, slotGetter: (slotName: string) => ItemStack | ItemContainerSlot, recipeIndex: string = "0"): boolean {         
            for(const inputSlotName of cachedStorage.inputSlots) {
                if(!ItemStack.contains(slotGetter(inputSlotName), this.storage[recipeIndex].input[inputSlotName])) {
                    return false;
                }
            }
            return true;
        }
    }
}