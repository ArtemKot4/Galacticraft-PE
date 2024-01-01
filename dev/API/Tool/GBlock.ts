class GBlock {
 public id: string;
 public data: [any];
 public type: BlockType;

  constructor(id: string, data: [any], type?: BlockType) {
    this.id = id
    this.data = data
    this.type = type || null
  }	
 public create (): void {
    IDRegistry.genBlockID(this.id);
   this.type == null ? Block.createBlock(this.id ,this.data) :
    Block.createBlock(this.id ,this.data, this.type);
 };

 protected info(text, translation): void {
    Translation.addTranslation(text, translation);
    Item.registerNameOverrideFunction(this.id, function (item, name) {
      if (Entity.getSneaking(Player.get())) {
        return name + "\n§7" + Translation.translate(text);
      }
      if (!Entity.getSneaking(Player.getLocal())) {
        return (
          name +
          "\n§7" +
          Translation.translate("Press SHIFT for view information")
        );
      }
    });
  };
  
}