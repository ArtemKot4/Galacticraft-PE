class LocalVenusSpoutTile extends LocalTileEntity {
    public onTick(): void {
        const active = this.networkData.getBoolean("active", false);

        if(active) {
            Particles.addParticle(EGalacticraftParticle.SPOUT, this.x + 0.5, this.y + 1.1, this.z + 0.5, 0.1, 0.3, 0.1);
        };
    };
};
