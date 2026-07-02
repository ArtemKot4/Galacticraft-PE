class RocketTier1 extends RocketType {
    public itemId: number = ItemList.ROCKET_TIER_1.id;
    public override entityType: string = "galacticraft:rocket_tier_1";
    public override tier: number = 1;
    
    public override getFuelCapacity(): number {
        return 1200;
    }
}

RocketManager.registerRocketType(new RocketTier1());