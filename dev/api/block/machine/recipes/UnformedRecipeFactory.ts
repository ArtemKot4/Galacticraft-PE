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

Callback.addCallback("LevelDisplayed", () => Game.message(JSON.stringify(FormedRecipeFactory.get("compressor").storage)));
Callback.addCallback("LevelDisplayed", () => Game.message("\n\n\n\n\n\n\n\n"));
Callback.addCallback("LevelDisplayed", () => Game.message(JSON.stringify(FormedRecipeFactory.get("circuit").storage)));