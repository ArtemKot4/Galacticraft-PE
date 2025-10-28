Galacticraft.registerPlanet("milky_way", "solar_system", 
    {
    satellites: {},
    getTier() {
        return 1;
    },
    getDisplayTexture() {
        return "earth_rocket_gui";
    },
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
        return new CelestialBody(this)
    },
    id: EDimension.OVERWORLD
});

Translation.addTranslation("galacticraft.planet.earth", {
    en: "Earth",
    ru: "Земля"
});