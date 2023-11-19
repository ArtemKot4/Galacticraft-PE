let recipe = [];
/**
 * Класс для регистрации рецептов;  
 * new RecipePool("name of pool")
 */
class RecipePool {
  public name_pool: string;
  constructor(name_pool) {
    this.name_pool = name_pool;
  }
  public add(input, output): any {
    recipe.push({ [this.name_pool]: input, result: output });
  }

  public static getPool(pool, index) {
    for (var r in recipe) {
      return recipe[r][pool][index];
    }
  }
  public static getResult(pool) {
    for (var r in recipe) {
      if (recipe[r][pool]) {
        return recipe[r].result;
      }
    }
  }
  public static getSlots(container, count) {
    for (var s = 1; s <= count; s++) {
      return container.getSlot("slot_" + s).id;
    }
  }
  public static checkRecipe(pool, index, container): true {
    if (
      RecipePool.getPool(pool, index) == RecipePool.getSlots(container, index)
    ) {
      return true;
    }
  }
  public static clearSlots(container, count) {
    for (var s = 1; s <= count; s++) {
      var slot = container.getSlot("slot_" + s);
      return container.setSlot("slot_" + s, slot.id, slot.count - 1, slot.data);
    }
  }
}

var c_type = new RecipePool("compressor")
  c_type.add(
    [VanillaItemID.iron_ingot, VanillaItemID.iron_ingot, 0, 0, 0, 0, 0, 0, 0],
    [ItemID.compressed_iron]
  )
  c_type.add(
    [ItemID.ingot_copper_sc, ItemID.ingot_copper_sc, 0, 0, 0, 0, 0, 0, 0],
    [ItemID.compresssed_copper]
  );
