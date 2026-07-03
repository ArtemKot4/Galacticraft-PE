/**
 * Namespace for manage rocket system
 */

namespace RocketManager {
	export let rocketEntities: Record<string, RocketEntity> = {};
	export const rocketTypes: Record<string, RocketType> = {};

	export function isRocketType(entityUid: number): boolean {
		return Entity.getTypeName(entityUid) in RocketManager.rocketTypes;
	}

	export function addRocketEntity(rocketType: RocketType, entityUid: number, fuel: number, slotCount?: number): RocketEntity {
		const rocketEntity = RocketManager.rocketEntities[String(entityUid)] = new RocketEntity().init(rocketType, entityUid, fuel, slotCount);
		Callback.invokeCallback("Galacticraft:RocketEntityAdded", rocketEntity);
		return rocketEntity;
	}

	export function removeRocketEntity(entityUid: number): void {
		delete RocketManager.rocketEntities[entityUid];
		Callback.invokeCallback("Galacticraft:RocketEntityRemoved", entityUid);
	}

	export function findRocketEntityByPaddingCoords(paddingCoords: Vector, dimensionId: number): Nullable<RocketEntity> {
		for(const rocketID in rocketEntities) {
			const rocketEntity = getRocketEntity(rocketID);
			if(rocketEntity.getDimension() == dimensionId && Vector3.equals(rocketEntity.getPaddingCoords(), paddingCoords)) {
				return rocketEntity;
			}
		}
		return null;
	}

	export function getRocketTypeByEntityTypeName(entityType: string): Nullable<RocketType> {
		return RocketManager.rocketTypes[entityType] || null;
	}

	export function getRocketEntity(entityUid: string | number): Nullable<RocketEntity> {
		return RocketManager.rocketEntities[String(entityUid)] || null;
	}

	export function findRocketEntityByRiderUid(riderUid: number): Nullable<RocketEntity> {
		for(const rocketID in rocketEntities) {
			const rocketEntity = getRocketEntity(rocketID);
			if(rocketEntity.getRiderUid() == riderUid) {
				return rocketEntity;
			}
		}
		return null;
	}

	export function getRocketEntities(): typeof rocketEntities {
		return rocketEntities;
	}

	export function forEachRocketEntity(callback: (rocketEntity: RocketEntity) => void): void {
		for(const rocketID in rocketEntities) {
			callback(getRocketEntity(rocketID));
		}
	}

	export function getRocketTypeByEntity(entityUid: number): Nullable<RocketType> {
		return RocketManager.rocketTypes[Entity.getTypeName(entityUid)] || null;
	}

	export function hasRocketEntity(entityUid: string | number): boolean {
		return String(entityUid) in RocketManager.rocketEntities;
	}

	export function registerRocketType(rocket: RocketType) {
		RocketManager.rocketTypes[rocket.entityType] = rocket;
	}

	export function deleteRocketEntity(entityUid: number): void {
		delete RocketManager.rocketEntities[entityUid];
	}

    export function findRocketTypeByItemID(itemId: number): Nullable<RocketType> {
        for(const entityType in rocketTypes) {
            if(rocketTypes[entityType].itemId == itemId) {
                return rocketTypes[entityType];
            }
            return null;
        }
    }

	Saver.addSavesScope(
		"galacticraft.rocketEntities",
		function read(savedRocketEntities: typeof rocketEntities) {
			rocketEntities = savedRocketEntities;
			return;
		},
		function save() {
			return rocketEntities;
		}
	);
}

declare namespace Callback {
	export function addCallback(name: "Galacticraft:RocketEntityAdded", func: (rocketEntity: RocketEntity) => void);
	export function addCallback(name: "Galacticraft:RocketEntityRemoved", func: (entity: number) => void);
}