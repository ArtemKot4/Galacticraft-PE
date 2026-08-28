class Earth implements CelestialBody {
    public id = 0;
    
    public getOreData(): { ores: Galacticraft.OreData[]; stone: number[]; } {
        return {
            ores: [
                {
                    block: { id: BlockList.ORE_COPPER_EARTH.id, data: 0 },
                    veinCounts: __config__.getFloat("generation.earth.copper") || 5,
                    minY: 2,
                    maxY: 100,
                    count: [4, 12]
                },
                {
                    block: { id: BlockList.ORE_TIN_EARTH.id, data: 0 },
                    veinCounts: __config__.getFloat("generation.earth.tin") || 5,
                    minY: 2,
                    maxY: 100,
                    count: [4, 12]
                },
                {
                    block: { id: BlockList.ORE_SILICON_EARTH.id, data: 0 },
                    veinCounts: __config__.getFloat("generation.earth.copper") || 6,
                    minY: 2,
                    maxY: 24,
                    count: [3, 13]
                },
                // {
                //     block: { id: BlockID[BlockList.OIL.getStillStringID()], data: 0 },
                //     veinCounts: __config__.getFloat("generation.earth.oil") || 3,
                //     minY: 90,
                //     maxY: 150,
                //     count: [7, 30]
                // }
            ],
            stone: [VanillaBlockID.stone]
        }
    }

    public getIconPath(): string {
        return "environment/earth";
    }

    public getName(): string {
        return "earth";
    }

    public getLocalizedName(): string {
        return "celestialbody.galacticraft.earth";
    }
    
    public canHasStation(): boolean {
        return true;
    }

    public getGravity(): number {
        return null;
    }

    public getMeteoriteProbability(): number {
        return 0;
    }

    public getDayLength(): Nullable<number> {
        return null;
    }

    public getPressure(): number {
        return 0;
    }

    public getTemperature(): number {
        return 0;
    }

    public getWeatherEvents(): WeatherEvent[] {
        return null;
    }

    public getWindLevel(): number {
        return 50;
    }

    public getSunEnergy(): number {
        return 70;
    }

    public getMobIDsWithProbability(): Record<number, string> {
        return null;
    }

    public hasOxygen(): boolean {
        return true;
    }

    public addSatellite?(satellite: ISatellite): this;
}