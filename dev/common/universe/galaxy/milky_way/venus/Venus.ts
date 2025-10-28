class Venus extends Planet {
    public override getLayers(): Dimensions.TerrainLayerParams[] {
        return [
            {
                minY: 0, maxY: 128,
                yConversion: [[1, -0.79], [0.8, -.99], [.9, -0.99], [0.5, -.4], [0, 0.8]],
                material: {
                    base: BlockList.VENUS_ROCK_2.id,
                    surface: {
                        id: BlockList.VENUS_ROCK_1.id,
                        data: 0,
                        width: 4
                    },
                    cover: BlockList.VENUS_ROCK_0.id
                },
                noise: {
                    octaves: {
                        count: 8,
                        scale: 420,
                        weight: 1.6
                    }
                }
            }
        ]
    }

    public override getDayLength(): number {
        return 10;
    }

    public override getGravity(): number {
        return 61;
    }

    public getMeteoriteProbability(): number {
        return 10;
    }

    public override getPressure(): number {
        return 80;
    }

    public override getWindLevel(): number {
        return 30;
    }

    public override getTemperature(): number {
        return 5;
    }

    public override getWeatherEvents(): WeatherEvent[] {
        return [VenusRain.instance];
    }

    public override getSunEnergy(): number {
        return 137;
    }

    public override getSkyColor(): number[] {
        return [894 / 256, 345 / 256, 0 / 256];
    }

    public override getFogColor(): number[] {
        return [894 / 256, 345 / 256, 0 / 256];
    }
}