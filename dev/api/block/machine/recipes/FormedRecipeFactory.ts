class FormedRecipeFactory extends RecipeFactory<Record<string, ItemInstance>> {
    public getRecipe(tile: ProcessingTileData): Nullable<{ input: Record<string, ItemInstance>, output: ItemInstance[]; }> {
        if(this.isRightValues(tile)) {
            return this.storage[tile.currentRecipeIndex];
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
        for(const inputSlotName of tile.inputSlots) {
            const slot = tile.getSlot(inputSlotName);
            if(!ItemStack.contains(slot, this.storage[recipeIndex].input[inputSlotName])) {
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