namespace RecipeModule {
    export class DefaultParseProvider<T extends IDefaultRecipe> extends ParseProvider<T> {
        public constructor(public defaultCount: number = 1, public defaultData: number = 0) {
            super();
        }
        
        public parseItemInstance({ id, count, data, ...other }: Scriptable): Nullable<ItemInstance> {
            if(id != null) {
                return { id: typeof id == "string" ? IDRegistry.parseID(id) : id, count: count || this.defaultCount, data: data || this.defaultData, ...other };
            }
            return null;
        }

        public parseItemInstanceStorage(obj: Record<string, ItemInstance>): typeof obj {
            for(const key in obj) {
                const itemInstance = this.parseItemInstance(obj[key]);
                if(itemInstance != null) {
                    obj[key] = itemInstance;
                }
            }
            return obj;
        }

        public processKeys(obj: T): T {
            this.parseItemInstanceStorage(obj.input || {});
            this.parseItemInstanceStorage(obj.output || {});
            return obj;
        }

        public override buildRecipe(object: T, path: string, factory?: Factory<unknown>): T {
            if("recipe_type" in object) {
                factory = getFactory(object.recipe_type);
                if(factory == null) {
                    throw `Recipe type "${object.recipe_type}" of "${path}" is not exists. Try import recipe on post loaded callback if you sure recipe type registered`;
                }
                if(!(factory instanceof this.constructor)) {
                    delete object.recipe_type;
                    return factory.getParseProvider().buildRecipe(object, path) as T;
                }
            }
            return this.processKeys(object);
        }
    }

    export namespace ParseProviders {
        export const Default = new DefaultParseProvider();
    }
}