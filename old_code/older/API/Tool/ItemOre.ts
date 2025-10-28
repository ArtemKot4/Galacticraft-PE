type id = int;
//typeof BlockID[string] | number
type ores = int | string | Array<string | number>;
/**
 * Класс для регистрации предметов руды
 * @type тип создаваемой руды
 * @type_2 ключевой идентификатор руды
 */
class ItemOre {
    constructor(type: "ingot" | "shard" | "compressed", metal: string) {
        new GItem(type === "ingot" ? type + "_" + metal + "_gc" : type + "_" + metal, 64)
    }
}
