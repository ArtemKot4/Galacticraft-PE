
const batt = [];
const infinitybatt = [];
const battery = {
  setInfinite: function (id, num) {
    infinitybatt.push({
      id: id,
      num: num,
    });
    Item.registerNameOverrideFunction(id, function (item, name) {
      return name + Translation.translate("\n§7Infinity⚡");
    });
  },
  addInfinite: function (block, data, slot) {
    let en = block.getSlot(slot);
    for (let i in infinitybatt) {
      if (en.id == infinitybatt[i].id) {
        if (World.getThreadTime() % infinitybatt[i].num == 0) {
          data.energy += 1;
        }
      }
    }
  },
 
};

var OS = [];
let oxygenStorage = {
  set: function (id, description) {
    description = description || {};
    description.storage = description.storage || 1000;
    description.addMax = description.addMax || 32;
    Item.setMaxDamage(id, description.storage);
    Callback.addCallback("PreLoaded", function () {
      //Item.addToCreative(id, 1, description.storage);
    });
    Item.registerNameOverrideFunction(id, function (item: any, name: any) {
      return name + "\n§6" + item.data + " / " + Item.getMaxDamage(item.id) +"mB";
    });
    OS.push({
      id: id,
      storage: description.storage,
      addMax: description.addMax,
    });
  },
  add: function (block, data, slot) {
    let en = block.getSlot(slot);
    for (i in OS) {
      if (en.id == OS[i].id) {
        if (data.energy + OS[i].addMax <= data.energyMax) {
          if (
            en.data + 16 - OS[i].addMax <=
            OS[i].storage - OS[i].addMax + 16
          ) {
            data.energy += OS[i].addMax;
            en.data += OS[i].addMax;
          }
        }
      }
    }
  },
  Minus: function (block, data, slot) {
    let en = block.getSlot(slot);
    for (i in OS) {
      if (en.id == OS[i].id) {
        if (data.energy - OS[i].addMax >= 0) {
          if (en.data - OS[i].addMax >= 0) {
            data.energy -= OS[i].addMax;
            en.data -= OS[i].addMax;
          }
        }
      }
    }
  },
  getBattery: function () {
    return OS;
  },
};

Translation.addTranslation("\n§7Electrolevel", {
  ru: "\n§7Электроуровень: ",
});




ModAPI.registerAPI("GalacticraftAPI", {
  IPlanet: IPlanet,
  GItem: GItem,
  Storage: Storage,
  CableAPI: CableAPI,
  AirCable: AirCable,
  battery: battery,
  oxygenStorage: oxygenStorage,
  SpacesMachine: SpacesMachine,
  requireGlobal: function (command) {
    return eval(command);
  },
});

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
