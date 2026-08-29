class ImprovedWire extends Wire {
    public constructor() {
        super("improved_wire_gc");
    }

    public override getBaseTexture(): string {
        return "improved_aluminum_wire";
    }

    public override getWidth(): number {
        return 2 / 8;
    }

    public override getGroup(): ICRender.Group {
        return ICRender.getGroup("galacticraft.improved_wire");
    }
}