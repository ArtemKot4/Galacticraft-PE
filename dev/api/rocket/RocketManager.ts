class RocketManager {
    public static rockets: Record<number, Rocket> = {};
    public static rocketTypes: Record<string, new (entity: number) => Rocket> = {};

    public static isRocket(entity: number): boolean {
        return Entity.getTypeName(entity) in RocketManager.rocketTypes;
    };

    public static addRocket(entity: number): Rocket {
        return RocketManager.rockets[entity] = new RocketManager.rocketTypes[Entity.getTypeName(entity)](entity) as Rocket;
    };

    public static getRocket(entity: number): Nullable<Rocket> {
        return RocketManager.rockets[entity] || null;
    };

    public static registerRocket(type: string, rocket: new (entity: number) => Rocket) {
        RocketManager.rocketTypes[type] = rocket; 
    };
};