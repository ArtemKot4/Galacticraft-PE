class PanelLighting extends BasicBlock {
    public constructor() {
        super("panel_lighting", [
            { name: "Panel Lighting (Square)", texture: [["panel_light_square", 0]], inCreative: true },
            { name: "Panel Lighting (Spots)", texture: [["panel_light_spots", 0]], inCreative: true },
            { name: "Panel Lighting (Linear)", texture: [["panel_light_linear", 0]], inCreative: true },
            { name: "Panel Lighting (SF)", texture: [["panel_light_sf", 0]], inCreative: true },
            { name: "Panel Lighting (SF Diagonal)", texture: [["panel_light_sfdiag", 0]], inCreative: true }
        ]);
    }

    public override getLightLevel(): number {
        return 11;
    }
}

class SpaceGlass extends BasicBlock {
    private destroyTime: number;

    public constructor(stringID: string, name: string, texture: string, destroyTime: number) {
        super(stringID, [{ name: name, texture: [[texture, 0]], inCreative: true }]);
        this.destroyTime = destroyTime;
    }

    public override getDestroyTime(): number {
        return this.destroyTime;
    }

    public override getLightOpacity(): number {
        return 0;
    }

    public override getTranslucency(): number {
        return 1;
    }

    public override getRenderLayer(): number {
        return 1;
    }
}

class FallenMeteor extends BasicBlock {
    public constructor() {
        super("fallen_meteor", [{ name: "Fallen Meteor", texture: [["fallen_meteor", 0]], inCreative: true }]);
    }
}
