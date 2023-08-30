interface EnergyProperties {
  getCapacity(): number;
  canReceiveEnergy?(side, type): boolean;
  canExtractEnergy? (side, type): boolean;
  energyTick(type: string, src: EnergyTileNode): void;
  energyReceive(type: string, amount: number, voltage: number): number;
  setWrenchable(id): any;
}

abstract class Machine extends TileEntityBase implements EnergyProperties {
  readonly window: UI.StandartWindow;
  constructor(window) {
    super();
    this.window = window;
  }
  public getScreenByName(): UI.StandartWindow {
    return this.window;
  }
  defaultValues = {
    energy: 0,
    energyMax: 0,
  };
  public useNetworkItemContainer: true;
  public getCapacity(): number {
    return this.data.energyMax;
  }
  public energyTick(type: string, src: EnergyTileNode): void {
    let output = Math.min(1, this.data.energy);
    this.data.energy += src.add(output) - output;
  }
  public energyReceive(type: string, amount: number, voltage: number): number {
    amount = Math.min(amount, this.data.energyMax / 2);
    var add = Math.min(amount, this.getCapacity() - this.data.energy);
    this.data.energy += add;
    return add;
  }
  // public onTick(): void {
  //   this.container.sendChanges();
  //   this.container.validateAll();
  // }
  public setWrenchable(id): any {
    if (id == ItemID.machine_wrench) {
        alert("DEGUG WORK")
      this.blockSource.setBlock(
        this.x,
        this.y,
        this.z,
        this.blockID,
        this.blockSource.getBlockData(this.x, this.y, this.z) + 1
      );
    }
  }
}

abstract class InputMachine extends Machine {
  canReceiveEnergy(type: number, side: string): boolean {
    return true;
  }
  canExtractEnergy(): boolean {
    return false;
  }
 getTier(): number {
  return 1;
}
  click(id): any {
   this.setWrenchable(id)
  };
  
  // charge (slot: string) {
  //     this.data.energy -= ChargeItemRegistry.addEnergyToSlot(this.container.getSlot(slot), "spacejoule",
  //     this.data.energy, this.getTier());
  // };
  discharge(slot: string) {
      let amount = this.getCapacity() - this.data.energy;
      this.data.energy += ChargeItemRegistry.getEnergyFromSlot(this.container.getSlot(slot), "spacejoule",
          amount, this.getTier());
       
          for (let i in infinitybatt) {
            if (this.container.getSlot(slot).id == infinitybatt[i].id) {
              if (World.getThreadTime() % infinitybatt[i].num == 0) {
                this.data.energy += 1;
              }
  }}
}}

abstract class Generator extends Machine {
  defaultValues = {
    energy: 0,
    energyMax: 0,
  };
  canReceiveEnergy(): boolean {
    return false;
  }

  canExtractEnergy(): boolean {
    return true;
  }
}

abstract class MachineStorage extends Machine {
  defaultValues = {
    energy: 0,
    energyMax: 0,
  };

  canReceiveEnergy(side, type): boolean {
    return side == 2;
  }

  canExtractEnergy(side, type): boolean {
    return side != 2;
  }
}

