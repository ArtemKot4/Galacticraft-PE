class FormedRecipeFactory extends RecipeFactory<Record<string, ItemInstance>> {
    public getRecipe(tileEntity: ProcessingTile, slotGetter: (slotName: string) => ItemStack | ItemContainerSlot): Nullable<{ input: Record<string, ItemInstance>, output: ItemInstance[]; }> {
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

    public static register(name: string): FormedRecipeFactory {
        if(name in RecipeFactory.list) {
            throw new GalacticraftException(`FormedRecipeFactory of name "${name}" already exists`);
        }
        return (RecipeFactory.list[name] = new FormedRecipeFactory());
    }
}