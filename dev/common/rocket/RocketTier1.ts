class RocketTier1 extends Rocket {
    public override getFuelCapacity(): number {
        return 500;
    };

    public override getTargetList(): IRocketTargetContainer[] {
        return [{
            galaxy: "milky_way",
            system: "solar_system",
            planet: ["earth"]
        }];
    };
};

RocketManager.registerRocket("galacticraft:rocket_tier_1", RocketTier1);