class RocketWorkbenchTop extends GalacticraftBlock implements IBlockModel, IDestroyCallback {
    public constructor() {
        super("workbench_nasa", [{
            name: "Workbench Nasa",
            texture: [["assembly",
                0],
                ["assembly",
                    1],
                ["assembly",
                    2],
                ["assembly",
                    3],
                ["assembly",
                    4],
                ["assembly",
                    5]],
            inCreative: false
        } ])
    };

    public onDestroy(coords: Callback.ItemUseCoordinates, block: Tile, player: number): void {
        const region = BlockSource.getDefaultForActor(player);
        region.destroyBlock(coords.x, coords.y, coords.z, false);
        region.destroyBlock(coords.x, coords.y - 1, coords.z, true);
    };

    public getModel(): BlockModel {
        return new BlockModel(__modelsdir__, "rocket_workbench_top", "assembly").translate(1, 1, 1);
    };
};