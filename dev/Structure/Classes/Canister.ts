class Canister {
  public id: string;
  public texture: string;
  public static getTexture(canister): string {
    return canister+"_canister_partial"
  }
  public visual(): void {
    Item.registerNameOverrideFunction(
      this.id,
      function (item, translation, name) {
        return (
          Translation.translate(name) + "\n§7" + item.data + "0 mB / " + "60 mB"
        );
      }
    );

    Item.registerIconOverrideFunction(this.id, function (item, data) {
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

  public createCanister(): void {
    new GCItem(this.id,1,this.texture,0,true).create();
    Item.addToCreative(this.id, 1, 6);
    this.visual();
  }

  public static get(type: string): int {
    return ItemID[type + "_canister"];
  }

  public static input(
    slot: string,
    canister: string,
    container: ItemContainer,
    data: any,
    bucket?: true
  ): any {
    if (
      Storage.get(container, slot, "id", Canister.get(canister)) &&
      data[canister] != 40 &&
      Storage.get(container, slot, "data", 6)
    ) {
      if (data.energy != undefined) data.energy -= 45;
      return (
        Storage.set(slot, ItemID["empty_liquid_canister"], container, 1, 0),
        (data[canister] += 5)
      );
    } else if (
      bucket == undefined &&
      data[canister] != 40 &&
      Storage.get(container, slot, "id", ItemID["bucket_of_" + canister])
    ) {
      if (data.energy != undefined) data.energy -= 45;
      return (
        Storage.set(slot, 325, container,1,0),
        (data[canister] += 5)
      );
    }
  }

  public static output(
    slot: string,
    canister: string,
    container: ItemContainer,
    data: any,
  ): any {
    if( World.getThreadTime() % 20 == 0 &&
    data[canister] > 0){
    if (
      (Storage.get(container, slot, "id", ItemID["empty_liquid_canister"]) ||
      Storage.get(container, slot, "id", Canister.get(canister)) 
      &&
        container.getSlot(slot).data < 6 
       )
    ) {
      return (
        Storage.set(slot, Canister.get(canister), container, 1, 1),
        (data[canister] -= 1),
        (data.energy -= 5)
      );
    }}
  }

  constructor(id, stack?, texture?, meta?, isTech?) {

    this.id = id + "_canister";
    this.texture = texture + "_canister_partial";
   
    this.createCanister();
  }
}

new Canister("fuel");
new Canister("oil");

new GCItem("test_canister_blin",1,"oil_canister_partial",3)