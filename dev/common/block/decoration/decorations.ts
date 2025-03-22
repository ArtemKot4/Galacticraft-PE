// new GBlock(
//   "tin_decoration_block",
//   [{ name: "Deco Block", texture: [["Deco Block", 0]], inCreative: true }],
//   STONE
// ).create();
// Translation.addTranslation("Deco Block", {
//   ru: "Декоративный-оловянный блок",
// });

// new GBlock(
//   "tin_decoration_block_2",
//   [
//     {
//       name: "Deco Tin Block",
//       texture: [
//         ["Deco Block Up", 0],
//         ["Deco Block Up", 0],
//         ["Deco Block Side", 0],
//         ["Deco Block Side", 0],
//         ["Deco Block Side", 0],
//         ["Deco Block Side", 0],
//       ],
//       inCreative: true,
//     },
//   ],
//   STONE
// ).create();
// Translation.addTranslation("Deco Tin Block", {
//   ru: "Украшенный декоративный-оловянный блок",
// });

// IDRegistry.genBlockID("brick");
// Block.createBlock(
//   "brick",
//   [{ name: "Dungeon Brick", texture: [["Brick", 0]], inCreative: true }],
//   STONE
// );
// Translation.addTranslation("Dungeon Brick", {
//   ru: "Крепостные кирпичи",
// });

// IDRegistry.genBlockID("dungeon_brick_venus_1");
// Block.createBlock(
//   "dungeon_brick_venus_1",
//   [
//     {
//       name: "Dungeon Brick Venus 1",
//       texture: [["Dungeon Brick Venus 1", 0]],
//       inCreative: true,
//     },
//   ],
//   STONE
// );
// Translation.addTranslation("Dungeon Brick Venus 1", {
//   ru: "Венерианские кирпичи 1-го типа",
// });

// IDRegistry.genBlockID("dungeon_brick_venus_2");
// BlockRegistry.createBlock(
//   "dungeon_brick_venus_2",
//   [
//     {
//       name: "Dungeon Brick Venus 2",
//       texture: [["Dungeon Brick Venus 2", 0]],
//       inCreative: true,
//     },
//   ],
//   STONE
// );
// Translation.addTranslation("Dungeon Brick Venus 2", {
//   ru: "Венерианские кирпичи 2-го типа",
// });

// var torch = BlockRenderer.createModel();
// var torch1 = new ICRender.Model();

// var torch2 = new ICRender.CollisionShape();
// var entry = torch2.addEntry();
// entry.addBox(
//   7 / 16,
//   0 / 16,
//   7 / 16,
//   9 / 16,
//   10 / 16,
//   9 / 16
// );

// new GBlock(
//   "glowstone_torch_lit",
//   [
//     {
//       name: "Torch glowtite",
//       texture: [["glowstone_torch", 0]],
//       inCreative: true,
//     },
//   ],
//   TORCH_SPACESTYPE
// ).create();
// Translation.addTranslation("Torch glowtite", {
//   ru: "Светокаменный факел",
// });

// new GBlock(
//   "torch_on_lit",
//   [
//     {
//       name: "Torch Stone On",
//       texture: [["unlit_torch_lit_stone", 0]],
//       inCreative: true,
//     },
//   ],
//   TORCH_SPACETYPE
// ).create();
// Translation.addTranslation("Torch Stone On", {
//   ru: "Зажжённый каменный факел",
// });

// new GBlock(
//   "torch_off_lit",
//   [
//     {
//       name: "Torch stone off",
//       texture: [["unlit_torch_stone", 0]],
//       inCreative: true,
//     },
//   ],
//   TORCH_OFFSPACETYPE
// ).create();
// Translation.addTranslation("Torch stone off", {
//   ru: "Потухший каменный факел",
// });

