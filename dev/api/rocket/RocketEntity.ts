class RocketEntity {
    public entity: number;
    public container: ItemContainer;
    public fuel: number;
    public slotCount: number;
    public launched: boolean;
    
    public constructor(public rocket: Rocket, entity: number, fuel: number, slotCount: number) {
        this.entity = entity;
        this.slotCount = slotCount;
        this.launched = false;
        this.container = new ItemContainer();
        this.container.setGlobalSlotSavingEnabled(true);
        this.container.setClientContainerTypeName("galacticraft.rocket:" + entity);

        this.fuel = fuel; //debug

        Network.sendToAllClients("packet.galacticraft.register_rocket_screen_factory", { 
            entity,
            fuelCapacity: this.rocket.getFuelCapacity(),
            slotCount: slotCount
        });
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

    public addFuel(amount: number): number {
        const capacity = this.rocket.getFuelCapacity();

        if(this.fuel < capacity) {
            const result = Math.min(amount, capacity - this.fuel);
            this.fuel = this.fuel + result;

            return result;
        } else {
            return 0;
        };
    };

    public addFuelBy(player: number): boolean {
        const item = Entity.getCarriedItem(player);
        const liquid = Canister.getLiquid(item);

        if(liquid != null && liquid.type === "fuel" && liquid.amount > 0) {
            item.extra.putInt("amount", this.addFuel(liquid.amount));
            Entity.setCarriedItem(player, item.id, item.count, item.data, item.extra);
            return true;
        } else {
            const liquidItem = LiquidRegistry.getEmptyItem(item.id, item.data);
            if(liquidItem && liquidItem.liquid && liquidItem.liquid === "fuel") {
                this.addFuel(this.rocket.getMinFuelAmount());
                Entity.setCarriedItem(player, liquidItem.id, 1, 0);
                return true;
            };
        };
        return false;
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

        if(this.fuel < this.rocket.getMinFuelAmount()) {
            return client.sendMessage(Translation.translate("message.galacticraft.not_enough_rocket_fuel"));
        };

        if(this.launched === false) {
            let body = false;
            let timer = this.rocket.getTimerMax();
            let timerInited = false;

            const speed = this.rocket.getFlySpeed();
            const height = this.rocket.getFinalHeight();
            const self = this;

            Updatable.addUpdatable({
                update() {
                    if(World.getThreadTime() % 20 === 0) { 
                        if(timer >= 0) {
                            if(!timerInited) {
                                RocketTimer.init(player, timer);
                                timerInited = true;
                            };

                            if(!self.hasRider()) {
                                client.sendMessage(Translation.translate("message.galacticraft.rocket_empty"))
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
        this.fuel = Math.max(0, this.fuel - this.rocket.getMinFuelAmount());
        //GalaxyMap.openFor(rocket, player);
    };

    public finalize(): void {
        const pos = this.getPosition();
        const region = BlockSource.getDefaultForActor(this.entity);

        const item = this.rocket.getDrop();
        const extra = new ItemExtraData();
        extra.putInt("amount", this.fuel);
        extra.putInt("slotCount", this.slotCount || 0);

        region.spawnDroppedItem(pos.x + 0.5, pos.y + 0.5, pos.z + 0.5, item.id, item.count, item.data, extra);
        this.container.dropAt(region, pos.x, pos.y, pos.z);
        Entity.remove(this.entity);
            
        delete RocketManager.existRockets[this.entity];
    };

    public openContainer(player: number): void {
        const client = Network.getClientForPlayer(player);
        if(client != null) {
            this.container.setScale("fuel_scale", this.fuel / this.rocket.getFuelCapacity());
            this.container.sendChanges();
            this.container.openFor(client, "fuel_storage");
        };
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
        .setRenderer(RocketEntity.createRenderer(texture));
    };
}

Network.addClientPacket("packet.galacticraft.register_rocket_screen_factory", (data: { entity: number, fuelCapacity: number, slotCount: number }) => {
    const content = {
        standard: {
            header: {
                text: {
                    text: Translation.translate("ui.galacticraft.rocket")
                }
            },
            inventory: {
                standard: true
            }
        },
        drawing: [],
        elements: {}
    } as UI.StandardWindowContent;

    let y = 30;
    let slotSize = 70;
    let fuelStorageX = 120 + 50;

    for(let i = 1; i <= data.slotCount; i++) {
        if(i % 9 === 0) {
            y += slotSize;
        };

        content.elements[String(i)] = {
            type: "slot",
            size: slotSize,
            x: 120 + (10 * i),
            y 
        };
    };

    content.elements["fuel_scale"] = {
        type: "scale",
        bitmap: "rocket.fuel_storage_0",
        x: fuelStorageX,
        y: y + 30
    };

    content.drawing.push({
        type: "bitmap",
        bitmap: "rocket.fuel_storage_1",
        x: fuelStorageX,
        y: y + 30
    });

    const window = new UI.StandardWindow(content);

    ItemContainer.registerScreenFactory("galacticraft.rocket:" + data.entity, (container, screenName) => {
        if(screenName === "fuel_storage") {
            return window;
        };
    });
});

Network.addClientPacket("packet.galacticraft.set_rocket_skybox_render", (data: { entity: number, texture: string }) => {
    RocketEntity.linkRender(data.entity, data.texture);
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

Translation.addTranslation("message.galacticraft.rocket_empty", {
    en: "Are you escape rocket.",
    ru: "Вы покинули ракету.",
});

Translation.addTranslation("ui.galacticraft.rocket", {
    en: "Rocket",
    ru: "Ракета"
});
