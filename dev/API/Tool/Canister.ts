class Canister extends GItem {
  public id: string;
  public texture: string;

  constructor(id) {
 super(id + "_canister", 1, null, id + "_canister_partial", 0, false);   
    this.visual();
    this.description((item, translation, name) => 
    Translation.translate(name) + 
    "\n§7" + (item.data == 0 ? item.data : item.data + "0") + " mB / " + "60 mB"
    )
  }

  public visual(): void {
     const texture = this.texture;
 Item.registerIconOverrideFunction(this.id, function (item, data) {
      return {
        name: item.data == 0 ? "empty_liquid_canister" : texture,
        meta: item.data
      }
    })
};
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
      
      const getInput = (id, value) => { return (Storage.get(container, slot, "id", Canister.get(canister)) &&
      data[canister] != 40 &&
      Storage.get(container, slot, id,
      value)
      )
      };
      
    if (
    getInput("id", Canister.get(canister)) && Storage.get(container, slot, "data", 6)
    ) {
      if (data.energy) data.energy -= 45;
      return (
        Storage.set(slot, ItemID["empty_liquid_canister"], container, 1, 0),
        (data[canister] += 5)
      );
    } else if (
      bucket &&
      getInput("id", ItemID["bucket_of_"+canister])
     
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