// new GBlock(
//   "torch_off_unlit",
//   [{ name: "Torch off", texture: [["unlit_torch", 0]], inCreative: true }],
//   TORCH_OFFSPACETYPE
// ).create();
// Translation.addTranslation("Torch off", {
//   ru: "Потухший факел",
// });

// BlockRenderer.setCustomCollisionShape(BlockID.glowstone_torch_lit, -1, torch2);
// BlockRenderer.setCustomCollisionShape(BlockID.torch_off_unlit, -1, torch2);
// BlockRenderer.setCustomCollisionShape(BlockID.torch_off_lit, -1, torch2);
// BlockRenderer.setCustomCollisionShape(BlockID.torch_on_lit, -1, torch2);
// BlockRenderer.setCustomCollisionShape(BlockID.torch_off_lit, -1, torch2);

// IDRegistry.genBlockID("vine_web");
// Block.createBlock(
//   "vine_web",
//   [{ name: "Spaces Web", texture: [["web_torch", 0]], inCreative: false }],
//   WEB
// );

// IDRegistry.genItemID("vine_web_1");
// Item.createItem(
//   "vine_web_1",
//   "Spaces Web",
//   { name: "web_torch", meta: 0 },
//   { stack: 64, isTech: true }
// );

// new GItem("galactic_web_item", 64, "Galactic Web", "galactic_web");
// new GBlock(
//   "galactic_web",
//   [{ name: "Spaces Web", texture: [["web_torch", 0]], inCreative: false }],
//   WEB
// )
//   .create()
//   .placeableByItem("galactic_web");

// Item.registerUseFunction("vine_web_1", function (coords, item, block, player) {
//   var region = BlockSource.getDefaultForActor(player);
//   var place = coords.relative;
//   region.setBlock(place.x, place.y, place.z, BlockID.vine_web, 0);
//   Entity.setCarriedItem(player, item.id, item.count - 1, item.data);
// });

// Block.registerDropFunction("vine_web", function (coords, blockID) {
//   return [[ItemID.vine_web_1, 1, 0]];
// });

// TileEntity.registerPrototype(BlockID.torch_on_lit, {
//   useNetworkItemContainer: true,
//   init: function () {
//     if (checkDimension(20)) {
//       this.blockSource.setBlock(
//         this.x,
//         this.y,
//         this.z,
//         BlockID.torch_off_lit,
//         0
//       );
//     }
//   },
// });

// TileEntity.registerPrototype(VanillaBlockID.torch, {
//   useNetworkItemContainer: true,
//   tick: function () {
//     if (checkDimension(20)) {
//       this.blockSource.setBlock(
//         this.x,
//         this.y,
//         this.z,
//         BlockID.torch_off_unlit,
//         0
//       );
//     }
//   },
// });

// IDRegistry.genBlockID("oxygen_tile");
// Block.createBlock(
//   "oxygen_tile",
//   [{ name: "Oxygen Tile", texture: [["Oxygentile 3", 0]], inCreative: true }],
//   STONE
// );
// Translation.addTranslation("Oxygen Tile", {
//   ru: "Кислородная обвивка",
// });

// IDRegistry.genBlockID("vine_torch");
// Block.createBlock(
//   "vine_torch",
//   [{ name: "Torch glowstone", texture: [["web_torch", 1]], inCreative: false }],
//   TORCH_SPACESTYPE
// );

// IDRegistry.genItemID("vine_torch_1");
// Item.createItem(
//   "vine_torch_1",
//   "Torch glowtite",
//   { name: "web_torch", meta: 1 },
//   { stack: 64, isTech: true }
// );

// Item.registerUseFunction(
//   "vine_torch_1",
//   function (coords, item, block, player) {
//     var region = BlockSource.getDefaultForActor(player);
//     var place = coords.relative;
//     if (region.getBlockId(coords.x, coords.y - 1, coords.z) == 0) {
//       region.setBlock(place.x, place.y, place.z, BlockID.vine_torch, 0);
//       Entity.setCarriedItem(player, item.id, item.count - 1, item.data);
//     }
//   }
// );

