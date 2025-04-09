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
};

class RocketPaddingTile extends CommonTileEntity {
    public onInit(): void {
        if(this.isValidStructure()) {
            this.blockSource.setBlock(this.x - 1, this.y, this.z - 1, this.blockID, 1);
        };
    };

    public isValidStructure(): boolean {
        for(let i = 0; i <= 2; i++) {
            for(let k = 0; k <= 2; k++) {
                if(this.blockSource.getBlockId(this.x - i, this.y, this.z - k) !== this.blockID) {
                    return false;
                };
            };
        };
    
        return true;
    };

    public findRocket(item: ItemStack): Nullable<Rocket> {
        for(const i in RocketManager.registeredRockets) {
            const rocket = RocketManager.registeredRockets[i];
            if(rocket.getDrop().id === item.id) {
                return rocket;
            };
        };
        return null;
    };

    public onClick(coords: Callback.ItemUseCoordinates, item: ItemStack, player: number): boolean | void {
        if(this.blockSource.getBlockData(this.x, this.y, this.z) === 1) {
            const rocket = this.findRocket(item);
            if(rocket !== null) {
                let fuel = 0;
                let slotCount = 0;

                if(item.extra != null) {
                    fuel = item.extra.getInt("amount", 0);
                    slotCount = item.extra.getInt("slotCount",0);
                };

                RocketManager.addRocketEntity(rocket, this.blockSource.spawnEntity(this.x + 0.5, this.y + 0.5, this.z + 0.5, rocket.getEntityType()), fuel, slotCount)
                new PlayerUser(player).decreaseCarriedItem(1);
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