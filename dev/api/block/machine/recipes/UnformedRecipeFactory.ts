class UnformedRecipeFactory extends RecipeFactory<ItemInstance[]> {
    public getRecipe(tileEntity: ProcessingTile, slotGetter: (slotName: string) => ItemStack | ItemContainerSlot): Nullable<{ input: ItemInstance[]; output: ItemInstance[]; }> {
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

    public isRightValues(tileEntity: TileEntity, slotGetter: (slotName: string) => ItemStack | ItemContainerSlot, recipeIndex: string = tileEntity.currentRecipeIndex || "0"): boolean {
        const recipeInput = this.storage[recipeIndex as unknown as number].input;
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

    public static register(name: string): UnformedRecipeFactory {
        if(name in RecipeFactory.list) {
            throw new GalacticraftException(`UnformedRecipeFactory of name "${name}" already exists`);
        }
        return (RecipeFactory.list[name] = new UnformedRecipeFactory());
    }
}