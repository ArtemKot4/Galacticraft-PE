type id = any;
//typeof BlockID[string] | number

/**
 * Класс для регистрации предметов руды
 * @type тип создаваемой руды
 * @type_2 ключевой идентификатор руды
 */
class ItemOre extends GItem {
  // private item_list: [];

  constructor(type: "compressed", type_2: string);
  constructor(type: "ingot", type_2: string, ore?: int | string);
  constructor(type: "shard", type_2: string | ItemInstance);
  constructor(
    type: "ingot" | "compressed" | "shard",
    type_2: string,
    ore?: int | string
  ) {
    const type_ = type + "_" + type_2;

    super(type == "ingot" ? type_ + "_gc" : type_, 64);

    this.recipe(type, type_2, type_, ore || null);
  }

  private recipe(type, type_2, type_, ore): void {
    if (ore && type == "ingot") {
      Recipes.addFurnace(
        typeof ore === "number" ? ore : BlockID[ore],
        0,
        ItemID["ingot_" + this.id],
        0
      );
    } else if (type == "shard") {
      const ingot = ItemID["ingot_" + type_2 + "_gc"];
      Recipes.addShapeless({ id: ItemID[type_], count: 9, data: 0 }, [
        {
          id: ingot,
          data: 0,
        },
      ]);

      Recipes.addShaped(
        { id: ingot, count: 1, data: 0 },
        ["aaa", "aaa", "aaa"],
        ["a", ingot, 0]
      );
    }
  }
}
