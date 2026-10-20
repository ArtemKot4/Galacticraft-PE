class Moon extends Satellite {
    public override hasStars?: boolean = true;
    public override hasMoon = false;
    public override hasVanillaWeather = false;
    
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

    public override getOreData(): { ores: Galacticraft.OreData[]; stone: number[]; } {
        return {
            ores: [
                {
                    block: { id: BlockList.ORE_COPPER_MOON.id, data: 0 },
                    veinCounts: __config__.getFloat("generation.moon.copper") || 26,
                    minY: 0,
                    maxY: 60,
                    count: [4, 4]
                },
                {
                    block: { id: BlockList.ORE_TIN_MOON.id, data: 0 },
                    veinCounts: __config__.getFloat("generation.moon.tin") || 23,
                    minY: 0,
                    maxY: 60,
                    count: [4, 4]
                },
                {
                    block: { id: BlockList.MOON_CHEESE.id, data: 0 },
                    veinCounts: __config__.getFloat("generation.moon.cheese") || 14,
                    minY: 0,
                    maxY: 85,
                    count: [3, 3]
                },
                {
                    block: { id: BlockList.MOON_SAPPHIRE.id, data: 0 },
                    veinCounts: __config__.getFloat("generation.moon.sapphire") || 6,
                    minY: 4,
                    maxY: 31,
                    count: [1, 1]
                }
            ],
            stone: [BlockList.MOON_STONE.id]
        }
    }

    public override getMusicNameAndPath(): [name: string, path: string] {
        return ["spacerace", __dir__ + "resources/assets/sounds/spacerace.ogg"];
    }

    public override getIconPath(): string {
        return "environment/moon";
    }

    public override getName(): string {
        return "moon";
    }

    public override getLocalizedName(): string {
        return "celestialbody.galacticraft.moon";
    }
    
    public override getGravity(): number {
        return 22.5;
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

// Callback.addCallback("ItemUseLocalServer", (c, i ,b, p) => {
//     if(i.id == VanillaItemID.bone) {
//         Game.message("запущено")
//         return Galacticraft.SOUND_POOL.select("spacerace").at({...c, dimension: Player.getDimension()}).at(Player.get()).play();
//     }
// });