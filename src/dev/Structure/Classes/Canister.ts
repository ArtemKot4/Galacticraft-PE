class Canister extends GCItem {
  public type = this.id + "_canister";
  public c_texture = this.id + "_canister_partial";

  public visual(): void {
    Item.registerNameOverrideFunction(
      this.type,
      function (item, translation, name) {
        return (
          Translation.translate(name) + "\n§7" + item.data + "0 mB / " + "60 mB"
        );
      }
    );

    Item.registerIconOverrideFunction(ItemID[this.type], function (item, data) {
      switch (item.data) {
        case 6:
          return {
            name: this.c_texture,
            meta: 6,
          };
        case 5:
          return {
            name: this.c_texture,
            meta: 5,
          };
        case 4:
          return {
            name: this.c_texture,
            meta: 4,
          };
        case 3:
          return {
            name: this.c_texture,
            meta: 3,
          };
        case 2:
          return {
            name: this.c_texture,
            meta: 2,
          };
        case 1:
          return {
            name: this.c_texture,
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
    new GCItem(this.type, 1, this.texture, 0, true).create();
    Item.addToCreative(this.type, 1, 6);
    this.visual();
  }

  public static get(type: string): int {
    return ItemID[type + "_canister"];
  }

/**
 * Производит замену предмета в слоте на пустой вариант, прибавляет +5 к значению жидкости value.
 * Если существует параметр с энергией,отнимает 45
 * @slot название слота
 * @canister название жидкости 
 * @value? название data жидкости
 * @bucket? true или ничего    

 */


  public static input(
    slot: string,
    canister: string,
    data: any,
    container: ItemContainer,
    value?: string,
    bucket?: true
  ): any {
    value = value || canister;
    if (
      Storage.get(container, slot, "id", Canister.get(canister)) &&
      data[value] != 40 &&
      Storage.get(container, slot, "data", 6)
    ) {
      if (data.energy != undefined) data.energy -= 45;
      return (
        Storage.set(slot, ItemID[canister], container), (data[canister] += 5)
      );
    } else if (
      bucket == undefined &&
      data[value] != 40 &&
      Storage.get(container, slot, "id", Canister.get(canister))
    ) {
      if (data.energy != undefined) data.energy -= 45;
      return (
        Storage.set(slot, VanillaItemID["bucket"], container),
        (data[canister] += 5)
      );
    }
  }
 
  public static output(
    slot: string,
    canister: string,
    container: ItemContainer,
    data: any,
    fluid_name?: string
    ): any {
    fluid_name = fluid_name || canister;
    if (Canister.get(canister) < 6 && World.getThreadTime()% 20 == 0 && data[fluid_name] > 0) {
      return (
        Storage.set(slot, Canister.get(canister), container, 0, + 1),
        (data[fluid_name] -= 1),
        (data.energy -= 5)
      );
    }
  }

  constructor(id, stack?, texture?, meta?, isTech?) {
    super(id, stack, texture, meta, isTech);
    this.createCanister();
  }
}

new Canister("fuel");
