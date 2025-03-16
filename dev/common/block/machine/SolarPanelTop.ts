class SolarPanelTop extends GalacticraftBlock implements IBlockModel {
    public constructor() {
        super("solar_panel_top", [
            {
                name: "block.galacticraft.solar_panel",
                texture: [["solar_basic", 0]],
                inCreative: false
            }
        ]);
    };

    public getModel(): RenderMesh {
        const mesh = RenderHelper.generateMesh(__modelsdir__, "solar_panel", {
            translate: [1.6, 1.6, 1.6],
            invertV: false,
            noRebuild: false,
        });

        mesh.setBlockTexture("solar_panel", 0);

        return mesh;
    };
};