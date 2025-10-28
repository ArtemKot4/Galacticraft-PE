abstract class MachineBlock extends GalacticraftBlock {
    public constructor(id: string, variationList: Block.BlockVariation[]) {
        super(id, variationList);
        ICRender.getGroup("rf-wire").add(this.id, -1);
        ICRender.getGroup("ic-wire").add(this.id, -1);
        ICRender.getGroup("gc.wire").add(this.id, -1);
        ICRender.getGroup("gc.improved-wire").add(this.id, -1);
        ICRender.getGroup("bt-wire").add(this.id, -1);
        ICRender.getGroup("fc-wire").add(this.id, -1);
        EnergyTileRegistry.addEnergyTypeForId(this.id, EnergyTypes.GJ);
        EnergyTileRegistry.addEnergyTypeForId(this.id, EnergyTypes.EU);
    }

    public canRotate(): boolean {
        return true;
    }

    public isWrenchable(): boolean {
        return true;
    }

    public getMaterial(): string {
        return "stone";
    }

    public getDestroyLevel(): EDestroyLevel {
        return EDestroyLevel.STONE;
    }

    public static openTileEntity(tile: TileEntity, player: number) {
        if(!tile) return;
        const client = Network.getClientForPlayer(player); 
        
        if(!client) return;
        (tile.container as ItemContainer).openFor(client, "main");
    }
}