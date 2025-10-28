type int = number;
type information = Function | string;
class GItem {
  protected id: string;
  protected stack: int;
  protected meta: int;
  protected isTech: boolean;
  protected texture: string;
  protected name: string;
  constructor(id: string, stack?: int, name?: string, texture?: string, meta?: int, isTech?: boolean) {
    this.id = id;
    this.stack = stack || 64;
    this.meta = meta || 0;
    this.isTech = isTech || false;
    this.texture = texture || id;
    this.name = name || "item.galacticraft." + id;
    this.create();
  }
  
   public category(int: int): void {
    Item.setCategory(this.id, int)
   };

  protected create(): void {
    IDRegistry.genItemID(this.id);
    Item.createItem(
      this.id,
      this.name,
      { name: this.texture, meta: this.meta },
      { stack: this.stack, isTech: this.isTech }
    );

  }
  public description(text: string, translation?: {}): void {
   if(translation) Translation.addTranslation(text, translation);
    Item.registerNameOverrideFunction(this.id, function (item, name) {
     
      return Translation.translate(name) + "\n§7" + Translation.translate(text)
    });
  }

  public info(text: string, translation?: {}): void {
    if(translation) Translation.addTranslation(text, translation);
    Item.registerNameOverrideFunction(this.id, function (item, name) {
      if(Entity.getSneaking(Player.getLocal()) === true) {
        return Translation.translate(name) + Translation.translate(text) }
        return (
          Translation.translate(name) +
          "\n§7" +
          Translation.translate("Press SHIFT for view information")
        );
      
    
  });


};

public getID() {
  return ItemID[this.id];
}

}
