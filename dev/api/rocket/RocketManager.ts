namespace RocketManager {
	export let rockets: Record<number, RocketEntity> = {};
	export const rocketTypes: Record<string, Rocket> = {};

	export function isRocket(entity: number): boolean {
		return Entity.getTypeName(entity) in RocketManager.rocketTypes;
	}

	export function addRocketEntity(rocket: Rocket, entity: number, fuel: number, slotCount?: number): RocketEntity {
		return RocketManager.rockets[entity] = rocket.getEntity(entity, fuel, slotCount);
	}

	export function getRocketEntity(entity: number): Nullable<RocketEntity> {
		return RocketManager.rockets[entity] || null;
	}

	export function getRocketByEntity(entity: number): Nullable<Rocket> {
		return RocketManager.rocketTypes[Entity.getTypeName(entity)] || null;
	}

	export function hasRocketEntity(entity: number): boolean {
		return entity in RocketManager.rockets;
	}

	export function registerRocket(rocket: Rocket) {
		RocketManager.rocketTypes[rocket.getEntityType()] = rocket;
	}

	export function deleteRocketEntity(entity: number): void {
		delete RocketManager.rockets[entity];
	}

    export function packRocketPadding(radius: number, coords: Vector, block: Tile, region: BlockSource, ontainer: ItemContainer): void {
        RocketPadding.breakAll(radius ,coords, region, false);
        //will be transfering with container
    }

	Saver.addSavesScope(
		"galacticraft.rockets",
		function read(scope: typeof rockets) {
			rockets = scope || {};
		},
		function save() {
			return rockets;
		}
	);
}
