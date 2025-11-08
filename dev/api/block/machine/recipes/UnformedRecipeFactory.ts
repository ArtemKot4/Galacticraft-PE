class UnformedRecipeFactory extends RecipeFactory<ItemInstance[]> {
    public getObject(input: Record<string, ItemInstance>): Nullable<{ input: ItemInstance[]; output: ItemInstance[]; }> {
        const inputValues = Object.values(input).reduce((pV, cV) => {
            if(cV.id != 0) {
                pV.push(cV);
            }
            return pV;
        },[]);

        for(const i in this.storage) {
            let valid = true;
            for(const k in this.storage[i].input) {
                const recipeInput = this.storage[i].input;
                if(inputValues.length != recipeInput.length || !ItemStack.contains(inputValues[k], recipeInput[k])) {
                    valid = false;
                    break;
                }
            }
            if(valid == true) {
                return this.storage[i];
            }
        }
        return null;
    }

    public static register(name: string): UnformedRecipeFactory {
        if(name in RecipeFactory.list) {
            throw new GalacticraftException(`UnformedRecipeFactory of name "${name}" already exists`);
        }
        return (RecipeFactory.list[name] = new UnformedRecipeFactory());
    }
}