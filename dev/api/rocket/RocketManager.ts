

class RocketManager {
    public static rockets: Record<number, Rocket> = {};
    public static rocketTypes: Record<string, new (entity: number) => Rocket> = {};

    public static isRocket(entity: number): boolean {
        return Entity.getTypeName(entity) in RocketManager.rocketTypes;
    };

    public static addRocket(entity: number): Rocket {
        return RocketManager.rockets[entity] = new RocketManager.rocketTypes[Entity.getTypeName(entity)](entity) as Rocket;
    };

    public static getRocket(entity: number): Nullable<Rocket> {
        return RocketManager.rockets[entity] || null;
    };

    public static registerRocket(type: string, rocket: new (entity: number) => Rocket) {
        RocketManager.rocketTypes[type] = rocket; 
    };
};

class RocketController {
    public static finalize(entity: number): void {
        const rocket = RocketManager.getRocket(entity);
        if(rocket) {
            const pos = rocket.getPosition();
            rocket.container.dropAt(BlockSource.getDefaultForActor(entity), pos.x, pos.y, pos.z);
            Entity.remove(entity);
            
            delete RocketManager.rockets[entity];
        };
    };

    public static launch(entity: number, player: number): void {
        const rocket = RocketManager.getRocket(entity);
        if(rocket) {
            if(rocket.launched === false) {
                let body = false;
                let timer = 10;
                const client = Network.getClientForPlayer(player);

                Updatable.addUpdatable({
                    update() {
                        if(World.getThreadTime() % 20 === 0) {
                            if(timer >= 0) {
                                client.sendMessage(Native.Color.RED + timer--);
                            } else {
                                rocket.launched = true;
                            };

                            if(rocket.launched === true) {
                                const pos = Entity.getPosition(entity);
                                if(pos.y >= 400 && !body) {
                                    body = true;
                                    RocketController.linkRender(Entity.getDimension(player));
                                }
                                if(pos.y >= 1000) {
                                    Entity.setMobile(entity, false);
                                    this.remove = true;
                                }        
                            }
                        };

                        if(timer <= 0) {
                            Entity.setVelocity(entity, 0, 1, 0);
                            if(client) {
                                client.send("packet.galacticraft.rocket_velocity_set", {
                                    entity
                                });
                            };
                        }
                    }
                })
            };
        }
    };

    public static linkRender(entity: number): void {
        const render = new AttachableRender(entity);
        const mesh = new RenderMesh();

        const pos = 8 / 16;

        mesh.addVertex(-pos, -100, -pos, 0, 0);
        mesh.addVertex(pos, -100, -pos, 1, 0);
        mesh.addVertex(-pos, -100, pos, 0, 1);
        mesh.addVertex(pos, -100, -pos, 1, 0);
        mesh.addVertex(-pos, -100, pos, 0, 1);
        mesh.addVertex(pos, -100, pos, 1, 1);
        mesh.scale(350, 350, 350);
        const renderer = new ActorRenderer("chestplate");
        renderer.addPart("planet", mesh);

        render.setRenderer(renderer);
        const celestial = Galacticraft.findCelestialByID(Entity.getDimension(entity));

        if(celestial != null) {
            const body = celestial.getCelestialBody();

            render.setTexture(body.getPath() + body.bitmap + ".png");
        };
    };
};

Network.addClientPacket("packet.galacticraft.rocket_velocity_set", (data: {
    entity: number, x: number, y: number, z: number
}) => {
    if(RocketManager.isRocket(data.entity)) Entity.setVelocity(data.entity, 0, 1, 0);
});

class RocketEvents {
    @SubscribeEvent
    public onEntityAdded(entity: number) {
        if(RocketManager.isRocket(entity)) {
            RocketManager.addRocket(entity);
        };
    };

    @SubscribeEvent
    public onEntityInteract(entity: number, player: number, coords: Vector): void {
        if(RocketManager.isRocket(entity)) {
            const rocket = RocketManager.addRocket(entity);

            if(Entity.getSneaking(player) === true) {
                Game.prevent();
                const client = Network.getClientForPlayer(player);

                if(client) rocket.container.openFor(client, "fuel_storage");
            } else {
                //debug next string:
                return RocketController.launch(entity, player);
            }
        };
    };

    @SubscribeEvent
    public onEntityHurt(attacker: number, entity: number, damageValue: number, damageType: Entity.DamageSource | number, armorReducesDamage: boolean) {
        if(RocketManager.isRocket(entity)) {
            Game.prevent();
            RocketController.finalize(entity);
        };
    };
}