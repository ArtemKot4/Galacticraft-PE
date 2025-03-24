abstract class Planet extends Dimension implements IPlanet {
    public static oreList: Record<number, ReturnType<typeof Planet.prototype.getOres>> = {};

    public satellites: Record<string, Satellite> = {};
    abstract getGravity(): number;

    public constructor(id: number, stringId: string) {
        super(id, stringId);
        
        if("getOres" in this) {
            Planet.oreList[this.id] = this.getOres();
        };
    };

    public getOres?(): Record<string, {
        stone_id?: number,
        height: number[],
        vein_counts: number,
        count: number[]
    }>;

    public hasStars(): boolean {
        return true;
    };

    public hasDefaultSkyboxes(): boolean {
        return false;
    };

    public getName(): string {
        return "";
    };

    public getLocalizedName(): string {
        return Translation.translate(`galacticraft.planet.${this.getName()}`);
    };

    public getCelestialBody(): CelestialBody {
        return new CelestialBody();
    };

    public addSatellite(satellite: Satellite): void {
        this.satellites[satellite.getName()] = satellite;
    };

    public override hasBedrockLayer(): boolean {
        return true;
    };
    
    public override generateCaves(): [caves: boolean, underwater_caves: boolean] {
        return [false, false];
    }; 

    public override getTags(): string[] {
        return ["space", "no_oxygen"];
    };
};

Callback.addCallback("GenerateCustomDimensionChunk", function (chunkX, chunkZ, random, dimensionId) {
    const params = Planet.oreList[dimensionId];
    if(!params) return;
    let stone_id = VanillaBlockID.stone;
    for(const i in params) {
        const ore = Utils.parseBlockID(i);
        const obj = params[i];

        if(obj.stone_id) {
            stone_id = obj.stone_id;
        };

        UniqueGen.generateOreInDimension(ore, obj.vein_counts, chunkX, chunkZ, random, {
            veinCounts: obj.vein_counts,
            minY: obj.height[0],
            maxY: obj.height[1],
            size: MathHelper.randomInt(obj.count[0], obj.count[1] || obj.count[0]),
            mode: true,
            check: [obj.stone_id || stone_id]
        });
    };
});

