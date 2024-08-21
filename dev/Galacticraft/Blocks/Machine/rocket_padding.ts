// new GBlock("rocket_padding", [
//   { name: "Padding Rocket", texture: [["landing_pad", 0]], inCreative: true },
// ])
//   .create()
//   .info("Place blocks 3x3\nfor create rocket padding");
// IDRegistry.genBlockID("rocket_padding_completed");
// Block.createBlock("rocket_padding_completed", [
//   {
//     name: "Padding of Rocket",
//     texture: [["landing_pad", 0]],
//     inCreative: false,
//   },
// ]);

// new GBlock("buggy_padding", [
//   {
//     name: "Buggy padding{DEBUG}",
//     texture: [["buggy_pad", 0]],
//     inCreative: false,
//   },
// ]);

// new GBlock("buggy_padding_completed", [
//   { name: "Buggy padding", texture: [["buggy_pad", 0]], inCreative: false },
// ]);

// TileEntity.registerPrototype(BlockID.rocket_padding, {
//   useNetworkItemContainer: true,
//   init: function () {
//     //   for(var i;i<3;i++){

//     if (
//       this.blockSource.getBlockId(this.x, this.y, this.z) ==
//         BlockID.rocket_padding &&
//       this.blockSource.getBlockId(this.x - 1, this.y, this.z) ==
//         BlockID.rocket_padding &&
//       this.blockSource.getBlockId(this.x - 2, this.y, this.z) ==
//         BlockID.rocket_padding &&
//       this.blockSource.getBlockId(this.x, this.y, this.z - 1) ==
//         BlockID.rocket_padding &&
//       this.blockSource.getBlockId(this.x - 1, this.y, this.z - 1) ==
//         BlockID.rocket_padding &&
//       this.blockSource.getBlockId(this.x - 2, this.y, this.z - 1) ==
//         BlockID.rocket_padding &&
//       this.blockSource.getBlockId(this.x, this.y, this.z - 2) ==
//         BlockID.rocket_padding &&
//       this.blockSource.getBlockId(this.x - 1, this.y, this.z - 2) ==
//         BlockID.rocket_padding &&
//       this.blockSource.getBlockId(this.x - 2, this.y, this.z - 2) ==
//         BlockID.rocket_padding &&
//       this.blockSource.getBlockId(this.x - 2, this.y, this.z - 1) ==
//         BlockID.rocket_padding
//       // this.blockSource.getBlockId(this.x - i, this.y, this.z) == BlockID.rocket_padding &&
//       // this.blockSource.getBlockId(this.x - i, this.y, this.z - i) == BlockID.rocket_padding &&
//       // this.blockSource.getBlockId(this.x, this.y, this.z - i) == BlockID.rocket_padding
//     ) {
//       this.blockSource.setBlock(
//         this.x - 1,
//         this.y,
//         this.z - 1,
//         BlockID.rocket_padding_completed
//       );
//     }
//   },
// });

interface ITransportDescriptor {
  model: string;
  texture: string;
}

class Padding {
  protected id: int;
  protected setPaddingModel(data: int, height: int, texture: string) {
    const model = BlockRenderer.createModel();
    const render = new ICRender.Model();
    const padding_shape = new ICRender.CollisionShape();
    const entry = padding_shape.addEntry();

    model.addBox(0, 0, 0, 1, height, 1, texture, 0);
    entry.addBox(0, 0, 0, 1, height, 1);
    render.addEntry(model);

    BlockRenderer.setCustomCollisionShape(this.id, data, padding_shape),
      BlockRenderer.setStaticICRender(this.id, data, render);
    return;
  }

  protected constructFullByStructureIsPlaced() {
    Block.registerPlaceFunctionForID(
      BlockID[this.id],
      (coords, item, block, player, region) => {
        region.setBlock(coords.x, coords.y + 1, coords.z, BlockID[this.id], 0);
        for (let i = -1; i <= 1; i++) {
          for (let k = -1; k <= 1; k++) {
            const block = region.getBlock(coords.x - i, coords.y, coords.z - k);
            if (block.id === BlockID[this.id] && block.data === 0) {
              region.setBlock(
                coords.x,
                coords.y,
                coords.z,
                BlockID[this.id],
                1
              );
            }
          }
        }
      }
    );
  }

  constructor(id: string) {
    this.id = BlockID[id];
    new GBlock(id, [
      {
        name: "block.galacticraft." + this.id,
        texture: [[id, 0]],
        inCreative: true,
      },
    ]).create(),
      this.setPaddingModel(1, 5 / 16, id + "_padding_completed"),
      this.setPaddingModel(0, 3 / 16, id);
    const raycastShape = new ICRender.CollisionShape();
    raycastShape.addEntry().addBox(0, 0, 0, 1, 2, 1);
    BlockRenderer.setCustomRaycastShape(this.id, 1, raycastShape);
    this.constructFullByStructureIsPlaced();
  }
}

const ROCKET_PADDING = new Padding("rocket_padding");
const BUGGY_PADDING = new Padding("buggy_padding");

class PaddingController extends TileEntityBase {
  onLoad(): void {
    if (this.blockSource.getBlockData(this.x, this.y, this.z) === 0) {
      Game.message("0");
      return this.selfDestroy();
    }
  }
  onItemUse(
    coords: Callback.ItemUseCoordinates,
    item: ItemStack,
    player: number
  ): boolean {
    const tier = RocketManager.getTierForID(item.id);
    if (typeof tier !== "number") {
      return;
    }
    const rocket_pos = { x: this.x, y: this.y + 0.6, z: this.z };
    let animation = RocketModeller.createAnimation(
      RocketModeller.ROCKET_MESH_TIER_1,
      "GalacticraftCore/rocket_tier_1",
      rocket_pos
    );

    switch (tier) {
      case 1:
        animation = RocketModeller.createAnimation(
          RocketModeller.ROCKET_MESH_TIER_2,
          "GalacticraftPlanets/rocket_tier_2",
          rocket_pos
        );
        break;
      case 2:
        animation = RocketModeller.createAnimation(
          RocketModeller.ROCKET_MESH_TIER_3,
          "GalacticraftPlanets/rocket_tier_3",
          rocket_pos
        );
    };
    RocketManager.create(rocket_pos, tier, animation)
  }
}

TileEntity.registerPrototype(
  BlockID["rocket_padding"],
  new PaddingController()
);
