class AluminumWire extends Wire {
    public constructor() {
        super("aluminum_wire_gc");
    }

    public override getBaseTexture(): string {
        return "aluminum_wire";
    }

    public override getColors(): string[] {
        return ["gray"];
    }
}
