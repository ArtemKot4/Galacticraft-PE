class Mars extends Planet {
	public override getLayers(): Dimensions.TerrainLayerParams[] {
		return [
			{
				minY: 0,
				maxY: 128,
				yConversion: [
					[1, -0.99],
					[0.8, -0.99],
					[0.9, -0.99],
					[0.4, -0.4],
					[0, 0.8]
				],
				material: {
					base: BlockList.MARS_BOTTOM_STONE.id,
					surface: {
						id: BlockList.MARS_MIDDLE_STONE.id,
						data: 0,
						width: 4,
					},
					cover: BlockList.MARS_TOP_STONE.id,
				},
				noise: {
					octaves: {
						count: 4,
						scale: 260,
						weight: 1.99,
					},
				},
			},
			{ 
                minY: 0, 
                maxY: 1, 
                material: { 
                    base: 7 
                } 
            }
		];
	}

    public getOreData(): { ores: Galacticraft.OreData[]; stone: number[]; } {
        return {
            ores: [
                {
                    block: { id: BlockList.DESH.id, data: 0 },
                    veinCounts: __config__.getFloat("generation.mars.desh") || 2,
                    minY: 2,
                    maxY: 100,
                    count: [4, 12]
                }
            ],
            stone: [VanillaBlockID.stone]
        }
    }

    public override getIcon(): string {
        return "environment.mars";
    }

    public override getName(): string {
        return "mars";
    }

    public override getLocalizedName(): string {
        return "celestialbody.galacticraft.mars";
    }


	public override getGravity(): number {
		return 38;
	}

	public override getMeteoriteProbability(): number {
		return 10.0;
	}

	public override getPressure(): number {
		return 10;
	}

	public override getWindLevel(): number {
		return 30;
	}

	public override getTemperature(): number {
		return -1;
	}

	public override getSunEnergy(): number {
		return -48.8;
	}

    public override getSkyColor(): number[] {
        return [910 / 256, 181 / 256, 910 / 256];
    }

    public override getFogColor(): number[] {
        return [16 + 894, 181 / 256, -255 / 256];
    }
}
