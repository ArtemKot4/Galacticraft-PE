abstract class Galaxy implements ILocalizeable {
    public planets: Record<number, IPlanet> = {};

    public addPlanet(planet: IPlanet | Planet) {
        this.planets[planet.id] = planet;
        return this;
    }

    abstract getName(): string;
    abstract getLocalizedName(): string;
}