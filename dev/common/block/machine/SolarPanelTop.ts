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

    public getModel(): BlockModel {
        return new BlockModel(__modelsdir__, "solar_panel_top", "solar_panel_top").translate(1.6, 1.6, 1.6);
    };

    public onDestroy(coords: Callback.ItemUseCoordinates, block: Tile, player: number): void {
        const region = BlockSource.getDefaultForActor(player);
        region.destroyBlock(coords.x, coords.y, coords.z, false);
        region.destroyBlock(coords.x, coords.y - 1, coords.z, true);
    };
};