// Block.registerDropFunction("vine_torch", function (coords, blockID) {
//   return [[ItemID.vine_torch_1, 1, 0]];
// });

// var empty = BlockRenderer.createModel();
// var empty1 = new ICRender.Model();

// var empty2 = new ICRender.CollisionShape();
// var entry = torch2.addEntry();
// entry.addBox(0, 0, 0, 0, 0, 0);

// BlockRenderer.setCustomCollisionShape(BlockID.spaces_web, -1, empty2);
// BlockRenderer.setCustomCollisionShape(BlockID.vine_web, -1, empty2);
// BlockRenderer.setCustomCollisionShape(BlockID.vine_torch, -1, empty2);

// IDRegistry.genBlockID("oxygen_tile_stairs");
// BlockRegistry.createStairs(
//   "oxygen_tile_stairs",
//   [
//     {
//       name: "Oxygen Tile Stairs",
//       texture: [["Oxygentile 3", 0]],
//       inCreative: true,
//     },
//   ],
//   "oxygentile_stairs"
// );
// Translation.addTranslation("Oxygen Tile Stairs", {
//   ru: "Ступеньки из кислородной обвивки",
// });

// IDRegistry.genBlockID("asteroid_stones_stairs");
// BlockRegistry.createStairs(
//   "asteroid_stones_stairs",
//   [
//     {
//       name: "Asteroid Stone Stairs",
//       texture: [["asteroid0", 0]],
//       inCreative: true,
//     },
//   ],
//   "oxygentile_stairs"
// );

// IDRegistry.genBlockID("asteroid_stones_stairs_0");
// BlockRegistry.createStairs(
//   "asteroid_stones_stairs_0",
//   [
//     {
//       name: "Asteroid Stone Stairs",
//       texture: [["asteroid1", 0]],
//       inCreative: true,
//     },
//   ],
//   "oxygentile_stairs"
// );

// IDRegistry.genBlockID("asteroid_stones_stairs_1");
// BlockRegistry.createStairs(
//   "asteroid_stones_stairs_1",
//   [
//     {
//       name: "Asteroid Stone Stairs",
//       texture: [["asteroid2", 0]],
//       inCreative: true,
//     },
//   ],
//   "oxygentile_stairs"
// );

// Translation.addTranslation("Asteroid Stone Stairs", {
//   ru: "Ступеньки из камня астероидов",
// });

// IDRegistry.genBlockID("tin_decoration_block_stairs");
// BlockRegistry.createStairs(
//   "tin_decoration_block_stairs",
//   [
//     {
//       name: "Deco Block Stairs",
//       texture: [["Deco Block", 0]],
//       inCreative: true,
//     },
//   ],
//   "oxygentile_stairs"
// );
// Translation.addTranslation("Deco Block Stairs", {
//   ru: "Декоративно-оловяные ступени",
// });

// IDRegistry.genBlockID("tin_decoration_block_2_stairs");
// BlockRegistry.createStairs(
//   "tin_decoration_block_2_stairs",
//   [
//     {
//       name: "Deco Tin Stairs",
//       texture: [
//         ["Deco Block Up", 0],
//         ["Deco Block Up", 0],
//         ["Deco Block Side", 0],
//         ["Deco Block Side", 0],
//         ["Deco Block Side", 0],
//         ["Deco Block Side", 0],
//       ],
//       inCreative: true,
//     },
//   ],
//   "oxygentile_stairs"
// );
// Translation.addTranslation("Deco Tin Stairs", {
//   ru: "Резные декоративно-оловяные ступени",
// });

// IDRegistry.genBlockID("bricks_stairs");
// BlockRegistry.createStairs(
//   "bricks_stairs",
//   [{ name: "Dungeon Brick Stairs", texture: [["Brick", 0]], inCreative: true }],
//   "oxygentile_stairs"
// );
// Translation.addTranslation("Dungeon Brick Stairs", {
//   ru: "Крепостно-кирпичные ступени",
// });

