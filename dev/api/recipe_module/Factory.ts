namespace RecipeModule {
    export const factories: Map<string, Factory<unknown>> = new Map();

    export function registerFactory<T extends Factory<unknown>>(name: string, factory: T): T {
        factories.set(name, factory);
        return factory;
    }

    export function getFactory<T extends Factory<unknown>>(name: string): Nullable<T> {
        return factories.get(name) as T;
    }

    export function registerRecipesFor(name: string, ...recipes: Object[]): void {
        const factory = getFactory(name);
        if(factory == null) {
            Debug.error(`Factory by name "${name}" is not exists. Recipes "${JSON.stringify(recipes)}" don't added`);
            return;
        }
        factory.registerRecipes(...recipes);
    }

    export interface SimpleItemContainer {
        getSlot(name: string): ItemContainerSlot | ItemStack;
        setSlot(name: string, id: number, count: number, data: number): void;
        setSlot(name: string, id: number, count: number, data: number, extra: Nullable<ItemExtraData>): void;
        validateSlot?(slotName: string): void;
    }

    export interface IManageContainer {
        getContainerManager(): ContainerManager;
    }

    export interface ICachedStorage<Input = string[], Output = string[]> {
        inputSlots: Input,
        outputSlots: Output,
        currentRecipeIndex: string
    }

    export abstract class Factory<StorageFormat, CachedStorage = ICachedStorage> {
        public storage: StorageFormat[] = [];
        
        abstract getRecipe(...args: unknown[]): Nullable<StorageFormat>;

        abstract getRecipe(cachedStorage: CachedStorage, slotGetter: (name: string) => ItemStack | ItemContainerSlot): Nullable<StorageFormat>;

        public registerRecipe(obj: StorageFormat): this {
            this.storage.push(obj);
            return this;
        }

        public registerRecipes(...recipes: StorageFormat[]): this {
            for(const recipe of recipes) {
                this.registerRecipe(recipe);
            }
            return this;
        }

        public getRecipes(): StorageFormat[] {
            return this.storage;
        }

        public getParseProvider(): ParseProvider<unknown> {
            return ParseProviders.Default;
        }

        public registerRecipesFrom(path: string): this {
            const files = FileTools.GetListOfFiles(path, "");
            const parseProvider = this.getParseProvider();

            for(const file of files) {
                const path = file.getAbsolutePath();
                if(file.isDirectory()) {
                    this.registerRecipesFrom(path);
                    continue;
                }
                const [fileName, format] = String(file.getName()).split(".");
                if(format != parseProvider.getFileFormat()) {
                    Logger.debug("RecipeModule: Factory.prototype.registerRecipesFrom", `File cannot be format "${format}" for register recipe from "${path}". Right format is "${parseProvider.getFileFormat()}". Please rename file to "${fileName + "." + format}" or ignore this message if it's not problem.`);
                    continue;
                }
                this.registerRecipe(parseProvider.buildRecipe(parseProvider.parseText(FileTools.ReadText(path), path), path) as StorageFormat);
            }
            return this;
        }
    }
}

Callback.addCallback("LevelDisplayed", () => {
    RecipeModule.factories.forEach((factory, name) => {
        Game.message(name + " => " + JSON.stringify(factory.storage) + "\n\n");
    });
});