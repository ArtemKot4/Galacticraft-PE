class MagneticTable extends MachineBlock {
    public static tile = new MagneticTableTile();

    public constructor() {
        super("magnetic_table", [{
            name: "tile.galacticraft.magnetic_table",
            texture: [
                ["crafting_table_base1", 0],
                ["crafting_table_top1", 0],
                ["crafting_table_side1", 0],
                ["crafting_table_side1", 0],
                ["crafting_table_side1", 0],
                ["crafting_table_side1", 0]
            ],
            inCreative: true
        }]);
    }

    public override getTileEntity(): CommonTileEntity {
        return MagneticTable.tile;
    }
}