// IDRegistry.genBlockID("dungeon_brick_venus_1_stairs");
// BlockRegistry.createStairs(
//   "dungeon_brick_venus_1_stairs",
//   [
//     {
//       name: "Dungeon Brick Venus 1 Stairs",
//       texture: [["Dungeon Brick Venus 1", 0]],
//       inCreative: true,
//     },
//   ],
//   "oxygentile_stairs"
// );
// Translation.addTranslation("Dungeon Brick Venus 1 Stairs", {
//   ru: "Венерианские ступеньки из кирпичей 1-го типа",
// });

// IDRegistry.genBlockID("dungeon_brick_venus_2_stairs");
// BlockRegistry.createStairs(
//   "dungeon_brick_venus_2_stairs",
//   [
//     {
//       name: "Dungeon Brick Venus 2 Stairs",
//       texture: [["Dungeon Brick Venus 2", 0]],
//       inCreative: true,
//     },
//   ],
//   "oxygentile_stairs"
// );
// Translation.addTranslation("Dungeon Brick Venus 1 Stairs", {
//   ru: "Венерианские ступеньки из кирпичей 2-го типа",
// });

// IDRegistry.genBlockID("dungeon_brick_venus_1_stairs");
// BlockRegistry.createStairs(
//   "dungeon_brick_venus_1_stairs",
//   [
//     {
//       name: "Dungeon Brick Venus 1 Stairs",
//       texture: [["Dungeon Brick Venus 1", 0]],
//       inCreative: true,
//     },
//   ],
//   "oxygentile_stairs"
// );
// Translation.addTranslation("Dungeon Brick Venus 1 Stairs", {
//   ru: "Ступеньки Венерианских кирпичей 1-го типа",
// });

// IDRegistry.genBlockID("dungeon_brick_venus_2_stairs");
// BlockRegistry.createStairs(
//   "dungeon_brick_venus_2_stairs",
//   [
//     {
//       name: "Dungeon Brick Venus 2 Stairs",
//       texture: [["Dungeon Brick Venus 2", 0]],
//       inCreative: true,
//     },
//   ],
//   "oxygentile_stairs"
// );
// Translation.addTranslation("Dungeon Brick Venus 2 Stairs", {
//   ru: "Ступеньки Венерианских кирпичей 2-го типа",
// });

// IDRegistry.genBlockID("mars_stone_stairs_bottom");
// BlockRegistry.createStairs(
//   "mars_stone_stairs_bottom",
//   [
//     {
//       name: "The Martian Bottom Stone Stairs",
//       texture: [["Bottom Mars", 0]],
//       inCreative: true,
//     },
//   ],
//   "oxygentile_stairs"
// );
// Translation.addTranslation("The Martian Bottom Stone Stairs", {
//   ru: "Ступеньки из глубинного марсианского камня",
// });

// IDRegistry.genBlockID("mars_stone_stairs_middle");
// BlockRegistry.createStairs(
//   "mars_stone_stairs_middle",
//   [
//     {
//       name: "The Martian Middle Stone Stairs",
//       texture: [["Middle Mars", 0]],
//       inCreative: true,
//     },
//   ],
//   "oxygentile_stairs"
// );
// Translation.addTranslation("The Martian Middle Stone Stairs", {
//   ru: "Ступеньки из среднего марсианского камня",
// });

// IDRegistry.genBlockID("mars_stone_stairs_top");
// BlockRegistry.createStairs(
//   "mars_stone_stairs_top",
//   [
//     {
//       name: "The Martian Top Stone Stairs",
//       texture: [["Top Mars", 0]],
//       inCreative: true,
//     },
//   ],
//   "oxygentile_stairs"
// );
// Translation.addTranslation("The Martian Top Stone Stairs", {
//   ru: "Ступеньки из верхнего марсианского камня",
// });

