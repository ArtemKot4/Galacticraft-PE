type id = any;
//typeof BlockID[string] | number
type ores = int | string | Array<string | number>;
/**
 * Класс для регистрации предметов руды
 * @type тип создаваемой руды
 * @type_2 ключевой идентификатор руды
 */
class ItemOre extends GItem {
  constructor(type: "ingot", type_2: string, ore?: ores);
  constructor(type: "shard" | "compressed", type_2: string);
  constructor(
    type: "ingot" | "compressed" | "shard",
    type_2: string,
    ore?: ores
  ) {
    const type_ = type + "_" + type_2;

    super(type == "ingot" ? type_ + "_gc" : type_, 64);

    this.recipe(type, type_2, type_, ore || null);
  }

  private recipe(type, type_2, type_, planet_ore): void {
    //it's convert key word to planet ore uid
    const valid = (ore_param, ore) => typeof ore === "number" ? planet_ore : BlockID[ore]
    if(type == "ingot" && planet_ore) {
    if (Array.isArray(planet_ore)) {
      for(const i in planet_ore) {
        const ore = "ore_" + type_2 + "_" + planet_ore[i]; 
        Recipes.addFurnace(
          valid(planet_ore, ore[i]),
          0,
          ItemID["ingot_" + this.id],
          0
        );
      }
    }
    else {
      Recipes.addFurnace(
        valid(planet_ore, planet_ore),
        0,
        ItemID["ingot_" + this.id],
        0
      );
      
    } }
    else if (type == "shard") {
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
  };
}
