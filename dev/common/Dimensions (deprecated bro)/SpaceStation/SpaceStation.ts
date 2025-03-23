// var standStation = true;

// const AIR_SPACES = Block.createSpecialType({
//   lightopacity: 15,
//   destroytime: -1,
// });

// IDRegistry.genBlockID("space_air");
// Block.createBlock(
//   "space_air",
//   [{ name: "Space Air", texture: [["Black", 0]], inCreative: false }],
//   AIR_SPACES
// );

// const SpacesStation = new IPlanet(
//   "spaces",
//   ["space_station", 27],
//   [
//     {
//       minY: 0,
//       maxY: 1,
//       material: {
//         base: BlockID.space_air,
//         surface: {
//           id: BlockID.space_air,
//           data: 0,
//           width: 1,
//         },
//         cover: BlockID.space_air,
//       },
//     },
//   ],
//   null,
//   [0, 0, 0, 0, 0, 0]
// );

// Callback.addCallback("LevelDisplayed", function () {
//   const ent = Player.getLocal();
//   if (Entity.getDimension(ent) === SpacesStation.getPlanet()) {
//     const pos = Entity.getPosition(ent);
//     const region = BlockSource.getDefaultForActor(ent);
//   }
// });

// /*
// Saver.addSavesScope("Station",
//     function read(scope){
//         if(scope && scope.standStation){standStation = scope.standStation}
//     },
//     function save(){
//         return {
//             standStation: standStation
//         }
//     }
// );

// */
// new GBlock(
//   "spaces_station_block",
//   [
//     {
//       name: "Spaces Station",
//       texture: [
//         ["space_station_side", 0],
//         ["space_station_top", 0],
//         ["space_station_side", 0],
//         ["space_station_side", 0],
//         ["space_station_side", 0],
//         ["space_station_side", 0],
//       ],
//       inCreative: true,
//     },
//   ],
//   STONE
// ).createWithRotation().info("Central block of space station");

// Callback.addCallback("ItemUse", function (coords, item, block, is, player) {
//   if (block.id == BlockID.spaces_station_block) {
//     Dimensions.transfer(player, SpacesStation.getPlanet());
//   }
// });
