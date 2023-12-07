let recipe = [];
/**
 * Класс для регистрации рецептов;
 * new RecipePool("name of pool")
 */
class RecipePool {
  public name_pool: name;
  constructor(name_pool: name) {
    this.name_pool = name_pool;
  }
  public add(input, output): void {
    recipe.push({ [this.name_pool]: input, result: output });
  }

  public static getPool(pool: name, index: int) {
    for (var r in recipe) {
      return recipe[r][pool][index];
    }
  }
  public static getResult(pool: name) {
    for (var r in recipe) {
      if (recipe[r][pool]) {
        return recipe[r].result;
      }
    }
  }
  public static getSlots(container: ItemContainer, count: int) {
    for (var s = 1; s <= count; s++) {
      return container.getSlot("slot_" + s).id;
    }
  }
  public static checkRecipe(
    pool: name,
    index: int,
    container: ItemContainer
  ): boolean {
    if (
      RecipePool.getPool(pool, index) != RecipePool.getSlots(container, index)
    ) {
      return false;
    }
    return true;
  }
  public static clearSlots(container: ItemContainer, count: int) {
    for (var s = 1; s <= count; s++) {
      var slot = container.getSlot("slot_" + s);
      return container.setSlot("slot_" + s, slot.id, slot.count - 1, slot.data);
    }
  }
}

const recipe_c = new RecipePool("compressor");
recipe_c.add(
  [VanillaItemID.iron_ingot, VanillaItemID.iron_ingot, 0, 0, 0, 0, 0, 0, 0],
  [ItemID.compressed_iron]
);
recipe_c.add(
  [ItemID.ingot_copper_sc, ItemID.ingot_copper_sc, 0, 0, 0, 0, 0, 0, 0],
  [ItemID.compresssed_copper]
);
