namespace RecipeModule {
    export class DefaultParseProvider<T extends IDefaultRecipe> extends ParseProvider<T> {
        public constructor(public defaultCount: number = 1, public defaultData: number = 0) {
            super();
        }
        
        public parseItemInstance(item: Partial<ItemInstance>): Nullable<ItemInstance> {
            if(!("id" in item)) {
                return null;
            }
            return { id: typeof item.id == "string" ? IDRegistry.parseID(item.id) : item.id, count: item.count || this.defaultCount, data: item.data || this.defaultData };
        }

        public processKeys(obj: Object): T {
            for(const key in obj) {
                if(typeof obj[key] == "object") {
                    const parsed = this.parseItemInstance(obj[key]);
                    if(parsed == null) {
                        obj[key] = this.processKeys(obj[key]);
                        continue;
                    }
                    obj[key] = parsed;
                }
            }
            return obj as T;
        }

        public override buildRecipe(object: T, path: string, factory?: Factory<unknown>): T {
            if("recipe_type" in object) {
                factory = getFactory(object.recipe_type);
                if(factory == null) {
                    throw `Recipe type "${object.recipe_type}" of "${path}" is not exists. Try import recipe on post loaded callback if you sure recipe type registered`;
                }
                if(!(factory instanceof this.constructor)) {
                    return factory.getParseProvider().buildRecipe(object, path) as T;
                }
                delete object.recipe_type;
            }
            return this.processKeys(object);
        }
    }

    export namespace ParseProviders {
        export const Default = new DefaultParseProvider();
    }
}