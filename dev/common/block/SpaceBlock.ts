class SpaceBlock extends BasicBlock {
    public override getLightOpacity(): number {
        return 15;
    }

    public override getDestroyTime(): number {
        return -1;
    }

    public constructor() {
        super("space", [{ name: "Space Air", texture: [["Black", 0]], inCreative: false }]);
    }
}