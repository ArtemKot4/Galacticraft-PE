class RocketTier1 extends Rocket {
    public id: number = ItemList.ROCKET_TIER_1.id;
    
    public override getEntityType(): string {
        return "galacticraft:rocket_tier_1<>";
    }

    public override getTier(): number {
        return 1;
    }
    
    public override getFuelCapacity(): number {
        return 500;
    }
}

RocketManager.registerRocket(new RocketTier1());