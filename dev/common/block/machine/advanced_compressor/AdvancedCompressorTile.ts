class AdvancedCompressorTile extends ElectricCompressorTile {
    protected override processTimeBase = 120;

    public override getScreenByName(): UI.IWindow {
        return AdvancedCompressorUI;
    }
}