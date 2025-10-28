/**
 * Функция для создания блоков руд
 * @id ключевое слово
 * @planets список планет или планета, для которых будет создан вариант руды
 */

class IronBlock {
  public static planetList = {};
  constructor(id: string, planet: name);
  constructor(id: string, planet_list: name[])
   constructor(public id, public list) {};
   /**
    * Используйте, если при регистрации указали одну планету
    */
   public create() {
    const str = "ore_" + this.id + "_" + this.list;
    new GBlock(
          str,
          [
            {
              name: str,
              texture: [[str, 0],[str, 0],[str, 0],[str, 0],[str, 0],[str, 0],],
              inCreative: true,
            },
          ],
          STONE
        ).create();
   };
    /**
    * Используйте, если при регистрации указали массив со списком планет
    */
   public createByPlanets() {
    for(const i in this.list) {
      const str = "ore_" + this.id + "_" + this.list[i];
          new GBlock(
            str,
            [
              {
                name: str,
                texture: [[str, 0],[str, 0],[str, 0],[str, 0],[str, 0],[str, 0],],
                inCreative: true,
              },
            ],
            STONE
          );
        }
   }
};

// const IronBlock = (id: string, planets: string[] | string) => {
//     IronBlock.planetList[id] = planets;
//     let keyword = "ore_" + id + "_" + planets;
//     if(typeof planets !== "string") {
//         for(const i in planets) {
//             const key = keyword[i]
//     new GBlock(
//       key,
//       [
//         {
//           name: key,
//           texture: [[key, 0]],
//           inCreative: true,
//         },
//       ],
//       STONE
//     );
//   }
// } else 
//   new GBlock(
//     keyword,
//     [
//       {
//         name: keyword,
//         texture: [[keyword, 0]],
//         inCreative: true,
//       },
//     ],
//     STONE
//   );
//  };
 
 IronBlock.planetList = {};
