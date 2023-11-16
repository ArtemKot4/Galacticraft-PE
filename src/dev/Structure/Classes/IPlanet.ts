
  
  /**
   * Класс, использующийся для регистрации планет
  */
  
  class IPlanet implements IPlanetModule {
    public biome_uid: string
    public planet_uid: [string,number]
    public gravitation?: number[];
    public generator: Dimensions.TerrainLayerParams[];
    public colors: [number, number, number, number, number, number];
  
    
    public createPlanet(): void {
      
      var planet_biome = new CustomBiome(this.biome_uid)
      .setSkyColor(android.graphics.Color.rgb(this.colors[0], this.colors[1], this.colors[2]))
      var planet = new Dimensions.CustomDimension(
        this.planet_uid[0],
        this.planet_uid[1]
      )
   .setFogColor(this.colors[3], this.colors[4], this.colors[5])
      planet.setGenerator(
        Dimensions.newGenerator({
          biome: planet_biome.id,
          layers: this.generator
          
        })
      );
    }
  
    
    public setGravitation(): void {
  
    }
  
    public static transfer(planet): void {
      Network.sendToServer("gc:planet_provider", planet)
    }
  
    public getPlanet(): [string,number] {
      return this.planet_uid;
    }
  
    public getBiome(): string | CustomBiome {
      return this.biome_uid
    }
  
   public getGravitation(): number[] {
    return this.gravitation
   }
  
   public getGenerator() {
    return this.generator
   }
  
   public setSky(texture) {
    return
   }
  
   public getSkyColors(): number[] {
    return this.colors
   }
  
   constructor(
    biome_uid: string,
    planet_uid: [string,number],
   
    generator: Dimensions.TerrainLayerParams[],
    colors?: [number, number, number,number, number, number],
    gravitation?: number[], 
  ) {
    this.biome_uid = biome_uid,
    this.planet_uid = planet_uid,
    this.gravitation = gravitation,
  
    this.generator = generator,
    this.colors = colors || [0,0,0,0,0,0]
    this.createPlanet()
  }
  
  
  }
  
 
  
  var ipm = new IPlanet("Moon", ["Name",3771],
   [ {
      minY: 0,
      maxY: 128,
       yConversion: [[1, -0.99], [0.5, -.99], [.9, -0.99], [0.4, -.4], [0, 0.8]
      ],
      material: {
          base: BlockID.lunar_stone,
          surface: {
              id: BlockID.lunar_middle,
              data: 0,
              width: 4
          },
          cover: BlockID.moon_top_side
      },
      noise: {
          octaves: {
             count: 4,
             scale: 160,
             weight: 1.5
          },
      }     
  },{ minY: 0,
      maxY: 1,
      material: {base: 7}}],

  )
  
  