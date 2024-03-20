/**
 * Функция для создания блоков руд
 * @id ключевое слово
 * @planets список планет или планета, для которых будет создан вариант руды
 */

const IronBlock = (id: string, planets: string[] | string) => {
    IronBlock.planetList[id] = planets;
    let keyword = "ore_" + id + "_" + planets;
    if(typeof planets !== "string") {
        for(const i in planets) {
            const key = keyword[i]
    new GBlock(
      key,
      [
        {
          name: key,
          texture: [[key, 0]],
          inCreative: true,
        },
      ],
      STONE
    );
  }
} else 
  new GBlock(
    keyword,
    [
      {
        name: keyword,
        texture: [[keyword, 0]],
        inCreative: true,
      },
    ],
    STONE
  );
 };
 
 IronBlock.planetList = {};
