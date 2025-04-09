class RocketTier1 extends Rocket {
    public override getEntityType(): string {
        return "galacticraft:rocket_tier_1<>";
    };

    public override getTier(): number {
        return 1;
    };
    
    public override getFuelCapacity(): number {
        return 500;
    };

    public override getDrop(): ItemInstance {
        return new ItemStack(ItemList.ROCKET_TIER_1.id, 1);
    };

    public override getTargetList(): IRocketTargetContainer[] {
        return [{
            galaxy: "milky_way",
            system: "solar_system",
            planet: ["earth"]
        }];
    };
};

RocketManager.registerRocket(new RocketTier1());