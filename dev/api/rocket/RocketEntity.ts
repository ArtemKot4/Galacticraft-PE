/**
 * Class, describes behavior of a rocketType. Extend to change default behavior
 */

class RocketEntity {
	/**
	 * RocketType which entity is implementing
	 */
	public rocketType: RocketType;

	/**
	 * Coords of padding
	 */

	protected paddingCoords: Vector3;

	/**
	 * Entity ID of the rocket in the world
	 */

	protected entityUid: number;

	/**
	 * Unique identifier of player who launched rocket
	 */

	public rider: number;

	/**
	 * Current launch {@link ELaunchPhase phase}
	 */

	protected launchPhase: ELaunchPhase;

	/**
	 * Whether rocket was already launched
	 */

	protected launched: boolean;

	/**
	 * Number of current countdown
	 */

	protected timer: number;

	/**
	 * Item container of the rocket
	 */

	protected container: ItemContainer;

	/**
	 * {@link BlockSource} for the rocket
	 */

	public blockSource: BlockSource;

	/**
	 * Start height of the rocket
	 */

	public startHeight: number;

	/**
	 * Fuel amount
	 */

	public fuel: number;

	/**
	 * Slot count of the rocket
	 */

	protected slotCount: number;

	/**
	 * Method to initialize new rocket with standard data
	 * @param rocket rocket prototype for entityUid
	 * @param entityUid rocket entityUid unique identifier after spawn
	 * @param fuel standard fuel count inside
	 * @param slotCount count of slots
	 */

	public init(rocketType: RocketType, entityUid: number, fuel: number, slotCount: number): this {
		this.rocketType = rocketType;
		this.entityUid = entityUid;
		this.fuel = fuel;
		this.slotCount = slotCount;

		const coords = Entity.getPosition(entityUid);
		this.blockSource = BlockSource.getDefaultForDimension(this.getDimension());
		this.paddingCoords = new Vector3(Math.floor(coords.x), Math.floor(coords.y), Math.floor(coords.z));

		if(this.blockSource.getBlockID(this.paddingCoords.x, this.paddingCoords.y, this.paddingCoords.z) != this.rocketType.getRocketPadding().id) {
			Network.sendServerMessage(Native.Color.RED + Translation.translate("message.galacticraft.padding_positioning_bug_issue"));
		}
		this.launched = false;
		this.launchPhase = ELaunchPhase.PRE_LAUNCH;
		this.timer = this.rocketType.getTimerMax();

		this.container = new ItemContainer();
		this.container.setGlobalSlotSavingEnabled(true);
		this.container.setClientContainerTypeName("galacticraft.rocket:" + entityUid);
		this.fuel = fuel || 0;
		this.startHeight = Math.floor(this.getPosition().y);

		RocketEntity.registerScreenFactoryOnClientSide(this);
		return this;
	}

	public getPaddingCoords(): Vector3 {
		return this.paddingCoords.copy();
	}

	/**
	 * Method to get entityUid position in the world
	 * @returns {@link Vector}
	 */

	public getPosition(): Vector {
		const pos = Entity.getPosition(this.entityUid);
		return { x: pos.x + 0.5, y: pos.y, z: pos.z + 0.5 };
	}

	/**
	 * Method to get entityUid dimension
	 */

	public getDimension(): number {
		return Entity.getDimension(this.entityUid);
	}

	/**
	 * Method to get celestial of world where rocket is launched
	 * @returns IPlanet object of the rocket
	 */

	public getCelestial(): Nullable<IPlanet> {
		throw new java.lang.UnsupportedOperationException();
	}

	/**
	 * Method to add fuel and get value, how much fuel was added
	 * @param amount amount of the fuel to add
	 * @returns added amount
	 */

	public addFuel(amount: number): number {
		const capacity = this.rocketType.getFuelCapacity();

		if(this.fuel < capacity) {
			const result = Math.min(amount, capacity - this.fuel);
			this.fuel = this.fuel + result;

			return result;
		} else {
			return 0;
		}
	}

	/**
	 * Method to add velocity to the rocket
	 */

