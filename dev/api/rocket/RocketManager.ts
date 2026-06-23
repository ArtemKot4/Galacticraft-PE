namespace RocketManager {
	export let rocketEntities: Record<string, RocketEntity> = {};
	export const rocketTypes: Record<string, Rocket> = {};

	export function isRocket(entity: number): boolean {
		return Entity.getTypeName(entity) in RocketManager.rocketTypes;
	}

	export function addRocketEntity(rocket: Rocket, entity: number, fuel: number, slotCount?: number): RocketEntity {
		return RocketManager.rocketEntities[String(entity)] = rocket.getNewEntity(entity, fuel, slotCount);
	}

	export function findRocketEntityByPaddingCoords(paddingCoords: Vector, dimension: number): Nullable<RocketEntity> {
		for(const rocketID in rocketEntities) {
			Game.message("айди ракеты: " + rocketID + ", его тип: " + typeof rocketID + "\nобъект ракеты: " + JSON.stringify(rocketEntities[rocketID]));
			Game.message("\n..." + JSON.stringify(RocketManager.rocketEntities) + "...");
			const rocketEntity = getRocketEntity(rocketID);
			if(rocketEntity.getDimension() == dimension && Vector3.equals(rocketEntity.paddingCoords, paddingCoords)) {
				return rocketEntity;
			}
		}
		return null;
	}

	export function getRocketEntity(entity: string | number): Nullable<RocketEntity> {
		if(hasRocketEntity(entity)) {
			const rocketEntity = RocketManager.rocketEntities[String(entity)];
			return rocketEntity instanceof RocketEntity ? rocketEntity : RocketEntity.from(rocketEntity);
		}
		return null;
	}

	export function getRocketByEntity(entity: number): Nullable<Rocket> {
		return RocketManager.rocketTypes[Entity.getTypeName(entity)] || null;
	}

	export function hasRocketEntity(entity: string | number): boolean {
		return String(entity) in RocketManager.rocketEntities;
	}

	export function registerRocket(rocket: Rocket) {
		RocketManager.rocketTypes[rocket.getEntityType()] = rocket;
	}

	export function deleteRocketEntity(entity: number): void {
		delete RocketManager.rocketEntities[entity];
	}

    export function findRocketByItemID(id: number): Nullable<Rocket> {
        for(const i in rocketTypes) {
            if(rocketTypes[i].id == id) {
                return rocketTypes[i];
            }
            return null;
        }
    }

	Saver.addSavesScope(
		"galacticraft.rocketEntities",
		function read(scope: typeof rocketEntities) {
			rocketEntities = scope || {};
		},
		function save() {
			return rocketEntities;
		}
	);

	Callback.addCallback("LevelLeft", () => {
		rocketEntities = {};
	});
}
