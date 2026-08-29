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

    export namespace Renderer {
        export interface IWireBoxDescription {
            side: [x: number, z: number], 
            box: [number, number, number, number, number, number], 
            data: number
        }

        export function addMachineConnecting(id: number, boxes: Galacticraft.Renderer.IWireBoxDescription[], render: ICRender.Model, shape: ICRender.CollisionShape, commonGroupName: string, data: number): void {
            for(const box of boxes) {
                const wireModel = new BlockRenderer.Model(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], id, data);
                const condition = ICRender.BLOCK(box.side[0], 0, box.side[1], ICRender.getGroup(commonGroupName + "_" + box.data), false);
    
                render.addEntry(wireModel).setCondition(condition);
                shape.addEntry().setCondition(condition).addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5]);
            }
        }
    }
}