// type liquids = "fuel" | "oil";

// interface ICanisterInputDescriptor<T extends liquids> {
//   slot: string;
//   input: id;
//   output: id;
//   liquid: T;
// }

// class Canister extends GItem {
//   public id: string;
//   public texture: string;

//   constructor(id) {
//     super(id + "_canister", 1, null, id + "_canister_partial", 0, true);
//     Item.addToCreative(id + "_canister", 1, 6);
//     this.visual();
//     Item.registerNameOverrideFunction(this.id, (item, translation, name) => {
//       return (
//         Translation.translate(name) +
//         "\n§7" +
//         (item.data === 0 ? item.data : item.data + "0") +
//         " mB / 60 mB"
//       );
//     });

//     this.setClickLogic();
//   }

//   public visual(): void {
//     const texture = this.texture;
//     Item.registerIconOverrideFunction(this.id, function (item, data) {
//       return {
//         name: item.data == 0 ? "empty_liquid_canister" : texture,
//         meta: item.data,
//       };
//     });
//   }
//   public static get(type: liquids): int {
//     return ItemID[type + "_canister"];
//   }
//   public static input<T extends liquids>(
//     descriptor: ICanisterInputDescriptor<T>,
//     container: ItemContainer,
//     data: TileEntity.TileEntityPrototype["data"]
//   ): void {
//     const slot = container.getSlot(descriptor.slot);
//     if (
//       slot.id === descriptor.input &&
//       slot.data > 0 &&
//       data[descriptor.liquid] < data.liquid_max
//     ) {
//       if (data.energy) {
//         data.energy -= 50;
//       }
//       return (
       
//         (data[descriptor.liquid] += slot.data,
//           container.setSlot(descriptor.slot, descriptor.output, 1, 0))
//       );
//     }
//   }

//   public static output<T extends liquids>(
//     descriptor: ICanisterInputDescriptor<T>,
//     container: ItemContainer,
//     data: any
//   ): any {
//     const slot = container.getSlot(descriptor.slot);
//     if (
//       World.getThreadTime() % 20 === 0 &&
//       data[descriptor.liquid] > 0 &&
//         (slot.id === descriptor.output && slot.data < 6) || slot.id === descriptor.input)
//      {
//       return (
//         container.setSlot(descriptor.slot, descriptor.output, 1, slot.data+=1),
//         (data[descriptor.liquid]--)
//       );
//     }
//   };

//   protected clickerPrototype(item: ItemInstance, player: int, coords: Callback.ItemUseCoordinates, item_data, block_id) {
//     const region = BlockSource.getDefaultForActor(player);
//     return region.setBlock(coords.x, coords.y, coords.z, block_id, 0),
//     Entity.setCarriedItem(player, item.id, item.count, item_data, item.extra)
//   };

//   protected takeLiquidOnClick(item: ItemInstance, block: Tile, player: int, coords: Callback.ItemUseCoordinates, liquid: int) {
//       return this.clickerPrototype(item, player, coords, 6, 0);
 
//   };

//   protected pourOnClick(item: ItemInstance, block: Tile, player: int, coords: Callback.ItemUseCoordinates, liquid: int) {
//     return this.clickerPrototype(item, player, coords, 0, liquid)
//   };

//   public setClickLogic() {
//     return Item.registerUseFunction(this.id, (coords, item, block, player) => {
//       const liquid = BlockID[this.id.split("_")[0]];
//       Game.message("id of liquid define by: " +this.id.split("_")[0]);
//       if(item.data < 6 && block.id === liquid) return this.takeLiquidOnClick(item, block, player, coords, liquid) 
//       if(item.data === 6) return this.pourOnClick(item, block, player, coords, liquid)
//     })
//   }
// }


// new Canister("fuel");
// new Canister("oil");
