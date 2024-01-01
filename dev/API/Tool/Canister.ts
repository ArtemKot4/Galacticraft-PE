class Canister {
  public id: string;
  public texture: string;

  constructor(id) {

    this.id = id + "_canister";
    this.texture = id + "_canister_partial";
   
    this.createCanister();
  }

  public visual(): void {
    Game.message("[DEBUG CANISTER] <-> visual function: output -> texture_name: " + this.texture + "\nid:" + this.id)
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
    new GItem(this.id,1,this.texture,0,true);
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
      if (data.energy) data.energy -= 45;
      return (
        Storage.set(slot, ItemID["empty_liquid_canister"], container, 1, 0),
        (data[canister] += 5)
      );
    } else if (
      bucket &&
      data[canister] != 40 &&
      Storage.get(container, slot, "id", ItemID["bucket_of_" + canister])
    ) {
      if (data.energy) data.energy -= 45;
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
        container.getSlot(slot).data < 5
       )
    ) {
      return (
        Storage.set(slot, Canister.get(canister), container, 1, 1),
        (data[canister] -= 1),
        (data.energy -= 5)
      );
    }}
  }

  
}

new Canister("fuel");
new Canister("oil");

new GItem("test_item_blin",1,"oil_canister", "oil_canister_partial",3)