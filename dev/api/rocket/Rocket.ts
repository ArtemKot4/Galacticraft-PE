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
    public getTargetList?(): IRocketTargetContainer[];

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

    public create(entity: number, slotCount: number): void {
        RocketManager.addRocketEntity(this,  entity, slotCount);
    };

    public getRocketPadding(): Tile {
        return {
            id: BlockList.ROCKET_PADDING.id,
            data: 1
        };
    };
};