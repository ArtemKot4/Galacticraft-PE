class ElectricCompressorTile extends ProcessingTile {
    protected processTimeBase = 200;
    public override inputSlots: string[] = MathHelper.range(1, 10).map(v => "slot_" + v);

    public override outputSlots: string[] = [
        "result_slot",
        "result_slot_2"
    ];

    public override getScreenByName(screenName?: string, container?: ItemContainer): UI.IWindow {
        return ElectricCompressorUI;
    }

    public override getFactory(): RecipeModule.UnformedFactory {
        return RecipeModule.getFactory<RecipeModule.UnformedFactory>("compressor");
    }

    public override getProgressMax(): number {
        const tier = this.getPowerTier ? this.getPowerTier() : 0;
        return Math.floor(this.processTimeBase / (1 + tier * 2));
    }
}