interface IRocketTargetContainer {
    galaxy: string;
    system: string;
    planet: string[];
}

abstract class Rocket {
    abstract id: number;

    /**
     * Entity type {@link Entity.getTypeName} result
     */
    abstract getEntityType(): string;
    abstract getTier(): number;
    abstract getFuelCapacity(): number;
    public getTargetList?(): IRocketTargetContainer[];

    public getTimerMax(): number {
        return 10;
    }

    public getFlySpeed(): number {
        return 1.7;
    }

    public getMinFuelAmount(): number {
        return 500;
    }

    public getFinalHeight(): number {
        return 1000;
    }

    public getNewEntity(entity: number, fuel: number, slotCount: number): RocketEntity {
        return new RocketEntity(this, entity, fuel, slotCount);
    }

    public getRocketPadding(): BasicBlock & { getRadius(): number } {
        return BlockList.ROCKET_PADDING;
    }
}