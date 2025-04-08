namespace Galacticraft {
    export const PAINT_COLORS = <const> [
        "blue",
        "black",
        "white",
        "gray",
        "green",
        "lime",
        "blue",
        "orange",
        "magenta",
        "pink",
        "red",
        "yellow",
        "purple",
        "cyan",
        "brown",
        "light_blue",
        "light_gray",
    ];

    const galaxies: Record<string, Galaxy> = {};

    export function registerGalaxy(galaxy: Galaxy): void {
        const name = galaxy.getName();
        
        if(!galaxies[name]) {
            galaxies[name] = galaxy;
        } else {
            throw new java.lang.RuntimeException("Galacticraft.registerGalaxy error! Galaxy already registered. Please report to addon creator, it need fix.")
        };
    };

    export function registerSpaceSystem(galaxyName: string, system: SpaceSystem): void {
        galaxies[galaxyName].systems[system.getName()] = system;
    };

    export function registerPlanet(galaxyName: string, systemName: string, planet: IPlanet): void {
        galaxies[galaxyName].systems[systemName].planets[planet.getName()] = planet;
    };

    export function getGalaxy(name: string): Galaxy {
        return galaxies[name];
    };

    export function getSpaceSystem(galaxyName: string, systemName: string): SpaceSystem {
        return galaxies[galaxyName].systems[systemName];
    };

    export function getPlanet(galaxyName: string, systemName: string, planetName: string): IPlanet {
        return galaxies[galaxyName].systems[systemName].planets[planetName];
    };

    export function addSatellite(galaxyName: string, systemName: string, planetName: string, satellite: Satellite) {
        getPlanet(galaxyName, systemName, planetName).addSatellite(satellite);
    };

    export function getSatellite(galaxyName: string, systemName: string, planetName: string, satelliteName: string): Satellite {
        return getPlanet(galaxyName, systemName, planetName).satellites[satelliteName];
    };

    export function findPlanetByID(id: number): Nullable<IPlanet> {

        for(const galaxy in galaxies) {
            for(const system in galaxies[galaxy].systems) {
                for(const planet in galaxies[galaxy].systems[system].planets) {
                    if(galaxies[galaxy].systems[system].planets[planet].id === id) {
                        return galaxies[galaxy].systems[system].planets[planet];
                    };
                };
            };
        };

        return null;  
    };

    export function findSatelliteByID(id: number): Nullable<Satellite> {
        for(const galaxy in galaxies) {
            for(const system in galaxies[galaxy].systems) {
                for(const planet in galaxies[galaxy].systems[system].planets) {
                    for(const satellite in galaxies[galaxy].systems[system].planets[planet].satellites) {
                        if(galaxies[galaxy].systems[system].planets[planet].satellites[satellite].id === id) {
                            return galaxies[galaxy].systems[system].planets[planet].satellites[satellite];
                        };
                    };
                };
            };
        };

        return null;
    };

    export function findCelestialByID(id: number): Nullable<IPlanet | Satellite> {
        const planet = Galacticraft.findPlanetByID(id);
        if(planet) {
            return planet;
        };

        return Galacticraft.findSatelliteByID(id);
    };

    class MilkyWay extends Galaxy {
        public getName(): string {
            return "milky_way";
        };
    };

    class SolarSystem extends SpaceSystem {
        public getName(): string {
            return "solar_system";
        };
    };

    Galacticraft.registerGalaxy(new MilkyWay());
    Galacticraft.registerSpaceSystem("milky_way", new SolarSystem());
};