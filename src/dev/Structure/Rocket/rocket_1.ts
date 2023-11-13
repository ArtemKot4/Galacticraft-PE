let GC_TIMER = {
  ROCKET_START: 10,
  ROCKET_BEGIN: false,
  ROCKET_FLY: 0
};

let GC_FLAG = {
  ROCKET: false,
  RAIN: false,
  METEORITE_FALL: false,
};

let GC_LIST = {
  ROCKET: [],
  PADDING: []
}

class GCRocket {
      protected rocket: string;
      protected padding: string;
 public get(): string {
      return "galacticraft:" + this.rocket + "<>"
  }
  constructor(rocket,padding) {
    this.rocket = rocket;
    this.padding = padding
    this.createItem();
    GC_LIST.PADDING.push(this.padding+"_completed")
    GC_LIST.ROCKET.push({entity: this.get(), item: ItemID[this.rocket]})
  };

  public createItem() {
    new GCItem(this.rocket,1,Number(this.rocket.slice(this.rocket.length-1)))
   
  }
 
  public static get(rocket?: true) {
    for(var i in GC_LIST){
     if(rocket!=undefined){ return GC_LIST.ROCKET[i].entity }else{ return GC_LIST.ROCKET[i].item }
    }
  }

 public static getPadding(){
     for(var p in GC_LIST){
      return GC_LIST.PADDING[p]
     }
 }

}

new GCRocket("rocket_1","rocket_padding")