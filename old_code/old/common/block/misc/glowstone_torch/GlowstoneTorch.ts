class GlowstoneTorch extends BasicBlock {
    public constructor() {
        super("glowstone_torch_lit", [
            {
                name: "Torch glowtite",
                texture: [["glowstone_torch", 0]],
                inCreative: true,
            }
        ]);
        Block.setEmptyCollisionShape(this.id);
    };

    public getLightLevel(): number {
        return 15;
    };

    public getTranslucency(): number {
        return 1;
    };

    public getRenderType(): number {
        return 91;
    };
};
