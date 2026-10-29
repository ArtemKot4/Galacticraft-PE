// class ArclampTile extends CommonTileEntity {
//     public override defaultValues = {};
//     public override data: typeof this.defaultValues;

//     public override getScreenByName(): UI.IWindow {
//         return null;
//     }

//     public override redstone(params: Callback.RedstoneSignalParams): void {
//         const litId = BlockList.ARCLAMP.id;
//         const offId = BlockList.ARCLAMP_OFF.id;
//         const currentId = this.blockSource.getBlockID(this.x, this.y, this.z);

//         if(params.power > 0 && currentId != offId) {
//             this.blockSource.setBlock(this.x, this.y, this.z, offId, 0);
//         } else if(params.power == 0 && currentId != litId) {
//             this.blockSource.setBlock(this.x, this.y, this.z, litId, 0);
//         }
//     }
// }

// class Arclamp extends BasicBlock {
//     public static tile = new ArclampTile();

//     public constructor() {
//         super("arclamp_gc", [{ name: "tile.galacticraft.arclamp", texture: [
//             ["arc_lamp_on", 0],
//             ["arc_lamp_on", 0],
//             ["arc_lamp_on", 0],
//             ["arc_lamp_on", 0],
//             ["arc_lamp_on", 0],
//             ["arc_lamp_on", 0]
//         ], inCreative: true }]);
//     }

//     public override getLightLevel(): number {
//         return 14;
//     }

//     public override getTileEntity(): CommonTileEntity {
//         return Arclamp.tile;
//     }
// }

// class ArclampOff extends BasicBlock {
//     public static tile = new ArclampTile();

//     public constructor() {
//         super("arclamp_off_gc", [{ name: "tile.galacticraft.arclamp", texture: [
//             ["arc_lamp_off", 0],
//             ["arc_lamp_off", 0],
//             ["arc_lamp_off", 0],
//             ["arc_lamp_off", 0],
//             ["arc_lamp_off", 0],
//             ["arc_lamp_off", 0]
//         ], inCreative: false }]);
//     }

//     public override getLightLevel(): number {
//         return 0;
//     }

//     public override getDrop(coords: Callback.ItemUseCoordinates, id: number, data: number, diggingLevel: number, enchant: ToolAPI.EnchantData, item: ItemStack, region: BlockSource): ItemInstanceArray[] {
//         return [[BlockList.ARCLAMP.id, 1, 0]];
//     }

//     public override getTileEntity(): CommonTileEntity {
//         return ArclampOff.tile;
//     }
// }
