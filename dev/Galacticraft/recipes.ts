SpacesMachine.addCollectorLeaves({ leaf: VanillaBlockID.leaves });
SpacesMachine.addCollectorLeaves({ leaf: VanillaBlockID.leaves2 });
//SpacesMachine.addCollectorLeaves({leaf: VanillaBlockID.vic_a2_tantros_leaves});

Callback.addCallback("LevelDisplayed", function () {
  return (
    CompressorFactory.registerFromJSON("compressor"),
    CircuitFabricatorFactory.registerFromJSON("circuit")
  );
});

Callback.addCallback("LevelDisplayed", function () {


  /*  slots:
slotuer:r1,r2.
sltuel:l1,l2.
slotchestable:gc1,gc2,gc3.
craftable:cr.
drawing:SignRocketbench — drsrb.
             #
           2#-#3   gc1#  gc2#  gc3#
           4#-#5
           6#-#7
        r1#8#-#9#l1  #drsrb
        r2# #10 #l2   #cr
          Интерфейс*/

  SpacesMachine.addDefaultRocketRecipe(
    {
      cone: ItemID.nose_cone,
      cover_1: ItemID.heavy_plating,
      cover_2: ItemID.heavy_plating,
      cover_3: ItemID.heavy_plating,
      cover_4: ItemID.heavy_plating,
      cover_5: ItemID.heavy_plating,
      cover_6: ItemID.heavy_plating,
      cover_7: ItemID.heavy_plating,
      cover_8: ItemID.heavy_plating,
      engine: ItemID.engine_tier,
      fin_1: ItemID.rocket_fins,
      fin_2: ItemID.rocket_fins,
      fin_3: ItemID.rocket_fins,
      fin_4: ItemID.rocket_fins,
    },
    {
      rocket: ItemID.rocket_tier_1,
    }
  );
  /*
Recipes.addShaped({id: ItemID.blade, count: 1, data: 0}, [
    "a",
    "a",
    ""
], ['a', VanillaItemID.iron_ingot, 0]);

Recipes.addShaped({id: ItemID.blades, count: 1, data: 0}, [
    "aaa",
    "",
    ""
], ['a', ItemID.blade, 0]);*/

  Recipes.addShaped(
    { id: BlockID.energy_storage_module, count: 1, data: 0 },
    ["bbb", "aaa", "bbb"],
    ["a", ItemID.battery, 0, "b", ItemID.compressed_steel, 0]
  );

  Recipes.addShaped(
    { id: ItemID.oxygen_concentrator, count: 1, data: 0 },
    ["aba", "bdb", "aca"],
    [
      "a",
      ItemID.compressed_steel,
      0,
      "b",
      ItemID.compressed_tin,
      0,
      "c",
      ItemID.air_vent,
      0,
      "d",
      ItemID.canister_tin,
      0,
    ]
  );
  //Кислородный концентратор
  Recipes.addShaped(
    { id: ItemID.oxygentank_heavyfull, count: 1, data: 0 },
    ["aaa", "bbb", "ccc"],
    [
      "a",
      VanillaBlockID.wool,
      14,
      "b",
      ItemID.canister_tin,
      0,
      "c",
      ItemID.compressed_steel,
      0,
    ]
  );
  //Большой кислородный баллон
  Recipes.addShaped(
    { id: ItemID.oxygentank_lightfull, count: 1, data: 0 },
    ["c  ", "a  ", "b  "],
    [
      "a",
      ItemID.canister_tin,
      0,
      "b",
      ItemID.compressed_copper,
      0,
      "c",
      VanillaBlockID.wool,
      5,
    ]
  );
  //Маленький кислородный баллон
  Recipes.addShaped(
    { id: ItemID.oxygentank_medfull, count: 1, data: 0 },
    ["aa", "bb", "cc"],
    [
      "a",
      VanillaBlockID.wool,
      1,
      "b",
      ItemID.canister_tin,
      0,
      "c",
      ItemID.compressed_tin,
      0,
    ]
  );
  //Средний кислородный баллон

  //Экстра кислородный баллон
  Recipes.addShaped(
    { id: ItemID.frequency_module, count: 1, data: 0 },
    [" b ", "ada", "ece"],
    [
      "a",
      ItemID.compressed_iron,
      0,
      "b",
      ItemID.compressed_aluminum,
      0,
      "c",
      ItemID.wafer_basic,
      0,
      "d",
      VanillaItemID.repeater,
      0,
      "e",
      VanillaItemID.redstone,
      0,
    ]
  );
  //Высокочастотный модуль
  Recipes.addShaped(
    { id: ItemID.air_fan, count: 1, data: 0 },
    ["b b", " c ", "bab"],
    [
      "a",
      VanillaItemID.redstone,
      0,
      "b",
      ItemID.compressed_steel,
      0,
      "c",
      ItemID.wafer_basic,
      0,
    ]
  );
  //Закончился раздел SpaceTools
  //Вентилятор
  Recipes.addShaped(
    { id: ItemID.air_vent, count: 1, data: 0 },
    ["aa", "ab", ""],
    ["a", ItemID.compressed_tin, 0, "b", ItemID.compressed_steel, 0]
  );
  //Решётка для воздуха
  Recipes.addShaped(
    { id: ItemID.battery, count: 1, data: 0 },
    [" g ", "gbg", "gag"],
    [
      "a",
      VanillaItemID.coal,
      0,
      "b",
      VanillaItemID.redstone,
      0,
      "g",
      ItemID.compressed_iron,
      0,
    ]
  );
  //Батарейка
  Recipes.addShaped(
    { id: ItemID.buggymat_sit, count: 1, data: 0 },
    ["  a", " ba", "aaa"],
    ["a", ItemID.compressed_steel, 0, "b", ItemID.compressed_iron, 0]
  );
  //Сиденье багги
  Recipes.addShaped(
    { id: ItemID.buggymat_storage, count: 1, data: 0 },
    ["bbb", "iai", "bbb"],
    [
      "a",
      VanillaBlockID.chest,
      0,
      "b",
      ItemID.compressed_steel,
      0,
      "i",
      ItemID.compressed_iron,
      0,
    ]
  );
  //Хранилище багги
  Recipes.addShaped(
    { id: ItemID.buggymat_wheel, count: 1, data: 0 },
    [" a ", "aba", " a "],
    ["a", VanillaItemID.leather, 0, "b", ItemID.compressed_steel, 0]
  );
  //Колесо багги
  Recipes.addShaped(
    { id: ItemID.canister_copper, count: 1, data: 0 },
    ["a a", "a a", "aaa"],
    ["a", ItemID.ingot_copper_gc, 0]
  );
  //Медная канистра(слитками)
  Recipes.addShaped(
    { id: ItemID.canister_copper, count: 1, data: 0 },
    ["a a", "a a", "aaa"],
    ["a", ItemID.compressed_copper, 0]
  );
  //Медная канистра(сжатками)
  Recipes.addShaped(
    { id: ItemID.oxygen_gear, count: 1, data: 0 },
    [" b ", "bab", "b b"],
    ["a", ItemID.oxygen_concentrator, 0, "b", BlockID.PipeOxygenWhite, 0]
  );
  //Кислородное снаряжение(белый)
  Recipes.addShaped(
    { id: ItemID.oxygen_gear, count: 1, data: 0 },
    [" b ", "bab", "b b"],
    ["a", ItemID.oxygen_concentrator, 0, "b", BlockID.PipeOxygenBlack, 0]
  );
  //Кислородное снаряжение(черный)
  Recipes.addShaped(
    { id: ItemID.oxygen_gear, count: 1, data: 0 },
    [" b ", "bab", "b b"],
    ["a", ItemID.oxygen_concentrator, 0, "b", BlockID.PipeOxygenLightBlue, 0]
  );
  //Кислородное снаряжение(голубой)
  Recipes.addShaped(
    { id: ItemID.oxygen_gear, count: 1, data: 0 },
    [" b ", "bab", "b b"],
    ["a", ItemID.oxygen_concentrator, 0, "b", BlockID.PipeOxygenSilver, 0]
  );
  //Кислородное снаряжение(серебрянный)
  Recipes.addShaped(
    { id: ItemID.oxygen_gear, count: 1, data: 0 },
    [" b ", "bab", "b b"],
    ["a", ItemID.oxygen_concentrator, 0, "b", BlockID.PipeOxygenGreen, 0]
  );
  //Кислородное снаряжение(зелёный)
  Recipes.addShaped(
    { id: ItemID.oxygen_gear, count: 1, data: 0 },
    [" b ", "bab", "b b"],
    ["a", ItemID.oxygen_concentrator, 0, "b", BlockID.PipeOxygenPink, 0]
  );
  //Кислородное снаряжение(розовый)
  Recipes.addShaped(
    { id: ItemID.oxygen_gear, count: 1, data: 0 },
    [" b ", "bab", "b b"],
    ["a", ItemID.oxygen_concentrator, 0, "b", BlockID.PipeOxygenBlue, 0]
  );
  //Кислородное снаряжение(синий)
  Recipes.addShaped(
    { id: ItemID.oxygen_gear, count: 1, data: 0 },
    [" b ", "bab", "b b"],
    ["a", ItemID.oxygen_concentrator, 0, "b", BlockID.PipeOxygenGray, 0]
  );
  //Кислородное снаряжение(серый)
  Recipes.addShaped(
    { id: ItemID.oxygen_gear, count: 1, data: 0 },
    [" b ", "bab", "b b"],
    ["a", ItemID.oxygen_concentrator, 0, "b", BlockID.PipeOxygenCyan, 0]
  );
  //Кислородное снаряжение(бирюзовый)
  Recipes.addShaped(
    { id: ItemID.oxygen_gear, count: 1, data: 0 },
    [" b ", "bab", "b b"],
    ["a", ItemID.oxygen_concentrator, 0, "b", BlockID.PipeOxygenLime, 0]
  );
  //Кислородное снаряжение(лаймовый)
  Recipes.addShaped(
    { id: ItemID.oxygen_gear, count: 1, data: 0 },
    [" b ", "bab", "b b"],
    ["a", ItemID.oxygen_concentrator, 0, "b", BlockID.PipeOxygenYellow, 0]
  );
  //Кислородное снаряжение(жёлтый)
  Recipes.addShaped(
    { id: ItemID.oxygen_gear, count: 1, data: 0 },
    [" b ", "bab", "b b"],
    ["a", ItemID.oxygen_concentrator, 0, "b", BlockID.PipeOxygenRed, 0]
  );
  //Кислородное снаряжение(красный)
  Recipes.addShaped(
    { id: ItemID.oxygen_gear, count: 1, data: 0 },
    [" b ", "bab", "b b"],
    ["a", ItemID.oxygen_concentrator, 0, "b", BlockID.PipeOxygenOrange, 0]
  );
  //Кислородное снаряжение(оранжевый)
  Recipes.addShaped(
    { id: ItemID.oxygen_gear, count: 1, data: 0 },
    [" b ", "bab", "b b"],
    ["a", ItemID.oxygen_concentrator, 0, "b", BlockID.PipeOxygenBrown, 0]
  );
  //Кислородное снаряжение(коричневый)
  Recipes.addShaped(
    { id: ItemID.oxygen_gear, count: 1, data: 0 },
    [" b ", "bab", "b b"],
    ["a", ItemID.oxygen_concentrator, 0, "b", BlockID.PipeOxygenPurple, 0]
  );
  //Кислородное снаряжение(фиолетовый)
  Recipes.addShaped(
    { id: ItemID.oxygen_gear, count: 1, data: 0 },
    [" b ", "bab", "b b"],
    ["a", ItemID.oxygen_concentrator, 0, "b", BlockID.PipeOxygenMagenta, 0]
  );
  //Кислородное снаряжение(пурпурный)
  Recipes.addShaped(
    { id: BlockID.PipeOxygenWhite, count: 4, data: 0 },
    ["aaa", "", "aaa"],
    ["a", VanillaBlockID.glass_pane, 0]
  );
  //Труба(белый)
  Recipes.addShaped(
    { id: BlockID.PipeOxygenBlack, count: 1, data: 0 },
    ["ab", "", ""],
    ["a", BlockID.PipeOxygenWhite, 0, "b", VanillaItemID.black_dye, 0]
  );
  //Труба(черный)
  Recipes.addShaped(
    { id: BlockID.PipeOxygenRed, count: 1, data: 0 },
    ["ab", "", ""],
    ["a", BlockID.PipeOxygenWhite, 0, "b", VanillaItemID.red_dye, 0]
  );
  //Труба(красный)
  Recipes.addShaped(
    { id: BlockID.PipeOxygenGreen, count: 1, data: 0 },
    ["ab", "", ""],
    ["a", BlockID.PipeOxygenWhite, 0, "b", VanillaItemID.green_dye, 0]
  );
  //Труба(зелёный)
  Recipes.addShaped(
    { id: BlockID.PipeOxygenBrown, count: 1, data: 0 },
    ["ab", "", ""],
    ["a", BlockID.PipeOxygenWhite, 0, "b", VanillaItemID.brown_dye, 0]
  );
  //Труба(коричневый)
  Recipes.addShaped(
    { id: BlockID.PipeOxygenBlue, count: 1, data: 0 },
    ["ab", "", ""],
    ["a", BlockID.PipeOxygenWhite, 0, "b", VanillaItemID.blue_dye, 0]
  );
  //Труба(синий)
  Recipes.addShaped(
    { id: BlockID.PipeOxygenLightBlue, count: 1, data: 0 },
    ["abv", "", ""],
    [
      "a",
      BlockID.PipeOxygenWhite,
      0,
      "b",
      VanillaItemID.blue_dye,
      0,
      "v",
      VanillaItemID.white_dye,
      0,
    ]
  );
  //Труба(голубой)
  Recipes.addShaped(
    { id: BlockID.PipeOxygenPurple, count: 1, data: 0 },
    ["ab", "", ""],
    ["a", BlockID.PipeOxygenWhite, 0, "b", VanillaItemID.purple_dye, 0]
  );
  //Труба(фиолетовый)
  Recipes.addShaped(
    { id: BlockID.PipeOxygenCyan, count: 1, data: 0 },
    ["ab", "", ""],
    ["a", BlockID.PipeOxygenWhite, 0, "b", VanillaItemID.cyan_dye, 0]
  );
  //Труба(бирюзовый)
  Recipes.addShaped(
    { id: BlockID.PipeOxygenGray, count: 1, data: 0 },
    ["ab", "", ""],
    ["a", BlockID.PipeOxygenWhite, 0, "b", VanillaItemID.gray_dye, 0]
  );
  //Труба(серый)
  Recipes.addShaped(
    { id: BlockID.PipeOxygenPink, count: 1, data: 0 },
    ["ab", "", ""],
    ["a", BlockID.PipeOxygenWhite, 0, "b", VanillaItemID.pink_dye, 0]
  );
  //Труба(розовый)
  Recipes.addShaped(
    { id: BlockID.PipeOxygenLime, count: 1, data: 0 },
    ["ab", "", ""],
    ["a", BlockID.PipeOxygenWhite, 0, "b", VanillaItemID.lime_dye, 0]
  );
  //Труба(лаймовый)
  Recipes.addShaped(
    { id: BlockID.PipeOxygenYellow, count: 1, data: 0 },
    ["ab", "", ""],
    ["a", BlockID.PipeOxygenWhite, 0, "b", VanillaItemID.yellow_dye, 0]
  );
  //Труба(жёлтый)
  Recipes.addShaped(
    { id: BlockID.PipeOxygenMagenta, count: 1, data: 0 },
    ["ab", "", ""],
    ["a", BlockID.PipeOxygenWhite, 0, "b", VanillaItemID.magenta_dye, 0]
  );
  //Труба(пурпурный)
  Recipes.addShaped(
    { id: BlockID.PipeOxygenOrange, count: 1, data: 0 },
    ["ab", "", ""],
    ["a", BlockID.PipeOxygenWhite, 0, "b", VanillaItemID.orange_dye, 0]
  );
  //Труба(оранжевый)
  Recipes.addShaped(
    { id: BlockID.PipeOxygenSilver, count: 1, data: 0 },
    ["ab", "", ""],
    ["a", BlockID.PipeOxygenWhite, 0, "b", VanillaItemID.light_gray_dye, 0]
  );
  //Труба(Серебрянный)
  Recipes.addShaped(
    { id: BlockID.AluminumWire, count: 6, data: 0 },
    ["bbb", "aaa", "bbb"],
    ["a", ItemID.ingot_aluminum_gc, 0, "b", VanillaBlockID.wool, 0]
  );
  //Алюминиевый провод
  Recipes.addShaped(
    { id: BlockID.ImprovedAluminumWire, count: 6, data: 0 },
    ["b  ", "w  ", "a  "],
    [
      "a",
      ItemID.ingot_aluminum_gc,
      0,
      "b",
      VanillaBlockID.wool,
      0,
      "w",
      BlockID.AluminumWire,
      0,
    ]
  );
  //Улучшенный алюминиевый провод
  Recipes.addShaped(
    { id: ItemID.canister_tin, count: 1, data: 0 },
    ["a a", "a a", "aaa"],
    ["a", ItemID.ingot_tin_gc, 0]
  );
  //Оловяная канистра(слитками)
  Recipes.addShaped(
    { id: ItemID.canister_tin, count: 1, data: 0 },
    ["a a", "a a", "aaa"],
    ["a", ItemID.compressed_tin, 0]
  );
  //Оловяная канистра(пожатками)
  Recipes.addShaped(
    { id: ItemID.canvas, count: 1, data: 0 },
    [" ba", "bbb", "ab "],
    ["a", VanillaItemID.stick, 0, "b", VanillaItemID.string, 0]
  );
  //Холст

  Recipes.addShaped(
    { id: ItemID.engine_tier, count: 1, data: 0 },
    [" a ", "bob", "bhb"],
    [
      "a",
      VanillaItemID.flint_and_steel,
      0,
      "b",
      ItemID.heavy_plating,
      0,
      "o",
      ItemID.canister_tin,
      0,
      "h",
      ItemID.air_vent,
      0,
    ]
  );
  //Двигатель ракеты
  Recipes.addShaped(
    { id: ItemID.engine_tier1_booster, count: 1, data: 0 },
    ["bab", "bwb", "jfj"],
    [
      "a",
      VanillaBlockID.wool,
      4,
      "b",
      ItemID.compressed_meteoric_iron,
      0,
      "f",
      ItemID.air_vent,
      0,
      "j",
      ItemID.heavy_plating,
      0,
      "w",
      ItemID.fuel_canister,
      6,
    ]
  );
  //Ускоритель ракеты

  Recipes.addShaped(
    { id: ItemID.steel_shards, count: 3, data: 0 },
    ["a"],
    ["a", ItemID.ingot_steel, 0]
  );
  //Осколки стали

  Recipes.addShaped(
    { id: ItemID.iron_steel_ingot, count: 1, data: 0 },
    ["aaa", "aba", "aaa"],
    ["a", ItemID.steel_shards, 0, "b", VanillaItemID.iron_ingot, 0]
  );
  //Железостальной слиток
  Recipes.addShaped(
    { id: BlockID.coal_generator, count: 1, data: 0 },
    ["aaa", "bcb", "aea"],
    [
      "a",
      ItemID.ingot_copper_gc,
      0,
      "b",
      VanillaItemID.iron_ingot,
      0,
      "c",
      VanillaBlockID.furnace,
      0,
      "e",
      BlockID.AluminumWire,
      0,
    ]
  );
  //Угольный генератор
  Recipes.addShaped(
    { id: BlockID.compressor_gj, count: 1, data: 0 },
    ["bab", "aca", "aea"],
    [
      "a",
      ItemID.ingot_aluminum_gc,
      0,
      "b",
      VanillaBlockID.anvil,
      0,
      "c",
      ItemID.ingot_copper_gc,
      0,
      "e",
      ItemID.wafer_basic,
      0,
    ]
  );
  //Компрессор
  Recipes.addShaped(
    { id: BlockID.rocket_padding, count: 1, data: 0 },
    ["aaa", "bbb", ""],
    ["a", ItemID.compressed_iron, 0, "b", BlockID.iron_block, 0]
  );
  //Пусковая площадка

  Recipes.addShaped(
    { id: ItemID.tin_shard, count: 9, data: 0 },
    ["a"],
    ["a", ItemID.ingot_tin_gc, 0]
  );

  Recipes.addShaped(
    { id: ItemID.copper_shard, count: 9, data: 0 },
    ["a"],
    ["a", ItemID.ingot_copper_gc, 0]
  );

  Recipes.addShaped(
    { id: ItemID.tin_shard, count: 9, data: 0 },
    ["a"],
    ["a", ItemID.ingot_tin_gc, 0]
  );

  Recipes.addShaped(
    { id: ItemID.aluminum_shard, count: 9, data: 0 },
    ["a"],
    ["a", ItemID.ingot_aluminum_gc, 0]
  );

  Recipes.addShaped(
    { id: ItemID.emerald_shard, count: 9, data: 0 },
    ["a"],
    ["a", VanillaItemID.emerald, 0]
  );

  Recipes.addShaped(
    { id: ItemID.iron_steel_shard, count: 9, data: 0 },
    ["a"],
    ["a", ItemID.iron_steel_ingot, 0]
  );

  Recipes.addShaped(
    { id: ItemID.meteoric_iron_shard, count: 9, data: 0 },
    ["a"],
    ["a", ItemID.meteoric_iron_ingot, 0]
  );

  Recipes.addShaped(
    { id: ItemID.shard_titanium, count: 9, data: 0 },
    ["a"],
    ["a", ItemID.ingot_titanium, 0]
  );
  //самородки

  Recipes.addShaped(
    { id: ItemID["machine_wrench"], count: 1, data: 0 },
    ["  a", "  b", "  b"],
    ["a", ItemID.compressed_steel, 0, "b", ItemID.compessed_bronze, 0]
  );
  //гаечный ключ

  Recipes.addShaped(
    { id: ItemID.atomic_battery, count: 1, data: 0 },
    ["bbb", "bcb", "bbb"],
    ["b", ItemID.compressed_steel, 0, "c", ItemID.radioisotope_core, 0]
  );

  Recipes.addShaped(
    { id: ItemID.solar_module_0, count: 1, data: 0 },
    ["ccc", "bbb", "aaa"],
    [
      "a",
      BlockID.ImprovedAluminumWire,
      0,
      "b",
      ItemID.wafer_solar,
      0,
      "c",
      VanillaBlockID.glass,
      0,
    ]
  );

  Recipes.addShaped(
    { id: ItemID.solar_module_1, count: 1, data: 0 },
    ["bbb", "aaa", "bbb"],
    ["a", BlockID.AluminumWire, 0, "b", ItemID.solar_module_0, 0]
  );

  if (__config__.getBool("Difficulty.Machine.NewRecipes") == true) {
    Recipes.addShaped(
      { id: BlockID.basic_solar_panel, count: 1, data: 0 },
      ["bab", "bcb", "ede"],
      [
        "a",
        ItemID.solar_module_1,
        0,
        "b",
        ItemID.compressed_steel,
        0,
        "c",
        BlockID.coal_generator,
        0,
        "d",
        ItemID.wafer_basic,
        0,
        "e",
        BlockID.AluminumWire,
        0,
      ]
    );

    Recipes.addShaped(
      { id: BlockID.electric_compressor_gj, count: 1, data: 0 },
      ["aba", "aaa", "cec"],
      [
        "a",
        ItemID.compressed_steel,
        0,
        "b",
        VanillaBlockID.anvil,
        0,
        "c",
        BlockID.AluminumWire,
        0,
        "e",
        ItemID.wafer_advanced,
        0,
      ]
    );

    Recipes.addShaped(
      { id: BlockID.workbench_rocket, count: 1, data: 0 },
      ["ccc", "aba", "ccc"],
      [
        "a",
        ItemID.wafer_advanced,
        0,
        "b",
        BlockID.electric_furnace,
        0,
        "c",
        ItemID.compressed_steel,
        0,
      ]
    );

    Recipes.addShaped(
      { id: BlockID.oxygen_storage_module, count: 1, data: 0 },
      ["aaa", "bbb", "aca"],
      [
        "a",
        ItemID.compressed_steel,
        0,
        "b",
        ItemID.oxygentank_heavyfull,
        0,
        "c",
        ItemID.heavy_plating,
        0,
      ]
    );
    //хранилище кислорода

    Recipes.addShaped(
      { id: BlockID.refinery_gc, count: 1, data: 0 },
      [" b ", "aba", "dcd"],
      [
        "a",
        VanillaBlockID.stone,
        0,
        "b",
        ItemID.canister_copper,
        0,
        "c",
        BlockID.electric_furnace,
        0,
        "d",
        BlockID.wafer_advanced,
        0,
      ]
    );
    //Центрифуга
  } else {
    Recipes.addShaped(
      { id: BlockID.basic_solar_panel, count: 1, data: 0 },
      ["bab", "bcb", "ede"],
      [
        "a",
        ItemID.solar_module_1,
        0,
        "b",
        ItemID.compressed_steel,
        0,
        "c",
        ItemID.flag_cane,
        0,
        "d",
        ItemID.wafer_basic,
        0,
        "e",
        BlockID.AluminumWire,
        0,
      ]
    );

    Recipes.addShaped(
      { id: BlockID.electric_compressor_gj, count: 1, data: 0 },
      ["aba", "aaa", "cec"],
      [
        "a",
        ItemID.compressed_steel,
        0,
        "b",
        VanillaBlockID.anvil,
        0,
        "c",
        BlockID.AluminumWire,
        0,
        "e",
        ItemID.wafer_advanced,
        0,
      ]
    );

    Recipes.addShaped(
      { id: BlockID.workbench_rocket, count: 1, data: 0 },
      ["ccc", "aba", "ccc"],
      [
        "a",
        ItemID.wafer_advanced,
        0,
        "b",
        ItemID.wafer_advanced,
        0,
        "c",
        ItemID.compressed_steel,
        0,
      ]
    );

    Recipes.addShaped(
      { id: BlockID.oxygen_storage_module, count: 1, data: 0 },
      ["aaa", "bbb", "aaa"],
      ["a", ItemID.compressed_steel, 0, "b", ItemID.oxygentank_heavyfull, 0]
    );
    //хранилище кислорода

    Recipes.addShaped(
      { id: BlockID.refinery_gc, count: 1, data: 0 },
      [" b ", "aba", "dcd"],
      [
        "a",
        VanillaBlockID.stone,
        0,
        "b",
        ItemID.canister_copper,
        0,
        "c",
        VanillaBlockID.furnace,
        0,
        "d",
        ItemID.compressed_steel,
        0,
      ]
    );
    //Центрифуга
  }

  Recipes.addShaped(
    { id: BlockID.block_tin_gc, count: 1, data: 0 },
    ["aaa", "aaa", "aaa"],
    ["a", ItemID.ingot_tin_gc, 0]
  );

  Recipes.addShaped(
    { id: ItemID.nose_cone, count: 1, data: 0 },
    [" b ", " a ", "a a"],
    ["a", ItemID.heavy_plating, 0, "b", 76, 0]
  );

  Recipes.addShaped(
    { id: ItemID.engine_tier, count: 1, data: 0 },
    [" b ", "bcb", "bdb"],
    [
      "a",
      VanillaItemID.flint_and_steel,
      0,
      "b",
      ItemID.heavy_plating,
      0,
      "c",
      ItemID.canister_tin,
      0,
      "d",
      ItemID.air_fan,
      0,
    ]
  );

  Recipes.addShaped(
    { id: ItemID.rocket_fins, count: 1, data: 0 },
    [" b ", "aba", "a a"],
    ["a", ItemID.heavy_plating, 0, "b", ItemID.compressed_steel, 0]
  );

  Recipes.addShaped(
    { id: BlockID.collector_gc, count: 1, data: 0 },
    ["aaa", "bdc", "eee"],
    [
      "a",
      ItemID.compressed_steel,
      0,
      "b",
      ItemID.air_vent,
      0,
      "c",
      ItemID.air_fan,
      0,
      "d",
      ItemID.canister_tin,
      0,
      "e",
      ItemID.compressed_tin,
      0,
    ]
  );

  Recipes.addShaped(
    { id: BlockID.fuel_loader, count: 1, data: 0 },
    ["aca", "ada", "ebe"],
    [
      "a",
      ItemID.compressed_steel,
      0,
      "b",
      ItemID.wafer_basic,
      0,
      "c",
      BlockID.refinery_gc,
      0,
      "d",
      ItemID.canister_tin,
      0,
      "e",
      ItemID.compressed_tin,
      0,
    ]
  );

  Recipes.addShaped(
    { id: BlockID.circuit_fabricator, count: 1, data: 0 },
    ["aba", "cdc", "efe"],
    [
      "a",
      ItemID.ingot_aluminum_gc,
      0,
      "b",
      VanillaBlockID.lever,
      0,
      "c",
      VanillaBlockID.stone_button,
      0,
      "d",
      VanillaBlockID.furnace,
      0,
      "e",
      BlockID.AluminumWire,
      0,
      "f",
      76,
      0,
    ]
  );

  Recipes.addShaped(
    { id: BlockID.magnetic_crafting_table, count: 1, data: 0 },
    ["ba"],
    ["a", VanillaBlockID.crafting_table, 0, "b", ItemID.compressed_iron, 0]
  );

  Recipes.addShaped(
    { id: ItemID["Steel axe"], count: 1, data: 0 },
    [" bb", " ab", " a "],
    ["a", VanillaItemID.stick, 0, "b", ItemID.compressed_steel, 0]
  );

  Recipes.addShaped(
    { id: ItemID["Steel pickaxe"], count: 1, data: 0 },
    ["bbb", " a ", " a "],
    ["a", VanillaItemID.stick, 0, "b", ItemID.compressed_steel, 0]
  );

  Recipes.addShaped(
    { id: ItemID["Steel shovel"], count: 1, data: 0 },
    [" b", " a", " a "],
    ["a", VanillaItemID.stick, 0, "b", ItemID.compressed_steel, 0]
  );

  Recipes.addShaped(
    { id: ItemID["Steel axe"], count: 1, data: 0 },
    ["bb", "ba", " a "],
    ["a", VanillaItemID.stick, 0, "b", ItemID.compressed_steel, 0]
  );

  Recipes.addShaped(
    { id: ItemID["Steel hoe"], count: 1, data: 0 },
    [" bb", " a", " a "],
    ["a", VanillaItemID.stick, 0, "b", ItemID.compressed_steel, 0]
  );

  Recipes.addShaped(
    { id: ItemID["Steel sword"], count: 1, data: 0 },
    [" b ", " b ", " a "],
    ["a", VanillaItemID.stick, 0, "b", ItemID.compressed_steel, 0]
  );

  Recipes.addShaped(
    { id: ItemID.ingot_tin_gc, count: 1, data: 0 },
    ["aaa", "aaa", "aaa"],
    ["a", ItemID.tin_shard, 0]
  );

  Recipes.addShaped(
    { id: ItemID.ingot_copper_gc, count: 1, data: 0 },
    ["aaa", "aaa", "aaa"],
    ["a", ItemID.copper_shard, 0]
  );

  Recipes.addShaped(
    { id: ItemID.ingot_tin_gc, count: 1, data: 0 },
    ["aaa", "aaa", "aaa"],
    ["a", ItemID.tin_shard, 0]
  );

  Recipes.addShaped(
    { id: ItemID.ingot_aluminum_gc, count: 1, data: 0 },
    ["aaa", "aaa", "aaa"],
    ["a", ItemID.aluminum_shard, 0]
  );

  Recipes.addShaped(
    { id: VanillaItemID.emerald, count: 1, data: 0 },
    ["aaa", "aaa", "aaa"],
    ["a", ItemID.emerald_shard, 0]
  );

  Recipes.addShaped(
    { id: ItemID.iron_steel_ingot, count: 1, data: 0 },
    ["aaa", "aaa", "aaa"],
    ["a", ItemID.iron_steel_shard, 0]
  );

  Recipes.addShaped(
    { id: ItemID.meteoric_iron_ingot, count: 1, data: 0 },
    ["aaa", "aaa", "aaa"],
    ["a", ItemID.meteoric_iron_shard, 0]
  );

  Recipes.addShaped(
    { id: ItemID.ingot_titanium, count: 1, data: 0 },
    ["aaa", "aaa", "aaa"],
    ["a", ItemID.shard_titanium, 0]
  );

  Recipes.addShaped(
    { id: ItemID.empty_liquid_canister, count: 1, data: 0 },
    ["aba", "aca", "ada"],
    [
      "a",
      ItemID.compressed_tin,
      0,
      "b",
      ItemID.compressed_steel,
      0,
      "c",
      VanillaBlockID.glass,
      0,
      "d",
      ItemID.canister_tin,
      0,
    ]
  );

  Recipes.addShaped(
    { id: ItemID.oxygen_mask, count: 1, data: 0 },
    ["aaa", "aba", "aaa"],
    ["a", VanillaBlockID.glass_pane, 0, "b", VanillaItemID.iron_helmet, 0]
  );

  Recipes.addFurnace(ItemID.raw_desh, 0, ItemID.ingot_desh, 0);

  Recipes.addFurnace(
    ItemID.meteoric_iron_raw,
    0,
    ItemID.meteoric_iron_ingot,
    0
  );

  Recipes.addFurnace(BlockID["ore_iron_mars"], 0, VanillaItemID.iron_ingot, 0);
});
