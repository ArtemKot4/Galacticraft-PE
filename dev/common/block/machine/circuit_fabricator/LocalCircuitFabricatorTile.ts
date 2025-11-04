class LocalCircuitFabricatorTile extends LocalTileEntity {
    @ContainerEvent
    public update_heating_scale_bitmap(container: ItemContainer, window: UI.StandardWindow, windowContent: UI.WindowContent, eventData: any): void {
        if(Updatable.getLocalSyncTime() % 5 == 0 && window != null && window.isOpened() == true) {
            container.setClientBinding("heating_scale", "texture", 
                LocalCircuitFabricatorTile.getValidScaleBitmapName(
                    String(container.getBinding("heating_scale", "texture") as string)
                )
            );
        }
    }
    
    public static getNewScaleBitmapIndex(index: number): number {
        return index > 3 ? 0 : index + 1;
    }

    public static getValidScaleBitmapName(bitmapName: string) {
        return "machine.circuit_fabricator.heat_scale_" + this.getNewScaleBitmapIndex(Number(bitmapName[bitmapName.length-1])); 
    }
}