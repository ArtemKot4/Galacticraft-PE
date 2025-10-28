class MilkyWay extends Galaxy {
    public getName(): string {
        return "milky_way";
    }

    public getLocalizedName(): string {
        return "galaxy.galacticraft.milky_way";
    }
}

Galacticraft.registerGalaxy(new MilkyWay())
.addPlanet(new Earth())
.addPlanet(new Mars(29, "mars_gc", new CustomBiome("mars_gc")))
.addPlanet(new Venus(14, "venus_gc", new CustomBiome("venus_gc")))