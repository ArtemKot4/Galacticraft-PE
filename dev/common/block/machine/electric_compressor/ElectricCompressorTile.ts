class ElectricCompressorTile extends ProcessingTile {
    public override inputSlots: string[] = MathHelper.range(1, 10).map(v => "slot_" + v);

    public override outputSlots: string[] = [
        "result_slot"
    ];

    public override getScreenByName(screenName?: string, container?: ItemContainer): UI.IWindow {
        return ElectricCompressorUI;
    }

    public override getFactory(): RecipeModule.UnformedFactory {
        return RecipeModule.getFactory<RecipeModule.UnformedFactory>("compressor");
    }
}