class RocketPadding extends MachineBlock implements IItemUseCallback, IDestroyCallback {
    public static GROUP = ICRender.getGroup("galacticraft.rocket_padding");
    public static vectors = [
        [-1, 0], [0, -1], [0, 1], [1, 0], [-1, 1], [1, -1], [1, 1], [-1, -1]
    ];

    public constructor() {
        super("rocket_padding", [{
            inCreative: true,
            name: "block.galacticraft.rocket_padding",
            texture: [["rocket_padding", 0]]
        }]);

        RocketPadding.GROUP.add(this.id, 0);
        const modelBottom = new BlockRenderer.Model(0, 0, 0, 1, 3 / 16, 1, this.id, 0);
        const modelTop = new BlockRenderer.Model(0, 3 / 16, 0, 1, 5 / 16, 1, this.id, 0);
        const render = new ICRender.Model();

        render.addEntry(modelBottom);
        render.addEntry(modelTop)
        .setCondition(
            ICRender.AND(
                ICRender.BLOCK(-1, 0, 0, RocketPadding.GROUP, false),
                ICRender.BLOCK(0, 0, -1, RocketPadding.GROUP, false),
                ICRender.BLOCK(0, 0, 1, RocketPadding.GROUP, false),
                ICRender.BLOCK(1, 0, 0, RocketPadding.GROUP, false),
                ICRender.BLOCK(-1, 0, 1, RocketPadding.GROUP, false),
                ICRender.BLOCK(1, 0, -1, RocketPadding.GROUP, false),
                ICRender.BLOCK(1, 0, 1, RocketPadding.GROUP, false),
                ICRender.BLOCK(-1, 0, -1, RocketPadding.GROUP, false)
            )
        );
        BlockRenderer.setStaticICRender(this.id, -1, render);
    }    

    public isCenter(coords: Vector, region: BlockSource): boolean {
        return RocketPadding.vectors.every(([x, z]: number[]) => region.getBlockID(coords.x + x, coords.y, coords.z + z) == this.id);
    }

    public breakAll(coords: Vector, region: BlockSource, drop: boolean): void {
        [0, 0, ...RocketPadding.vectors].forEach(([x, z]: number[]) => region.destroyBlock(coords.x + x, coords.y, coords.z + z, drop));
    }

    public onItemUse(coords: Callback.ItemUseCoordinates, item: ItemStack, block: Tile, player: number): void {
        return Game.message(this.isCenter(coords, BlockSource.getDefaultForActor(player)));
    }

    public onDestroy(coords: Callback.ItemUseCoordinates, block: Tile, player: number): void {
        const region = BlockSource.getDefaultForActor(player);
        if(this.isCenter(coords, region)) {
            this.breakAll(coords, region, true);
        }
    }
}