// IDRegistry.genBlockID("cobblestone_mars_stairs");
// BlockRegistry.createStairs(
//   "cobblestone_mars_stairs",
//   [
//     {
//       name: "The Martian Cobblestone Stairs",
//       texture: [["Cobblestone Mars", 0]],
//       inCreative: true,
//     },
//   ],
//   "oxygentile_stairs"
// );
// Translation.addTranslation("The Martian Cobblestone Stairs", {
//   ru: "Ступеньки из марсианского булыжника",
// });

// IDRegistry.genBlockID("moon_top_side_stairs");
// BlockRegistry.createStairs(
//   "moon_top_side_stairs",
//   [
//     {
//       name: "Lunar Top Side Stairs",
//       texture: [
//         ["Top Side", 0],
//         ["Top", 0],
//         ["Top Side", 0],
//         ["Top", 0],
//         ["Top Side", 0],
//         ["Top Side", 0],
//       ],
//       inCreative: true,
//     },
//   ],
//   "oxygentile_stairs"
// );
// Translation.addTranslation("Lunar Top Side Stairs", {
//   ru: "Ступеньки из лунного грунта",
// });

// IDRegistry.genBlockID("lunar_stone_stairs");
// BlockRegistry.createStairs(
//   "lunar_stone_stairs",
//   [
//     {
//       name: "Lunar Stone Stairs",
//       texture: [["Lunar Stone", 0]],
//       inCreative: true,
//     },
//   ],
//   "oxygentile_stairs"
// );
// Translation.addTranslation("Lunar Stone Stairs", {
//   ru: "Лунно-каменные ступеньки",
// });

// IDRegistry.genBlockID("lunar_middle_stairs");
// BlockRegistry.createStairs(
//   "lunar_middle_stairs",
//   [{ name: "Lunar Dirt Stairs", texture: [["Middle", 0]], inCreative: true }],
//   "oxygentile_stairs"
// );
// Translation.addTranslation("Lunar Dirt Stairs", {
//   ru: "Ступеньки из лунной почвы",
// });

// IDRegistry.genBlockID("venus_rock_0_stairs");
// BlockRegistry.createStairs(
//   "venus_rock_0_stairs",
//   [
//     {
//       name: "Venus Rock 0 Stairs",
//       texture: [["Venus Rock 0", 0]],
//       inCreative: true,
//     },
//   ],
//   "oxygentile_stairs"
// );
// Translation.addTranslation("Venus Rock 0 Stairs", {
//   ru: "Ступеньки из горячего венерианского камня",
// });

// IDRegistry.genBlockID("venus_rock_1_stairs");
// BlockRegistry.createStairs(
//   "venus_rock_1_stairs",
//   [
//     {
//       name: "Venus Rock 1 Stairs",
//       texture: [["Venus Rock 1", 0]],
//       inCreative: true,
//     },
//   ],
//   "oxygentile_stairs"
// );
// Translation.addTranslation("Venus Rock 1 Stairs", {
//   ru: "Ступеньки из твёрдого венерианского камня",
// });

// IDRegistry.genBlockID("venus_rock_2_stairs");
// BlockRegistry.createStairs(
//   "venus_rock_2_stairs",
//   [
//     {
//       name: "Venus Rock 2 Stairs",
//       texture: [["Venus Rock 2", 0]],
//       inCreative: true,
//     },
//   ],
//   "oxygentile_stairs"
// );
// Translation.addTranslation("Venus Rock 2 Stairs", {
//   ru: "Ступеньки из вулканического венерианского камня",
// });

// IDRegistry.genBlockID("tin_decoration_block_fence");
// Block.createBlock(
//   "tin_decoration_block_fence",
//   [
//     {
//       name: "Deco Block Fence",
//       texture: [["Deco Block", 0]],
//       inCreative: true,
//     },
//   ],
//   BLOCK_TYPE_FENCE
// );
// Translation.addTranslation("Deco Block Fence", {
//   ru: "Декоротивно-оловяный забор",
// });

