class Moon extends Satellite {
    public override getLayers(): Dimensions.TerrainLayerParams[] {
        return [
            {
                minY: 0,
                maxY: 128,
                yConversion: [
                    [1, -0.99],
                    [0.5, -0.99],
                    [0.9, -0.99],
                    [0.4, -0.4],
                    [0, 0.8]
                ],
                material: {
                    base: BlockList.MOON_STONE.id,
                    surface: {
                        id: BlockList.MOON_STONE_MIDDLE.id,
                        data: 0,
                        width: 4
                    },
                    cover: BlockList.MOON_STONE_TOP.id
                },
                noise: {
                    octaves: {
                        count: 4,
                        scale: 160,
                        weight: 1.5
                    }
                }
            }
        ];
    }
    
    public override getGravity(): number {
        return 18;
    }

    public override getDayLength(): number {
        return (60 * 2) + 40;
    }

    public override getPressure(): number {
        return 5;
    }

    public override getSunEnergy(): number {
        return 40;
    }

    public override getSkyColor(): number[] {
        return [0, 0, 0];
    }

    public override getFogColor(): number[] {
        return [0, 0, 0];
    }
}