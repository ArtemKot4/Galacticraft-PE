namespace RecipeModule {
    type UnformedStorageFormat = IDefaultRecipe<ItemInstance[], ItemInstance[]>;
    
    export class UnformedFactory<CachedStorage extends ICachedStorage = ICachedStorage> extends Factory<UnformedStorageFormat, CachedStorage> implements IManageContainer {
        public override registerRecipe(obj: UnformedStorageFormat, fileName?: string): this {
            const processed = {
                ...obj,
                input: ItemStack.sort([ ...obj.input ], ItemStack.SortComparators.ID_GRADATION)
            };
            super.registerRecipe(processed, fileName);
            return this;
        }
        
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
            const recipe = this.storage[recipeIndex];
            if(recipe == null) {
                return false;
            }
            const recipeInput = recipe.input;
            let index = -1;
            let stacks = [];

            for(const inputSlotName of cachedStorage.inputSlots) {
                const slot = slotGetter(inputSlotName);
                if(slot.id == 0) {
                    continue;
                }
                index++;
                stacks.push(slot);
            }
            if(index != recipeInput.length - 1) {
                return false;
            }
            stacks = ItemStack.sort(stacks, ItemStack.SortComparators.ID_GRADATION);
            for(let i = 0; i < stacks.length; i++) {
                if(!ItemStack.contains(stacks[i], recipeInput[i] || {} as ItemInstance)) {
                    return false;
                }
            }
            return true;
        }
    }
}