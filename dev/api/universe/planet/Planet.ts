class Planet extends Dimension implements IPlanet {
    public satellites: number[];

    public getName(): string {
        return "unnamed";
    }

    public getMusicNameAndPath?(): [name: string, path: string];

    public getLocalizedName(): string {
        return "message.galacticraft.unnamed";
    }

    public getIcon(): Nullable<string> {
        return null;
    }

    public canHasStation(): boolean {
        return true;
    }

    public getOreData(): { ores: Galacticraft.OreData[], stone: number[] } {
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
    
    public hasOxygen(): boolean {
        return false;
    }

    public showStarsAlways(): boolean {
        return false;
    }

    public hideSkyboxes(): boolean {
        return false;
    }
}