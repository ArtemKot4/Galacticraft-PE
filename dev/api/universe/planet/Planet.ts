class Planet extends Dimension implements IPlanet {
    public getIcon(): Nullable<string> {
        return null;
    }

    public getGravity(): Nullable<number> {
        return 18;
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

    public getWeatherEvents(): Nullable<WeatherEvent[]> {
        return null;
    }

    public getWindLevel(): number {
        return 0;
    }

    public getSunEnergy(): number {
        return 0;
    }

    public getMobIDsWithProbability(): Record<number, string> {
        return null;
    }

    public satellites: ISatellite[];
    public canHasStation: boolean;
    
    public hasOxygen(): boolean {
        return false;
    }

    public getTags(): string[] {
        if(this.hasOxygen()) {
            return ["no_oxygen"];
        } 
        return [];
    }
}