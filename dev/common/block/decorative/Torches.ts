class UnlitTorch extends BasicBlock {
    public constructor() {
        super("unlit_torch", [{ name: "Unlit Torch", texture: [["unlit_torch", 0]], inCreative: true }]);
        Block.setEmptyCollisionShape(this.id);
    }

    public override getLightLevel(): number {
        return 3;
    }

    public override getTranslucency(): number {
        return 0;
    }

    public override getRenderLayer(): number {
        return 3;
    }

    public override getRenderType(): number {
        return 2;
    }
}

class UnlitTorchLit extends BasicBlock {
    public constructor() {
        super("unlit_torch_lit", [{ name: "Lit Torch", texture: [["unlit_torch_lit", 0]], inCreative: true }]);
        Block.setEmptyCollisionShape(this.id);
    }

    public override getLightLevel(): number {
        return 15;
    }

    public override getTranslucency(): number {
        return 0;
    }

    public override getRenderLayer(): number {
        return 3;
    }

    public override getRenderType(): number {
        return 2;
    }
}

class GlowstoneTorch extends BasicBlock {
    public constructor() {
        super("glowstone_torch", [{ name: "Glowstone Torch", texture: [["glowstone_torch", 0]], inCreative: true }]);
        Block.setEmptyCollisionShape(this.id);
    }

    public override getLightLevel(): number {
        return 15;
    }

    public override getTranslucency(): number {
        return 1;
    }

    public override getRenderType(): number {
        return 91;
    }
}