// IDRegistry.genBlockID("tin_decoration_block_2_fence");
// Block.createBlock(
//   "tin_decoration_block_2_fence",
//   [
//     {
//       name: "Deco Tin Fence",
//       texture: [
//         ["Deco Block Up", 0],
//         ["Deco Block Up", 0],
//         ["Deco Block Side", 0],
//         ["Deco Block Side", 0],
//         ["Deco Block Side", 0],
//         ["Deco Block Side", 0],
//       ],
//       inCreative: true,
//     },
//   ],
//   BLOCK_TYPE_FENCE
// );
// Translation.addTranslation("Deco Tin Fence", {
//   ru: "Резной декоративно-оловяный забор",
// });

// IDRegistry.genBlockID("mars_stone_fence");
// Block.createBlock(
//   "mars_stone_fence",
//   [
//     {
//       name: "The Martian Stone Fence",
//       texture: [["Cobblestone Mars", 0]],
//       inCreative: true,
//     },
//   ],
//   BLOCK_TYPE_FENCE
// );
// Translation.addTranslation("The Martian Stone Fence", {
//   ru: "Забор из марсианского камня",
// });

// IDRegistry.genBlockID("mars_bottom_cobblestone_fence");
// Block.createBlock(
//   "mars_bottom_cobblestone_fence",
//   [
//     {
//       name: "The Martian Bottom Cobblestone Fence",
//       texture: [["Bottom Mars", 0]],
//       inCreative: true,
//     },
//   ],
//   BLOCK_TYPE_FENCE
// );
// Translation.addTranslation("The Martian Bottom Cobblestone Fence", {
//   ru: "Забор из глубинного марсианского камня",
// });

// IDRegistry.genBlockID("mars_top_stone_fence");
// Block.createBlock(
//   "mars_top_stone_fence",
//   [
//     {
//       name: "The Martian Top Cobblestone Fence",
//       texture: [["Top Mars", 0]],
//       inCreative: true,
//     },
//   ],
//   BLOCK_TYPE_FENCE
// );
// Translation.addTranslation("The Martian Top Cobblestone Fence", {
//   ru: "Забор из верхнего марсианского камея",
// });

// IDRegistry.genBlockID("mars_middle_stone_fence");
// Block.createBlock(
//   "mars_middle_stone_fence",
//   [
//     {
//       name: "The Martian Middle Cobblestone Fence",
//       texture: [["Middle Mars", 0]],
//       inCreative: true,
//     },
//   ],
//   BLOCK_TYPE_FENCE
// );
// Translation.addTranslation("The Martian Middle Cobblestone Fence", {
//   ru: "Забор из среднего марсианского камня",
// });

// IDRegistry.genBlockID("venus_rock_0_fence");
// Block.createBlock(
//   "venus_rock_0_fence",
//   [
//     {
//       name: "Venus Rock 0 Fence",
//       texture: [["Venus Rock 0", 0]],
//       inCreative: true,
//     },
//   ],
//   BLOCK_TYPE_FENCE
// );
// Translation.addTranslation("Venus Rock 0 Fence", {
//   ru: "Забор из горячего венерианского камня",
// });

// IDRegistry.genBlockID("venus_rock_1_fence");
// Block.createBlock(
//   "venus_rock_1_fence",
//   [
//     {
//       name: "Venus Rock 1 Fence",
//       texture: [["Venus Rock 1", 0]],
//       inCreative: true,
//     },
//   ],
//   BLOCK_TYPE_FENCE
// );
// Translation.addTranslation("Venus Rock 1 Fence", {
//   ru: "Забор из твёрдого венерианского камня",
// });

