namespace Recipes {
    export interface FactoryRecipeFormat {
        input: ItemInstance[],
        result: ItemInstance[],
        tags?: Record<string, unknown>
    }

    export class Factory {
        public recipes: FactoryRecipeFormat[] = [];
        public onProcess(callback: (recipe: FactoryRecipeFormat) => unknown) {
            for(const i in this.recipes) {
                return callback(this.recipes[i]);
            }
        }
    }
    
    export const factories: { [name: string]: Factory } = {};
    export const hasFactory = (name: string) => name in factories;

    export function getFactory(name: string): Nullable<Factory> {
        if(!hasFactory(name)) {
            return null;
        }
        return factories[name];
    }

    export function createFactory(name: string, recipes: FactoryRecipeFormat[]) {
        if(hasFactory(name)) {
            throw new GalacticraftException(`Factory by name "${name}" already registered`);
        }
        if(recipes) {
            registerForFactory(name, recipes);
        }
        return (factories[name] = new Factory());
    }

    export function registerForFactory(name: string, recipes: FactoryRecipeFormat[]) {
        const factory = getFactory(name);
        factory.recipes = factory.recipes.concat(recipes);
    }
}