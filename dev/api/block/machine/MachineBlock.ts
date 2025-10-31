class MachineBlock extends BasicBlock {
    public constructor(stringID: string, variationList?: Block.BlockVariation[]) {
        super(stringID, variationList);

        const description = this.getDescription();
        if(description != null) {
            Galacticraft.ToolTips.registerTipFor(this.id, description);
        }
        if(this.canHasLiquid()) {
            ICRender.getGroup("galacticraft.machine_liquid_connecting_0").add(this.id, 0);
            ICRender.getGroup("galacticraft.machine_liquid_connecting_1").add(this.id, 1);
            ICRender.getGroup("galacticraft.machine_liquid_connecting_2").add(this.id, 2);
            ICRender.getGroup("galacticraft.machine_liquid_connecting_3").add(this.id, 3);
        }
    }

    public override canRotate(): boolean {
        return true;
    }

    public getDescription(): Nullable<string> {
        return null;
    }

    public canHasLiquid(): boolean {
        return false;
    }
}