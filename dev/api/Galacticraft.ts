IMPORT("SoundAPI");
IMPORT("EnergyNet");
IMPORT("ChargeItem");
IMPORT("StorageInterface");

namespace Galacticraft {
    export namespace ToolTips {
        /**
         * Function to register tip on pressing shift by id
         * @param id numeric id for tip
         * @param tip text of tip
         */
        export function registerTipFor(id: number, tip: string) {
            Item.registerNameOverrideFunction(id, (item, translation, name) => {
                const expression = item.id in Item.nameOverrideFunctions ? Item.nameOverrideFunctions[item.id](item, translation, name) : Translation.translate(name);
                return (
                    expression + "\n" + Native.Color.GRAY + (
                        Translation.translate(Entity.getSneaking(Player.getLocal()) == true ? tip : "message.galacticraft.tip_on_sneaking") 
                    )
                );
            });
        }
    }

    export namespace EnergyTypes {
        /**
         * Type of galacticraft energy
         */
        export const JOULE = EnergyTypeRegistry.createEnergyType("galacticraft_joule", 1);
        /**
         * Type of galacticraft energy as oxygen
         */
        export const OXYGEN = EnergyTypeRegistry.createEnergyType("galacticraft_oxygen", 1);
    }
    
    export const CelestialBodies: Record<number, CelestialBody> = {};
    const galaxies: Record<string, Galaxy> = {};
    let CURRENT_GALAXY = "milky_way";

    export function registerGalaxy(galaxy: Galaxy) {
        const name = galaxy.getName();
        if(name in galaxies) {
            throw new GalacticraftException(`Galaxy by name "${name}" already registered`)
        }
        return (galaxies[name] = galaxy);
    }

    export function getGalaxy(name: string): Nullable<Galaxy> {
        return galaxies[name] || null;
    }

    export function getCurrentGalaxyName(): string {
        return CURRENT_GALAXY;
    }

    export function setCurrentGalaxy(name: string) {
        const galaxy = getGalaxy(name);

        if(galaxy == null) {
            throw new GalacticraftException(`Galaxy by name "${name}" is not exists`);
        }
        CURRENT_GALAXY = name;
    }

    export function getCurrentGalaxy(): Galaxy {
        return getGalaxy(CURRENT_GALAXY);
    }

    export function getCelestialBodyByID(id: number): Nullable<CelestialBody> {
        return CelestialBodies[id] || null;
    }

    export type OreData = {
        block: Tile,
        minY: number,
        maxY: number
        veinCounts: number; 
        count: [number, number]
    }

    Callback.addCallback("DimensionLoaded", (currentId, lastId) => {
        const planet = Galacticraft.getCelestialBodyByID(currentId);
        if("getMusicNameAndPath" in planet) {
            const musicName = planet.getMusicNameAndPath()[0];
            Game.message(JSON.stringify(musicName));
            
        }
    });
}