	public fly(client: NetworkClient, speed: number = this.rocketType.getFlightSpeed()): void {
		Entity.setVelocity(this.entityUid, 0, speed, 0);
		if(client) {
			client.send("packet.galacticraft.rocket_velocity_set", {
				entityUid: this.entityUid,
				speed: speed,
			});
		}
	}
	/**
	 * Method to get empty slot in rocket inventory
	 */

	public findEmptySlot(): Nullable<string> {
		for(let i = 1; i <= this.slotCount; i++) {
			const slot = this.container.getSlot(String(i));
			if(slot.isEmpty()) {
				return String(i);
			}
		}
		return null;
	}

	/**
	 * Method to cancel launch
	 * @param client {@link NetworkClient}
	 * @param message your message
	 * @param color {@link Native.Color color}
	 */

	public cancel(client: NetworkClient, message: string, color?: Native.Color): void {
		this.launched = false;
		this.timer = this.rocketType.getTimerMax();

		if(client != null) {
			client.sendMessage((color || "") + Translation.translate(message));
		}
	}

	/**
	 * Method to check if rocket has valid rider
	 * @returns boolean
	 */

	public isValidRider(): boolean {
		return Entity.getRider(this.entityUid) == this.rider;
	}

	/**
	 * Method to do launch countdown
	 */

	public countdown(client: NetworkClient) {
		if(this.timer < -1) {
			return (this.launchPhase = ELaunchPhase.FLY);
		}

		if(!this.isValidRider()) {
			client.send("packet.galacticraft.set_view_perspective", { perspective: 0 });
			RocketTimer.sendFor(client, -1);
			return this.cancel(client, "message.galacticraft.rocket_empty", Native.Color.RED);
		}

		RocketTimer.sendFor(client, this.timer);
		this.timer--;
	}

	public packRocketPadding(): void {
		const padding = RocketManager.getRocketByEntity(this.entityUid).getRocketPadding();
		const slotName = this.findEmptySlot();
		const count = RocketPadding.breakAll(padding.getRadius(), this.paddingCoords, this.blockSource, slotName == null ? this.rider : null);
		
		if(slotName != null) {
			this.container.setSlot(slotName, padding.id, count, 0);
			this.container.validateAll();
			this.container.sendChanges();
		}
	}

	public returnRiderBack(player: number) {
		Entity.rideAnimal(this.entityUid, player);
		this.rider = player;
	}
	/**
	 * Method to launch rocket with launchPhases
	 * @param player player unique identifier
	 */

	public sit(player: number): void {
		Callback.invokeCallback("Galacticraft:RocketSit", this);
		if(this.fuel < this.rocketType.getMinFuelAmount()) {
			return Network.getClientForPlayer(player).sendMessage(Translation.translate("message.galacticraft.not_enough_rocket_fuel"));
		}
		if(this.launched == false) {
			this.launched = true;
			let body = false;
			const finalHeight = this.rocketType.getFinalHeight();
			const self = this;
			let changedPerspective = false;

			Updatable.addUpdatable({
				update() {
					const client = Network.getClientForPlayer(self.rider);
					const pos = self.getPosition();
					const isValidRider = self.isValidRider();

					if(client != null) {
						if(isValidRider) {
							if(!changedPerspective) {
								client.send("packet.galacticraft.set_rocket_view_perspective", { set: changedPerspective = true });
							}
						} else if(changedPerspective) {
							client.send("packet.galacticraft.set_rocket_view_perspective", { set: changedPerspective = false });
						}
					}

					if(World.getThreadTime() % 20 == 0) {
						if(self.launchPhase == ELaunchPhase.PRE_LAUNCH) {
							if(self.countdown(client) == ELaunchPhase.FLY) {
								self.fly(client);
								self.fuel -= self.rocketType.getMinFuelAmount();
								self.packRocketPadding();
								
								Callback.invokeCallback("Galacticraft:RocketFlightStarted", this);
							}
							return;
						}
					}
					if(World.getThreadTime() % 10 == 0) {
						if(self.launched == false || self.launchPhase == ELaunchPhase.LANDING) {
							return (this.remove = true);
						}
						if(self.launchPhase == ELaunchPhase.FLY) {
							if(pos.y >= finalHeight / 2 && body == false) {
								body = true;
							}
							if(pos.y >= finalHeight) {
								let explode = false;
								if(!isValidRider) {
									explode = true;
									self.blockSource.explode(pos.x, pos.y, pos.z, 0, false);
									self.destroy();
								}
								Callback.invokeCallback("Galacticraft:RocketFlightCompleted", explode ? null : self);
								return self.stop();
							}
							self.fly(client);
						}
					}
				},
			});
		}
	}