let batt = [];
var infinitybatt = [];
let battery = {
  set: function (id, description) {
    description = description || {};
    description.storage = description.storage || 1000;
    description.addMax = description.addMax || 32;
    Item.setMaxDamage(id, description.storage);
    Callback.addCallback("PreLoaded", function () {
      //Item.addToCreative(id, 1, description.storage);
    });
    Item.registerNameOverrideFunction(id, function (item, name) {
      return (
        name +
        "\n§6⚡ : " +
        (Item.getMaxDamage(item.id) - item.data) +
        "§6/" +
        Item.getMaxDamage(item.id)
      );
    });
    batt.push({
      id: id,
      storage: description.storage,
      addMax: description.addMax,
    });
  },
  add: function (block, data, slot) {
    let en = block.getSlot(slot);
    for (i in batt) {
      if (en.id == batt[i].id) {
        if (data.energy + batt[i].addMax <= data.energyMax) {
          if (
            en.data + 16 - batt[i].addMax <=
            batt[i].storage - batt[i].addMax + 16
          ) {
            data.energy += batt[i].addMax;
            en.data += batt[i].addMax;
          }
        }
      }
    }
  },
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
  Minus: function (block, data, slot) {
    let en = block.getSlot(slot);
    for (i in batt) {
      if (en.id == batt[i].id) {
        if (data.energy - batt[i].addMax >= 0) {
          if (en.data - batt[i].addMax >= 0) {
            data.energy -= batt[i].addMax;
            en.data -= batt[i].addMax;
          }
        }
      }
    }
  },
  getBattery: function () {
    return batt;
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
      return name + "\n§6" + Item.getMaxDamage(item.id);
      -item.data + " / " + Item.getMaxDamage(item.id);
      +"mB";
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

var SpacesCraft = {
  addGroup: function (id: string | number, word: string) {
    Item.registerNameOverrideFunction(id, function (id, name) {
      return name + Translation.translate("\n§9") + word;
    });
  },
  addElectroLevel: function (id: string | number, word: string) {
    Item.registerNameOverrideFunction(id, function (id, name: string) {
      if (!Entity.getSneaking(Player.get())) {
        return name + Translation.translate("\n§7Electrolevel: ") + word;
      }
    });
  },
  addSHIFTtext: function (id: string | number, word: string) {
    Item.registerNameOverrideFunction(id, function (item, name) {
      if (Entity.getSneaking(Player.get())) {
        return name + "\n§7" + Translation.translate(word);
      }
      if (!Entity.getSneaking(Player.getLocal())) {
        return (
          name +
          "\n§7" +
          Translation.translate("Press SHIFT for view information")
        );
      }
    });
  },
};
Translation.addTranslation("\n§7Electrolevel", {
  ru: "\n§7Электроуровень: ",
});

var SpacesUtils = {
  // registerBlock: function (id: string,
  //     name: string,
  //     texture: string,
  //     index: number,
  //     type: string,
  //     toolnumber: any) {
  //     IDRegistry.genBlockID(id);
  //     Block.createBlock(id,
  //         [{
  //             name: name,
  //             texture: [[texture,
  //                 index]],
  //             inCreative: true
  //         }],
  //         type);
  //     ToolAPI.registerBlockMaterial(id,
  //         "stone",
  //         toolnumber);

  // },
  canisterRegistry: function (id, name, tex0: string, liquid) {
    IDRegistry.genItemID(id);
    Item.createItem(
      id,
      name,
      {
        name: tex0,
        meta: 6,
      },
      {
        stack: 1,
        isTech: true,
      }
    );

    Item.addToCreative(id, 1, 6);

    Item.registerNameOverrideFunction(id, function (item, translation, name) {
      return (
        Translation.translate(name) + "\n§7" + item.data + "0 mB / " + "60 mB"
      );
    });

    Item.registerIconOverrideFunction(id, function (item, data) {
      switch (item.data) {
        case 6:
          return {
            name: tex0,
            meta: 6,
          };
        case 5:
          return {
            name: tex0,
            meta: 5,
          };
        case 4:
          return {
            name: tex0,
            meta: 4,
          };
        case 3:
          return {
            name: tex0,
            meta: 3,
          };
        case 2:
          return {
            name: tex0,
            meta: 2,
          };
        case 1:
          return {
            name: tex0,
            meta: 1,
          };
        case 0:
          return {
            name: "Empty Liquid Canister",
            meta: 0,
          };
      }
    });

    Item.registerUseFunction(id, function (coords, item, block, player) {
      var region = BlockSource.getDefaultForActor(player);
      var place = coords.relative;
      if (item.data == 6) {
        region.setBlock(place.x, place.y, place.z, liquid, 0);
      } else if (
        item.data == 0 &&
        region.getBlockId(place.x, place.y, place.z) == liquid
      ) {
        region.setBlock(place.x, place.y, place.z, 0, 0);
        Entity.setCarriedItem(player, item.id, item.count, item.data + 6);
      } else if (
        item.data != 0 &&
        item.data <= 5 &&
        region.getBlockId(place.x, place.y, place.z) == liquid
      ) {
        Entity.setCarriedItem(player, item.id, item.count, item.data + 1);
      }
    });
  },
  placeBlockRegistry: function (
    itemid: any,
    name: string,
    textureI: string,
    stackct: number,
    blockid: any,
    blockname: string,
    textureB: string,
    blocktype: any
  ) {
    IDRegistry.genBlockID(blockid);
    Block.createBlock(
      blockid,
      [
        {
          name: blockname,
          texture: [[textureB, 0]],
          inCreative: true,
        },
      ],
      blocktype
    );

    IDRegistry.genItemID(itemid);
    Item.createItem(
      itemid,
      name,
      {
        name: textureI,
        meta: 0,
      },
      {
        stack: stackct,
      }
    );

    Item.registerUseFunction(itemid, function (coords, item, block, player) {
      var region = BlockSource.getDefaultForActor(player);
      var place = coords.relative;

      region.setBlock(place.x, place.y, place.z, blockid);
      if (Game.getGameMode() != 1) {
        Entity.setCarriedItem(player, item.id, item.count - 1, item.data);
        Block.registerDropFunction(blockid, function (coords, blockID) {
          return [[itemid, 1, 0]];
        });
      }
    });
  },
  balloneRegistry: function (
    id: string,
    name: string,
    texture: string,
    storag: number
  ) {
    IDRegistry.genItemID(id);
    Item.createItem(
      id,
      name,
      {
        name: texture,
        meta: 0,
      },
      {
        stack: 1,
      }
    );
    oxygenStorage.set(id, { storage: storag });
  },
};

ModAPI.registerAPI("SpacesAPI", {
  cableAPI: cableAPI,
  AirCable: AirCable,
  battery: battery,
  oxygenStorage: oxygenStorage,
  RenderAPI: RenderAPI,
  SpacesMachine: SpacesMachine,
  SpacesUtils: SpacesUtils,
  requireGlobal: function (command) {
    return eval(command);
  },
});
