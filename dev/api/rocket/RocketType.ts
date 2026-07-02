interface IRocketTargetContainer {
    galaxy: string;
    system: string;
    planet: string[];
}

abstract class RocketType {
    /**
     * Entity type {@link Entity.getTypeName} result
     */
    abstract entityType: string;
    abstract itemId: number;
    abstract tier: number;

    abstract getFuelCapacity(): number;
    public getTargetList?(): IRocketTargetContainer[];

    public getTimerMax(): number {
        return 10;
    }

    public getFlightSpeed(): number {
        return 1.7;
    }

    public getMinFuelAmount(): number {
        return 500;
    }

    public getFinalHeight(): number {
        return 700;
    }

    public getRocketPadding(): BasicBlock & { getRadius(): number } {
        return BlockList.ROCKET_PADDING;
    }
}