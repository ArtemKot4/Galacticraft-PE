IMPORT("EnergyNet");
IMPORT("ChargeItem");

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
                        Entity.getSneaking(Player.getLocal()) == true ?
                        Translation.translate(tip) : "message.galacticraft.tip_on_sneaking"
                    )
                );
            });
        }
    }

    /**
     * Type of galacticraft energy
     */
    export const JOULE = EnergyTypeRegistry.createEnergyType("galacticraft_joule", 1);
    export const galaxies: Record<string, Galaxy> = {};
    export function registerGalaxy(galaxy: Galaxy) {
        const name = galaxy.getName();
        if(name in galaxies) {
            throw new GalacticraftException(`Galaxy by name "${name}" already registered`)
        }
        return (galaxies[name] = galaxy);
    }
}