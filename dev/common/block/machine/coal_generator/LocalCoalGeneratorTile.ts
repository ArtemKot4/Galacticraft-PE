class LocalCoalGeneratorTile extends LocalTileEntity {
    public onTick(): void {
        const active = this.networkData.getBoolean("active", false);

        if(active) {
            Particles.addParticle(
                EParticleType.FLAME, this.x + 0.5,
                this.y + 0.5,
                this.z + 0.5,
                Math.random() / 20,
                Math.random() / 20,
                Math.random() / 20
            );
    
            Particles.addParticle(
                EParticleType.CLOUD, this.x + 0.5,
                this.y + 0.5,
                this.z + 0.5,
                Math.random() / 20,
                Math.random() / 20,
                Math.random() / 20
            );
        };
    };
};