// IDRegistry.genBlockID("venus_rock_2_fence");
// Block.createBlock(
//   "venus_rock_2_fence",
//   [
//     {
//       name: "Venus Rock 2 Fence",
//       texture: [["Venus Rock 2", 0]],
//       inCreative: true,
//     },
//   ],
//   BLOCK_TYPE_FENCE
// );
// Translation.addTranslation("Venus Rock 2 Fence", {
//   ru: "Забор из вулканического венерианского камня",
// });

// IDRegistry.genBlockID("tin_decoration_block_slab");
// Block.createBlock(
//   "tin_decoration_block_slab",
//   [{ name: "Deco Block Slab", texture: [["Deco Block", 0]], inCreative: true }],
//   STONE
// );
// Translation.addTranslation("Deco Block Slab", {
//   ru: "Декоративный-оловянная плита",
// });


// BlockRegistry.createSlabs(
//   BlockID.tin_decoration_block_slab,
//   BlockID.tin_decoration_block
// );

// IDRegistry.genBlockID("tin_decoration_block_2_slab");
// Block.createBlock(
//   "tin_decoration_block_2_slab",
//   [
//     {
//       name: "Deco Tin Block Slab",
//       texture: [
//         ["Deco Block Up", 0],
//         ["Deco Block Up", 0],
//         ["Deco Block Side", 0],
//         ["Deco Block Side", 0],
//         ["Deco Block Side", 0],
//         ["Deco Block Side", 0],
//       ],
//       inCreative: true,
//     },
//   ],
//   STONE
// );
// Translation.addTranslation("Deco Tin Block Slab", {
//   ru: "Украшенная декоративно-оловянная плита",
// });

