class AdvancedCompressorTile extends ElectricCompressorTile {
    public override getScreenByName(): UI.IWindow {
        return AdvancedCompressorUI;
    }

    public override getProgressMax(): number {
        return 30;
    }
}