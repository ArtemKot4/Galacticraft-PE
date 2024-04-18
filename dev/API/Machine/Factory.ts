type count = int;
type slot =
  | "slot_1"
  | "slot_2"
  | "slot_3"
  | "slot_4"
  | "slot_5"
  | "slot_6"
  | "slot_7"
  | "slot_9";

type slot_value = "id" | "data" | "count" | "extra";

class RecipeFactory {
  public storage = [];
  constructor() {}
  public set(obj: Record<string, ItemInstance>) {
    this.storage.push(obj);
    return this;
  };
  public static get(container: ItemContainer, storage: object[]) {
    return function (slot, value: slot_value) {
        return container.getSlot(slot)[value] === storage[slot][value];
    };
  };
  public static getForMore(container: ItemContainer, storage: object[], count: int) {
      const recipe = RecipeFactory.get(container, storage);
      for(let i = 1; i <= count; i++) {
        if(!recipe("slot_" + i, 'id')) return false;
      };
      return true
  };
  public static decreaseSlots(container: ItemContainer, count) {
    for(let i = 1; i <= count; i++) {
      const slot = container.getSlot("slot_" + i);
      container.setSlot("slot_" + i, slot.id, slot.count - 1, slot.data, slot.extra)
    }
};
  public static setupResult(container: ItemContainer, slot: name, storage: ItemInstance) {
   return container.setSlot(slot, storage.id, storage.count, storage.data);
  };

  public static getResult(container: ItemContainer, slot: name, storage: ItemInstance) {
    return !!(container.getSlot(slot).id === (storage.id || 0))
  }

  public registerFromJSON(machine: string) {

    const DIRS = FileTools.GetListOfFiles(__dir__ + "resources/recipes/" + machine + "/", "");
    for(const i in DIRS) {
        const _JSON = JSON.parse(FileTools.ReadText(
    DIRS[i].getAbsolutePath()));
    for(const k in _JSON) {
        const id = _JSON[k].id;
        const result_id = (typeof id === "number") ? id : (BlockID[id] ??
         VanillaBlockID[id] ?? ItemID[id] ?? VanillaItemID[id]);
         
    
    _JSON[k].id = Number(result_id);
    
    }
Game.message("\nJSON: " + JSON.stringify(_JSON))
  this.set(_JSON);

    
     
    }
    };

}
