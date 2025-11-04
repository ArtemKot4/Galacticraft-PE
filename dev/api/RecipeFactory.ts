abstract class RecipeFactory<ContainerType, StorageFormat = { input: ContainerType, output: ItemInstance[] }> {
    public static list: Record<string, RecipeFactory<unknown>> = {};
    public storage: StorageFormat[] = [];

    public addRecipe(input: ContainerType, output: ItemInstance): this {
        this.storage.push({ input, output } as StorageFormat);
        return this;
    }

    public addRecipes(recipes: { input: ContainerType, output: ItemInstance }[]): this {
        for(const i in recipes) {
            this.addRecipe(recipes[i].input, recipes[i].output);
        }
        return this;
    }

    public addRecipesFrom(path: string): this {
        const files = FileTools.GetListOfFiles(path, "");
        for(const i in files) {
            const object = JSON.parse(FileTools.ReadText(files[i].getAbsolutePath()));
            if(Object.keys(object).length == 0) {
                throw new GalacticraftException(`Some files from path "${path}" is empty`);
            }
            const inputKeys = object.input || Object.entries(object)
            .reduce((pV, [key, value]) => {
                if(key != "result" && key != "output") {
                    pV[key] = value;
                }
                return pV;
            }, {});
            const result = object.output || [object.result];
            for(const i in result) {
                result[i].id = IDRegistry.parseID(result[i].id);
            }
            for(const i in inputKeys) {
                inputKeys[i].id = IDRegistry.parseID(inputKeys[i].id);
            }
            this.addRecipe(inputKeys, result);
        }
        return this;
    }

    public getResult(input: ContainerType, index = 0): Nullable<ItemInstance> {
        return null;
    }

    public getResults<T>(input: ContainerType): Nullable<ItemInstance[]> {
        return null;
    }

    public static get<T extends RecipeFactory<unknown>>(name: string): Nullable<T> {
        return this.list[name] as T || null;
    }

    public static addRecipe<ContainerType>(name: string, input: ContainerType, output: ItemInstance): void {
        const factory = this.get(name);
        if(factory == null) {
            Debug.error(`Galacticraft: Unknown factory ${name} for add recipe`);
        }
        factory.addRecipe(input, output);
    }

    public static addRecipes<ContainerType>(name: string, recipes: { input: ContainerType, output: ItemInstance }[]): void {
        const factory = this.get(name);
        if(factory == null) {
            Debug.error(`Galacticraft: Unknown factory ${name} for add recipes`);
        }
        factory.addRecipes(recipes);
    }

    public static addRecipesFrom(name: string, path: string): void {
        const factory = this.get(name);
        if(factory == null) {
            Debug.error(`Galacticraft: Unknown factory ${name} for add recipes from path`);
        }
        factory.addRecipesFrom(path);
    }
}

class FormedRecipeFactory extends RecipeFactory<Record<string, ItemInstance>> {
    public getResults(input: Record<string, ItemInstance>): Nullable<ItemInstance[]> {
        for(const i in this.storage) {
            let valid = true;
            for(const k in this.storage[i].input) {
                const validInstance = input[k];
                const recipeInstance = this.storage[i].input[k];
                if(validInstance.id != recipeInstance.id || validInstance.count < (recipeInstance.count || 1) || validInstance.data != (recipeInstance.data || 0)) {
                    valid = false;
                }
            }
            if(valid == true) {
                return this.storage[i].output;
            }
        }
        return null;
    }

    public getResult(input: Record<string, ItemInstance>, index = 0): Nullable<ItemInstance> {
        const results = this.getResults(input);
        if(results != null) {
            return results[index];
        }
        return null;
    }

    public static register(name: string): FormedRecipeFactory {
        if(name in RecipeFactory.list) {
            throw new GalacticraftException(`RecipeFactory of name "${name}" already exists`);
        }
        return (RecipeFactory.list[name] = new FormedRecipeFactory());
    }
}

class UnformedRecipeFactory extends RecipeFactory<ItemInstance[]> {
    // public getResult(input: ItemInstance[]): Nullable<ItemInstance[]> {
    //     let output: ItemInstance[] = null;

    //     for(const i in this.storage) {
    //         const recipe = this.storage[i].input;
    //         if(input.length != recipe.length) {
    //             continue;
    //         }
    //         //todo: do work
    //     }
    //     return output;
    // }

    public equals(validInput: ItemInstance[], recipeInput: ItemInstance[]): boolean {
        // for(const i in validInput) {
        //     const validInstance = validInput[i];
        //     for(const i in recipeInput) {
        //         const recipeInstance = recipeInput[i];
        //     }
        // }
        return false;
    }

    public static register(name: string): UnformedRecipeFactory {
        if(name in RecipeFactory.list) {
            throw new GalacticraftException(`RecipeFactory of name "${name}" already exists`);
        }
        return (RecipeFactory.list[name] = new UnformedRecipeFactory());
    }
}

Callback.addCallback("LevelDisplayed", () => Game.message(JSON.stringify(FormedRecipeFactory.get("circuit").storage)));