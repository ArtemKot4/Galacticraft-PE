type id = any;
//typeof BlockID[string] | number
type ores = int | string | Array<string | number>;
/**
 * Класс для регистрации предметов руды
 * @type тип создаваемой руды
 * @type_2 ключевой идентификатор руды
 */
// class ItemOre extends GItem {
//   constructor(type: "ingot", type_2: string);
//   constructor(type: "shard" | "compressed", type_2: string);
//   constructor(
//     type: "ingot" | "compressed" | "shard",
//     type_2: string,
//   ) {
//     const type_ = type + "_" + type_2;
//     const planetList = IronBlock.planetList[type_2];
//     if(!planetList) throw new Error("Error! You need register list of planets key in Iron Block to register your item ore");
//     super(type == "ingot" ? type_ + "_gc" : type_, 64);

//     this.recipe(type, type_2, type_, planetList);
//   }

//   private recipe(type, type_2, type_, planetList): void {
//     //it's convert key word to planet ore uid
//     const valid = (ore) => typeof ore === "number" ? ore : BlockID[ore];
//     if(type == "ingot" && planetList) {
//     if (Array.isArray(planetList)) {
//       for(const i in planetList) {
//         const ore = "ore_" + type_2 + "_" + planetList[i]; 
//         Recipes.addFurnace(
//           valid(ore),
//           0,
//           ItemID[type_ + "_gc"],
//           0
//         );
//       }
//     }
//     else {
//         const ore = "ore_" + type_2 + "_" + planetList;
//       Recipes.addFurnace(
//         valid(ore),
//         0,
//         ItemID[type_ + "_gc"],
//         0
//       );
      
//     } }
//     else if (type == "shard") {
//       const ingot = ItemID[type_ + "_gc"];
//       Recipes.addShapeless({ id: ingot, count: 9, data: 0 }, [
//         {
//           id: ingot,
//           data: 0,
//         },
//       ]);

//       Recipes.addShaped(
//         { id: ingot, count: 1, data: 0 },
//         ["aaa", "aaa", "aaa"],
//         ["a", ingot, 0]
//       );
//     }
//   };
// }
