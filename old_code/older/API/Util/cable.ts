type universal = string | number;



const leaves: any[] = [];
const burnItems: any[] = [];

const compressorRecipe: any[] = [];
const circuit: any[] = [];
const rock1: any[] = [];
const liquids: any[] = [];


const SpacesMachine = {
  addCollectorLeaves: function (leaf): void {
    leaf = leaf || {};
    leaf.id = leaf.id || 0;
    leaves.push({
      id: leaf.id,
    });
  },
  addCoal: function (id) {
    burnItems.push({
      id: id,
    });
  },

  liquidRegistry: function (id: universal, data: number, voId: universal, voData: number, liquid: any) {
    liquids.push({
      id: id,
      data: data,
      voId: voId,
      voData: voData,
      liquid: liquid,
    });
  },
  registerStandartMachine: function (id, Standart) {
    // rfGroup.add(id, -1);
    // euGroup.add(id, -1);
    // CableAPI.addGroup(id)
    // ICRender.getGroup("bt-wire").add(id, -1);
    // ICRender.getGroup("fc-wire").add(id, -1);
    ToolAPI.registerBlockMaterial(id, "stone");
    Block.setDestroyTime(id, 3);
    TileEntity.registerPrototype(id, Standart);
    EnergyTileRegistry.addEnergyTypeForId(id, EU);
    EnergyTileRegistry.addEnergyTypeForId(id, RF);
    // EnergyTileRegistry.addEnergyTypeForId(id, ft);
    EnergyTileRegistry.addEnergyTypeForId(id, GJ);
  },
  registerO2SJMachine: function (id, Standart) {
    rfGroup.add(id, -1);
    euGroup.add(id, -1);
    ICRender.getGroup("bt-wire").add(id, -1);
    ICRender.getGroup("fc-wire").add(id, -1);
    ICRender.getGroup("gc-wire").add(id, -1);
    ICRender.getGroup("gc-improved-wire").add(id, -1);
    ToolAPI.registerBlockMaterial(id, "stone");
    Block.setDestroyTime(id, 3);
    TileEntity.registerPrototype(id, Standart);
    EnergyTileRegistry.addEnergyTypeForId(id, EU);
    EnergyTileRegistry.addEnergyTypeForId(id, RF);
    // EnergyTileRegistry.addEnergyTypeForId(id, ft);
    EnergyTileRegistry.addEnergyTypeForId(id, GJ);
    EnergyTileRegistry.addEnergyTypeForId(id, OB);
  },
  addReceptForElectricCompressor: function (inp: any = {}, out: any = {}) {
    compressorRecipe.push({
      slot_2: inp.slot_2 || 0,
      slot_3: inp.slot_3 || 0,
      slot_4: inp.slot_4 || 0,
      slot_5: inp.slot_5 || 0,
      slot_6: inp.slot_6 || 0,
      slot_7: inp.slot_7 || 0,
      slot_8: inp.slot_8 || 0,
      slot_9: inp.slot_9 || 0,
      result: out.result || 0,
    });
  },
 
  addCircuitRecept: function (inp: any = {}, out: any = {}) {
    circuit.push({
      slot_1: inp.slot_1 || 0,
      slot_3: inp.fabricator_1 || 0,
      slot_2: inp.fabricator_0 || 0,
      slot_4: inp.slot_4 || 0,
      slot_5: inp.slot_5 || 0,
      result: out.result || 0,
    });
  },
 
  addDefaultRocketRecipe: function (rock, out) {
    rock = rock || {};
    out = out || {};
    rock.cone = rock.cone || 0;
    rock.cover_1 = rock.cover_1 || 0;
    rock.cover_2 = rock.cover_2 || 0;
    rock.cover_3 = rock.cover_3 || 0;
    rock.cover_4 = rock.cover_4 || 0;
    rock.cover_5 = rock.cover_5 || 0;
    rock.cover_6 = rock.cover_6 || 0;
    rock.cover_7 = rock.cover_7 || 0;
    rock.cover_8 = rock.cover_8 || 0;
    rock.fin_1 = rock.fin_1 || 0;
    rock.fin_2 = rock.fin_2 || 0;
    rock.fin_3 = rock.fin_3 || 0;
    rock.fin_4 = rock.fin_4 || 0;
    rock.engine = rock.engine || 0;
    rock.storage_1 = rock.storage_1 || 0;
    rock.storage_2 = rock.storage_2 || 0;
    rock.storage_3 = rock.storage_3 || 0;
    out.rocket = out.rocket || 0;
    rock1.push({
      cone: rock.cone,
      cover_1: rock.cover_1,
      cover_2: rock.cover_2,
      cover_3: rock.cover_3,
      cover_4: rock.cover_4,
      cover_5: rock.cover_5,
      cover_6: rock.cover_6,
      cover_7: rock.cover_7,
      cover_8: rock.cover_8,
      engine: rock.engine,
      fin_1: rock.fin_1,
      fin_2: rock.fin_2,
      fin_3: rock.fin_3,
      fin_4: rock.fin_4,
      storage_1: rock.storage_1,
      storage_2: rock.storage_2,
      storage_3: rock.storage_3,
      rocket: out.rocket,
    });
  }
};

// IDRegistry.genBlockID("spaces_lent");
// Block.createBlock(
//   "spaces_lent",
//   [
//     {
//       name: "Dangerous Lent",
//       texture: [["Dangerous Lent", 0]],
//       inCreative: true,
//     },
//   ],
//   STONE
// );
// Translation.addTranslation("Dangerous Lent", {
//   ru: "§6Аварийная лента",
// });

/*
 $ - slot1
 # - Scala
 $
 #######
    */

/*
 $ - slot1
 # - Scala
 $
 #######
    */

//SpacesMachine.addReceptForElectricCompressor(ItemID.ingot_steel_spacescraft, ItemID.compressed_steel)

//SpacesMachine.addReceptForElectricCompressor(VanillaItemID.iron_ingot, ItemID.compressed_iron)
