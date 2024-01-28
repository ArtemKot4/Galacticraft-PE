/**
 * Класс, использующийся для регистрации планет
 */

class IPlanet {
  public biome_uid: string;
  public planet_uid = [];
  public gravitation?: number[];
  public generator: Dimensions.TerrainLayerParams[];
  public stone: int;
  public colors: [number, number, number, number, number, number];
  public description: { sky: Sky; gravity: IGravity };

  public createPlanet(): void {
    const planet_biome = new CustomBiome(this.biome_uid).setSkyColor(
      android.graphics.Color.rgb(this.colors[0], this.colors[1], this.colors[2])
    );
    const planet = new Dimensions.CustomDimension(
      this.planet_uid[0],
      this.planet_uid[1]
    ).setFogColor(this.colors[3], this.colors[4], this.colors[5]);
    planet.setGenerator(
      Dimensions.newGenerator({
        biome: planet_biome.id,
        layers: this.generator,
      })
    );
  }

  public setGravitation(): void {}

  public static transfer(planet): void {
    Network.sendToServer("gc:planet_provider", planet.id);
  }

  public getPlanet(): int {
    return this.planet_uid[1];
  }

  public getBiome(): string | CustomBiome {
    return this.biome_uid;
  }

  public getGravitation(): number[] {
    return this.gravitation;
  }

  public getGenerator() {
    return this.generator;
  }

  public setOre(
    ore: int,
    obj: { height: [int, int]; veinCounts: int; count: [int, int],stone?: int }
  ): void {
   if(obj){
   obj.stone = obj.stone || this.stone;
    Callback.addCallback(
      "GenerateCustomDimensionChunk",
      function (chunkX, chunkZ, random, dimensionId) {
        if (this.planet_uid[1] && (dimensionId != this.planet_uid[1])) return
        UniqueGen.generateOreInDimension(
          ore,
          0,
          chunkX,
          chunkZ,
          random,
          {
            veinCounts: obj.veinCounts, 
            minY: obj.height[0],
            maxY: obj.height[1],
            size: randomInt(obj.count[0], obj.count[1]),
            mode: true,
            check: [this.stone],
          }
        );
      }
    );
  }
}
  public getSkyColors(): number[] {
    return this.colors;
  }

  constructor(
    biome_uid: string,
    planet_uid: [string, number],

    generator: Dimensions.TerrainLayerParams[],
    stone?: int,

    colors?: [number, number, number, number, number, number],
    description?: { sky: Sky; gravity: IGravity }
  ) {
    (this.biome_uid = biome_uid),
      (this.planet_uid = planet_uid),
      (this.description = description),
      (this.generator = generator),
      (this.stone = stone),
      (this.colors = colors || [0, 0, 0, 0, 0, 0]);
    this.createPlanet();
  }
}
