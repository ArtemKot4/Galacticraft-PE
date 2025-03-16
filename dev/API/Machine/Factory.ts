type IRecipeContainer = {
    [key: string]: ItemStack | number;
};

class RecipeFactory {
    public storage: IRecipeContainer[] = [];

    public constructor() {}
    public set(obj: Record<string, ItemStack | number>) {
        for(const i in obj) {
            const recipe = obj[i];

            if(recipe instanceof ItemStack) {
                recipe.count = recipe.count || 1;
                recipe.data = recipe.data || -1;
            };
        };

        this.storage.push(obj);
        return this;
    };

    public get(container: ItemContainer | UI.Container, slotName: string): IRecipeContainer {
        for(const i in this.storage) {
            const recipe = this.storage[i][slotName] as ItemStack;

            if(RecipeFactory.isValidRecipe(container, slotName, recipe)) {
                return this.storage[i];
            };
        };
        return null;
    };

    public static isValidRecipe(container: ItemContainer | UI.Container, slotName: string, stack: ItemStack): string | boolean {
        const instance = container.getSlot(slotName);
        if(stack.data === -1) stack.data = instance.data;

        return stack.equals(instance);
    };

    public getForMore(container: ItemContainer | UI.Container, count: number): Nullable<IRecipeContainer> {
        for(const i in this.storage) {
            const storage = this.storage[i];

            for(let i = 0; i < count; i++) {
                if(!RecipeFactory.isValidRecipe(container, "slot_" + i, storage["slot_" + i] as ItemStack)) return null;
            };
            return storage;
        };
    };

    public static decreaseSlots(container: ItemContainer | UI.Container, count: number) {
        for(let i = 1; i <= count; i++) {
            const slot = container.getSlot("slot_" + i);
            container.setSlot("slot_" + i, slot.id, slot.count - 1, slot.data, slot.extra);
        };
    };

    public static setupResult(container: ItemContainer | UI.Container, slot: name, storage: ItemStack) {
        return container.setSlot(slot, storage.id, storage.count, storage.data);
    };

    public static getResult(container: ItemContainer | UI.Container, slot: name, storage: ItemStack) {
        return !!(container.getSlot(slot).id === (storage.id || 0));
    };

    public registerFromJSON(machine: string) {
        const files = FileTools.GetListOfFiles(__dir__ + "resources/recipes/" + machine + "/", "");
        for(const i in files) {
            const object = JSON.parse(FileTools.ReadText(files[i].getAbsolutePath()));
            for(const k in object) {
                const instance = object[k];
                if(typeof instance === "object") {
                    object[k] = new ItemStack(Utils.parseID(instance.id), instance.count || 1, instance.data || 0);
                };
            };

            this.set(object);
        };

        return this;
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
