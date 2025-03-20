type IRecipeContainer = {
    [key: string]: ItemInstance | number;
};

class RecipeFactory {
    public static list: RecipeFactory[] = [];
    public storage: IRecipeContainer[] = [];

    private constructor() {};

    public set(obj: Record<string, ItemInstance | number>) {
        for(const i in obj) {
            const recipe = obj[i];

            if(recipe instanceof Object) {
                recipe.count = recipe.count || 1;
                recipe.data = recipe.data || -1;
            };
        };

        this.storage.push(obj);
        return this;
    };

    public getRecipe(container: ItemContainer | UI.Container, slotName: string): IRecipeContainer {
        for(const i in this.storage) {
            const recipe = this.storage[i][slotName] as ItemInstance;

            if(RecipeFactory.isValidRecipe(container, slotName, recipe)) {
                return this.storage[i];
            };
        };
        return null;
    };

    public getRecipeByMore(container: ItemContainer | UI.Container, count: number): Nullable<IRecipeContainer> {
        for(const i in this.storage) {
            const storage = this.storage[i];

            for(let i = 0; i < count; i++) {
                if(!RecipeFactory.isValidRecipe(container, "slot_" + i, storage["slot_" + i] as ItemInstance)) return null;
            };
            return storage;
        };
    };

    public registerFromPath(dir: string) {
        const files = FileTools.GetListOfFiles(dir, "");
        for(const i in files) {
            const object = JSON.parse(FileTools.ReadText(files[i].getAbsolutePath()));
            for(const k in object) {
                const instance = object[k];
                if(typeof instance === "object") {
                    instance.id = Utils.parseID(instance.id);
                    instance.count = instance.count || 1;
                    instance.data = instance.data || 0;
                };
            };

            this.set(object);
        };

        return this;
    };

    public static register(name: string): RecipeFactory {
        RecipeFactory.list[name] = new RecipeFactory();
        return RecipeFactory.list[name];
    };

    public static isValidRecipe(container: ItemContainer | UI.Container, slotName: string, item: ItemInstance): string | boolean {
        item = item || { id: 0, count: 0, data: 0 };
        
        const instance = container.getSlot(slotName);
        if(item.data === -1) item.data = instance.data;

        return (
            item.id === instance.id && 
            item.count === instance.count && 
            item.data === instance.data
        );
    };

    public static decreaseSlots(container: ItemContainer | UI.Container, count: number) {
        for(let i = 0; i < count; i++) {
            const slot = container.getSlot("slot_" + i);
            container.setSlot("slot_" + i, slot.id, slot.count - 1, slot.data, slot.extra);
        };
    };

    public static setResult(container: ItemContainer | UI.Container, slot: name, item: ItemInstance) {
        return container.setSlot(slot, item.id, item.count, item.data);
    };

    public static getResult(container: ItemContainer | UI.Container, slot: name, item: ItemInstance) {
        return !!(container.getSlot(slot).id === (item.id || 0));
    };

    public static get(name: string): RecipeFactory {
        return RecipeFactory.list[name];
    };
};

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
