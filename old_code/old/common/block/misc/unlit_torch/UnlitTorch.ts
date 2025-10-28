class UnlitTorch extends BasicBlock {
    public constructor() {
        super("unlit_torch", [{ name: "Torch off", texture: [["unlit_torch", 0]], inCreative: true }]);
        Block.setEmptyCollisionShape(this.id);
    }

    public getTranslucency(): number {
        return 0;
    }

    public getRenderLayer(): number {
        return 3;
    }

    public getRenderType(): number {
        return 2;
    }
}

TileEntity.registerPrototype(BlockID["unlit_torch"], {
    init: function() {
        if(TagRegistry.getDimensionTags((this.blockSource as BlockSource).getDimension()).includes("no_oxygen")) {
            this.blockSource.setBlock(this.x, this.y, this.z, BlockID.torch_off_lit, 0);
        } else {
            TileEntity.destroyTileEntityAtCoords(this.x, this.y, this.z, this.blockSource);
        };
    }
});
