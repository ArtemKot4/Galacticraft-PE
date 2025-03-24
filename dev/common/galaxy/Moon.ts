class Moon extends Satellite {
    public override getGravity(): number {
        return 0.25;
    };

    public override getName(): string {
        return "moon";
    };

    public override hasStars(): boolean {
        return true;
    };

    public override hasDefaultSkyboxes(): boolean {
        return false;
    };

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
    };

    public override getCelestialBody(): CelestialBody {
        return new CelestialBody(this).setBitmap("planet.moon");
    };

    public override getOres(): Record<string, { stone_id?: number; height: number[]; vein_counts: number; count: number[]; }> {
        return {
            [BlockList.ORE_COPPER_MOON.stringID]: {
                stone_id: BlockList.MOON_STONE.id,
                height: [0, 128],
                vein_counts: 5,
                count: [1, 2]
            },
            [BlockList.MOON_SAPPHIRE.stringID]: {
                height: [0, 128],
                vein_counts: 2,
                count: [1, 3]
            },
            [BlockList.MOON_CHEESE.stringID]: {
                height: [2, 65],
                vein_counts: __config__.getFloat("Fossils.Moon.cheese"),
                count: [4, 9]
            },
            [BlockList.ORE_TIN_MOON.stringID]: {
                height: [2,65], 
                vein_counts: __config__.getFloat("Fossils.Moon.tin"), 
                count: [4,12]
            }
        };
    };
};

Galacticraft.getPlanet("milky_way", "solar_system", "earth").addSatellite(new Moon(28, "moon"));

Translation.addTranslation("galacticraft.satellite.moon", {
    en: "Moon",
    ru: "Луна",
});
