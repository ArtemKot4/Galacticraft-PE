class VenusSpout extends GalacticraftBlock {
    public constructor() {
        super("venus_spout", [{
            name: "block.galacticraft.venus_spout",
            texture: [
                ["venus_rock", 0],
                ["venus_spout", 0],
                ["venus_rock", 0],
                ["venus_rock", 0],
                ["venus_rock", 0],
                ["venus_rock", 0]
            ],
            inCreative: true
        }]);
    };

    public getTileEntity(): CommonTileEntity {
        return new VenusSpoutTile();
    }
};