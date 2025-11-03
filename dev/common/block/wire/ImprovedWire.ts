class ImprovedWire extends Wire {
    public constructor() {
        super("improved_wire_gc", [{
            name: "block.galacticraft.improved_wire",
            texture: [["improved_aluminum_wire_gray", 0]],
            inCreative: true
        }]);
    }

    public override getWidth(): number {
        return 2 / 8;
    }

    public override getGroup(): ICRender.Group {
        return ICRender.getGroup("galacticraft.improved_wire");
    }
}