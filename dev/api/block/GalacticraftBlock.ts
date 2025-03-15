class GalacticraftBlock extends BasicBlock {
    public constructor(id: string, variationList: Block.BlockVariation[]) {
        super(id, variationList);

        if("getHint" in this) {
            GalacticraftItem.setHint(this.id, this.getHint());
        };

        if("getPlaceItem" in this) {
            const item = this.getPlaceItem();

            Item.registerUseFunction(item, (coords, item, block, player) => {
                const region = BlockSource.getDefaultForActor(player);
                region.setBlock(coords.relative.x, coords.relative.y, coords.relative.z, this.id, 0);

                if(!Utils.isCreativePlayer(player)) {
                    Entity.setCarriedItem(player, item.id, item.count - 1, item.data);
                };
            });

            Block.registerDropFunction(BlockID[this.id], function (coords, blockID) {
                return [[item, 1, 0]];
            });
        };
    };

    public getHint?(): string;

    public getPlaceItem?(): number;
    // public setupObjModel(texture, model, scale?: [int, int, int]) {
    //     const mesh = new RenderMesh();
    //     mesh.setBlockTexture(texture, 0);
    //     mesh.importFromFile(__dir__ + "/resources/models/" + (model || texture) + ".obj", "obj", {
    //         translate: [0.5, 0, 0.5],
    //         scale: scale,
    //         invertV: false,
    //         noRebuild: false,
    //     });
    //     const render = new ICRender.Model();
    //     render.addEntry(new BlockRenderer.Model(mesh));
    //     BlockRenderer.setStaticICRender(BlockID[this.id], 0, render);
    // }
};
