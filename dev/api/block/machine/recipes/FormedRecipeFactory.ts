class FormedRecipeFactory extends RecipeFactory<Record<string, ItemInstance>> {
    public getObject(input: Record<string, ItemInstance>): { input: Record<string, ItemInstance>; output: ItemInstance[]; } {
        for(const i in this.storage) {
            let valid = true;
            for(const k in this.storage[i].input) {
                if(!ItemStack.contains(input[k], this.storage[i].input[k])) {
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

    public static register(name: string): FormedRecipeFactory {
        if(name in RecipeFactory.list) {
            throw new GalacticraftException(`FormedRecipeFactory of name "${name}" already exists`);
        }
        return (RecipeFactory.list[name] = new FormedRecipeFactory());
    }
}