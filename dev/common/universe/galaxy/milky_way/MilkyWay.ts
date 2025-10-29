class MilkyWay extends Galaxy {
    public getName(): string {
        return "milky_way";
    }

    public getLocalizedName(): string {
        return "galaxy.galacticraft.milky_way";
    }
}

Galacticraft.registerGalaxy(new MilkyWay())
.addPlanet(new Earth().addSatellite(new Moon(28, "moon_gc", new CustomBiome("moon_gc"))))
.addPlanet(new Mars(29, "mars_gc", new CustomBiome("mars_gc")))
.addPlanet(new Venus(14, "venus_gc", new CustomBiome("venus_gc")))