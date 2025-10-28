abstract class Galaxy implements ILocalizeable {
    public planets: Record<number, IPlanet> = {};

    public addPlanet(planet: IPlanet) {
        if(!("satellites" in planet)) {
            planet.satellites = [];
        }

        this.planets[planet.id] = planet;
        Galacticraft.generationData[planet.id] = planet.getOreData();
        return this;
    }

    public getPlanet(id: number): Nullable<IPlanet> {
        return this.planets[id] || null;
    }

    abstract getName(): string;
    abstract getLocalizedName(): string;
}