	/**
	 * Method to stop rocket and open galaxy map with specified rocket params
	 */

	public stop(): void {
		Entity.setMobile(this.entityUid, false);
		this.fuel = Math.max(0, this.fuel - this.rocketType.getMinFuelAmount());
		this.launchPhase = ELaunchPhase.LANDING;
		//GalaxyMap.openFor(rocket, player);
	}

	/**
	 * Method to destroy rocket data and drop container
	 */

	public destroy(entityUid?: number): void {
		const pos = Entity.getPosition(entityUid || this.entityUid);

		const item = new ItemStack(this.rocketType.itemId);
		const extra = new ItemExtraData();
		extra.putInt("fuelAmount", this.fuel);
		extra.putInt("slotCount", this.slotCount || 0);

		this.blockSource.spawnDroppedItem(pos.x + 0.5, pos.y + 0.5, pos.z + 0.5, item.id, item.count || 1, item.data || 0, extra);
		this.container.dropAt(this.blockSource, pos.x, pos.y, pos.z);
		Entity.remove(entityUid || this.entityUid);

		RocketManager.deleteRocketEntity(entityUid || this.entityUid);
	}

	/**
	 * Method to open container
	 * @param player player unique identifier
	 */

	public openContainer(player: number): void {
		const client = Network.getClientForPlayer(player);
		if(client != null) {
			this.container.setScale("fuel_scale", this.fuel / this.rocketType.getFuelCapacity());
			this.container.validateAll();
			this.container.sendChanges();
			this.container.openFor(client, "fuel_storage");
		}
	}

	public getEntityUid(): number {
		return this.entityUid;
	}

	public getSlotCount(): number {
		return this.slotCount;
	}

	/**
	 * Method to get instance of RocketEntity by fields from any valid object
	 * @param rocketEntityData fields of RocketEntity
	 * @returns RocketEntity
	 */
	public static from(rocketEntityData: RocketEntity): RocketEntity {
		const rocketEntity = new RocketEntity();
		for(const key in rocketEntityData) {
			rocketEntity[key] = rocketEntityData[key];
		}
		rocketEntity.blockSource = BlockSource.getDefaultForDimension(rocketEntity.getDimension());
		rocketEntity.rocketType = RocketManager.getRocketTypeByEntityTypeName(rocketEntityData.rocketType.entityType);
		rocketEntity.paddingCoords = new Vector3(rocketEntityData.paddingCoords);
		rocketEntity.container.setClientContainerTypeName("galacticraft.rocket:" + rocketEntity.entityUid);
		RocketEntity.registerScreenFactoryOnClientSide(rocketEntity);
		return rocketEntity;
	}

	/**
	 * Method to build container ui with specified slot count
	 * @param slotCount number
	 * @returns UI.StandardWindow
	 */

	public static buildContainerUI(slotCount: number): UI.StandardWindow {
		const content = {
			standard: {
				header: {
					text: {
						text: Translation.translate("ui.galacticraft.rocket"),
					},
				},
				inventory: {
					standard: true
				},
				background: {
					standard: true
				}
			},
			drawing: [],
			elements: {},
		} as UI.StandardWindowContent;
		const maxStringGrid = 9;
		let slotSize = 90;
		let fuelStorageX = (50 + slotSize * maxStringGrid) / 2;

		content.drawing.push({
			type: "bitmap",
			bitmap: "rocket.fuel_storage_0",
			x: fuelStorageX,
			y: 50,
			width: 36 * 6.7,
			height: 40 * 6.7,
		});

		content.elements["fuel_scale"] = {
			type: "scale",
			bitmap: "rocket.fuel_storage_1",
			x: fuelStorageX,
			y: 50,
			width: 36 * 6.7,
			height: 40 * 6.7,
		};

		if(slotCount != null) {
			let y = 50 + 40 * 7 + 30;

			for(let i = 1; i <= slotCount; i++) {
				content.elements[String(i)] = {
					type: "slot",
					size: slotSize,
					x: 50 + (i % maxStringGrid) * slotSize,
					y: y + Math.floor(i / maxStringGrid) * slotSize,
				};
			}
			content.standard.minHeight = Math.floor(slotCount / maxStringGrid) * slotSize + 10;
		}
		return new UI.StandardWindow(content);
	}

