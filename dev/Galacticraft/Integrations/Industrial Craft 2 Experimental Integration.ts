ModAPI.addAPICallback("ICore", function(api: any){
    var ELECTRIC_ITEM_MAX_DAMAGE = 27;
//Тут собраны соединения проводов,совместимость энергий и рецепты с блоками для интеграции
var ICTool = api.Tool;
var IC2Config = api.Config
var MachineRecipeRegistry = api.Recipe

function isToolboxEmpty(slot) {
    var container = BackpackRegistry.containers["d" + slot.data];
    if (container) {
        for (var i = 1; i <= 10; i++) {
            if (container.getSlot("slot" + i).id != 0) {
                return false;
            }
        }
    }
    return true;
}

IDRegistry.genBlockID("enclosed_copper_cable");
Block.createBlockWithRotation("enclosed_copper_cable",[{name: "Enclosed Copper Cable", texture: [["Enclosed Copper Cable", 0]], inCreative: true} ]);
Translation.addTranslation("Enclosed Copper Cable",{
ru: "Герметичный медный кабель §6(IC2)"
});
EU.registerWire(BlockID.enclosed_copper_cable, 128);

IDRegistry.genBlockID("enclosed_gold_cable");
Block.createBlockWithRotation("enclosed_gold_cable",[{name: "Enclosed Gold Cable", texture: [["Enclosed Gold Cable", 0]], inCreative: true} ]);
Translation.addTranslation("Enclosed Gold Cable",{
ru: "Герметичный золотой кабель §6(IC2)"
});
EU.registerWire(BlockID.enclosed_gold_cable, 512);

IDRegistry.genBlockID("enclosed_lv_cable");
Block.createBlockWithRotation("enclosed_lv_cable",[{name: "Enclosed LV Cable", texture: [["Oxygentile 3", 0],["Oxygentile 3", 0],["Enclosed LV Cable", 0],["Enclosed LV Cable", 0],["Enclosed LV Cable", 0],["Enclosed LV Cable", 0]], inCreative: true} ]);
Translation.addTranslation("Enclosed LV Cable",{
ru: "Герметичный lv кабель §6(IC2)"
});

EU.registerWire(BlockID.enclosed_lv_cable, 2048);


CableAPI.addGroup(BlockID.semifluidGenerator);
CableAPI.addGroup(BlockID.solarPanel);
CableAPI.addGroup(BlockID.primalGenerator);
CableAPI.addGroup(BlockID.electricHeatGenerator);

CableAPI.addGroup(BlockID.fluidHeatGenerator);
CableAPI.addGroup(BlockID.enclosed_aluminum_wire);
CableAPI.addGroup(BlockID.rtHeatGenerator);
CableAPI.addGroup(BlockID.solidHeatGenerator -1);

CableAPI.addGroup(BlockID.recycler);
CableAPI.addGroup(BlockID.metalFormer);
CableAPI.addGroup(BlockID.oreWasher);
CableAPI.addGroup(BlockID.thermalCentrifuge);
CableAPI.addGroup(BlockID.blastFurnace);
CableAPI.addGroup(BlockID.icFermenter);
CableAPI.addGroup(BlockID.massFabricator);
CableAPI.addGroup(BlockID.stirlingGenerator);

CableAPI.addGroup(BlockID.ironFurnace);
CableAPI.addGroup(BlockID.nuclearReactor);
CableAPI.addGroup(BlockID.reactorChamber);
CableAPI.addGroup(BlockID.storageBatBox);

CableAPI.addGroup(BlockID.storageCESU);
CableAPI.addGroup(BlockID.storageMFE);
CableAPI.addGroup(BlockID.storageMFSU);
CableAPI.addGroup(BlockID.transformerLV);
CableAPI.addGroup(BlockID.transformerHV);
CableAPI.addGroup(BlockID.transformerEV);

CableAPI.addGroup(BlockID.electricFurnace);
CableAPI.addGroup(BlockID.inductionFurnace);
CableAPI.addGroup(BlockID.macerator);
CableAPI.addGroup(BlockID.compressor);
CableAPI.addGroup(BlockID.extractor);
CableAPI.addGroup(BlockID.solidCanner);
CableAPI.addGroup(BlockID.canner);

    EnergyTileRegistry.addEnergyTypeForId(BlockID.semifluidGenerator, gj);
        EnergyTileRegistry.addEnergyTypeForId(BlockID.solarPanel, gj);
            EnergyTileRegistry.addEnergyTypeForId(BlockID.primalGenerator, gj);
                EnergyTileRegistry.addEnergyTypeForId(BlockID.electricHeatGenerator, gj);
    EnergyTileRegistry.addEnergyTypeForId(BlockID.rtGenerator, gj);
    EnergyTileRegistry.addEnergyTypeForId(BlockID.solidHeatGenerator, gj);
        EnergyTileRegistry.addEnergyTypeForId(BlockID.recycler, gj);
            EnergyTileRegistry.addEnergyTypeForId(BlockID.metalFormer, gj);
                EnergyTileRegistry.addEnergyTypeForId(BlockID.oreWasher, gj);
                    EnergyTileRegistry.addEnergyTypeForId(BlockID.thermalCentrifuge, gj);
    EnergyTileRegistry.addEnergyTypeForId(BlockID.blastFurnace, gj);
    EnergyTileRegistry.addEnergyTypeForId(BlockID.icFermenter, gj);
    EnergyTileRegistry.addEnergyTypeForId(BlockID.massFabricator, gj);
    EnergyTileRegistry.addEnergyTypeForId(BlockID.stirlingGenerator, gj);
        EnergyTileRegistry.addEnergyTypeForId(BlockID.ironFurnace, gj);
        EnergyTileRegistry.addEnergyTypeForId(BlockID.nuclearReactor, gj);
        EnergyTileRegistry.addEnergyTypeForId(BlockID.storageBatBox, gj);
        EnergyTileRegistry.addEnergyTypeForId(BlockID.storageCESU, gj);
        EnergyTileRegistry.addEnergyTypeForId(BlockID.storageMFE, gj);
        EnergyTileRegistry.addEnergyTypeForId(BlockID.storageMFSU, gj);
    EnergyTileRegistry.addEnergyTypeForId(BlockID.transformerHV, gj);
            EnergyTileRegistry.addEnergyTypeForId(BlockID.transformerLV, gj);
            EnergyTileRegistry.addEnergyTypeForId(BlockID.transformerEV, gj);
            EnergyTileRegistry.addEnergyTypeForId(BlockID.electricFurnace, gj);
            EnergyTileRegistry.addEnergyTypeForId(BlockID.inductionFurnace, gj);
            EnergyTileRegistry.addEnergyTypeForId(BlockID.macerator, gj);
            EnergyTileRegistry.addEnergyTypeForId(BlockID.compressor, gj);
            EnergyTileRegistry.addEnergyTypeForId(BlockID.extractor, gj);
            EnergyTileRegistry.addEnergyTypeForId(BlockID.canner, gj);
            EnergyTileRegistry.addEnergyTypeForId(BlockID.solidCanner, gj);
        
   CableAPI.addGroup(BlockID.pump);
;
  
Callback.addCallback("LevelCreated", function() {

Recipes.addShaped({id: ItemID.ingotCopper, count: 1, data: 0}, [
    "",
    " a ",
    ""
], ['a', ItemID.ingot_copper_sc, 0]);

Recipes.addShaped({id: ItemID.ingotTin, count: 1, data: 0}, [
    "",
    " a ",
    ""
], ['a', ItemID.ingot_tin_sc, 0]);

Recipes.addShaped({id: ItemID.ingot_copper_sc, count: 1, data: 0}, [
    "",
    " a ",
    ""
], ['a', ItemID.ingotCopper, 0]);

Recipes.addShaped({id: ItemID.ingot_tin_sc, count: 1, data: 0}, [
    "",
    " a ",
    ""
], ['a', ItemID.ingotTin, 0]);

Recipes.addShaped({id: ItemID.canister_copper, count: 1, data: 0}, [
    "a a",
    "a a",
    "aaa"
], ['a', ItemID.ingotCopper, 0]);
//канистра из меди
Recipes.addShaped({id: ItemID.canister_tin, count: 1, data: 0}, [
    "a a",
    "a a",
    "aaa"
], ['a', ItemID.ingotTin, 0]);

Recipes.addShaped({id: ItemID.canister_tin, count: 1, data: 0}, [
    "a a",
    "a a",
    "aaa"
], ['a', ItemID.plateTin, 0]);

Recipes.addShaped({id: ItemID.canister_copper, count: 1, data: 0}, [
    "a a",
    "a a",
    "aaa"
], ['a', ItemID.plateCopper, 0]);

Recipes.addShaped({id: BlockID.compressor_gj, count: 1, data: 0}, [
    "baf",
    "aca",
    "aea"
], ['a', ItemID.ingot_aluminum_sc, 0, 'b', VanillaBlockID.anvil, 0, 'c', ItemID.ingotCopper, 0, 'e', ItemID.wafer_basic, 0,'f',BlockID.mekanism_block_ports,0]);



Recipes.addShaped({id: BlockID.coal_generator, count: 1, data: 0}, [
    "aaa",
    "bcb",
    "aea"
], ['a', ItemID.ingotCopper, 0, 'b', VanillaItemID.iron_ingot, 0, 'c', VanillaBlockID.furnace, 0, 'e', BlockID.AluminumWire, 0]);

Recipes.addShaped({id: BlockID.compressor_gj, count: 1, data: 0}, [
    "baf",
    "aca",
    "aea"
], ['a', ItemID.ingot_aluminum_sc, 0, 'b', VanillaBlockID.anvil, 0, 'c', ItemID.ingotCopper, 0, 'e', ItemID.wafer_basic, 0,'f',BlockID.mekanism_block_ports,0]);


















Recipes.addShaped({id: BlockID.block_tin_sc, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.plateTin, 0]);
Recipes.addShaped({id: BlockID.block_copper_sc, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.plateCopper, 0]);

Recipes.addShaped({id: ItemID.ingotTin, count: 1, data: 0}, [
    "",
    " a ",
    ""
], ['a', ItemID.ingot_tin_sc, 0]);

Recipes.addShaped({id: ItemID.ingot_tin_sc, count: 1, data: 0}, [
    "",
    " a ",
    ""
], ['a', ItemID.ingotTin, 0]);

Recipes.addShaped({id: ItemID.compressed_iron, count: 1, data: 0}, [
    "",
    " a ",
    ""
], ['a', ItemID.plateIron, 0]);

Recipes.addShaped({id: ItemID.plateIron, count: 1, data: 0}, [
    "",
    " a ",
    ""
], ['a', ItemID.compressed_iron, 0]);

Recipes.addShaped({id: ItemID.plateTin, count: 1, data: 0}, [
    "",
    " a ",
    ""
], ['a', ItemID.compressed_tin, 0]);

Recipes.addShaped({id: ItemID.compressed_tin, count: 1, data: 0}, [
    "",
    " a ",
    ""
], ['a', ItemID.plateTin, 0]);

Recipes.addShaped({id: ItemID.compressed_copper, count: 1, data: 0}, [
    "",
    " a ",
    ""
], ['a', ItemID.plateCopper, 0]);

Recipes.addShaped({id: ItemID.plateCopper, count: 1, data: 0}, [
    "",
    " a ",
    ""
], ['a', ItemID.compressed_copper, 0]);

Recipes.addShaped({id: ItemID.compressed_bronze, count: 1, data: 0}, [
    "",
    " a ",
    ""
], ['a', ItemID.plateBronze, 0]);

Recipes.addShaped({id: ItemID.plateBronze, count: 1, data: 0}, [
    "",
    " a ",
    ""
], ['a', ItemID.compressed_bronze, 0]);

Recipes.addShaped({id: ItemID.iron_steel_ingot, count: 1, data: 0}, [
    "",
    "ab",
    ""
], ['a', ItemID.ingotSteel, 0, 'b', VanillaItemID.iron_ingot, 0]);

Recipes.addShaped({ id: BlockID.primalGenerator, count: 1, data: 0 }, [
        " x ",
        "###",
        " a "
    ], ['#', ItemID.compressed_iron, 0, 'a', BlockID.ironFurnace, -1, 'x', ItemID.storageBattery, -1]);
    
    Recipes.addShaped({ id: BlockID.geothermalGenerator, count: 1, data: 0 }, [

        "xax",

        "xax",

        "b#b"

    ], ['#', BlockID.coal_generator, -1, 'a', ItemID.cellEmpty, 0, 'b', ItemID.casingIron, 0, 'x', 20, -1]);
    
    Recipes.addShaped({ id: BlockID.genWindmill, count: 1, data: 0 }, [

        "x x",

        " # ",

        "xcx"

    ], ['#', BlockID.coal_generator, -1, 'x', ItemID.compressed_steel, 0, 'c', ItemID.coil, 0]);
    
    Recipes.addShaped({ id: BlockID.genWindmill, count: 1, data: 0 }, [

        "x x",

        " # ",

        "xcx"

    ], ['#', BlockID.coal_generator, -1, 'x', ItemID.plateSteel, 0, 'c', ItemID.coil, 0]);
    
    Recipes.addShaped({ id: BlockID.genWindmill, count: 1, data: 0 }, [

        "x x",

        " # ",

        "xcx"

    ], ['#', BlockID.primalGenerator, -1, 'x', ItemID.compressed_steel, 0, 'c', ItemID.coil, 0]);
    
    Recipes.addShaped({ id: BlockID.genWatermill, count: 1, data: 0 }, [

        "x x",

        "a#a",

        "xcx"

    ], ['#', BlockID.coal_generator, -1, 'x', ItemID.compressed_steel, 0, 'a', ItemID.casingSteel, 0, 'c', ItemID.coil, 0]);
    
    Recipes.addShaped({ id: BlockID.genWatermill, count: 1, data: 0 }, [

        "x x",

        "a#a",

        "xcx"

    ], ['#', BlockID.coal_generator, -1, 'x', ItemID.plateSteel, 0, 'a', ItemID.casingSteel, 0, 'c', ItemID.coil, 0]);
    
    Recipes.addShaped({ id: BlockID.genWatermill, count: 1, data: 0 }, [

        "x x",

        "a#a",

        "xcx"

    ], ['#', BlockID.primalGenerator, -1, 'x', ItemID.plateSteel, 0, 'a', ItemID.compressed_steel, 0, 'c', ItemID.coil, 0]);
    
    Recipes.addShaped({ id: BlockID.rtGenerator, count: 1, data: 0 }, [

        "ccc",

        "c#c",

        "cxc"

    ], ['#', BlockID.reactorChamber, 0, 'x', BlockID.coal_generator, 0, 'c', ItemID.casingIron, 0]);
    
    Recipes.addShaped({ id: BlockID.stirlingGenerator, count: 1, data: 0 }, [

        "cxc",

        "c#c",

        "ccc"

    ], ['#', BlockID.coal_generator, 0, 'c', ItemID.casingIron, 0, 'x', ItemID.heatConductor, 0]);

Recipes.addShaped({ id: BlockID.electricHeatGenerator, count: 1, data: 0 }, [

        "xbx",

        "x#x",

        "xax"

    ], ['#', ItemID.circuitBasic, 0, 'x', ItemID.casingIron, 0, 'a', ItemID.heatConductor, 0, 'b', ItemID.battery, -1]);
    
    Recipes.addShaped({ id: BlockID.nuclearReactor, count: 1, data: 0 }, [

        "xcx",

        "aaa",

        "x#x"

    ], ['#', BlockID.coal_generator, 0, 'a', BlockID.reactorChamber, 0, 'x', ItemID.densePlateLead, 0, 'c', ItemID.circuitAdvanced, 0]);
    
    Recipes.addShaped({ id: BlockID.storageBatBox, count: 1, data: 0 }, [

        "xax",

        "bbb",

        "xxx"

    ], ['a', ItemID.cableTin1, 0, 'x', 5, -1, 'b', ItemID.battery, -1]);
    
    Recipes.addShaped({ id: BlockID.storageCESU, count: 1, data: 0 }, [

        "bxb",

        "aaa",

        "bbb"

    ], ['x', ItemID.cableCopper1, 0, 'a', ItemID.storageAdvBattery, -1, 'b', ItemID.compressed_bronze, 0]);
    
    Recipes.addShaped({ id: BlockID.storageCESU, count: 1, data: 0 }, [

        "bxb",

        "aaa",

        "bbb"

    ], ['x', BlockID.CopperWire, 0, 'a', ItemID.storageAdvBattery, -1, 'b', ItemID.plateBronze, 0]);
    
    Recipes.addShaped({ id: BlockID.storageCESU, count: 1, data: 0 }, [

        "bxb",

        "aaa",

        "bbb"

    ], ['x', BlockID.CopperWire, 0, 'a', ItemID.storageAdvBattery, -1, 'b', ItemID.compressed_bronze, 0]);
    
    Recipes.addShaped({ id: BlockID.transformerMV, count: 1, data: 0 }, [

        "b",

        "x",

        "b"

    ], ['x', BlockID.machineBlockBasic, 0, 'b', BlockID.CopperWire, 0]);
    
    Recipes.addShaped({ id: BlockID.ironFurnace, count: 1, data: 0 }, [

        " x ",

        "x x",

        "x#x"

    ], ['#', 61, -1, 'x', ItemID.compressed_iron, 0]);
    
    Recipes.addShaped({ id: BlockID.inductionFurnace, count: 1, data: 0 }, [

        "xxx",

        "x#x",

        "xax"

    ], ['#', BlockID.electricFurnace, -1, 'x', ItemID.copper_ingot_sc, 0, 'a', BlockID.machineBlockAdvanced, 0]);
    
    Recipes.addShaped({ id: BlockID.solidCanner, count: 1, data: 0 }, [

        "c#c",

        "cxc",

        "ccc"

    ], ['#', BlockID.machineBlockBasic, 0, 'x', ItemID.circuitBasic, 0, 'c', ItemID.canister_tin, 0]);
    
    Recipes.addShaped({ id: BlockID.recycler, count: 1, data: 0 }, [

        " a ",

        "x#x",

        "bxb"

    ], ['#', BlockID.compressor, -1, 'x', 3, -1, 'a', 348, 0, 'b', ItemID.compressed_steel, 0]);
    
    Recipes.addShaped({ id: BlockID.oreWasher, count: 1, data: 0 }, [

        "aaa",

        "b#b",

        "xcx"

    ], ['#', BlockID.machineBlockBasic, 0, 'x', ItemID.electricMotor, 0, 'a', ItemID.compressed_iron, 0, 'b', 325, 0, 'c', ItemID.circuitBasic, 0]);
    
    Recipes.addShaped({ id: BlockID.cropHarvester, count: 1, data: 0 }, [

        "zcz",

        "s#s",

        "pap"

    ], ['#', BlockID.machineBlockBasic, 0, 'z', ItemID.circuitBasic, 0, 'c', 54, -1, 'a', ItemID.agriculturalAnalyzer, 0, 'p', ItemID.compressed_iron, 0, 's', 359, 0]);

Recipes.addShaped({ id: ItemID.ingotAlloy, count: 2, data: 0 }, [

        "aaa",

        "bbb",

        "ccc"

    ], ['a', ItemID.compressed_iron, -1, 'b', ItemID.plateBronze, -1, 'c', ItemID.plateTin, -1]);
    
    Recipes.addShaped({ id: ItemID.ingotAlloy, count: 2, data: 0 }, [

        "aaa",

        "bbb",

        "ccc"

    ], ['a', ItemID.ironPlate, -1, 'b', ItemID.compressed_bronze, -1, 'c', ItemID.plateTin, -1]);
    
    Recipes.addShaped({ id: ItemID.ingotAlloy, count: 2, data: 0 }, [

        "aaa",

        "bbb",

        "ccc"

    ], ['a', ItemID.ironPlate, -1, 'b', ItemID.plateBronze, -1, 'c', ItemID.compressed_tin, -1]);
    
    Recipes.addShaped({ id: ItemID.ingotAlloy, count: 2, data: 0 }, [

        "aaa",

        "bbb",

        "ccc"

    ], ['a', ItemID.compressed_iron, -1, 'b', ItemID.compressed_bronze, -1, 'c', ItemID.compressed_tin, -1]);
    
    Recipes.addShaped({ id: ItemID.ingotAlloy, count: 2, data: 0 }, [

        "aaa",

        "bbb",

        "ccc"

    ], ['a', ItemID.compressed_iron, -1, 'b', ItemID.compressed_bronze, -1, 'c', ItemID.plateTin, -1]);
    
    Recipes.addShaped({ id: ItemID.ingotAlloy, count: 2, data: 0 }, [

        "aaa",

        "bbb",

        "ccc"

    ], ['a', ItemID.IronPlate, -1, 'b', ItemID.compressed_bronze, -1, 'c', ItemID.compressed_tin, -1]);
    
    Recipes.addShaped({ id: 66, count: 12, data: 0 }, [

        "a a",

        "axa",

        "a a"

    ], ['x', 280, -1, 'a', ItemID.compressed_bronze, -1]);
    
    Recipes.addShaped({ id: 33, count: 1, data: 0 }, [

        "ppp",

        "cbc",

        "cxc"

    ], ['x', 331, -1, 'b', ItemID.compressed_bronze, -1, 'c', 4, -1, 'p', 5, -1]);
    
    Recipes.addShaped({ id: ItemID.cellEmpty, count: 1, data: 0 }, [

    " x ",

    "xgx",

    " x "

], ['x', ItemID.canister_tin, 0, 'g', 102, 0]);

Recipes.addShaped({ id: ItemID.circuitBasic, count: 1, data: 0 }, [

        "xxx",

        "a#a",

        "xxx"

    ], ['x', ItemID.cableCopper1, 0, 'a', 331, 0, '#', ItemID.compressed_iron, 0]);
    
    Recipes.addShaped({ id: ItemID.coil, count: 1, data: 0 }, [

        "aaa",

        "axa",

        "aaa"

    ], ['x', 265, 0, 'a', BlockID.CopperWire, 0]);
    
    Recipes.addShaped({ id: ItemID.electricMotor, count: 1, data: 0 }, [

        " b ",

        "axa",

        " b "

    ], ['x', 265, 0, 'a', ItemID.coil, 0, 'b', ItemID.canister_tin, 0]);
    
    Recipes.addShaped({ id: ItemID.powerUnit, count: 1, data: 0 }, [

        "acs",

        "axe",

        "acs"

    ], ['x', ItemID.circuitBasic, 0, 'e', ItemID.electricMotor, 0, 'a', ItemID.battery, -1, 's', ItemID.casingIron, 0, 'c',BlockID.CopperWire, 0]);
    
    Recipes.addShaped({ id: ItemID.powerUnit, count: 1, data: 0 }, [

        "acs",

        "axe",

        "acs"

    ], ['x', ItemID.circuitBasic, 0, 'e', ItemID.electricMotor, 0, 'a', ItemID.battery, -1, 's', ItemID.casingIron, 0, 'c', ItemID.cableCopper0, 0]);
    
    Recipes.addShaped({ id: ItemID.powerUnit, count: 1, data: 0 }, [

        "acs",

        "axe",

        "acs"

    ], ['x', ItemID.circuitBasic, 0, 'e', ItemID.electricMotor, 0, 'a', ItemID.storageBattery, -1, 's', ItemID.casingIron, 0, 'c', BlockID.CopperWire, 0]);
    
    Recipes.addShaped({ id: ItemID.heatConductor, count: 1, data: 0 }, [

        "aсa",

        "aсa",

        "aсa"

    ], ['с', ItemID.compressed_copper, 0, 'a', ItemID.rubber, 0]);
    
    Recipes.addShaped({ id: ItemID.battery, count: 1, data: Item.getMaxDamage(ItemID.battery) }, [

        " x ",

        "c#c",

        "c#c"

    ], ['x', ItemID.cableTin1, 0, 'c', ItemID.casingTin, 0, '#', 331, 0]);
    
    Recipes.addShaped({ id: ItemID.upgradeEnergyStorage, count: 1, data: 0 }, [

        "aaa",

        "x#x",

        "aca"

    ], ['#', ItemID.battery, -1, 'x', ItemID.cableCopper1, -1, 'a', 5, -1, 'c', ItemID.circuitBasic, -1]);
    
    Recipes.addShaped({ id: ItemID.upgradeRedstone, count: 1, data: 0 }, [

        "x x",

        " # ",

        "x x",

    ], ['x', ItemID.compressed_tin, -1, '#', 69, -1]);
    
    Recipes.addShaped({ id: ItemID.upgradeEjector, count: 1, data: 0 }, [

        "aba",

        "x#x",

    ], ['#', ItemID.circuitBasic, -1, 'x', BlockID.ImprovedCopperWire, -1, 'a', 33, -1, 'b', 410, 0]);
    
    Recipes.addShaped({ id: ItemID.upgradePulling, count: 1, data: 0 }, [

        "aba",

        "x#x",

    ], ['#', ItemID.circuitBasic, -1, 'x', BlockID.ImprovedCopperWire, -1, 'a', 29, -1, 'b', 410, 0]);
    
    Recipes.addShaped({ id: ItemID.upgradeFluidEjector, count: 1, data: 0 }, [

        "x x",

        " # ",

        "x x",

    ], ['x', ItemID.compressed_tin, -1, '#', ItemID.electricMotor, -1]);
    
    Recipes.addShaped({ id: ItemID.upgradeFluidPulling, count: 1, data: 0 }, [

        "xcx",

        " # ",

        "x x",

    ], ['x', ItemID.compressed_tin, -1, '#', ItemID.electricMotor, -1, 'c', ItemID.treetap, 0]);
    
    Recipes.addShaped({ id: ItemID.fuelRodUranium2, count: 1, data: 0 }, [

    "fxf"

], ['x', ItemID.compressed_iron, 0, 'f', ItemID.fuelRodUranium, 0]);

Recipes.addShaped({ id: ItemID.fuelRodUranium4, count: 1, data: 0 }, [

    " f ",

    "bab",

    " f "

], ['a', ItemID.compressed_iron, 0, 'b', ItemID.compressed_copper, 0, 'f', ItemID.fuelRodUranium2, 0]);

Recipes.addShaped({ id: ItemID.fuelRodUranium4, count: 1, data: 0 }, [

    " f ",

    "bab",

    " f "

], ['a', ItemID.compressed_iron, 0, 'b', ItemID.plateCopper, 0, 'f', ItemID.fuelRodUranium2, 0]);

Recipes.addShaped({ id: ItemID.fuelRodUranium4, count: 1, data: 0 }, [

    " f ",

    "bab",

    " f "

], ['a', ItemID.plateIron, 0, 'b', ItemID.compressed_copper, 0, 'f', ItemID.fuelRodUranium2, 0]);

Recipes.addShaped({ id: ItemID.fuelRodUranium4, count: 1, data: 0 }, [

    "faf",

    "bab",

    "faf"

], ['a', ItemID.compressed_iron, 0, 'b', ItemID.compressed_copper, 0, 'f', ItemID.fuelRodUranium, 0]);

Recipes.addShaped({ id: ItemID.fuelRodUranium4, count: 1, data: 0 }, [

    "faf",

    "bab",

    "faf"

], ['a', ItemID.compressed_iron, 0, 'b', ItemID.plateCopper, 0, 'f', ItemID.fuelRodUranium, 0]);

Recipes.addShaped({ id: ItemID.fuelRodUranium4, count: 1, data: 0 }, [

    "faf",

    "bab",

    "faf"

], ['a', ItemID.plateIron, 0, 'b', ItemID.compressed_copper, 0, 'f', ItemID.fuelRodUranium, 0]);

Recipes.addShaped({ id: ItemID.fuelRodMOX2, count: 1, data: 0 }, [

    "fxf"

], ['x', ItemID.compressed_iron, 0, 'f', ItemID.fuelRodMOX, 0]);

Recipes.addShaped({ id: ItemID.fuelRodMOX4, count: 1, data: 0 }, [

    " f ",

    "bab",

    " f "

], ['a', ItemID.compressed_iron, 0, 'b', ItemID.compressed_copper, 0, 'f', ItemID.fuelRodMOX2, 0]);

Recipes.addShaped({ id: ItemID.fuelRodMOX4, count: 1, data: 0 }, [

    " f ",

    "bab",

    " f "

], ['a', ItemID.compressed_iron, 0, 'b', ItemID.plateCopper, 0, 'f', ItemID.fuelRodMOX2, 0]);

Recipes.addShaped({ id: ItemID.fuelRodMOX4, count: 1, data: 0 }, [

    " f ",

    "bab",

    " f "

], ['a', ItemID.plateIron, 0, 'b', ItemID.compressed_copper, 0, 'f', ItemID.fuelRodMOX2, 0]);

Recipes.addShaped({ id: ItemID.reactorPlatingHeat, count: 1, data: 0 }, [

    "aaa",

    "axa",

    "aaa"

], ['x', ItemID.reactorPlating, 0, 'a', ItemID.compressed_copper, 0]);

Recipes.addShaped({ id: ItemID.neutronReflector, count: 1, data: 0 }, [

    "bab",

    "axa",

    "bab"

], ["x", ItemID.compressed_copper, 0, 'a', ItemID.dustCoal, 0, 'b', ItemID.dustTin, 0]);

Recipes.addShaped({ id: ItemID.neutronReflectorThick, count: 1, data: 0 }, [

    "axa",

    "xax",

    "axa"

], ["x", ItemID.neutronReflector, 0, 'a', ItemID.compressed_copper, 0]);

Recipes.addShaped({ id: ItemID.coolantCell, count: 1, data: 1 }, [

    " a ",

    "axa",

    " a ",

], ['x', ItemID.cellCoolant, 0, 'a', ItemID.compressed_tin, 0]);

Recipes.addShaped({ id: ItemID.coolantCell3, count: 1, data: 1 }, [

    "axa",

    "axa",

    "axa",

], ['x', ItemID.coolantCell, 1, 'a', ItemID.compressed_tin, 0]);

Recipes.addShaped({ id: ItemID.coolantCell3, count: 1, data: 1 }, [

    "aaa",

    "xxx",

    "aaa",

], ['x', ItemID.coolantCell, 1, 'a', ItemID.compressed_tin, 0]);

Recipes.addShaped({ id: ItemID.coolantCell6, count: 1, data: 1 }, [

    "aaa",

    "xbx",

    "aaa",

], ['x', ItemID.coolantCell3, 1, 'a', ItemID.compressed_tin, 0, 'b', ItemID.compressed_iron, 0]);

Recipes.addShaped({ id: ItemID.coolantCell6, count: 1, data: 1 }, [

    "aaa",

    "xbx",

    "aaa",

], ['x', ItemID.coolantCell3, 1, 'a', ItemID.plateTin, 0, 'b', ItemID.compressed_iron, 0]);

Recipes.addShaped({ id: ItemID.coolantCell6, count: 1, data: 1 }, [

    "aaa",

    "xbx",

    "aaa",

], ['x', ItemID.coolantCell3, 1, 'a', ItemID.compressed_tin, 0, 'b', ItemID.plateIron, 0]);

Recipes.addShaped({ id: ItemID.coolantCell6, count: 1, data: 1 }, [

    "axa",

    "aba",

    "axa",

], ['x', ItemID.coolantCell3, 1, 'a', ItemID.compressed_tin, 0, 'b', ItemID.compressed_iron, 0]);

Recipes.addShaped({ id: ItemID.coolantCell6, count: 1, data: 1 }, [

    "axa",

    "aba",

    "axa",

], ['x', ItemID.coolantCell3, 1, 'a', ItemID.plateTin, 0, 'b', ItemID.compressed_iron, 0]);

Recipes.addShaped({ id: ItemID.coolantCell6, count: 1, data: 1 }, [

    "axa",

    "aba",

    "axa",

], ['x', ItemID.coolantCell3, 1, 'a', ItemID.compressed_tin, 0, 'b', ItemID.plateIron, 0]);

Recipes.addShaped({ id: ItemID.heatExchangerReactor, count: 1, data: 1 }, [

    "aaa",

    "axa",

    "aaa"

], ['x', ItemID.heatExchanger, 1, 'a', ItemID.compressed_copper, 0]);

Recipes.addShaped({ id: ItemID.heatVent, count: 1, data: 1 }, [

    "bab",

    "axa",

    "bab"

], ['x', ItemID.electricMotor, 0, 'a', ItemID.compressed_iron, 0, 'b', 101, -1]);

Recipes.addShaped({ id: ItemID.heatVentComponent, count: 1, data: 0 }, [

    "bab",

    "axa",

    "bab"

], ['x', ItemID.heatVent, 1, 'a', ItemID.compressed_tin, 0, 'b', 101, -1]);

Recipes.addShaped({ id: ItemID.bronzeHelmet, count: 1, data: 0 }, [

    "xxx",

    "x x"

], ['x', ItemID.compressed_bronze, 0]);

Recipes.addShaped({ id: ItemID.bronzeChestplate, count: 1, data: 0 }, [

    "x x",

    "xxx",

    "xxx"

], ['x', ItemID.compressed_bronze, 0]);

Recipes.addShaped({ id: ItemID.bronzeLeggings, count: 1, data: 0 }, [

    "xxx",

    "x x",

    "x x"

], ['x', ItemID.compressed_bronze, 0]);

Recipes.addShaped({ id: ItemID.bronzeBoots, count: 1, data: 0 }, [

    "x x",

    "x x"

], ['x', ItemID.compressed_bronze, 0]);

Recipes.addShaped({ id: ItemID.jetpack, count: 1, data: ELECTRIC_ITEM_MAX_DAMAGE }, [

    "bcb",

    "bab",

    "d d"

], ['a', BlockID.battery, -1, 'b', ItemID.casingIron, 0, 'c', ItemID.circuitAdvanced, 0, 'd', 348, 0]);

Recipes.addShaped({ id: ItemID.advBatpack, count: 1, data: ELECTRIC_ITEM_MAX_DAMAGE }, [

    "bcb",

    "bab",

    "b b"

], ['a', ItemID.compressed_bronze, 0, 'b', ItemID.storageAdvBattery, -1, 'c', ItemID.circuitBasic, 0], ChargeItemRegistry.transferEnergy);

Recipes.addShaped({ id: ItemID.solarHelmet, count: 1, data: 0 }, [

    "aaa",

    "axa",

    "ccc"

], ['x', BlockID.solarPanel, -1, 'a', VanillaItemID.iron_ingot, 0, 'c', BlockID.ImprovedCopperWire, 0]);

Recipes.addShaped({ id: ItemID.cutter, count: 1, data: 0 }, [

        "x x",

        " x ",

        "a a"

    ], ['a', 265, 0, 'x', ItemID.compressed_iron, 0]);
    
    Recipes.addShaped({ id: ItemID.bronzeSword, count: 1, data: 0 }, [

        "a",

        "a",

        "b"

    ], ['a', ItemID.compressed_bronze, 0, 'b', 280, 0]);
    
    Recipes.addShaped({ id: ItemID.bronzeShovel, count: 1, data: 0 }, [

        "a",

        "b",

        "b"

    ], ['a', ItemID.compressed_bronze, 0, 'b', 280, 0]);
    
    Recipes.addShaped({ id: ItemID.bronzePickaxe, count: 1, data: 0 }, [

        "aaa",

        " b ",

        " b "

    ], ['a', ItemID.compressed_bronze, 0, 'b', 280, 0]);
    
    Recipes.addShaped({ id: ItemID.bronzeAxe, count: 1, data: 0 }, [

        "aa",

        "ab",

        " b"

    ], ['a', ItemID.compressed_bronze, 0, 'b', 280, 0]);
    
    Recipes.addShaped({ id: ItemID.bronzeHoe, count: 1, data: 0 }, [

        "aa",

        " b",

        " b"

    ], ['a', ItemID.compressed_bronze, 0, 'b', 280, 0]);

Recipes.addShaped({ id: ItemID.EUMeter, count: 1, data: 0 }, [

        " g ",

        "xcx",

        "x x"

    ], ['c', ItemID.circuitBasic, 0, 'x', BlockID.ImprovedCopperWire, 0, 'g', 348, -1]);
    
    Recipes.addShaped({ id: ItemID.freqTransmitter, count: 1, data: 0 }, [

        "x",

        "#",

        "b"

    ], ['#', ItemID.circuitBasic, 0, 'x', BlockID.ImprovedCopperWire, 0, 'b', ItemID.casingIron, 0]);
    
    Recipes.addShaped({ id: ItemID.scanner, count: 1, data: 27 }, [

        "gdg",

        "cbc",

        "xxx"

    ], ['x', ItemID.cableCopper1, -1, 'b', ItemID.battery, -1, 'c', ItemID.circuitBasic, -1, 'd', 348, 0, 'g', ItemID.casingGold, -1], ChargeItemRegistry.transferEnergy);
    
    Recipes.addShaped({ id: ItemID.scanner, count: 1, data: 27 }, [

        "gdg",

        "cbc",

        "xxx"

    ], ['x', BlockID.ImprovedCopperWire, -1, 'b', ItemID.storageBattery, -1, 'c', ItemID.circuitBasic, -1, 'd', 348, 0, 'g', ItemID.casingGold, -1], ChargeItemRegistry.transferEnergy);
    
    Recipes.addShaped({ id: ItemID.scanner, count: 1, data: 27 }, [

        "gdg",

        "cbc",

        "xxx"

    ], ['x', BlockID.ImprovedCopperWire, -1, 'b', ItemID.battery, -1, 'c', ItemID.circuitBasic, -1, 'd', 348, 0, 'g', ItemID.casingGold, -1], ChargeItemRegistry.transferEnergy);
    
    Recipes.addShaped({ id: ItemID.bronzeWrench, count: 1, data: 0 }, [

        "a a",

        "aaa",

        " a "

    ], ['a', ItemID.compressed_bronze, 0]);
    
    Recipes.addShaped({ id: ItemID.electricHoe, count: 1, data: 27 }, [

        "pp",

        " p",

        " x"

    ], ['x', ItemID.powerUnitSmall, 0, 'p', ItemID.compressed_iron, 0]);
    
    Recipes.addShaped({ id: ItemID.chainsaw, count: 1, data: 27 }, [

        " pp",

        "ppp",

        "xp "

    ], ['x', ItemID.powerUnit, 0, 'p', ItemID.compressed_iron, 0]);
    
    Recipes.addShaped({ id: ItemID.drill, count: 1, data: 27 }, [

        " p ",

        "ppp",

        "pxp"

    ], ['x', ItemID.powerUnit, 0, 'p', ItemID.compressed_iron, 0]);
    
    Recipes.addShaped({ id: ItemID.agriculturalAnalyzer, count: 1, data: 0 }, [

        "xx ",

        "rgr",

        "rcr"

    ], ['x', BlockID.ImprovedCopperWire, 0, 'r', 331, 0, 'g', 20, 0, "c", ItemID.circuitBasic, 0]);
    
    Recipes.addShaped({ id: BlockID.blockBronze, count: 1, data: 0 }, [

        "xxx",

        "xxx",

        "xxx"

    ], ['x', ItemID.compressed_bronze, 0]);
    
    Recipes.addShaped({ id: BlockID.machineBlockBasic, count: 1, data: 0 }, [

        "xxx",

        "x x",

        "xxx"

    ], ['x', ItemID.compressed_iron, -1]);
    
    Recipes.addShaped({ id: BlockID.machineBlockAdvanced, count: 1, data: 0 }, [

        "scs",

        "a#a",

        "scs"

    ], ['#', BlockID.machineBlockBasic, -1, 'c', ItemID.carbonPlate, -1, 'a', ItemID.plateAlloy, -1, 's', ItemID.compressed_steel, -1]);
    
    Recipes.addShaped({ id: BlockID.miningPipe, count: 8, data: 0 }, [

        "p p",

        "p p",

        "pxp",

    ], ['x', ItemID.treetap, 0, 'p', ItemID.compressed_iron, 0]);
    
    
    Recipes.addShaped({ id: BlockID.tank, count: 1, data: 0 }, [
        " c ",
        "c#c",
        " c "
    ], ['#', BlockID.mekanism_block, 0, 'c', ItemID.cellEmpty, 0]);
    
    Recipes.addShaped({ id: BlockID.tank, count: 1, data: 0 }, [
        " c ",
        "c#c",
        " c "
    ], ['#', BlockID.mekanism_block, 0, 'c', ItemID.empty_liquid_canister, 0]);
    
    Recipes.addShaped({ id: BlockID.tank, count: 1, data: 0 }, [
        " c ",
        "c#c",
        " c "
    ], ['#', BlockID.machineBlockBasic, 0, 'c', ItemID.empty_liquid_canister, 0]);
    
       Recipes.addShaped({ id: BlockID.miner, count: 1, data: 0 }, [
        "x#x",
        " b ",
        " b "
    ], ['#', BlockID.mekanism_block, 0, 'x', ItemID.circuitBasic, 0, 'b', BlockID.miningPipe, 0]);
    
       
      Recipes.addShaped({ id: BlockID.cropHarvester, count: 1, data: 0 }, [
        "zcz",
        "s#s",
        "pap"
    ], ['#', BlockID.mekanism_block, 0, 'z', ItemID.circuitBasic, 0, 'c', 54, -1, 'a', ItemID.agriculturalAnalyzer, 0, 'p', ItemID.plateIron, 0, 's', 359, 0]);
    
    Recipes.addShaped({ id: BlockID.cropHarvester, count: 1, data: 0 }, [
        "zcz",
        "s#s",
        "pap"
    ], ['#', BlockID.mekanism_block, 0, 'z', ItemID.circuitBasic, 0, 'c', 54, -1, 'a', ItemID.agriculturalAnalyzer, 0, 'p', ItemID.compressed_iron, 0, 's', 359, 0]);
    
    Recipes.addShaped({ id: BlockID.cropMatron, count: 1, data: 0 }, [
        "cxc",
        "a#a",
        "nnn"
    ], ['#', BlockID.machineBlockBasic, 0, 'x', 54, -1, 'c', ItemID.circuitBasic, 0, 'a', ItemID.empty_liquid_canister, 0, 'n', ItemID.cropStick, 0]);
    
    Recipes.addShaped({ id: BlockID.cropMatron, count: 1, data: 0 }, [
        "cxc",
        "a#a",
        "nnn"
    ], ['#', BlockID.mekanism_block, 0, 'x', 54, -1, 'c', ItemID.circuitBasic, 0, 'a', ItemID.cellEmpty, 0, 'n', ItemID.cropStick, 0]);
    
    Recipes.addShaped({ id: BlockID.cropMatron, count: 1, data: 0 }, [
        "cxc",
        "a#a",
        "nnn"
    ], ['#', BlockID.mekanism_block, 0, 'x', 54, -1, 'c', ItemID.circuitBasic, 0, 'a', ItemID.empty_liquid_canister, 0, 'n', ItemID.cropStick, 0]);
    
      

    Recipes.addShaped({ id: ItemID.quantumLeggings, count: 1, data: ELECTRIC_ITEM_MAX_DAMAGE }, [
    "m#m",
    "axa",
    "c c"
], ['#', ItemID.storageLapotronCrystal, -1, 'x', ItemID.nanoLeggings, -1, 'a', ItemID.plateReinforcedIridium, 0, 'm', BlockID.mekanism_block, 0, 'c', 348, 0], ChargeItemRegistry.transferEnergy);


    Recipes.addShaped({ id: BlockID.machineBlockAdvanced, count: 1, data: 0 }, [
        "scs",
        "a#a",
        "scs"
    ], ['#', BlockID.mekanism_block, -1, 'c', ItemID.carbonPlate, -1, 'a', ItemID.plateAlloy, -1, 's', ItemID.plateSteel, -1]);
    
    Recipes.addShaped({ id: BlockID.machineBlockAdvanced, count: 1, data: 0 }, [
        "scs",
        "a#a",
        "scs"
    ], ['#', BlockID.mekanism_block, -1, 'c', ItemID.carbonPlate, -1, 'a', ItemID.plateAlloy, -1, 's', ItemID.compressed_steel, -1]);
    
    Recipes.addShaped({ id: BlockID.machineBlockAdvanced, count: 1, data: 0 }, [
        "scs",
        "a#a",
        "scs"
    ], ['#', BlockID.machineBlockBasic, -1, 'c', ItemID.carbonPlate, -1, 'a', ItemID.plateAlloy, -1, 's', ItemID.compressed_steel, -1]);
    
    Recipes.addShapeless({ id: ItemID.compressed_iron, count: 8, data: 0 }, [{ id: BlockID.machineBlockBasic, data: 0 }]);
});

    Recipes.addShaped({ id: BlockID.primalGenerator, count: 1, data: 0 }, [
        "x",
        "#",
        "a"
    ], ['#', BlockID.machineBlockBasic, 0, 'a', 61, 0, 'x', ItemID.battery, -1]);
    
        Recipes.addShaped({ id: BlockID.primalGenerator, count: 1, data: 0 }, [
        "x",
        "#",
        "a"
    ], ['#', BlockID.mekanism_block, 0, 'a', 61, 0, 'x', ItemID.storageBattery, -1]);
    
    Recipes.addShaped({ id: BlockID.primalGenerator, count: 1, data: 0 }, [
        "x",
        "#",
        "a"
    ], ['#', BlockID.mekanism_block, 0, 'a', 61, 0, 'x', ItemID.battery, -1]);
    
    Recipes.addShaped({ id: BlockID.semifluidGenerator, count: 1, data: 0 }, [
        "pcp",
        "cxc",
        "pcp"
    ], ['x', BlockID.machineBlockBasic, 0, 'c', ItemID.empty_liquid_canister, 0, 'p', ItemID.casingIron, 0]);
    
    Recipes.addShaped({ id: BlockID.semifluidGenerator, count: 1, data: 0 }, [
        "pcp",
        "cxc",
        "pcp"
    ], ['x', BlockID.mekanism_block, 0, 'c', ItemID.cellEmpty, 0, 'p', ItemID.casingIron, 0]);
    
    Recipes.addShaped({ id: BlockID.semifluidGenerator, count: 1, data: 0 }, [
        "pcp",
        "cxc",
        "pcp"
    ], ['x', BlockID.mekanism_block, 0, 'c', ItemID.empty_liquid_canister, 0, 'p', ItemID.casingIron, 0]);
    
    if (IC2Config.hardRecipes) {
        Recipes.addShaped({ id: BlockID.solarPanel, count: 1, data: 0 }, [
            "aaa",
            "xxx",
            "b#b"
        ], ['#', BlockID.mekanism_block, 0, 'x', ItemID.dustLapis, 0, 'b', ItemID.circuitBasic, 0, 'a', 20, -1]);
    }
    else {
        Recipes.addShaped({ id: BlockID.solarPanel, count: 1, data: 0 }, [
            "aaa",
            "xxx",
            "b#b"
        ], ['#', BlockID.mekanism_block, 0, 'x', ItemID.dustCoal, 0, 'b', ItemID.circuitBasic, 0, 'a', 20, -1]);
    }
    
    Recipes.addShaped({ id: BlockID.solidHeatGenerator, count: 1, data: 0 }, [
        "a",
        "x",
        "f"
    ], ['a', ItemID.heatConductor, 0, 'x', BlockID.mekanism_block, 0, 'f', 61, -1]);
    
    Recipes.addShaped({ id: BlockID.reactorChamber, count: 1, data: 0 }, [
        " x ",
        "x#x",
        " x "
    ], ['#', BlockID.mekanism_block, 0, 'x', ItemID.plateLead, 0]);
    
    Recipes.addShaped({ id: BlockID.reactorChamber, count: 1, data: 0 }, [
        " x ",
        "x#x",
        " x "
    ], ['#', BlockID.machineBlockBasic, 0, 'x', ItemID.compressed_lead, 0]);
    
    Recipes.addShaped({ id: BlockID.reactorChamber, count: 1, data: 0 }, [
        " x ",
        "x#x",
        " x "
    ], ['#', BlockID.mekanism_block, 0, 'x', ItemID.compressed_lead, 0]);
    
    Recipes.addShaped({ id: BlockID.storageMFE, count: 1, data: 0 }, [
        "bab",
        "axa",
        "bab"
    ], ['x', BlockID.mekanism_block, 0, 'a', ItemID.storageCrystal, -1, 'b', ItemID.cableGold2, -1]);
    
 
    Recipes.addShaped({ id: BlockID.transformerMV, count: 1, data: 0 }, [
        "b",
        "x",
        "b"
    ], ['x', BlockID.mekanism_block, 0, 'b', ItemID.cableCopper1, 0]);
    
        if (IC2Config.hardRecipes) {
        Recipes.addShaped({ id: BlockID.macerator, count: 1, data: 0 }, [
            "xxx",
            "b#b",
            " a "
        ], ['#', BlockID.mekanism_block, -1, 'x', 264, -1, 'b', ItemID.circuitBasic, -1, 'a', ItemID.electricMotor, -1]);
    }
    else {
        Recipes.addShaped({ id: BlockID.macerator, count: 1, data: 0 }, [
            "xxx",
            "b#b",
            " a "
        ], ['#', BlockID.mekanism_block, -1, 'x', 318, -1, 'b', 4, -1, 'a', ItemID.circuitBasic, -1]);
    }
    
    if (IC2Config.hardRecipes) {
        Recipes.addShaped({ id: BlockID.compressor, count: 1, data: 0 }, [
            "p#p",
            "xax"
        ], ['#', BlockID.mekanism_block, -1, 'x', ItemID.circuitBasic, -1, 'a', ItemID.electricMotor, -1, 'p', VanillaBlockID.piston, -1]);
    }
    else {
        Recipes.addShaped({ id: BlockID.compressor, count: 1, data: 0 }, [
            "x x",
            "x#x",
            "xax"
        ], ['#', BlockID.mekanism_block, -1, 'x', 1, -1, 'a', ItemID.circuitBasic, -1]);
    }
    
    Recipes.addShaped({ id: BlockID.extractor, count: 1, data: 0 }, [
        "x#x",
        "xax"
    ], ['#', BlockID.mekanism_block, -1, 'x', ItemID.treetap, 0, 'a', ItemID.circuitBasic, -1]);
    
    Recipes.addShaped({ id: BlockID.solidCanner, count: 1, data: 0 }, [
        "c#c",
        "cxc",
        "ccc"
    ], ['#', BlockID.mekanism_block, 0, 'x', ItemID.circuitBasic, 0, 'c', ItemID.casingTin, 0]);
    
    
        
        Recipes.addShaped({ id: BlockID.oreWasher, count: 1, data: 0 }, [
        "aaa",
        "b#b",
        "xcx"
    ], ['#', BlockID.mekanism_block, 0, 'x', ItemID.electricMotor, 0, 'a', ItemID.plateIron, 0, 'b', 325, 0, 'c', ItemID.circuitBasic, 0]);
    
    Recipes.addShaped({ id: BlockID.oreWasher, count: 1, data: 0 }, [
        "aaa",
        "b#b",
        "xcx"
    ], ['#', BlockID.mekanism_block, 0, 'x', ItemID.electricMotor, 0, 'a', ItemID.compressed_iron, 0, 'b', 325, 0, 'c', ItemID.circuitBasic, 0]);
    
        Recipes.addShaped({ id: BlockID.thermalCentrifuge, count: 1, data: 0 }, [
        "cmc",
        "a#a",
        "axa"
    ], ['#', BlockID.machineBlockAdvanced, 0, 'x', ItemID.electricMotor, 0, 'a', 265, 0, 'm', ItemID.miningLaser, -1, 'c', ItemID.coil, 0]);
    
    Recipes.addShaped({ id: BlockID.blastFurnace, count: 1, data: 0 }, [
        "aaa",
        "asa",
        "axa"
    ], ['s', BlockID.mekanism_block, 0, 'a', ItemID.casingIron, 0, 'x', ItemID.heatConductor, 0]);

    Recipes.addShaped({ id: BlockID.pump, count: 1, data: 0 }, [
        "cxc",
        "c#c",
        "bab"
    ], ['#', BlockID.mekanism_block, 0, 'x', ItemID.circuitBasic, 0, 'a', ItemID.treetap, 0, 'b', BlockID.miningPipe, 0, 'c', ItemID.cellEmpty, 0]);
    
   Recipes.addShaped({ id: BlockID.fluidDistributor, count: 1, data: 0 }, [
        "a",
        "#",
        "c"
    ], ['#', BlockID.mekanism_block, 0, 'a', ItemID.upgradeFluidPulling, 0, 'c', ItemID.cellEmpty, 0]);

   
    
    
    ICTool.addRecipe({ id: ItemID.compressed_copper, count: 1, data: 0 }, [{ id: ItemID.ingot_copper_sc, data: 0 }], ItemID.craftingHammer);
    
    ICTool.addRecipe({ id: ItemID.compressed_lead, count: 1, data: 0 }, [{ id: ItemID.ingot_lead_sc, data: 0 }], ItemID.craftingHammer);
    
    ICTool.addRecipe({ id: ItemID.compressed_aluminum, count: 1, data: 0 }, [{ id: ItemID.ingot_aluminum_sc, data: 0 }], ItemID.craftingHammer);
    
    ICTool.addRecipe({ id: ItemID.compressed_bronze, count: 1, data: 0 }, [{ id: ItemID.ingot_bronze_sc, data: 0 }], ItemID.craftingHammer);
    
    ICTool.addRecipe({ id: ItemID.compressed_tin, count: 1, data:  0}, [{ id: ItemID.ingot_tin_sc, data: 0 }], ItemID.craftingHammer);
    
    ICTool.addRecipe({ id: ItemID.compressed_steel, count: 1, data: 0 }, [{ id: ItemID.ingot_steel,data: 0 }], ItemID.craftingHammer);
    
    ICTool.addRecipe({ id: ItemID.compressed_titanium, count: 1, data: 0 }, [{ id: ItemID.ingot_titanium,data: 0 }], ItemID.craftingHammer);
    
    ICTool.addRecipe({ id: ItemID.compressed_meteoric_iron, count: 1, data: 0 }, [{ id: ItemID.meteoric_iron_ingot,data: 0 }], ItemID.craftingHammer);
    
    ICTool.addRecipe({ id: ItemID.desh_plate, count: 1, data: 0 }, [{ id: ItemID.ingot_desh,data: 0 }], ItemID.craftingHammer);

MachineRecipeRegistry.registerRecipesFor("metalFormer1", {
        "ItemID.compressed_copper": { id: BlockID.copper_wire_bare, count: 3 },
        "ItemID.compressed_aluminum": { id: ItemID.aluminum_wire_bare, count: 3 },
        //"ItemID.plateGold": { id: ItemID.cableGold0, count: 4 },
        "ItemID.compressed_iron": { id: ItemID.cableIron0, count: 4 },
    }, true);
    
    MachineRecipeRegistry.registerRecipesFor("compressor", {
        "ItemID.copper_ingot_sc": { id: ItemID.compressed_copper, count: 1, data: 0 },
        "ItemID.ingot_tin_sc": { id: ItemID.compressed_tin, count: 1, data: 0 },
        "ItemID.ingot_aluminum_sc": { id: ItemID.compressed_aluminum, count: 1, data: 0 },
        "ItemID.ingot_desh": { id: ItemID.desh_plate, count: 1, data: 0 },
        "ItemID.ingot_titanium": { id: ItemID.compressed_titanium, count: 1, data: 0 },
        "ItemID.ingot_steel": { id: ItemID.compressed_steel, count: 1, data: 0 },
        // Dense Plates
        "ItemID.compressed_iron": { id: ItemID.densePlateIron, count: 1, data: 0, sourceCount: 1 },
     //   "ItemID.plateGold": { id: ItemID.densePlateGold, count: 1, data: 0, sourceCount: 9 },
        "ItemID.compressed_tin": { id: ItemID.densePlateTin, count: 1, data: 0, sourceCount: 9 },
        "ItemID.compressed_copper": { id: ItemID.densePlateCopper, count: 1, data: 0, sourceCount: 9 },
        "ItemID.compressed_bronze": { id: ItemID.densePlateBronze, count: 1, data: 0, sourceCount: 9 },
        "ItemID.compressed_steel": { id: ItemID.densePlateSteel, count: 1, data: 0, sourceCount: 9 },
      "ItemID.ingot_lead_sc": { id: ItemID.densePlateLead, count: 1, data: 0, sourceCount: 9 },
        // Compact

        "ItemID.ingot_copper_sc": { id: BlockID.block_copper_sc, count: 1, data: 0, sourceCount: 9 },

        // "ItemID.ingot_tin_sc": { id: BlockID.block_tin_sc, count: 1, data: 0, sourceCount: 9 },
        //"ItemID.ingot_lead_sc": { id: BlockID.block_of_lead, count: 1, data: 0, sourceCount: 9 },

        "ItemID.iron_steel_ingot": { id: BlockID.iron_steel_block, count: 1, data: 0, sourceCount: 9 },
      //  "ItemID.ingot_steel": { id: BlockID.steel_block_sc, count: 1, data: 0, sourceCount: 9 },
        "ItemID.ingot_bronze_sc": { id: BlockID.bronze_block_sc, count: 1, data: 0, sourceCount: 9 },
    },
    true);
    
        MachineRecipeRegistry.registerRecipesFor("metalFormer0", {
        // ingots
       
        "ItemID.copper_ingot_sc": { id: ItemID.compressed_copper, count: 1 },
        "ItemID.ingot_tin_sc": { id: ItemID.compressed_tin, count: 1 },
        "ItemID.ingot_bronze_sc": { id: ItemID.compressed_bronze, count: 1 },
        "ItemID.ingot_steel": { id: ItemID.compressed_steel, count: 1 },
        "ItemID.ingot_lead_sc": { id: ItemID.compressed_lead, count: 1 },
        // plates
        "ItemID.compressed_iron": { id: ItemID.casingIron, count: 2 },
        //"ItemID.plateGold": { id: ItemID.casingGold, count: 2 },
        "ItemID.compressed_tin": { id: ItemID.casingTin, count: 2 },
        "ItemID.compressed_copper": { id: ItemID.casingCopper, count: 2 },
        "ItemID.compressed_bronze": { id: ItemID.casingBronze, count: 2 },
        "ItemID.compressed_steel": { id: ItemID.casingSteel, count: 2 
            },
        "ItemID.compressed_lead": { id: ItemID.casingLead, count: 2 }
    }, true);
    
    MachineRecipeRegistry.registerRecipesFor("metalFormer1", {
        "ItemID.compressed_tin": { id: ItemID.cableTin0, count: 3 },
        "ItemID.compressed_copper": { id: ItemID.cableCopper0, count: 3 },
       // "ItemID.plateGold": { id: ItemID.cableGold0, count: 4 },
        "ItemID.compressed_iron": { id: ItemID.cableIron0, count: 4 },
    }, true);

MachineRecipeRegistry.registerRecipesFor("extractor", {
        "ItemID.rubber_item": { id: ItemID.rubber_item, count: 3 },
        "BlockID.rubber_block": { id: ItemID.rubber_item, count: 12 },
    }, true);

   
   SpacesMachine.addReceptForElectricCompressor({
    slot_1: ItemID.ingotAlloy,
    slot_2:ItemID.ingotAlloy,slot_3:0,slot_4:0,slot_5:0,slot_6:0,slot_7:0,slot_8:0,slot_9:0},
    {result:ItemID.plateAlloy,}
    
    )
    
   SpacesMachine.addReceptForElectricCompressor({slot_1:ItemID.ingotSteel,
    slot_2:ItemID.ingotSteel,slot_3:0,slot_4:0,slot_5:0,slot_6:0,slot_7:0,slot_8:0,slot_9:0},
    {result:ItemID.plateSteel,}
    )
    
   SpacesMachine.addReceptForElectricCompressor({slot_1:VanillaItemID.gold_ingot,
    slot_2:VanillaItemID.gold_ingot,slot_3:0,slot_4:0,slot_5:0,slot_6:0,slot_7:0,slot_8:0,slot_9:0},
    {result:ItemID.plateGold,}
       
   
    )
    
   SpacesMachine.addReceptForElectricCompressor({slot_1:VanillaItemID.iron_ingot,
    slot_2:VanillaItemID.iron_ingot,slot_3:0,slot_4:0,slot_5:0,slot_6:0,slot_7:0,slot_8:0,slot_9:0},
    {result:ItemID.plateIron,}
       
  
    )
    
   SpacesMachine.addReceptForElectricCompressor({slot_1:ItemID.ingotLead,
    slot_2:ItemID.ingotLead,slot_3:0,slot_4:0,slot_5:0,slot_6:0,slot_7:0,slot_8:0,slot_9:0},
    {result:ItemID.plateLead,}
   
  
    )
    
   SpacesMachine.addReceptForElectricCompressor({slot_1:ItemID.ingotTin,
    slot_2:ItemID.ingotTin,slot_3:0,slot_4:0,slot_5:0,slot_6:0,slot_7:0,slot_8:0,slot_9:0},
    {result:ItemID.plateTin}
       
    )
    
   SpacesMachine.addReceptForElectricCompressor({slot_1:ItemID.ingotCopper,
    slot_2:ItemID.ingotCopper,slot_3:0,slot_4:0,slot_5:0,slot_6:0,slot_7:0,slot_8:0,slot_9:0},
    {result:ItemID.plateCopper,
    }
       
    )
    
   SpacesMachine.addReceptForElectricCompressor({slot_1:ItemID.ingotBronze,
    slot_2:ItemID.ingotBronze,slot_3:0,slot_4:0,slot_5:0,slot_6:0,slot_7:0,slot_8:0,slot_9:0},
    {result:ItemID.plateBronze,}
       
    
    )
    
SpacesMachine.addReceptForElectricCompressor({slot_1:ItemID.ingotCopper,
    slot_2:ItemID.ingotTin,slot_3:0,slot_4:0,slot_5:0,slot_6:0,slot_7:0,slot_8:0,slot_9:0},
    {result:ItemID.compressed_bronze,}
    
   
    )
    
  Recipes.addShaped({ id: BlockID.metalFormer, count: 1, data: 0 }, [
        " x ",
        "b#b",
        "ccc"
    ], ['#', BlockID.mekanism_block, 0, 'x', ItemID.circuitBasic, 0, 'b', ItemID.toolbox, -1, 'c', ItemID.coil, 0], function (api, field, result) {
        if (isToolboxEmpty(field[3]) && isToolboxEmpty(field[5])) {
            for (var i = 0; i < field.length; i++) {
                api.decreaseFieldSlot(i);
            }
        }
        else {
            result.id = result.count = 0;
        }
    

SpacesMachine.addCollectorLeaves({leaf:BlockID.rubberTreeLeaves})


ChargeItemRegistry.registerItem(ItemID.storageBattery, "GalacticraftJoule", 10000, 20,0, true)
	ChargeItemRegistry.registerItem(ItemID.storageAdvBattery, "GalacticraftJoule", 100000, 20, 0, true);
	ChargeItemRegistry.registerItem(ItemID.storageCrystal, "GalacticraftJoule", 1000000, 20,0, true);
	ChargeItemRegistry.registerItem(ItemID.storageLapotronCrystal, "GalacticraftJoule", 10000000, 20, 0, true);
	
	euGroup.add(BlockID.enclosed_copper_cable,-1)
euGroup.add(BlockID.enclosed_gold_cable,-1);
euGroup.add(BlockID.enclosed_lv_cable,-1);
});})