class LocalOxygenCollectorTile extends LocalTileEntity {
    public onTick() {
        const active = this.networkData.getBoolean("active");
    }
};