	/**
	 * Method to register screen factory of rocket on client side
	 * @param client if not defined, screen factory will be registered for all
	 */
	public static registerScreenFactoryOnClientSide({ entityUid, slotCount }: RocketEntity, client?: NetworkClient): void {
		const data = {
			entityUid,
			slotCount,
		};

		if(!client) {
			Network.sendToAllClients("packet.galacticraft.register_rocket_screen_factory", data);
			return;
		}
		client.sendMessage("отправка одному: " + JSON.stringify(data));
		client.send("packet.galacticraft.register_rocket_screen_factory", data);
		client.sendMessage("на клиент должно было отправиться, тест 'одному'")
		return;
	}

	@SubscribeEvent
	public static onServerPlayerLoaded(playerUid: number) {
		const client = Network.getClientForPlayer(playerUid);

		RocketManager.forEachRocketEntity((rocketEntity: RocketEntity) => {
			client.sendMessage(JSON.stringify(rocketEntity));		
			client.sendMessage(rocketEntity.entityUid + ", " + rocketEntity.rocketType.getFuelCapacity() + ", " + rocketEntity.slotCount);	
			return RocketEntity.registerScreenFactoryOnClientSide(rocketEntity, client);
		});
	}
}

Network.addClientPacket("packet.galacticraft.register_rocket_screen_factory", (data: { entityUid: number, slotCount: number }) => {
	const window = RocketEntity.buildContainerUI(data.slotCount);
	Game.message("я прилетел: " + JSON.stringify(data))

	ItemContainer.registerScreenFactory("galacticraft.rocket:" + data.entityUid, (container, screenName) => {
		if(screenName == "fuel_storage") {
			return window;
		}
	});
});

Network.addClientPacket("packet.galacticraft.rocket_velocity_set", (data: {entity: number; speed: number}) => {
	if(RocketManager.isRocketType(data.entity)) {
        Entity.setVelocity(data.entity, 0, data.speed, 0);
    }
});

Network.addClientPacket("packet.galacticraft.set_rocket_view_perspective", (data: { set: boolean }) => {
	if(data.set == true) {
		Player.setViewPerspective(2);
		return;
	}
	Player.setViewPerspective(0);
	Player.resetViewPerspective();
});

Translation.addTranslation("message.galacticraft.not_enough_rocket_fuel", {
	en: "Not enough rocket fuel!",
	ru: "Недостаточно топлива в ракете!",
});

Translation.addTranslation("message.galacticraft.rocket_empty", {
	en: "Are you escaped rocket.",
	ru: "Вы покинули ракету.",
});

Translation.addTranslation("ui.galacticraft.rocket", {
	en: "Storage of rocket",
	ru: "Хранилище ракеты",
});

Translation.addTranslation("message.galacticraft.padding_positioning_bug_issue", {
	en: "There was a critical error with determining the position of the rocketType. Please close the game and tell the developer about the problem.",
	ru: "Возникла критическая ошибка с определением площадки для ракеты. Пожалуйста, закройте игру и доложите разработчику о проблеме."
});

declare namespace Callback {
	/**
	 * Callback for know when rocket started fly
	 */
	export function addCallback(name: "Galacticraft:RocketFlightStarted", func: (rocketEntity: RocketEntity) => void);
	/**
	 * Callback for know when rocket launch
	 */
	export function addCallback(name: "Galacticraft:RocketSit", func: (rocketEntity: RocketEntity) => void);
	/**
	 * Callback for know when rocket fly is done
	 * @param func rocketEntity is null if rocket was exploded
	 */
	export function addCallback(name: "Galacticraft:RocketFlightCompleted", func: (rocketEntity: Nullable<RocketEntity>) => void);
}