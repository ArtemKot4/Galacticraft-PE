class RocketPadding extends BasicBlock {
    public constructor() {
        super("rocket_padding", [{
            inCreative: true,
            name: "block.galacticraft.rocket_padding",
            texture: [["rocket_padding", 0]]
        }]);

        Block.setShape(this.id, 0, 0, 0, 1, 3 / 16, 1, 0);
        Block.setShape(this.id, 0, 0, 0, 1, 5 / 16, 1, 1);
    };

    public override getTileEntity(): CommonTileEntity {
        return new RocketPaddingTile();
    };
};

class RocketPaddingTile extends CommonTileEntity {
    // public isValidStructure(): boolean {
    //     const vectors = [
    //         [this.x, this.y, this.z], 
    //         [this.x - 1, this.y, this.z], 
    //         [this.x - 2, this.y, this.z], 
    //         [this.x, this.y, this.z - 1], 
    //         [this.x - 1, this.y, this.z - 1], 
    //         [this.x - 2, this.y, this.z - 1],
    //         [this.x, this.y, this.z - 2],
    //         [this.x - 1, this.y, this.z - 2],
    //         [this.x - 2, this.y, this.z - 2]
    //     ];
    
    //     for(let i in vectors) {
    //         if(this.blockSource.getBlockId(vectors[i][0], vectors[i][1], vectors[i][2]) !== this.blockID) {
    //             return false;
    //         }
    //     };

    //     return true;
    // };

    public findRocket(item: ItemStack): Nullable<Rocket> {
        for(const i in RocketManager.rocketTypes) {
            const rocket = RocketManager.rocketTypes[i];
            if(rocket.getDrop().id === item.id) {
                return rocket;
            };
        };
        return null;
    };

    public override onInit(): void {
        Game.message("padding init") //debug
        if(
            this.blockSource.getBlockId(this.x, this.y, this.z) == this.blockID &&
            this.blockSource.getBlockId(this.x - 1, this.y, this.z) == this.blockID &&
            this.blockSource.getBlockId(this.x - 2, this.y, this.z) == this.blockID &&
            this.blockSource.getBlockId(this.x, this.y, this.z - 1) == this.blockID &&
            this.blockSource.getBlockId(this.x - 1, this.y, this.z - 1) == this.blockID &&
            this.blockSource.getBlockId(this.x - 2, this.y, this.z - 1) == this.blockID &&
            this.blockSource.getBlockId(this.x, this.y, this.z - 2) == this.blockID &&
            this.blockSource.getBlockId(this.x - 1, this.y, this.z - 2) == this.blockID &&
            this.blockSource.getBlockId(this.x - 2, this.y, this.z - 2) == this.blockID &&
            this.blockSource.getBlockId(this.x - 2, this.y, this.z - 1) == this.blockID
        ) {
            return this.blockSource.setBlock(this.x - 1, this.y, this.z - 1, this.blockID, 1);
        };
    };

