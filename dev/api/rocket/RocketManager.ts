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
        Game.message(Entity.getType(entity));

        if(RocketManager.isRocket(entity)) {
            const rocket = RocketManager.addRocket(entity);

            if(Entity.getSneaking(player)) {
                Game.prevent();
                const client = Network.getClientForPlayer(player);

                if(client) rocket.container.openFor(client, "fuel_storage");
            } else {
                //debug next string:
                RocketManager.launch(entity);
            }
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
        return RocketManager.rockets[entity] = new RocketManager.rocketTypes[Entity.getType(entity)](entity) as Rocket;
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

    public static launch(entity: number) {
        const rocket = RocketManager.getRocket(entity);
        if(rocket) {
            const rider = Entity.getRider(entity);
            if(rider && rocket.launched === false) {
                let flyState = false;
                let timer = 10;

                Updatable.addUpdatable({
                    update() {
                        if(World.getThreadTime() % 20 === 0) {
                            if(timer >= 0) {
                                Game.titleMessage(Native.Color.RED + timer);
                                timer--;
                            } else {
                                rocket.launched = true;
                                Entity.setVelocity(entity, 0, 0.03, 0);
                            };
                        };

                        if(rocket.launched) {
                            const pos = Entity.getPosition(entity);
                            if(pos.y >= 500) {
                                const actor = new PlayerActor(rider);
                                flyState = actor.isFlying();

                                actor.setFlying(true);
                                this.remove = true;
                            }        
                        }
                    }
                })
            }
        }
    };

    public static registerRocket(type: string, rocket: new (entity: number) => Rocket) {
        RocketManager.rocketTypes[type] = rocket; 
    };
};