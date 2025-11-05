abstract class RecipeFactory<ContainerType, StorageFormat = IRecipeStorageFormat<ContainerType>> {
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
                result[i].count = result[i].count || 1;
            }
            for(const i in inputKeys) {
                inputKeys[i].id = IDRegistry.parseID(inputKeys[i].id);
                inputKeys[i].count = inputKeys[i].count || 1;
            }
            this.addRecipe(inputKeys, result);
        }
        return this;
    }

    public getObject(input: Record<string, ItemInstance>): StorageFormat {
        return null;
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