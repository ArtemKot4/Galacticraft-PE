class VenusSpoutTile extends CommonTileEntity {
    public data = {
        active: false
    };

    public hasSulphuricAcidUnder(): boolean {
        for(let i = 1; i <= 7; i++) {
            if(this.blockSource.getBlockId(this.x, this.y - i, this.z) === BlockID.sulphuric_acid_still) {
                return true;
            };
        };
        return false;
    };

    public onTick(): void {
        const active = this.hasSulphuricAcidUnder();
        this.data.active = active;
        this.networkData.putBoolean("active", active);
        this.networkData.sendChanges();
    };

    public getLocalTileEntity(): LocalTileEntity {
        return new LocalVenusSpoutTile();
    };
};