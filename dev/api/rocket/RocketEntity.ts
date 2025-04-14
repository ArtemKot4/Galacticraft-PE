class RocketEntity {
    public entity: number;
    public rider: number;
    public container: ItemContainer;
    public blockSource: BlockSource;
    public startHeight: number;
    public fuel: number;
    public slotCount: number;
    public launched: boolean;
    
    public constructor(public rocket: Rocket, entity: number, fuel: number, slotCount: number) {
        this.entity = entity;
        this.slotCount = slotCount;
        this.launched = false;
        this.container = new ItemContainer();
        this.blockSource = BlockSource.getDefaultForDimension(this.getDimension());
        this.container.setGlobalSlotSavingEnabled(true);
        this.container.setClientContainerTypeName("galacticraft.rocket:" + entity);

        this.fuel = fuel || 0;
        this.startHeight = this.getPosition().y;

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

    public fly(client: NetworkClient, speed: number): void {
        Entity.setVelocity(this.entity, 0, speed, 0);
        if(client) {
            client.send("packet.galacticraft.rocket_velocity_set", {
                entity: this.entity,
                speed: speed
            });
        };
    };

    public findRocketPadding(): Nullable<Vector3> {
        const padding = this.rocket.getRocketPadding();
        const pos = this.getPosition();
        
        let height = pos.y;
        while(this.blockSource.getBlockID(pos.x, height, pos.z) === 0) {
            height--;
            const block = this.blockSource.getBlock(pos.x, height, pos.z);
            if(block.id === padding.id && block.data === padding.data) {
                return new Vector3(pos.x, height, pos.z);
            };
        };
        return null;
    };

    public packRocketPadding(coords: Vector): void {
        if(coords != null) {
            for(let i = -1; i <= 1; i++) {
                for(let k = -1; k <= 1; k++) {
                    this.blockSource.destroyBlock(coords.x + i, coords.y, coords.z + k, false);
                };
            };
            this.container.setSlot(this.findEmptySlot(), this.rocket.getRocketPadding().id, 9, 0);
        };
    };

    public findEmptySlot(): string {
        for(let i = 1; i <= this.slotCount; i++) {
            if(this.container.getSlot(String(i)).isEmpty()) {
                return String(i);
            };
        };
    };

    public cancel(client: NetworkClient, message: string, color?: EColor): void {
        this.launched = false;

        if(client) {
            client.sendMessage(color || "" + Translation.translate(message));
        };
    };

    public isValidRider(): boolean {
        return Entity.getRider(this.entity) == this.rider;
    };

    public launch(player: number): void {
        const client = Network.getClientForPlayer(player);

        if(this.fuel < this.rocket.getMinFuelAmount()) {
            return client.sendMessage(Translation.translate("message.galacticraft.not_enough_rocket_fuel"));
        };

        if(this.launched === false) {
            this.launched = true;

            let body = false;
            let timer = this.rocket.getTimerMax();
            let packedPadding = false;

            const speed = this.rocket.getFlySpeed();
            const height = this.rocket.getFinalHeight();
            const self = this;

            Updatable.addUpdatable({
                update() {
                    if(World.getThreadTime() % 20 === 0) { 
                        if(self.launched === false) {
                            this.remove = true;
                        };

                        if(timer >= -1) {
                            if(self.fuel < self.rocket.getMinFuelAmount()) {
                                return self.cancel(client, "message.galacticraft.not_enough_rocket_fuel", EColor.RED);
                            };

                            RocketTimer.sendFor(client, timer);
                            timer--;

                            if(!self.isValidRider()) {
                                RocketTimer.sendFor(client, -1);
                                return self.cancel(client, "message.galacticraft.rocket_empty", EColor.RED);
                            };

                            if(timer === -1) {
                                self.fuel -= self.rocket.getMinFuelAmount();
                            };
                        } else {
                            const pos = self.getPosition();

                            if(pos.y >= height / 2 && body === false) {
                                self.sendCelestialRenderFor(client);
                                body = true;
                            };

                            if(pos.y >= self.startHeight + 5 && !packedPadding) {
                                const paddingCoords = self.findRocketPadding();
                                if(paddingCoords != null) {
                                    self.packRocketPadding(paddingCoords);
                                    packedPadding = true;
                                };
                            };

                            if(pos.y >= height) {
                                self.stop();
                                this.remove = true;
                            };        

                            
                            self.fly(client, speed);
                        };
                    };
                }
            });
        };
    };

    public stop(): void {
        Entity.setMobile(this.entity, false);
        this.fuel = Math.max(0, this.fuel - this.rocket.getMinFuelAmount());
        //GalaxyMap.openFor(rocket, player);
    };

    public destroy(entity?: number): void {
        const pos = Entity.getPosition(entity || this.entity);
        Game.message(JSON.stringify(pos) + " -> debug");

        const item = this.rocket.getDrop();
        const extra = new ItemExtraData();
        extra.putInt("amount", this.fuel);
        extra.putInt("slotCount", this.slotCount || 0);

        this.blockSource.spawnDroppedItem(pos.x + 0.5, pos.y + 0.5, pos.z + 0.5, item.id, item.count, item.data, extra);
        this.container.dropAt(this.blockSource, pos.x, pos.y, pos.z);
        Entity.remove(entity || this.entity);
            
        RocketManager.deleteRocketEntity(entity || this.entity);
    };

    public openContainer(player: number): void {
        const client = Network.getClientForPlayer(player);
        if(client != null) {
            this.container.setScale("fuel_scale", this.fuel / this.rocket.getFuelCapacity());
            this.container.sendChanges();
            this.container.openFor(client, "fuel_storage");
        };
    };

    public sendCelestialRenderFor(client: NetworkClient): void {
        const celestial = this.getCelestial();
        if(this.isValidRider() && celestial != null && !Station.isStation(celestial)) {
            Game.message("skybox");

            client.send("packet.galacticraft.set_rocket_skybox_render", {
                entity: this.entity,
                texture: celestial.getCelestialBody().getTexture()
            });
        }
    };

    public static createCelestialRenderer(texture: string): ActorRenderer {
        return new ActorRenderer()
        .addPart("body")
        .endPart()
        .addPart("skybox", "body")
        .addBox(-150, -100, 150, 0, 0, 0, 1, 0, 0)
        .setTexture(texture)
        .endPart();
    };

    public static linkCelestialRender(entity: number, texture: string): AttachableRender {
        return new AttachableRender(entity)
        .setRenderer(RocketEntity.createCelestialRenderer(texture));
    };

    public static buildContainerUI(slotCount: number): UI.StandardWindow {
        const content = {
            standard: {
                header: {
                    text: {
                        text: Translation.translate("ui.galacticraft.rocket")
                    },
                },
                inventory: {
                    standard: true,
                },
                background: {
                    standard: true,
                }
            },
            drawing: [],
            elements: {}
        } as UI.StandardWindowContent;
        
        let fuelStorageX = 120 + 250;

        content.drawing.push({
            type: "bitmap",
            bitmap: "rocket.fuel_storage_0",
            x: fuelStorageX,
            y: 50,
            width: 36 * 7, 
            height: 40 * 7
        });
    
        content.elements["fuel_scale"] = {
            type: "scale",
            bitmap: "rocket.fuel_storage_1",
            x: fuelStorageX,
            y: 50,
            width: 36 * 7,
            height: 40 * 7
        };

        if(slotCount) {
            let slotSize = 70;
            let y = 50 + (40 * 7) + 30;
            let xIndex = 0;
        
            for(let i = 1; i <= slotCount; i++) {
                xIndex++;
        
                content.elements[String(i)] = {
                    type: "slot",
                    size: slotSize,
                    x: 120 + (slotSize * xIndex),
                    y 
                };
        
                if(i % 9 === 0) {
                    y += slotSize;
                    xIndex = 0;
                };
            };

            content.standard.minHeight = Math.floor(slotCount / 9) * slotSize;
        }

    
        return new UI.StandardWindow(content);
    };
};

Network.addClientPacket("packet.galacticraft.register_rocket_screen_factory", (data: { entity: number, fuelCapacity: number, slotCount: number }) => {
    const window = RocketEntity.buildContainerUI(data.slotCount);

    ItemContainer.registerScreenFactory("galacticraft.rocket:" + data.entity, (container, screenName) => {
        if(screenName === "fuel_storage") {
            return window;
        };
    });
});

Network.addClientPacket("packet.galacticraft.set_rocket_skybox_render", (data: { entity: number, texture: string }) => {
    RocketEntity.linkCelestialRender(data.entity, data.texture);
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
    en: "Storage of rocket",
    ru: "Хранилище ракеты"
});
