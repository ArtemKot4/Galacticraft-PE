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

    public getOreData(): { ores: Galacticraft.OreData[]; stone: number[]; } {
        return {
            ores: [
                {
                    block: { id: BlockList.ORE_COPPER_MOON.id, data: 0 },
                    veinCounts: __config__.getFloat("generation.moon.copper") || 5,
                    minY: 2,
                    maxY: 65,
                    count: [3, 10]
                },
                {
                    block: { id: BlockList.ORE_TIN_MOON.id, data: 0 },
                    veinCounts: __config__.getFloat("generation.moon.tin") || 5,
                    minY: 2,
                    maxY: 65,
                    count: [3, 10]
                },
                {
                    block: { id: BlockList.MOON_CHEESE.id, data: 0 },
                    veinCounts: __config__.getFloat("generation.moon.cheese") || 7,
                    minY: 2,
                    maxY: 65,
                    count: [5, 20]
                }
            ],
            stone: [BlockList.MOON_STONE.id]
        }
    }

    public getMusicNameAndPath(): [name: string, path: string] {
        return ["spacerace.ogg", __dir__ + "assets/sound/spacerace.ogg"];
    }

    public override getIcon(): string {
        return "environment.moon";
    }

    public override getName(): string {
        return "moon";
    }

    public override getLocalizedName(): string {
        return "celestialbody.galacticraft.moon";
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

//debug:
Callback.addCallback("ItemUse", (c, i, b, isE, p) => {
    if(i.id == VanillaItemID.stick) {
        if(Player.getDimension() != 28) {
            Dimensions.transfer(p, 28);
        } else {
            Dimensions.transfer(p, 0);
        }
    }
    if(i.id == VanillaItemID.bone) {
        SoundLib.getClient().playSound("spacerace", false, 1, 1)
    }
})