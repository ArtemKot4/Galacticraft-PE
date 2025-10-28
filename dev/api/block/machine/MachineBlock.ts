class MachineBlock extends BasicBlock {
    public getDescription(): Nullable<string> {
        return null;
    }

    public constructor(stringID: string, variationList?: Block.BlockVariation[]) {
        super(stringID, variationList);

        const description = this.getDescription();
        if(description != null) {
            Galacticraft.ToolTips.registerTipFor(this.id, description);
        }
    }
}