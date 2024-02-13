/**
 * Класс, использующийся для регистрации планет
 */
type colors = [sr: int, sg: int, sb: int, fr: int, fg: int, fb: int]

class IPlanet {
  public biome_uid: string;
  public planet_uid = [];
  public generator: Dimensions.TerrainLayerParams[];
  public stone: int;
  public colors: colors;
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


  public static transfer(planet): void {
    Network.sendToServer("gc:planet_provider", planet.id); //!
  }

  public getPlanet(): int {
    return this.planet_uid[1];
  }

  public getBiome(): string | CustomBiome {
    return this.biome_uid;
  }

  public getGenerator() {
    return this.generator;
  }
  public static oreParams = [];
      
  public static oreGeneration(): void {
       
      Callback.addCallback(
      "GenerateCustomDimensionChunk",
      function (chunkX, chunkZ, random, dimensionId) {
      for(const i in IPlanet.oreParams){
        const params = IPlanet.oreParams[i];
        if (params.planet != dimensionId) return;
       const obj = params.obj;
        UniqueGen.generateOreInDimension(
          params.ore,
          0,
          chunkX,
          chunkZ,
          random,
          {
            veinCounts: params.obj.veinCounts, 
            minY: obj.height[0],
            maxY: obj.height[1],
            size: randomInt(obj.count[0], obj.count[1]),
            mode: true,
            check: [obj?.stone || this.stone],
          })
             }
      }
    );
  };
  
  public setOre(
    ore: string | int,
    obj: { height: [int, int]; veinCounts: int; count: [int, int],stone?: int }
  ): void {
   if(!obj) return;
   obj.stone = obj.stone || this.stone;
       
        IPlanet.oreParams.push({ore: typeof ore === "string" ? BlockID["ore_" + ore + "_" + this.planet_uid[0] : ore , obj: obj, planet: this.planet_uid[1]});
}
  public getSkyColors(): number[] {
    return this.colors;
  }

  constructor(
    biome_uid: string,
    planet_uid: [string, number],

    generator: Dimensions.TerrainLayerParams[],
    stone?: int,

    colors?: colors 
  ) {
    (this.biome_uid = biome_uid),
      (this.planet_uid = planet_uid),
      (this.generator = generator),
      (this.stone = stone),
      (this.colors = colors || [0, 0, 0, 0, 0, 0]);
    this.createPlanet();
  }
}
