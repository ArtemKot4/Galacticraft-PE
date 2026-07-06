abstract class Galaxy implements ILocalizeable {
    public planets: Set<number> = new Set();

    public addPlanet(planet: CelestialBody): this {
        this.processCelestialBody(planet);
        this.planets.add(planet.id);
        Galacticraft.CelestialBodies[planet.id] = planet;
        return this;
    }

    protected processCelestialBody(planet: CelestialBody): void {
        if(!("satellites" in planet)) {
            planet.satellites = [];
        }
        if(planet.canHasStation()) {
            planet.stations = {};
        }
        if(!planet.hasOxygen()) {
            TagRegistry.addTagFor("dimensions", planet.id, "no_oxygen", true);
        }

        if("hasClouds" in planet) {
            Dimensions.setShouldRenderClouds(planet.id, planet.hasClouds);
        }
        if("hasStars" in planet) {
            Dimensions.setShouldRenderStars(planet.id, planet.hasStars);
            Dimensions.getDimensionById(planet.id).setStarBrightness(1);
        }
        if("hasMoon" in planet) {
            Dimensions.setShouldRenderMoon(planet.id, planet.hasMoon);
        }
        if("hasSun" in planet) {
            Dimensions.setShouldRenderSun(planet.id, planet.hasSun);
        }
        
        if("getMusicNameAndPath" in planet) {
            const [name, path] = planet.getMusicNameAndPath();
            SoundLib.Registry.registerSound(name, path);
        }
        if(!("addSatellite" in planet)) {
            planet.addSatellite = (satellite: ISatellite) => {
                satellite.linkedPlanet = planet.id;
                planet.satellites.push(satellite.id);
                this.processCelestialBody(satellite);

                return planet;
            }
        }
        let iconPath: string;
        if("getIconPath" in planet && (iconPath = planet.getIconPath()) != null) {
            if(!iconPath.endsWith(".png")) {
                iconPath += ".png";
            }
            const file = new java.io.File(iconPath);
            if(!file.exists() || !file.isFile()) {
                iconPath = __dir__ + "resources/assets/" + iconPath;
            }
            const splitedPath = iconPath.split("/");
            let iconName = splitedPath[splitedPath.length - 1];
            if(iconName.endsWith(".png")) {
                iconName = iconName.replace(".png", "");
            }
            UI.TextureSource.put("celestial_body." + iconName, android.graphics.BitmapFactory.decodeFile(iconPath));
        }
        Galacticraft.CelestialBodies[planet.id] = planet;
    }

    public getPlanet(id: number): Nullable<CelestialBody> {
        if(!this.planets.has(id)) {
            throw new GalacticraftException(`Planet by id "${id}" not contains in galaxy "${this.getName()}"`)
        }
        return Galacticraft.getCelestialBodyByID(id) || null;
    }

    abstract getName(): string;
    abstract getLocalizedName(): string;
}