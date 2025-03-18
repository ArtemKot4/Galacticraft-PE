abstract class MachineBlock extends GalacticraftBlock {
    public factory: RecipeFactory;

    public constructor(id: string, variationList: Block.BlockVariation[]) {
        super(id, variationList);

        ICRender.getGroup("rf-wire").add(BlockID[id], -1),
            ICRender.getGroup("ic-wire").add(BlockID[id], -1),
            ICRender.getGroup("gj-wire").add(BlockID[id], -1),
            ICRender.getGroup("gj-improved-wire").add(BlockID[id], -1),
            ICRender.getGroup("bt-wire").add(BlockID[id], -1),
            ICRender.getGroup("fc-wire").add(BlockID[id], -1);

        if (this.isWrenchable()) {
            Block.registerPlaceFunctionForID(this.id, (coords, item, block, player, region) => {
                if (Utils.getItemTags(item.id).includes("wrench")) {
                    region.setBlock(coords.x, coords.y, coords.z, block.id, block.data >= 4 ? 1 : block.data++);
                    return;
                }

                const func = Block.getPlaceFunc(block.id);

                if (func) {
                    return func(coords, item, block, player, region);
                };
            });
        };
    };

    public canRotate(): boolean {
        return true;
    }

    public isWrenchable(): boolean {
        return true;
    };

    public getMaterial(): string {
        return "stone";
    };

    public getDestroyLevel(): EDestroyLevel {
        return EDestroyLevel.STONE;
    };

    public static openTileEntity(tile: TileEntity, player: number) {
        if(!tile) return;
        const client = Network.getClientForPlayer(player); 
        
        if(!client) return;
        (tile.container as ItemContainer).openFor(client, "main");
    };
};