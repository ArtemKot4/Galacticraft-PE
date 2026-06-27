class UnformedRecipeFactory extends RecipeFactory<ItemInstance[]> {
    public getRecipe(tile: ProcessingTileData): Nullable<{ input: ItemInstance[]; output: ItemInstance[]; }> {
        if(this.isRightValues(tile)) {
            return this.storage[tile.currentRecipeIndex || "0"];
        }
        for(const i in this.storage) {
            if(this.isRightValues(tile, i)) {
                tile.currentRecipeIndex = i;
                return this.storage[i];
            }
        }
        return null;
    }

    public isRightValues(tile: ProcessingTileData, recipeIndex: string = tile.currentRecipeIndex || "0"): boolean {
        const recipeInput = this.storage[recipeIndex as unknown as number].input;
        let index = -1;

        for(const inputSlotName of tile.inputSlots) {
            const slot = tile.getSlot(inputSlotName);
            if(slot.id == 0) { //Не знаю почему, но ItemStack.isEmpty всегда выдаёт false
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