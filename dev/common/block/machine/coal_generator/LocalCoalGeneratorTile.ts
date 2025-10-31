class LocalCoalGeneratorTile extends LocalTileEntity {
    public override onTick(): void {
        if(this.networkData.getBoolean("has_energy", false) != false) {
            Particles.addParticle(EParticleType.FLAME, 
                this.x + 0.3,
                this.y + 0.5,
                this.z + 0.3,
                Math.random() / 20,
                Math.random() / 20,
                Math.random() / 20
            );
    
            Particles.addParticle(
                EParticleType.CLOUD,
                this.x + 0.3,
                this.y + 0.5,
                this.z + 0.3,
                Math.random() / 20,
                Math.random() / 20,
                Math.random() / 20
            );
        }
    }
}