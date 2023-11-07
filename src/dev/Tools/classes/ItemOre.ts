class ItemOre extends GCItem {
    public id: string;
    public stack: int;
    protected meta: int;
    protected isTech: boolean;
    constructor(id,stack?,meta?,isTech?,create?){
   super(id,stack,meta,isTech)
        this.id = id;
        this.stack = stack || 64;
        this.meta = meta || 0
        this.isTech = isTech || false;
        this.createItem();
     }
   public createItem(): void {
       new GCItem("ingot_"+this.id+"_sc")
       new GCItem("compressed_"+this.id)
       Recipes.addFurnace(BlockID["ore_"+this.id], 0, this.get("ingot_"+this.id+"_sc"), 0);
   }
   public push(){
    const INGOT = "ingot_"+this.id+"_sc";
    const PLATE = "compressed_"+this.id;
    for(var n=0;n<=9;n++){
        var input = "slot" + i
     gc_recipe.push({
        compressor: {input: this.get(INGOT),output: this.get(PLATE)}
     })
   }}
}