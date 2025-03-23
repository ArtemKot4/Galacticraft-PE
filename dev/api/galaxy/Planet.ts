abstract class Planet extends Dimension implements IPlanet {
    public satellites: Record<string, Satellite> = {};
    abstract getGravity(): number;

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

    public constructor(id: number, stringId: string) {
        super(id, stringId);
    };

    public override hasBedrockLayer(): boolean {
        return true;
    };
    
    public override generateCaves(): [caves: boolean, underwater_caves: boolean] {
        return [false, false];
    }; 

    public override getTags(): string[] {
        return ["space"];
    };
};


