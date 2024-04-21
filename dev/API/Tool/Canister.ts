type liquids = 'fuel' | 'oil';

interface ICanisterInputDescriptor<T extends liquids> {
  slot: string,
   input: id,
   output: id,
   liquid: T
};

class Canister extends GItem {
  public id: string;
  public texture: string;
   
  constructor(id) {
    super(id + "_canister", 1, null, id + "_canister_partial", 0, false);
    this.visual();
    Item.registerNameOverrideFunction(this.id, (item, translation, name) => {
      
      Translation.translate(name) +
        "\n§7" +
        (item.data === 0 ? item.data : item.data + "0") +
        " mB / 60 mB"
    });
  }

  public visual(): void {
    const texture = this.texture;
    Item.registerIconOverrideFunction(this.id, function (item, data) {
      return {
        name: item.data == 0 ? "empty_liquid_canister" : texture,
        meta: item.data,
      };
    });
  }
  public static get(type: liquids): int {
    return ItemID[type + "_canister"];
  }
  public static input<T extends liquids>(
    descriptor: ICanisterInputDescriptor<T>,
    container: ItemContainer,
    data: TileEntity.TileEntityPrototype["data"],
  ): void {
    const slot = container.getSlot(descriptor.slot)
    if((slot.id === descriptor.input && slot.data === 6) &&
     data[descriptor.liquid] < data.liquid_max) {     
      if(data.energy){ data.energy -= 50 } 
      return container.setSlot(descriptor.slot, descriptor.output, 1, 0),
      data[descriptor.liquid]+=5;
    }
  }


  public static output<T extends liquids>(
    descriptor: ICanisterInputDescriptor<T>,
    container: ItemContainer,
    data: any
  ): any {
    const slot = container.getSlot(descriptor.slot);
    if (World.getThreadTime() % 20 === 0 && data[descriptor.liquid] >= 10 && (slot.id === 
  descriptor.input || (slot.id === descriptor.output && slot.data < 6))) {
       return container.setSlot(descriptor.slot, descriptor.input, 1, slot.data++),
       data[descriptor.liquid] -= 10;
    }
  }
}

new Canister("fuel");
new Canister("oil");
