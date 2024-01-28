class GBlock {
  public id: string;
  public data: Block.BlockVariation[];
  public type: string | Block.SpecialType;

  constructor(
    id: string,
    data: Block.BlockVariation[],
    type?: string | Block.SpecialType
  ) {
    this.id = id;
    this.data = data;
    this.type = type || null;
  }
  public create(): void {
    IDRegistry.genBlockID(this.id);
    Block.createBlockWithRotation(this.id, this.data, this.type);
  }

  public info(text: information, translation?: {}): void {
    GItem.prototype.info.apply(this, arguments);
  }
  public description(text: information, translation?: {}): void {
    GItem.prototype.description.apply(this, arguments);
  }
  public placeableByItem(itemId: any): void {
    Item.registerUseFunction(itemId, function (coords, item, block, player) {
      const region = BlockSource.getDefaultForActor(player);
      const place = coords.relative;
      region.setBlock(place.x, place.y, place.z, BlockID[this.id], 0);
      if (Game.getGameMode() != 1) {
        Entity.setCarriedItem(player, item.id, item.count - 1, item.data);
        Block.registerDropFunction(
          BlockID[this.id],
          function (coords, blockID) {
            return [[itemId, 1, 0]];
          }
        );
      }
    });
  }
    public setupObjModel(texture, model, scale?: [int, int, int]) {
      const mesh = new RenderMesh();
      mesh.setBlockTexture(texture, 0);
      mesh.importFromFile(__dir__ + "/resources/models/" + (model || texture) 
      + ".obj", "obj", {
        translate: [0.5, 0, 0.5],
        scale: scale,
        invertV: false,
        noRebuild: false,
      });
      const render = new ICRender.Model();
      render.addEntry(new BlockRenderer.Model(mesh));
         BlockRenderer.setStaticICRender(BlockID[this.id], 0, render);
    
  };
}
