const BLOCK_TYPE_LIQUID = Block.createSpecialType({
  solid: false,
  renderlayer: 1,
  explosionres: 10000,
});

class GCLiquid {
  public id: string;

  constructor(id, block_type?) {
    this.id = id + "_gc";
    this.create(block_type || BLOCK_TYPE_LIQUID);
    this.onClick();
  }

  public create(block_type: string | Block.SpecialType) {
  
    const name = "block.galacticraft.liquid." + this.id;
      LiquidRegistry.registerLiquid(this.id, name, [this.id + "_flow"]),
      Block.createLiquidBlock(
        this.id,
        {
          name: name,
          still: {
            texture: [this.id + "_still", 0],
            id: this.id + "_still",
          },
          flowing: {
            texture: [this.id + "_flow", 0],
            id: this.id + "_flow",
          },
          bucket: {
            texture: { name: "bucket_of_" + this.id, meta: 0 },
            id: "bucket_of_" + this.id,
          },
        },
        block_type
      )
  }

  public onClick() {

    Block.registerClickFunctionForID(
      BlockID[this.id],
      (coords, item, block, player) => {
        Game.message("Сработало!");
        if (item.id === ItemID.empty_liquid_canister) {
          const region = BlockSource.getDefaultForActor(player);
          const split = this.id.split("_");
          try {
            return (
              Entity.setCarriedItem(
                player,
                ItemID[
                  split.slice(0, split.length - 1).join("_") + "_canister"
                ],
                1,
                6,
                item.extra
              ),
              region.setBlock(coords.x, coords.y, coords.z, 0, 0)
            );
          } catch {
          Game.message("Id is not valid")
          }
        }
      }
    );
  }
}

new GCLiquid("oil");
new GCLiquid("fuel");
