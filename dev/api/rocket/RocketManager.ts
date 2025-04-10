class RocketManager {
    public static existRockets: Record<number, RocketEntity> = {};
    public static registeredRockets: Record<string, Rocket> = {};

    public static isRocket(entity: number): boolean {
        return Entity.getTypeName(entity) in RocketManager.registeredRockets;
    };

    public static addRocketEntity(rocket: Rocket, entity: number, fuel: number, slotCount?: number): RocketEntity {
        const entityClass = rocket.getEntity();

        return RocketManager.existRockets[entity] = new entityClass(rocket, entity, fuel, slotCount);
    };

    public static getRocketEntity(entity: number): Nullable<RocketEntity> {
        return RocketManager.existRockets[entity] || null;
    };

    public static getRocketByEntity(entity: number): Nullable<Rocket> {
        return RocketManager.registeredRockets[Entity.getTypeName(entity)] || null
    };

    public static hasRocketEntity(entity: number): boolean {
        return entity in RocketManager.existRockets;
    };

    public static registerRocket(rocket: Rocket) {
        RocketManager.registeredRockets[rocket.getEntityType()] = rocket; 
    };
};