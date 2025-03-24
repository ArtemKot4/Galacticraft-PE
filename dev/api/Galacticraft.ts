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