let recipe = [];
/**
 * Класс для регистрации рецептов
 */
abstract class RecipePool {
  public static add(pool, input, output) {
    recipe.push({ [pool]: input, result: output });
  }
  public static getPool(pool) {
    for (var r in recipe) {
      return recipe[r][pool];
    }
  }
  public static getResult(pool){
    for(var r in recipe){
        if(recipe[r][pool]){
            return recipe[r].result
        }
    }

  }
  public static getSlots(container, count) {
    for (var s = 1; s <= count; s++) {
      return container.getSlot("slot_" + s).id;
    }
  }
  public static clearSlots(container, count) {
    for (var s = 1; s <= count; s++) {
      var slot = container.getSlot("slot_" + s);
     return container.setSlot("slot_" + s, slot.id, slot.count - 1, slot.data);
    }
  }
}

RecipePool.add("compressor", [VanillaItemID.iron_ingot,VanillaItemID.iron_ingot,0,0,0,0,0,0,0], [ItemID.compressed_iron]);
