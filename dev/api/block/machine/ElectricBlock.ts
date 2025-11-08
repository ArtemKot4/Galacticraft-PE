// abstract class ElectricBlock extends MachineBlock {
//     public constructor(stringID: string, variationList?: Block.BlockVariation[]) {
//         super(stringID, variationList);
        
//         const storageInterface = this.getStorageInterface();
//         if(storageInterface != null) {
//             StorageInterface.createInterface(this.id, storageInterface);
//         }        
//     }

//     public canContainEnergy(): boolean {
//         return true;
//     }

//     public addScalesBehaviour(): void {
//         const tilePrototype = TileEntity.getPrototype(this.id) as ProcessingTile;
//         if(tilePrototype == null) {
//             return;
//         }
//         const ui = tilePrototype.getScreenByName(null, tilePrototype.container);
//         if(ui == null) {
//             return;
//         }
//         if("onUpdate" in tilePrototype) {
//             const elements = ui.getContent().elements;
//             if("energy_bar" in elements && "energy_icon" in elements) {
//                 const funcLast = tilePrototype.onUpdate;
//                 tilePrototype.onUpdate = function() {
//                     this.container.setScale("energy_bar", this.data.energy / this.getCapacity());
//                     this.container.setScale("energy_icon", this.data.energy / 1);
//                     return funcLast.call(this);
//                 }
//             }
//         }
//     }

//     abstract getTileEntity(): ElectricTile;
//}