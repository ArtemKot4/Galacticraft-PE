type int = number;
class GCItem {
 public id: string;
 public stack: int;
 protected meta: int;
 protected isTech: boolean;

 constructor(id,stack?,meta?,isTech?){
   
    this.id = id;
    this.stack = stack || 64;
    this.meta = meta || 0
    this.isTech = isTech || false;
this.createItem();
 }
 
 public createItem (): void {
    IDRegistry.genItemID(this.id); 
    Item.createItem(this.id, this.id, {name: this.id[0].toUpperCase() + this.id.slice(1).replace(/_/g, " "), meta: this.meta}, {stack: this.stack,isTech: this.isTech});
    
 };
 public get(id?): int {
   id = id || this.id
 return ItemID[id]
 
 } 
}
new GCItem("test");
new GCItem("test_2");
new GCItem("test_3");