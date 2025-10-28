abstract class ElectricBlock extends MachineBlock {
    public constructor(stringID: string, variationList?: Block.BlockVariation[]) {
        super(stringID, variationList);
        EnergyTileRegistry.addEnergyTypeForId(this.id, Galacticraft.JOULE);
    }

    abstract getTileEntity(): ElectricTile;
}