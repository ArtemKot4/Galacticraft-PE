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
  protected id: string;

  protected setPaddingModel(height: int, id, texture: string) {
    const model = BlockRenderer.createModel();
    const render = new ICRender.Model();
    const padding_shape = new ICRender.CollisionShape();
    const entry = padding_shape.addEntry();

    model.addBox(0, 0, 0, 1, height, 1, texture, 0);
    entry.addBox(0, 0, 0, 1, height, 1);
    render.addEntry(model);

    return (
      BlockRenderer.setCustomCollisionShape(BlockID[id], -1, padding_shape),
      BlockRenderer.setStaticICRender(BlockID[id], -1, render)
    );
  }

   protected constructFullByStructureIsPlaced() {
	 Block.registerPlaceFunctionForID(BlockID[this.id], (coords, item, block, player, region) => {
		region.setBlock(coords.x, coords.y + 1, coords.z, BlockID[this.id], 0)
		if (
			region.getBlockId(coords.x, coords.y + 1, coords.z) ==
			  BlockID[this.id] &&
			region.getBlockId(coords.x - 1, coords.y + 1, coords.z) ==
			  BlockID[this.id] &&
			region.getBlockId(coords.x - 2, coords.y + 1, coords.z) ==
			  BlockID[this.id] &&
			region.getBlockId(coords.x, coords.y + 1, coords.z - 1) ==
			  BlockID[this.id] &&
			region.getBlockId(coords.x - 1, coords.y + 1, coords.z - 1) ==
			  BlockID[this.id] &&
			region.getBlockId(coords.x - 2, coords.y + 1, coords.z - 1) ==
			  BlockID[this.id] &&
			region.getBlockId(coords.x, coords.y + 1, coords.z - 2) ==
			  BlockID[this.id] &&
			region.getBlockId(coords.x - 1, coords.y + 1, coords.z - 2) ==
			  BlockID[this.id] &&
			region.getBlockId(coords.x - 2, coords.y + 1, coords.z - 2) ==
			  BlockID[this.id] &&
			region.getBlockId(coords.x - 2, coords.y + 1, coords.z - 1) ==
			  BlockID[this.id]
		  ) {
			return region.setBlock(
			  coords.x - 1,
			  coords.y + 1,
			  coords.z - 1,
			  BlockID[this.id + "_completed"],
			  0
			);
		  }
	 })
   }

  constructor(
    id: string,
    // public rocket: string,
    // public transportDescriptor: ITransportDescriptor
  ) {
	//TODO: блоки площадки не регаются, исправить.
    this.id = id + "_padding";
       Game.message("Класс rocket padding прошёл инициализацию: " + this.id),
	new GBlock(this.id, [{
		name: "block.galacticraft." + this.id,
		texture: [
			[this.id, 0]
		],
		inCreative: true
	}]).create(),

	new GBlock(this.id + "_completed", [{
		name: "block.galacticraft." + this.id + "_completed",
		texture: [
			[this.id, 0]
		],
		inCreative: false
	}]).create(),

	this.setPaddingModel(5 / 16, this.id + "_completed", this.id),
  
	this.setPaddingModel(3 / 16, this.id, this.id),

	this.constructFullByStructureIsPlaced()
  };

  
};

const ROCKET_PADDING = new Padding("rocket")
const BUGGY_PADDING = new Padding("buggy")

// var model = BlockRenderer.createModel();
// var render = new ICRender.Model();
// model.addBox(0, 0, 0, 1, 3 / 16, 1, "landing_pad", 0);

// var Padding1lvl = new ICRender.CollisionShape();
// var entry = Padding1lvl.addEntry();
// entry.addBox(0, 0, 0, 1, 3 / 16, 1);
// BlockRenderer.setCustomCollisionShape(BlockID.rocket_padding, -1, Padding1lvl);

// render.addEntry(model);

// BlockRenderer.setStaticICRender(BlockID.rocket_padding, -1, render);

// var model1 = BlockRenderer.createModel();
// var render1 = new ICRender.Model();

// var Padding1lvll = new ICRender.CollisionShape();
// var entry = Padding1lvll.addEntry();
// entry.addBox(0, 0, 0, 1, 5 / 16, 1);
// BlockRenderer.setCustomCollisionShape(
//   BlockID.rocket_padding_completed,
//   -1,
//   Padding1lvll
// );

// render1.addEntry(model1);
// model1.addBox(0, 0, 0, 1, 5 / 16, 1, "landing_pad", 0);
// BlockRenderer.setStaticICRender(BlockID.rocket_padding_completed, -1, render1);

// Block.registerDropFunction(
//   "rocket_padding_completed",
//   function (coords, blockID) {
//     return [[BlockID.rocket_padding, 1, 0]];
//   }
// );
