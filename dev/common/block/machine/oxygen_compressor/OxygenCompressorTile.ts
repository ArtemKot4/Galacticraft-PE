class OxygenCompressorTile extends CommonTileEntity {
    public override getScreenByName(screenName?: string, container?: ItemContainer): Nullable<UI.IWindow> {
        return OxygenCompressorUI;
    }
}