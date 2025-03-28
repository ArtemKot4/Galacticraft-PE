Galacticraft.registerPlanet("milky_way", "solar_system", 
    {
    satellites: {},
    getName(): string {
        return "earth";
    },
    getLocalizedName() {
        return Translation.translate("galacticraft.planet.earth")
    },
    addSatellite(satellite: IPlanet) {
        this.satellites[satellite.getName()] = satellite;
    },
    hasStars() {
        return false;
    },
    hasDefaultSkyboxes() {
        return true;
    },
    getCelestialBody() {
        return new CelestialBody()
    }
});

Translation.addTranslation("galacticraft.planet.earth", {
    en: "Earth",
    ru: "Земля"
});