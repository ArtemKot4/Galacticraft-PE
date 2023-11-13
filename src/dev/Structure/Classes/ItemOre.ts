type id = any
//typeof BlockID[string] | number
class ItemOre extends GCItem {
  item_list: [];
  public id: string;
  public stack: int;
  protected meta: int;
  protected isTech: boolean;


  constructor(id, stack?, meta?, isTech?) {
    super(id, stack, meta, isTech);
    this.id = id;

  
  }
  public createOre(): any {
   
      new GCItem("ingot_" + this.id + "_sc").create();
      new GCItem("compressed_" + this.id + "_sc").create();
      Recipes.addFurnace(
        BlockID["ore_" + this.id],
        0,
        this.get("ingot_" + this.id + "_sc"),
        0
      );
   
  }

 
}