    public override onClick(coords: Callback.ItemUseCoordinates, item: ItemStack, player: number): boolean | void {
        const rocket = this.findRocket(item);
        if(rocket != null) {
            const padding = rocket.getRocketPadding();
            if(this.blockID === padding.id && this.blockSource.getBlockData(this.x, this.y, this.z) === padding.data) {
                let fuel = 0;
                let slotCount = 0;

                if(item.extra != null) {
                    fuel = item.extra.getInt("amount", 0);
                    slotCount = item.extra.getInt("slotCount",0);
                };

                const entity = this.blockSource.spawnEntity(this.x + 0.5, this.y + 0.2 , this.z + 0.5, rocket.getEntityType().slice(0, -2));
                RocketManager.addRocketEntity(rocket, entity, fuel, slotCount);
                
                if(!Utils.isCreativePlayer(player)) {
                    new PlayerUser(player).decreaseCarriedItem(1);
                };
            };
        };
    };
};
/*
new GBlock("rocket_padding", [
    { name: "Padding Rocket", texture: [["landing_pad", 0]], inCreative: true }
]).info("Place blocks 3x3\nfor create rocket padding");
IDRegistry.genBlockID("rocket_padding_completed");
Block.createBlock("rocket_padding_completed", [
    { name: "Padding of Rocket", texture: [["landing_pad", 0]], inCreative: false }
]);

IDRegistry.genBlockID("buggy_padding");
Block.createBlock("buggy_padding", [
    { name: "Buggy padding{DEBUG}", texture: [["buggy_pad", 0]], inCreative: false }
]);
IDRegistry.genBlockID("buggy_padding_completed");
Block.createBlock("buggy_padding_completed", [
    { name: "Buggy padding", texture: [["buggy_pad", 0]], inCreative: false }
]);
TileEntity.registerPrototype(BlockID.rocket_padding, {
    useNetworkItemContainer: true,
    init: function () {
        //   for(var i;i<3;i++){
        if (this.blockSource.getBlockId(this.x, this.y, this.z) == BlockID.rocket_padding &&
            this.blockSource.getBlockId(this.x - 1, this.y, this.z) == BlockID.rocket_padding &&
            this.blockSource.getBlockId(this.x - 2, this.y, this.z) == BlockID.rocket_padding &&
            this.blockSource.getBlockId(this.x, this.y, this.z - 1) == BlockID.rocket_padding &&
            this.blockSource.getBlockId(this.x - 1, this.y, this.z - 1) == BlockID.rocket_padding &&
            this.blockSource.getBlockId(this.x - 2, this.y, this.z - 1) == BlockID.rocket_padding &&
            this.blockSource.getBlockId(this.x, this.y, this.z - 2) == BlockID.rocket_padding &&
            this.blockSource.getBlockId(this.x - 1, this.y, this.z - 2) == BlockID.rocket_padding &&
            this.blockSource.getBlockId(this.x - 2, this.y, this.z - 2) == BlockID.rocket_padding &&
            this.blockSource.getBlockId(this.x - 2, this.y, this.z - 1) == BlockID.rocket_padding
        // this.blockSource.getBlockId(this.x - i, this.y, this.z) == BlockID.rocket_padding &&
        // this.blockSource.getBlockId(this.x - i, this.y, this.z - i) == BlockID.rocket_padding &&
        // this.blockSource.getBlockId(this.x, this.y, this.z - i) == BlockID.rocket_padding 
        ) {
            this.blockSource.setBlock(this.x - 1, this.y, this.z - 1, BlockID.rocket_padding_completed);
        }
    },
});
var model = BlockRenderer.createModel();
var render = new ICRender.Model();
model.addBox(0, 0, 0, 1, 3 / 16, 1, "landing_pad", 0);
var Padding1lvl = new ICRender.CollisionShape();
var entry = Padding1lvl.addEntry();
entry.addBox(0, 0, 0, 1, 3 / 16, 1);
BlockRenderer.setCustomCollisionShape(BlockID.rocket_padding, -1, Padding1lvl);
render.addEntry(model);
BlockRenderer.setStaticICRender(BlockID.rocket_padding, -1, render);
var model1 = BlockRenderer.createModel();
var render1 = new ICRender.Model();
var Padding1lvll = new ICRender.CollisionShape();
var entry = Padding1lvll.addEntry();
entry.addBox(0, 0, 0, 1, 5 / 16, 1);
BlockRenderer.setCustomCollisionShape(BlockID.rocket_padding_completed, -1, Padding1lvll);
render1.addEntry(model1);
model1.addBox(0, 0, 0, 1, 5 / 16, 1, "landing_pad", 0);
BlockRenderer.setStaticICRender(BlockID.rocket_padding_completed, -1, render1);
Block.registerDropFunction("rocket_padding_completed", function (coords, blockID) {
    return [[BlockID.rocket_padding, 1, 0]];
});
*/