abstract class Planet extends Dimension implements IPlanet {
    public static oreList: Record<number, ReturnType<typeof Planet.prototype.getOres>> = {};
    public satellites: Record<string, Satellite> = {};

    public getTier(): Nullable<number> {
        return null;
    };

    public getDisplayTexture(): string {
        return null;
    };
    /**
     * Method to declare gravity of planet
     * @default 0.25
     * @returns number
     */
    public getGravity(): number {
        return 0.25;
    };

    /**
     * Class need to create any planet prototypes with specified identifiers
     * @param id numeric id
     * @param stringId string id
     */

    public constructor(id: number, stringId: string) {
        super(id, stringId);
        
        if("getOres" in this) {
            Planet.oreList[this.id] = this.getOres();
        };
    };

    /**
     * Method to declare ores of planet. Optional
     */

    public getOres?(): Record<string, {
        stone_id?: number,
        height: number[],
        vein_counts: number,
        count: number[]
    }>;

    /**
     * Method to declare if planet has stars. If returns true, stars will be forever in a planet skies.
     * @default true
     * @returns boolean
     */

    public hasStars(): boolean {
        return true;
    };

    /**
     * Method to declare if planet has skyboxes: sun and moon. If returns false, skyboxes will be disabled
     * @default false
     * @returns boolean
     */

    public hasDefaultSkyboxes(): boolean {
        return false;
    };

    /**
     * Method to declare planet name
     * @returns string
     */

    public getName(): string {
        return "";
    };

    /**
     * Method to declare planet name in current locale. In default format galacticraft.{class_type}.${this.{@link getName()}}
     * @returns string
     */

    public getLocalizedName(): string {
        return Translation.translate(`galacticraft.planet.${this.getName()}`);
    };

    public getCelestialBody(): CelestialBody {
        return new CelestialBody(this);
    };

    public addSatellite(satellite: Satellite): void {
        this.satellites[satellite.getName()] = satellite;
    };

    /**
     * Method to declare, has planet underground layer of bedrock or not
     * @default true
     * @returns boolean
     */

    public override hasBedrockLayer(): boolean {
        return true;
    };

    /**
     * Method to declare if planet generates vanilla caves. It will be skiped if stone is not default.
     * @default [false, false]
     * @returns [boolean, boolean]
     */
    
    public override generateCaves(): [caves: boolean, underwater_caves: boolean] {
        return [false, false];
    }; 

    /**
     * Tags, influences on behavior of the planet. Tag space constants that it is space planet, not default custom world. Tag no_oxygen constants that planet haven't oxygen, then player dependences of the oxygen and torches will be disabled.
     * @default ["space", "no_oxygen"]
     * @returns string[]
     */

    public override getTags(): string[] {
        return ["space", "no_oxygen"];
    };
};

Callback.addCallback("GenerateCustomDimensionChunk", function (chunkX, chunkZ, random, dimensionId) {
    const params = Planet.oreList[dimensionId];
    if(!params) return;
    let stone_id = VanillaBlockID.stone;
    for(const i in params) {
        const ore = IDRegistry.parseBlockID(i);
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

