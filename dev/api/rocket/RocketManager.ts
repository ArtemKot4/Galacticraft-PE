class RocketManager {
    public static rockets: Record<number, Rocket> = {};
    public static rocketTypes: Record<string, new (entity: number) => Rocket> = {};

    @SubscribeEvent
    public static onEntityAdded(entity: number) {
        if(RocketManager.isRocket(entity)) {
            RocketManager.addRocket(entity);
        };
    };

    @SubscribeEvent
    public static onEntityInteract(entity: number, player: number, coords: Vector): void {
        if(RocketManager.isRocket(entity)) {
            const rocket = RocketManager.getRocket(entity);
            if(!rocket) return;

            if(Entity.getSneaking(player)) {
                Game.prevent();
                const client = Network.getClientForPlayer(player);

                if(client) rocket.container.openFor(client, "fuel_storage");
            };
        };
    };

    @SubscribeEvent
    public static onEntityHurt(attacker: number, entity: number, damageValue: number, damageType: Entity.DamageSource | number, armorReducesDamage: boolean) {
        if(RocketManager.isRocket(entity)) {
            Game.prevent();
            RocketManager.finalize(entity);
        };
    };

    public static isRocket(entity: number): boolean {
        return entity in RocketManager.rocketTypes;
    };

    public static addRocket(entity: number) {
        RocketManager.rockets[entity] = new RocketManager.rocketTypes[Entity.getType(entity)](entity) as Rocket;
    };

    public static getRocket(entity: number): Nullable<Rocket> {
        return RocketManager.rockets[entity] || null;
    };

    public static finalize(entity: number) {
        const rocket = RocketManager.getRocket(entity);
        if(rocket) {
            const pos = rocket.getPosition();
            rocket.container.dropAt(BlockSource.getDefaultForActor(entity), pos.x, pos.y, pos.z);
            Entity.remove(entity);
            
            delete RocketManager.rockets[entity];
        };
    };
};

Network.addClientPacket("packet.galacticraft.register_rocket_screen_factory", (data: { entity: number }) => {
    ItemContainer.registerScreenFactory("galacticraft:rocket_" + data.entity, (container, screenName) => {
        if(screenName === "fuel_storage") {
            return new UI.StandardWindow();
        };
    });
});