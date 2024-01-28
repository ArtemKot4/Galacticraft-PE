type int = number;
type information = Function | string;
class GItem {
  protected id: string;
  protected stack: int;
  protected meta: int;
  protected isTech: boolean;
  protected texture: string;
  protected name: string;
  constructor(id, stack?, name?, texture?, meta?, isTech?) {
    this.id = id;
    this.stack = stack || 64;
    this.meta = meta || 0;
    this.isTech = isTech || false;
    this.texture = texture || id;
    this.name = name || (this.id[0].toUpperCase() + 
    this.id.slice(1).replace(/_/g,
     " ").toString());
    this.create();
  }
  
   public category(int: int): void {
    Item.setCategory(this.id, int)
   };

  private create(): void {
    IDRegistry.genItemID(this.id);
    Item.createItem(
      this.id,
      this.name,
      { name: this.texture, meta: this.meta },
      { stack: this.stack, isTech: this.isTech }
    );

  }
  public description(text: information, translation?: {}): void {
   if(translation && typeof text == "string") Translation.addTranslation(text, translation);
    Item.registerNameOverrideFunction(this.id, function (item, name) {
      const validate = (typeof text !== "function") ? 
      name + Translation.translate(text) : text(item, name); 
      return validate;
    });
  }

  public info(text: information, translation?: {}): void {
    if(translation && typeof text == "string") Translation.addTranslation(text, translation);
    Item.registerNameOverrideFunction(this.id, function (item, name) {
      const validate = (typeof text !== "function") ? 
      name + Translation.translate(text) : text(item, name); 
      if (Entity.getSneaking(Player.get())) 
        return validate;
      else
        return (
          name +
          "\n§7" +
          Translation.translate("Press SHIFT for view information")
        );
      
    });
  }

}
