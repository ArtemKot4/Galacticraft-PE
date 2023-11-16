class Canister extends GCItem {
  public type = this.id + "_canister";
  public texture = this.id + "_canister_partial";

  public createCanister(): void {
    new GCItem(this.type, 1, this.texture, 0, true).create();
    Item.addToCreative(this.type, 1, 6);
  }

  public static get(type): int {
    return ItemID[type + "_canister"];
  }

  public visual(): void {
    Item.registerNameOverrideFunction(
      this.type,
      function (item, translation, name) {
        return (
          Translation.translate(name) + "\n§7" + item.data + "0 mB / " + "60 mB"
        );
      }
    );

    Item.registerIconOverrideFunction(this.type, function (item, data) {
      switch (item.data) {
        case 6:
          return {
            name: this.texture,
            meta: 6,
          };
        case 5:
          return {
            name: this.texture,
            meta: 5,
          };
        case 4:
          return {
            name: this.texture,
            meta: 4,
          };
        case 3:
          return {
            name: this.texture,
            meta: 3,
          };
        case 2:
          return {
            name: this.texture,
            meta: 2,
          };
        case 1:
          return {
            name: this.texture,
            meta: 1,
          };
        case 0:
          return {
            name: "empty_liquid_canister",
            meta: 0,
          };
      }
    });
  }

  constructor(id,stack?,texture?,meta?,isTech?){
      super(id,stack,texture,meta,isTech);
   this.createCanister();
   this.visual();
  }

}

new Canister("fuel")