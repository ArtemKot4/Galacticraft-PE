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
    };
};

Galacticraft.registerPlanet("milky_way", "solar_system", new Venus(31, "venus"));