type int = number;


class GCItem {
 protected id: string;
 protected stack: int;
 protected meta: int;
 protected isTech: boolean;
 protected texture: string;
 constructor(id,stack?,texture?,meta?,isTech?){
   
    this.id = id;
    this.stack = stack || 64;
    this.meta = meta || 0;
    this.isTech = isTech || false;
    this.texture = texture || id;
 }
 
 public create (): void {
    IDRegistry.genItemID(this.id); 
    Item.createItem(this.id, this.id[0].toUpperCase() + this.id.slice(1).replace(/_/g, " ").toString(), {name: this.texture, meta: this.meta}, {stack: this.stack,isTech: this.isTech});
    
 };
 public get(id?): int {
   id = id || this.id
 return ItemID[id]
 
 };
}