// BlockRegistry.createSlabs(
//   BlockID.tin_decoration_block_2_slab,
//   BlockID.tin_decoration_block_2
// );
/*
IDRegistry.genBlockID("venus_rock_1_slab");
Block.createBlock(
  "venus_rock_1_slab",
  [
    {
      name: "Venus Rock 1 Slab",
      texture: [["Venus Rock 1", 0]],
      inCreative: true,
    },
  ],
  STONE
);
Translation.addTranslation("Venus Rock 1 Slab", {
  ru: "Плита из твёрдого венерианского камня",
});

// BlockRegistry.createSlabs(BlockID.venus_rock_1_slab, BlockID.venus_rock_1);

// BlockRegistry.createSlabs(BlockID.venus_rock_0_slab, BlockID.venus_rock_0);

IDRegistry.genBlockID("venus_rock_2_slab");
Block.createBlock(
  "venus_rock_2_slab",
  [
    {
      name: "Venus Rock 2 Slab",
      texture: [["Venus Rock 2", 0]],
      inCreative: true,
    },
  ],
  STONE
);
Translation.addTranslation("Venus Rock 2 Slab", {
  ru: "Плита из твёрдого венерианского камня",
});

// BlockRegistry.createSlabs(BlockID.venus_rock_2_slab, BlockID.venus_rock_2);

IDRegistry.genBlockID("venus_rock_0_slab");
Block.createBlockWithRotation(
  "venus_rock_0_slab",
  [
    {
      name: "Venus Rock 0 Slab",
      texture: [
        ["Venus Rock 0", 0],
        ["Venus Rock 0", 0],
        ["Venus Rock 0", 0],
        ["Venus Rock 0", 0],
        ["Venus Rock 0", 0],
        ["Venus Rock 0", 0],
      ],
      inCreative: true,
    },
  ],
  STONE
);
Translation.addTranslation("Venus Rock 0 Slab", {
  ru: "Плита из горячего венерианского камня",
});

// BlockRegistry.createSlabs(BlockID.venus_rock_0_slab, BlockID.venus_rock_0);

IDRegistry.genBlockID("lunar_stone_slab");
Block.createBlock(
  "lunar_stone_slab",
  [
    {
      name: "Lunar Stone Slab",
      texture: [["Lunar Stone", 0]],
      inCreative: true,
    },
  ],
  STONE
);
Translation.addTranslation("Lunar Stone Slab", {
  ru: "Плита из лунного камня",
});

// BlockRegistry.createSlabs(BlockID.lunar_stone_slab, BlockID.lunar_stone);

IDRegistry.genBlockID("lunar_middle_slab");
Block.createBlock(
  "lunar_middle_slab",
  [{ name: "Lunar Dirt Slab", texture: [["Middle", 0]], inCreative: true }],
  STONE
);
Translation.addTranslation("Lunar Dirt Slab", {
  ru: "Плита из лунной почвы",
});

//BlockRegistry.createSlabs(BlockID.lunar_middle_slab, BlockID.lunar_middle);

IDRegistry.genBlockID("moon_top_side_slab");
Block.createBlock(
  "moon_top_side_slab",
  [
    {
      name: "Lunar Top Side Slab",
      texture: [
        ["Top Side", 0],
        ["Top", 0],
        ["Top Side", 0],
        ["Top", 0],
        ["Top Side", 0],
        ["Top Side", 0],
      ],
      inCreative: true,
    },
  ],
  STONE
);
Translation.addTranslation("Lunar Top Side Slab", {
  ru: "Плита из лунного грунта",
});

//BlockRegistry.createSlabs(BlockID.moon_top_side_slab, BlockID.moon_top_side);

IDRegistry.genBlockID("cobblestone_mars_slab");
Block.createBlock(
  "cobblestone_mars_slab",
  [
    {
      name: "The Martian Cobblestone Slab",
      texture: [
        ["Cobblestone Mars", 0],
        ["Cobblestone Mars", 0],
        ["Cobblestone Mars", 0],
        ["Cobblestone Mars", 0],
        ["Cobblestone Mars", 0],
        ["Cobblestone Mars", 0],
      ],
      inCreative: true,
    },
  ],
  STONE
);
Translation.addTranslation("The Martian Cobblestone Slab", {
  ru: "Плита из Марсианского булыжника",
});

// BlockRegistry.createSlabs("cobblestone_mars_slab","cobblestone_mars", [
//     {
//       name: "The Martian Cobblestone Slab",
//       texture: [
//         ["Cobblestone Mars", 0],
//         ["Cobblestone Mars", 0],
//         ["Cobblestone Mars", 0],
//         ["Cobblestone Mars", 0],
//         ["Cobblestone Mars", 0],
//         ["Cobblestone Mars", 0],
//       ],
//       inCreative: true,
//     },
//   ],);

new GBlock(
  "mars_middle_stone_slab",
  [
    {
      name: "The Martian Middle Stone Slab",
      texture: [["Middle Mars", 0]],
      inCreative: true,
    },
  ],
  STONE
).create();
Translation.addTranslation("The Martian Middle Stone Slab", {
  ru: "Плита из среднего марсианского камня",
});

// BlockRegistry.createSlabs(
//   BlockID.mars_middle_stone_slab,
//   BlockID.mars_middle_stone
// );

new GBlock(
  "mars_bottom_stone_slab",
  [
    {
      name: "The Martian Stone Bottom Slab",
      texture: [["Bottom Mars", 0]],
      inCreative: true,
    },
  ],
  STONE
).create();
Translation.addTranslation("The Martian Stone Bottom Slab", {
  ru: "Плита из глубинного марсианского камня",
});

// BlockRegistry.createSlabs(
//   BlockID.mars_bottom_stone_slab,
//   BlockID.mars_bottom_stone
// );

new GBlock(
  "mars_top_stone_slab",
  [
    {
      name: "The Martian Stone Top Slab",
      texture: [["Top Mars", 0]],
      inCreative: true,
    },
  ],
  STONE
).create();
Translation.addTranslation("The Martian Stone Top Slab", {
  ru: "Плита из поверхностного марсианского камня",
});

// BlockRegistry.createSlabs(BlockID.mars_top_stone_slab, BlockID.mars_top_stone);
 */