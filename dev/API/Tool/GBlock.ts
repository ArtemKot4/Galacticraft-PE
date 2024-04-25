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
  public create(): this {
    IDRegistry.genBlockID(this.id);
    Block.createBlock(this.id, this.data, this.type);
    return this;
  };
 public createWithRotation(): this {
  IDRegistry.genBlockID(this.id);
    Block.createBlockWithRotation(this.id, this.data, this.type);
    return this;
 }
  public info(text: string, translation?: {}): void {
    if (translation) Translation.addTranslation(text, translation);
   return Item.registerNameOverrideFunction(this.id, function (item, name) {
      if (Entity.getSneaking(Player.getLocal()))
        return (Translation.translate(name) + Translation.translate(text));
      else
        return (
          Translation.translate(name) +
          "\n§7" +
          Translation.translate("Press SHIFT for view information")
        );
    });
  }
  public description(text: string, translation?: {}): void {
    if (translation) Translation.addTranslation(text, translation);
    return Item.registerNameOverrideFunction(this.id, function (item, name) {
      return Translation.translate(name) + "\n§7" + Translation.translate(text);
    });
  }
  public placeableByItem(itemId: any): void {
   return Item.registerUseFunction(itemId, function (coords, item, block, player) {
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
    mesh.importFromFile(
      __dir__ + "/resources/models/" + (model || texture) + ".obj",
      "obj",
      {
        translate: [0.5, 0, 0.5],
        scale: scale,
        invertV: false,
        noRebuild: false,
      }
    );
    const render = new ICRender.Model();
    render.addEntry(new BlockRenderer.Model(mesh));
    BlockRenderer.setStaticICRender(BlockID[this.id], 0, render);
  }
}
