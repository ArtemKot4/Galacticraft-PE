class Satellite extends Planet implements ISatellite {
    public linkedPlanet: number;

    public constructor(id: number, stringId: string, biome?: CustomBiome) {
        super(id, stringId, biome);
    }

    public static isStation(satellite: ISatellite): satellite is Station {
        return satellite instanceof Station;
    }
}