namespace RecipeModule {
    export class FormedFactory extends Factory<IDefaultRecipe> implements IManageContainer {
        public getContainerManager(): ContainerManager {
            return ContainerManagers.Default;    
        }

        public getRecipe(tileEntity: ProcessingTile, slotGetter: (slotName: string) => ItemStack | ItemContainerSlot): Nullable<IDefaultRecipe> {
            if(this.isRightValues(tileEntity.inputSlots, slotGetter, tileEntity.currentRecipeIndex)) {
                return this.storage[tileEntity.currentRecipeIndex];
            }
            for(const i in this.storage) {
                if(this.isRightValues(tileEntity.inputSlots, slotGetter, i)) {
                    tileEntity.currentRecipeIndex = i;
                    return this.storage[i];
                }
            }
            return null;
        }

        public isRightValues(inputSlots: string[], slotGetter: (slotName: string) => ItemStack | ItemContainerSlot, index: string = "0"): boolean {         
            for(const inputSlotName of inputSlots) {
                if(!ItemStack.contains(slotGetter(inputSlotName), this.storage[index].input[inputSlotName])) {
                    return false;
                }
            }
            return true;
        }
    }
}