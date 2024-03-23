
const sec = (time) => (World.getThreadTime() % time) * 20 === 0;

//excludes functions of js

const ObjectValues = function(obj) { 
  return Object.keys(obj).map(function(v) { 
  return obj[v] 
  }) 
 } 
  
 /**
  * ObjectAssign -> реализация недостающего метода Object.assign
  * @include объект для дополнения
  * @objs объекты для слияния
  * @возвращает include 
  */
 function ObjectAssign (include: {}, ...objs: {}[]){ 
   for(const a in objs){
  let ik = Object.keys(objs[a])
  const kk = ObjectValues(objs[a]) 
  for(const i in ik){ 
  for(const k in kk) { 
  include[ik[i]] = kk[i] 
  } 
  } }
  return include 
 }


//  placeBlockRegistry: function (
//   itemid: any,
//   name: string,
//   textureI: string,
//   stackct: number,
//   blockid: any,
//   blockname: string,
//   textureB: string,
//   blocktype: any
// ) {
//   IDRegistry.genBlockID(blockid);
//   Block.createBlock(
//     blockid,
//     [
//       {
//         name: blockname,
//         texture: [[textureB, 0]],
//         inCreative: true,
//       },
//     ],
//     blocktype
//   );

//   IDRegistry.genItemID(itemid);
//   Item.createItem(
//     itemid,
//     name,
//     {
//       name: textureI,
//       meta: 0,
//     },
//     {
//       stack: stackct,
//     }
//   );

//   Item.registerUseFunction(itemid, function (coords, item, block, player) {
//     var region = BlockSource.getDefaultForActor(player);
//     var place = coords.relative;

//     region.setBlock(place.x, place.y, place.z, blockid);
//     if (Game.getGameMode() != 1) {
//       Entity.setCarriedItem(player, item.id, item.count - 1, item.data);
//       Block.registerDropFunction(blockid, function (coords, blockID) {
//         return [[itemid, 1, 0]];
//       });
//     }
//   });
// },

const PLANETS: Record<string, number> = {
  EARTH: 0
}