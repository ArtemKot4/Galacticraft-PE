interface IRecipeContainer  {
    [key: string]: unknown | ItemInstance;
};

interface IShapelessRecipeContainer {
    ingredients: ItemInstance[],
    result: ItemInstance
} 

abstract class RecipeFactory<T> {
    public static list: RecipeFactory<unknown>[] = [];
    public storage: T[] = [];
    public path: string;

    public constructor() {
        if("getPath" in this) {
            this.registerPath(this.getPath());
        }
    }

    public registerPath(path: string): this {
        throw new java.lang.UnsupportedOperationException("Method not implemented.");
    }
    
    abstract set(obj: T):this;
    public getPath?(): string;

    public static isValidRecipe(container: ItemContainer | UI.Container, slotName: string, item: ItemInstance): string | boolean {
        if(!item) return false;
        const instance = container.getSlot(slotName);

        return (
            item.id == instance.id && 
            item.count >= instance.count && 
            (item.data == -1 || item.data != -1 && item.data == instance.data)
        );
    }

    public static decreaseSlots(container: ItemContainer | UI.Container, count: number) {
        for(let i = 0; i < count; i++) {
            const slot = container.getSlot("slot_" + i);
            container.setSlot("slot_" + i, slot.id, slot.count - 1, slot.data, slot.extra);
        }
    }

    public static setResult(container: ItemContainer | UI.Container, slot: string, item: ItemInstance) {
        return container.setSlot(slot, item.id, item.count, item.data);
    }

    public static getResult(container: ItemContainer | UI.Container, slot: string, item: ItemInstance) {
        return !!(container.getSlot(slot).id === (item.id || 0));
    }

    public static get<T extends RecipeFactory<unknown>>(name: string): Nullable<T> {
        return RecipeFactory.list[name] || null;
    }
}

class ShapedRecipeFactory<T extends IRecipeContainer = IRecipeContainer> extends RecipeFactory<T> {
    public override set(obj: T) {
        for(const i in obj) {
            const recipe = obj[i] as ItemInstance;

            if(recipe instanceof Object) {
                recipe.count = recipe.count || 1;
                recipe.data = recipe.data || -1;
            }
        }
        return this;
    }

    public registerPath(path: string): this {
        this.path = path;
        ShapedRecipeFactory.registerFromPath(this.path, this);
        return this;
    }

    // public getRecipe(container: ItemContainer | UI.Container, slotName: string): Nullable<T> {
    //     for(const i in this.storage) {
    //         const recipe = this.storage[i][slotName] as ItemInstance;

    //         if(RecipeFactory.isValidRecipe(container, slotName, recipe)) {
    //             return this.storage[i];
    //         }
    //     }
    //     return null;
    // }

    public getRecipeByMore(container: ItemContainer | UI.Container, slotCount: number): Nullable<T> {
        for(const i in this.storage) {
            const storage = this.storage[i];

            for(let i = 0; i < slotCount; i++) {
                if(!RecipeFactory.isValidRecipe(container, "slot_" + i, storage["slot_" + i] as ItemInstance)) {
                    return null;
                }
            }
            return storage;
        }
    }

    public static registerFromPath(path: string, factory: ShapedRecipeFactory): void {
        const files = FileTools.GetListOfFiles(path, "");
        for(const i in files) {
            const object = JSON.parse(FileTools.ReadText(files[i].getAbsolutePath()));
            for(const k in object) {
                const instance = object[k];
                if(!Array.isArray(instance) && typeof instance === "object" && instance.id) {
                    instance.id = IDRegistry.parseID(instance.id);
                    instance.count = instance.count || 1;
                    instance.data = instance.data || -1;
                }
            }
            factory.storage.push(object);
        }
    }

    public static register(name: string, factory: ShapedRecipeFactory): ShapedRecipeFactory {
        return RecipeFactory.list[name] = factory;
    }
}

class ShapelessRecipeFactory<T extends IShapelessRecipeContainer = IShapelessRecipeContainer> extends RecipeFactory<T> {
    public override set(obj: T): this {
        for(const i in obj.ingredients as ItemInstance[]) {
            const recipe = obj.ingredients[i] as ItemInstance;
            recipe.count = recipe.count || 1;
            recipe.data = recipe.data || -1;
        }
        return this;
    }

    public registerPath(path: string): this {
        this.path = path;
        ShapelessRecipeFactory.registerFromPath(this.path, this);
        return this;
    }

    public getRecipe(container: ItemContainer | UI.Container, slotCount: number): Nullable<T> {
        let itemList = [];
        for(let i = 0; i < slotCount; i++) {
            itemList.push(container.getSlot("slot_" + i));
        }

        for(const i in this.storage) {
            const storage = this.storage[i];
            if(storage) {
                if(storage.ingredients) {}
            }
            
        }  
        return null;
    }

    public static register(name: string, factory: ShapelessRecipeFactory): ShapelessRecipeFactory {
        return RecipeFactory.list[name] = factory;
    }

    public static registerFromPath(path: string, factory: ShapelessRecipeFactory): void {
        const files = FileTools.GetListOfFiles(path, "");
        for(const i in files) {
            const object: Nullable<IShapelessRecipeContainer> = JSON.parse(FileTools.ReadText(files[i].getAbsolutePath()));
            if("ingredients" in object) {
                for(const k in object.ingredients) {
                    const recipe = object.ingredients[k] as ItemInstance;
                    recipe.count = recipe.count || 1;
                    recipe.data = recipe.data || -1;
                }
            }
            factory.storage.push(object);
        }
    }
}

/*
public registerFromJSON(machine: string) {
  const DIRS = FileTools.GetListOfFiles(
    __dir__ + "resources/recipes/" + machine + "/",
    ""
  );
  for (const i in DIRS) {
    const _JSON = JSON.parse(FileTools.ReadText(DIRS[i].getAbsolutePath()));
    for (const k in _JSON) {
      const id = _JSON[k].id as string;
      const split = id.split(":");
      const validation_id =
       split[0] !== "minecraft"
          ? ItemID[split[1]] ?? BlockID[split[1]]
          : VanillaItemID[split[1]] ?? VanillaBlockID[split[1]];
      _JSON[k].id = Number(typeof id === "number" ? id : validation_id);
    }
    this.set(_JSON);
  }
}*/

