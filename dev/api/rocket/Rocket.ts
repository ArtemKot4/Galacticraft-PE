interface IRocketTargetContainer {
    galaxy: string;
    system: string;
    planet: string[];
}

abstract class Rocket {
    public getDrop(): ItemInstance {
        return null;
    };

    /**
     * Entity type {@link Entity.getTypeName} result
     */
    abstract getEntityType(): string;
    abstract getTier(): number;
    abstract getFuelCapacity(): number;
    abstract getTargetList(): IRocketTargetContainer[];

    public getTimerMax(): number {
        return 10;
    };

    public getFlySpeed(): number {
        return 1.7;
    };

    public getMinFuelAmount(): number {
        return 500;
    };

    public getFinalHeight(): number {
        return 1000;
    };

    public getEntity(): new (...args) => RocketEntity {
        return RocketEntity;
    };

    public create(entity: number, slotCount: number) {
        RocketManager.addRocketEntity(this,  entity, slotCount);
    };
};