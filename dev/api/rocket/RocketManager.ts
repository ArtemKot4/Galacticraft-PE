/**
 * Class for manage rocket system
 */

@SerializeableStorage({
	keyName: "rocketEntities",
	scopeName: "galacticraft.rocket_entities"
})
class RocketManager {
	public static rocketEntities: Record<string, RocketEntity> = {};
	public static readonly rocketTypes: Record<string, RocketType> = {};

	public static isRocketType(entityUid: number): boolean {
		return Entity.getTypeName(entityUid) in RocketManager.rocketTypes;
	}

	public static addRocketEntity(
		rocketType: RocketType,
		entityUid: number,
		fuel: number,
		slotCount?: number,
	): RocketEntity {
		const rocketEntity = RocketManager.rocketEntities[String(entityUid)] =
			new RocketEntity().init(rocketType, entityUid, fuel, slotCount);
		Callback.invokeCallback("Galacticraft:RocketEntityAdded", rocketEntity);
		return rocketEntity;
	}

	public static removeRocketEntity(entityUid: number): void {
		delete RocketManager.rocketEntities[entityUid];
		Callback.invokeCallback("Galacticraft:RocketEntityRemoved", entityUid);
	}

	public static findRocketEntityByPaddingCoords(
		paddingCoords: Vector,
		dimensionId: number,
	): Nullable<RocketEntity> {
		for(const rocketID in RocketManager.rocketEntities) {
			const rocketEntity = RocketManager.getRocketEntity(rocketID);
			if(
				rocketEntity.getDimension() == dimensionId &&
				Vector3.equals(rocketEntity.getPaddingCoords(), paddingCoords)
			) {
				return rocketEntity;
			}
		}
		return null;
	}

	public static getRocketTypeByEntityTypeName(entityType: string): Nullable<RocketType> {
		return RocketManager.rocketTypes[entityType] || null;
	}

	public static getRocketEntity(entityUid: string | number): Nullable<RocketEntity> {
		return RocketManager.rocketEntities[String(entityUid)] || null;
	}

	public static findRocketEntityByRiderUid(riderUid: number): Nullable<RocketEntity> {
		for(const rocketID in RocketManager.rocketEntities) {
			const rocketEntity = RocketManager.getRocketEntity(rocketID);
			if(rocketEntity.getRiderUid() == riderUid) {
				return rocketEntity;
			}
		}
		return null;
	}

	public static getRocketEntities(): typeof RocketManager.rocketEntities {
		return RocketManager.rocketEntities;
	}

	public static forEachRocketEntity(callback: (rocketEntity: RocketEntity) => void): void {
		for(const rocketID in RocketManager.rocketEntities) {
			callback(RocketManager.getRocketEntity(rocketID));
		}
	}

	public static getRocketTypeByEntity(entityUid: number): Nullable<RocketType> {
		return RocketManager.rocketTypes[Entity.getTypeName(entityUid)] || null;
	}

	public static hasRocketEntity(entityUid: string | number): boolean {
		return String(entityUid) in RocketManager.rocketEntities;
	}

	public static registerRocketType(rocket: RocketType) {
		RocketManager.rocketTypes[rocket.entityType] = rocket;
	}

	public static deleteRocketEntity(entityUid: number): void {
		delete RocketManager.rocketEntities[entityUid];
		Callback.invokeCallback("Galacticraft:RocketEntityRemoved", entityUid);
	}

	public static findRocketTypeByItemID(itemId: number): Nullable<RocketType> {
		for(const entityType in RocketManager.rocketTypes) {
			if(RocketManager.rocketTypes[entityType].itemId == itemId) {
				return RocketManager.rocketTypes[entityType];
			}
		}
		return null;
	}
}

declare namespace Callback {
	export function addCallback(name: "Galacticraft:RocketEntityAdded", func: (rocketEntity: RocketEntity) => void);
	export function addCallback(name: "Galacticraft:RocketEntityRemoved", func: (entity: number) => void);
}