type int = number;

class GItem {
  protected id: string;
  protected stack: int;
  protected meta: int;
  protected isTech: boolean;
  protected texture: string;
  public name: string;
  constructor(id, stack?, name?, texture?, meta?, isTech?) {
    this.id = id;
    this.stack = stack || 64;
    this.meta = meta || 0;
    this.isTech = isTech || false;
    this.texture = texture || id;
    this.name = name || this.id[0].toUpperCase() + this.id.slice(1).replace(/_/g, " ").toString();
    this.create();
  }
  
   public category(int: int): void {
    Item.setCategory(this.id, int)
   };

  public create(): void {
    IDRegistry.genItemID(this.id);
    Item.createItem(
      this.id,
      this.name,
      { name: this.texture, meta: this.meta },
      { stack: this.stack, isTech: this.isTech }
    );

  }
  protected description(text: string, translation: { any }): void {
    Translation.addTranslation(text, translation);
    Item.registerNameOverrideFunction(this.id, function (item, name) {
      return name + Translation.translate(text);
    });
  }

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
  }

}
