abstract class Galaxy implements ILocalizeable {
    public planets: Set<number> = new Set();

    public addPlanet(planet: IPlanet): this {
        this.processIPlanet(planet);
        this.planets.add(planet.id);
        Galacticraft.IPlanetData[planet.id] = planet;
        return this;
    }

    protected processIPlanet(planet: IPlanet): void {
        if(!("satellites" in planet)) {
            planet.satellites = [];
        }
        if(planet.canHasStation()) {
            planet.stations = {};
        }
        if(!planet.hasOxygen()) {
            TagRegistry.addTagFor("dimensions", planet.id, "no_oxygen", true);
        }
        if("getMusicNameAndPath" in planet) {
            const [name, path] = planet.getMusicNameAndPath();
            SoundLib.Registry.registerSound(name, path);
        }
        if(!("addSatellite" in planet)) {
            planet.addSatellite = (satellite: ISatellite) => {
                satellite.linkedPlanet = planet.id;
                planet.satellites.push(satellite.id);
                this.processIPlanet(satellite);

                return planet;
            }
        }
        Galacticraft.IPlanetData[planet.id] = planet;
    }

    public getPlanet(id: number): Nullable<IPlanet> {
        if(!this.planets.has(id)) {
            throw new GalacticraftException(`Planet by id "${id}" not contains in galaxy "${this.getName()}"`)
        }
        return Galacticraft.getIPlanetByID(id) || null;
    }

    abstract getName(): string;
    abstract getLocalizedName(): string;
}