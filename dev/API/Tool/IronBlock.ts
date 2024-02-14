/**
 * Функция для создания блоков руд
 * @id ключевое слово
 * @planets список планет или планета, для которых будет создан вариант руды
 */
const IronBlock = (id: string, planets: string[] | string) => {
    IronBlock.planetList[id] = planets;
    let keyword = "ore_" + id + "_" + planets;
    if(Array.isArray(planets)) {
        for(const i in planets) {
            keyword = id = "ore_" + id + "_" + planets[i];
    new GBlock(
      id,
      [
        {
          name: keyword,
          texture: [[keyword, 0]],
          inCreative: true,
        },
      ],
      STONE
    );
  }
} else 
  new GBlock(
    id,
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
