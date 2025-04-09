interface IRocketTargetContainer {
    galaxy: string;
    system: string;
    planet: string[];
}

abstract class Rocket {
    public static localTimer: number = 0;

    abstract getTier(): number;
    abstract getFuelCapacity(): number;
    abstract getTargetList(): IRocketTargetContainer[];

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

    public entity: number;
    public container: ItemContainer;
    public fuel: number;
    public launched: boolean;
    
    public constructor(entity: number) {
        this.entity = entity;
        this.launched = false;
        this.container = new ItemContainer();
        this.container.setGlobalSlotSavingEnabled(true);
        this.container.setClientContainerTypeName("galacticraft.rocket:" + entity);

        this.fuel = this.getMinFuelAmount(); //debug

        Network.sendToAllClients("packet.galacticraft.register_rocket_screen_factory", { entity });
    };

    public getPosition(): Vector {
        const pos = Entity.getPosition(this.entity);
        return { x: pos.x + 0.5, y: pos.y, z: pos.z + 0.5 };
    };

    public getDimension(): number {
        return Entity.getDimension(this.entity);
    };

    public getCelestial(): Nullable<IPlanet> {
        return Galacticraft.findCelestialByID(this.getDimension());
    };

    public hasRider(): boolean {
        return Entity.getRider(this.entity) > 0;
    };

    public ride(entity: number): void {
        Entity.rideAnimal(this.entity, entity);
    };

    public initCelestialBodyRender(client: NetworkClient): void {
        const celestial = this.getCelestial();
        if(celestial != null && !Station.isStation(celestial)) {
            Game.message("skybox");

            client.send("packet.galacticraft.set_rocket_skybox_render", {
                entity: this.entity,
                texture: celestial.getCelestialBody().getTexture()
            });
        }
    };

    public fly(client: NetworkClient, speed: number): void {
        Entity.setVelocity(this.entity, 0, speed, 0);
        if(client) {
            client.send("packet.galacticraft.rocket_velocity_set", {
                entity: this.entity,
                speed: speed
            });
        };
    };

    public launch(player: number): void {
        const client = Network.getClientForPlayer(player);

        if(this.fuel < this.getMinFuelAmount()) {
            return client.sendMessage(Translation.translate("message.galacticraft.not_enough_rocket_fuel"));
        };

        if(this.launched === false) {
            let body = false;
            let timer = this.getTimerMax();

            const speed = this.getFlySpeed();
            const height = this.getFinalHeight();
            const self = this;

            Updatable.addUpdatable({
                update() {
                    if(World.getThreadTime() % 20 === 0) { 
                        if(timer >= 0) {
                            self.setLocalTimerFor(client, timer--);

                            if(!self.hasRider()) {
                                this.remove = true;
                            };
                        } else {
                            self.launched = true;
                        };

                        if(self.launched === true) {
                            const pos = self.getPosition();

                            if(pos.y >= height / 2 && body === false) {
                                body = true;
                            };

                            if(pos.y >= height) {
                                self.stop();
                                this.remove = true;
                            }        
                        }
                    };

                    if(timer <= 0) {
                        self.fly(client, speed);
                    }
                }
            })
        }
    };

    public stop(): void {
        Entity.setMobile(this.entity, false);
        this.fuel = Math.max(0, this.fuel - this.getMinFuelAmount());
        //GalaxyMap.openFor(rocket, player);
    };

    public finalize(): void {
        const pos = this.getPosition();
        this.container.dropAt(BlockSource.getDefaultForActor(this.entity), pos.x, pos.y, pos.z);
        Entity.remove(this.entity);
            
        delete RocketManager.rockets[this.entity];
    };
    
    public setLocalTimerFor(client: NetworkClient, timer: number): void {
        client.send("packet.galacticraft.create_local_timer", {
            timer
        });
    };

    public static createLocalTimer() : void {
        alert("local timer create");
        const timer = Rocket.localTimer;

        Updatable.addLocalUpdatable({
            update() {
                if(World.getThreadTime() % 20 === 0) {
                    Game.message("timer debug: " + timer);
                    Commands.exec("/title @p title " + Native.Color.RED + timer);

                    if(timer < 0) {
                        this.remove = true;
                        delete Rocket.localTimer;
                    }
                } 
            }
        });
    };

    public static createRenderer(texture: string): ActorRenderer {
        return new ActorRenderer()
        .addPart("body")
        .endPart()
        .addPart("skybox", "body")
        .addBox(-150, -100, 150, 0, 0, 0, 1, 0, 0)
        .setTexture(texture)
        .endPart();
    };

    public static linkRender(entity: number, texture: string): AttachableRender {
        return new AttachableRender(entity)
        .setRenderer(Rocket.createRenderer(texture));
    };
};

Network.addClientPacket("packet.galacticraft.register_rocket_screen_factory", (data: { entity: number }) => {
    ItemContainer.registerScreenFactory("galacticraft.rocket:" + data.entity, (container, screenName) => {
        if(screenName === "fuel_storage") {
            return new UI.StandardWindow();
        };
    });
});

Network.addClientPacket("packet.galacticraft.set_rocket_skybox_render", (data: { entity: number, texture: string }) => {
    Rocket.linkRender(data.entity, data.texture);
});

Network.addClientPacket("packet.galacticraft.create_local_timer", (data: {
    timer: number
}) => {
    Rocket.localTimer = data.timer;

    if(!("localTimer" in Rocket)) {
        return Rocket.createLocalTimer();
    };
});

Network.addClientPacket("packet.galacticraft.rocket_velocity_set", (data: {
    entity: number, speed: number
}) => {
    if(RocketManager.isRocket(data.entity)) Entity.setVelocity(data.entity, 0, data.speed, 0);
});

Translation.addTranslation("message.galacticraft.not_enough_rocket_fuel", {
    en: "Not enough rocket fuel!",
    ru: "Недостаточно топлива в ракете!",
});