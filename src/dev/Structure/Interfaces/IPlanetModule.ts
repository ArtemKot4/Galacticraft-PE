interface IPlanetModule {
    gravitation?: number[];
    biome_uid: string | CustomBiome;
    planet_uid: [string,number]
    createPlanet(): void;
    setGravitation(): void;
    getPlanet(): any;
    getBiome(): string | CustomBiome
    getGravitation(): void;
  }