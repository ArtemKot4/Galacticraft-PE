class Satellite extends Planet implements ISatellite {
    public readonly linkedPlanet: IPlanet;

    public constructor(planet: IPlanet, id: number, stringId: string, biome?: CustomBiome) {
        super(id, stringId, biome);
        this.linkedPlanet = planet;
    }
}