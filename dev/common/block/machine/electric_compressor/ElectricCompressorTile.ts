class ElectricCompressorTile extends ProcessingTile {
    public override inputSlots: string[] = MathHelper.range(1, 10).map(v => "slot_" + v);

    public override outputSlots: string[] = [
        "result_slot_1", "result_slot_2"
    ];

    public override getScreenByName(screenName?: string, container?: ItemContainer): UI.IWindow {
        return ElectricCompressorUI;
    }

    public override getFactory(): UnformedRecipeFactory {
        return RecipeFactory.get<UnformedRecipeFactory>("compressor");
    }
}