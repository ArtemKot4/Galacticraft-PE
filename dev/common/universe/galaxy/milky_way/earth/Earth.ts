class Earth implements IPlanet {
    public canHasStation?: boolean = true;
    public satellites: ISatellite[] = [new Moon(this, 28, "moon_gc", new CustomBiome("moon_gc"))];

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

    public id = 0;

    public getIcon(): string {
        return "environment.earth";
    }

    public hasOxygen(): boolean {
        return true;
    }
}