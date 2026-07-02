/**
 * Class, describes behavior of a rocketType. Extend to change default behavior
 */

class RocketEntity {
	/**
	 * Updatable cannot be added when previous is alive
	 */

	protected updatableInited: boolean = false;
	
	/**
	 * Need to learn when player inside rocket
	 */

	protected taken: boolean = false;

	/**
	 * Data which usings for client side, as data for client packets
	 */

	protected client = {
		changedPerspective: false,
		sendedMessage: false
	}
	/**
	 * RocketType which entity is implementing
	 */
	protected rocketType: RocketType;

	/**
	 * Coords of padding
	 */

	protected paddingCoords: Vector3;

	/**
	 * Entity ID of the rocket in the world
	 */

	protected entityUid: number;

	/**
	 * Valid unique identifier of player inside rocket
	 */

	protected riderUid: number = null;

	/**
	 * Current launch {@link ELaunchPhase phase}
	 */

	protected launchPhase: ELaunchPhase = ELaunchPhase.PRE_LAUNCH;

	/**
	 * Whether rocket was already launched
	 */

	protected launch: boolean = false;

	/**
	 * Number of current countdown
	 */

	protected timer: number = null;

	/**
	 * Item container of the rocket
	 */

	protected container: ItemContainer;

	/**
	 * {@link BlockSource} for the rocket
	 */

	protected blockSource: BlockSource;

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

		this.container = new ItemContainer();
		this.container.setGlobalSlotSavingEnabled(true);
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
		return Entity.getPosition(this.entityUid);
	}

	/**
	 * Method to get entityUid dimension
	 */

	public getDimension(): number {
		return Entity.getDimension(this.entityUid);
	}

	/**
	 * Method to get rider uid (especially player uid)
	 */

	public getRiderUid(): Nullable<number> {
		return this.riderUid;
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
		let result = 0;

		if(this.fuel < capacity) {
			result = Math.min(amount, capacity - this.fuel);
			this.fuel = this.fuel + result;
		}
		return result;
	}

	/**
	 * Method to add velocity to the rocket
	 */

	public setVelocity(speed: number = this.rocketType.getFlightSpeed()): void {
		Entity.setVelocity(this.entityUid, 0, speed, 0);
		const client = this.getClient();
		if(client != null) {
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
	 * Method to get client if {@link riderUid} is not null
	 */

	public getClient(): NetworkClient {
		if(this.riderUid == null) {
			return null;
		}
		return Network.getClientForPlayer(this.riderUid);
	}

	/**
	 * Method to cancel launch
	 * @param client {@link NetworkClient}
	 * @param message your message
	 * @param color {@link Native.Color color}
	 */

	public cancel(message?: string, color?: Native.Color): void {
		this.launch = false;
		this.timer = this.rocketType.getTimerMax();
		const client = this.getClient();
		RocketTimer.sendFor(client, -1);

		if(message != null && client != null) {
			client.sendMessage((color || "") + Translation.translate(message));
		}
		Callback.invokeCallback("Galacticraft:RocketFlightCancelled", this);
	}

	/**
	 * Method to check if rocket has valid riderUid
	 * @returns boolean
	 */

	public isValidRider(): boolean {
		return Entity.getRider(this.entityUid) == this.riderUid;
	}

	/**
	 * Method to learn when player is sitting inside
	 */

	public isTaken(): boolean {
		return this.taken;
	}

	/**
	 * Method to do launch countdown
	 */

	public countdown(): ELaunchPhase {
		if(this.timer < -1) {
			return this.launchPhase = ELaunchPhase.FLY;
		}
		const client = this.getClient();
		RocketTimer.sendFor(client, this.timer--);
		return this.launchPhase;
	}

	public packRocketPadding(): void {
		const padding = RocketManager.getRocketByEntity(this.entityUid).getRocketPadding();
		const slotName = this.findEmptySlot();
		const count = RocketPadding.breakAll(padding.getRadius(), this.paddingCoords, this.blockSource, slotName == null ? this.riderUid : null);
		
		if(slotName != null) {
			this.container.setSlot(slotName, padding.id, count, 0);
			this.container.validateAll();
			this.container.sendChanges();
		}
	}

	/**
	 * Tick works only when player inside rocket or rocket already flying or flight was done
	 * @returns will updatable be removed or not
	 */

	public tick(): boolean {
		const client = this.getClient();
		const position = this.getPosition();
		const isValidRider = this.isValidRider();

		//if(World.getThreadTime() % 30 == 0) Network.sendServerMessage("Ракета: " + this.entityUid + ", топливо: " + this.fuel + ", высота: " + this.rocketType.getFinalHeight() + ", фаза: " + ELaunchPhase[this.launchPhase] + ", настоящая высота: " + position.y + ", условие конца: " + (position.y >= this.rocketType.getFinalHeight()));

		if(isValidRider == true) {
			if(client != null && !this.client.changedPerspective) {
				client.send("packet.galacticraft.set_rocket_view_perspective", { set: this.client.changedPerspective = true });
			}
			this.updateHeightIndicator();
		}
		if(isValidRider == false) {
			if(client != null) {
				client.send("packet.galacticraft.set_rocket_view_perspective", { set: this.client.changedPerspective = false });
			}
			RocketTimer.sendFor(client, -1);
			this.updateHeightIndicator(-1);
			this.riderUid = null;
			this.taken = false;
			if(this.launchPhase == ELaunchPhase.PRE_LAUNCH) {
				this.cancel("message.galacticraft.rocket_empty");
			}
		}
		if(this.launch == false) {
			return;
		}
		if(World.getThreadTime() % 20 == 0) {
			if(this.launchPhase == ELaunchPhase.PRE_LAUNCH) {
				this.preLaunch();
				return;
			}
		}
		if(World.getThreadTime() % 10 == 0) {
			if(this.launchPhase == ELaunchPhase.FLY) {
				// if(position.y >= finalHeight / 2 && body == false) {
				// 	body = true;
				// }
				if(position.y >= this.rocketType.getFinalHeight()) {
					this.onFinalHeight();
					return true;
				}
				this.setVelocity();
			}
		}
		return;
	}

	/**
	 * 
	 * @returns rocket is exists in data or not
	 */
	public isValid(): boolean {
		return RocketManager.isRocketType(this.entityUid);
	}

	/**
	 * Method to update height indicator, works only on client side
	 */

	public updateHeightIndicator(value: number = this.getPosition().y): void {
		const client = this.getClient();
		if(client != null) {
			return client.send("packet.galacticraft.send_height_indicator", {
				height: value == -1 ? -1 : value / (this.rocketType.getFinalHeight() - this.startHeight)
			});
		}
	}

	/**
	 * Inits updatable when rocket is not launched
	 */

	public loadIfNeed(): void {
		this.updateHeightIndicator();
		if(this.launch == true) {
			return;
		}
		if(this.updatableInited == true) {
			const client = this.getClient();
			if(client != null) {
				client.sendMessage(Translation.translate("message.galacticraft.rocket_launch_need_time"));
			}
			return;
		}
		const self = this;
		this.updatableInited = true;
		Updatable.addUpdatable({
			remove: false,
			update() { 
				if(!self.isValid()) {
					self.updatableInited = !(this.remove = true);
					return;
				}
				const value = self.tick();
				if(typeof value == "boolean") {
					self.updatableInited = !(this.remove = value);
				}
				return;
			}
		});
	}

	/**
	 * Method to set velocity and pack padding when rocket is launched, works only when current phase is {@link ELaunchPhase.PRE_LAUNCH}
	 */

	public preLaunch(): void {
		if(this.countdown() == ELaunchPhase.FLY) {
			this.setVelocity();
			this.fuel -= this.rocketType.getMinFuelAmount();
			this.packRocketPadding();

			Callback.invokeCallback("Galacticraft:RocketFlightStarted", this);
		}
	}

	/**
	 * Works when rocket reach final height, default stops rocket and opens galaxy map 
	 */

	public onFinalHeight(): void {
		this.stop();
		const position = this.getPosition();

		if(!this.isValidRider()) {
			this.blockSource.explode(position.x, position.y, position.z, 0, false);
			this.destroy();
		}
		Callback.invokeCallback("Galacticraft:RocketFlightCompleted", this);
	}

	/**
	 * Method to launch rocket with launchPhases
	 * @param player player unique identifier
	 */

	public sit(playerUid: number): boolean {
		if(this.taken) {
			return false;
		}
		this.timer = this.rocketType.getTimerMax();
		this.riderUid = playerUid;
		this.taken = true;
		this.client.changedPerspective = false;
		this.client.sendedMessage = false;
		Callback.invokeCallback("Galacticraft:RocketSit", this);
		const client = this.getClient();

		if(client != null) {
			client.sendMessage(Translation.translate("message.galacticraft.rider_notification"));
			client.send("packet.galacticraft.set_rocket_view_perspective", [true]);
		}
		this.loadIfNeed();
		return true;
	}

	/**
	 * Method which changing launch state if current phase is {@link ELaunchPhase.PRE_LAUNCH}
	 */

	public changeLaunch(launch: boolean): void {
		if(this.launchPhase != ELaunchPhase.PRE_LAUNCH) {
			this.launch = true;
			return;
		}
		if(this.fuel < this.rocketType.getMinFuelAmount()) {
			const client = this.getClient();
			if(client != null &&!this.client.sendedMessage) {
				client.sendMessage(Translation.translate("message.galacticraft.not_enough_rocket_fuel"));
				this.client.sendedMessage = true;
			}
			return;
		}
		if(launch == false) {
			return this.cancel();
		}
		this.launch = launch;
		this.loadIfNeed();
	}

	/**
	 * Method to stop rocket and open galaxy map with specified rocket params
	 */

	public stop(): void {
		this.setVelocity(0);
		Entity.setMobile(this.entityUid, false);
		this.fuel = Math.max(0, this.fuel - this.rocketType.getMinFuelAmount());
		this.launchPhase = ELaunchPhase.LANDING;
		//GalaxyMap.openFor(rocket, player);
	}

	/**
	 * Method to destroy rocket data and drop container
	 * @returns RocketEntity if needn't drop container
	 */

	public destroy<T extends boolean = true>(dropContainer: T = true as T): T extends false ? this : unknown {
		const position = this.getPosition();
		const item = new ItemStack(this.rocketType.itemId);
		Entity.remove(this.entityUid);
		RocketManager.deleteRocketEntity(this.entityUid);

		if(dropContainer) {
			const extra = new ItemExtraData();
			extra.putInt("fuelAmount", this.fuel);
			extra.putInt("slotCount", this.slotCount || 0);

			this.blockSource.spawnDroppedItem(position.x + 0.5, position.y + 0.5, position.z + 0.5, item.id, item.count || 1, item.data || 0, extra);
			this.container.dropAt(this.blockSource, position.x, position.y, position.z);
		} else {
			return this;
		}
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

	/**
	 * Method to get rocket entity uid
	 */

	public getEntityUid(): number {
		return this.entityUid;
	}

	/**
	 * Method to get slot count
	 */

	public getSlotCount(): number {
		return this.slotCount;
	}

	/**
	 * Method to get current launch state
	 */

	public getLaunchState(): boolean {
		return this.launch;
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

			for(let i = 0; i < slotCount; i++) {
				content.elements[String(i + 1)] = {
					type: "slot",
					size: slotSize,
					x: 50 + (slotSize * (i % maxStringGrid)),
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
	public static registerScreenFactoryOnClientSide({ container, entityUid, slotCount }: RocketEntity, client?: NetworkClient): void {
		const data = {
			entityUid,
			slotCount,
		};
		container.setClientContainerTypeName("galacticraft.rocket:" + entityUid);
		
		if(!client) {
			Network.sendToAllClients("packet.galacticraft.register_rocket_screen_factory", data);
			return;
		}
		client.send("packet.galacticraft.register_rocket_screen_factory", data);
	}

	@SubscribeEvent
	public static onServerPlayerLoaded(playerUid: number) {
		const client = Network.getClientForPlayer(playerUid);

		RocketManager.forEachRocketEntity((rocketEntity: RocketEntity) => {
			RocketEntity.registerScreenFactoryOnClientSide(rocketEntity, client);
		});
	}
}

const RocketHeightIndicatorUI = (() => {
	const window = new UI.Window({
		location: {
			x: 0,
			y: UI.getScreenHeight() / 2 - 321 / 2,
			width: 30,
			height: 321
		},
		elements: {
			"indicator": {
				type: "image",
				x: 0,
				y: 0,
				bitmap: "rocket.overworld_height_indicator",
				width: 20 * 45 + 70,
				height: 242 * 45 - 70,
				clicker: {
					onLongClick() {
						Network.sendToServer("packet.galacticraft.open_rocket_container_for", {});
					}
				}
			},
			"player": {
				type: "image",
				x: 85,
				y: 9000,
				scale: 80,
				bitmap: "rocket.player_skin",
				clicker: {
					onClick() {
						Network.sendToServer("packet.galacticraft.launch_rocket", {});
					}
				}
			}
		}
	});
	window.setAsGameOverlay(true);
	window.setTouchable(true);

	return window;
})();

Network.addServerPacket("packet.galacticraft.open_rocket_container_for", (client: NetworkClient) => {
	const playerUid = client.getPlayerUid();
	const rocketEntity = RocketManager.getRocketEntityByRiderUid(playerUid);
	if(rocketEntity != null) {
		rocketEntity.openContainer(playerUid);
	}
});

Network.addServerPacket("packet.galacticraft.launch_rocket", (client: NetworkClient) => {
	const rocketEntity = RocketManager.getRocketEntityByRiderUid(client.getPlayerUid());
	if(rocketEntity != null) {
		rocketEntity.changeLaunch(!rocketEntity.getLaunchState());
	}
});

Network.addClientPacket("packet.galacticraft.send_height_indicator", (data: { height: number }) => {
	if(data.height == -1) {
		RocketHeightIndicatorUI.close();
		return;
	}
	if(!RocketHeightIndicatorUI.isOpened()) {
		if(RuntimeData.local.screenName == EScreenName.IN_GAME_PLAY_SCREEN) {
			RocketHeightIndicatorUI.open();
		}
	}
	if(RocketHeightIndicatorUI.isOpened()) {
		//Game.message("x: " + String(RocketHeightIndicatorUI.content.elements["player"].x) + ", y: " + String(9700 - (data.height * 100) * 80));
		//RocketHeightIndicatorUI.getElements().get("player").setPosition(RocketHeightIndicatorUI.content.elements["player"].x, 9700 - (data.height * 100) * 80);
		RocketHeightIndicatorUI.getElements().get("player").setPosition(RocketHeightIndicatorUI.content.elements["player"].x, 10100 - (data.height * 100) * 80);
		return;
	}
});

Network.addClientPacket("packet.galacticraft.register_rocket_screen_factory", (data: { entityUid: number, slotCount: number }) => {
	const window = RocketEntity.buildContainerUI(data.slotCount);

	ItemContainer.registerScreenFactory("galacticraft.rocket:" + data.entityUid, (container, screenName) => {
		return window;
	});
});

Network.addClientPacket("packet.galacticraft.rocket_velocity_set", (data: { entityUid: number; speed: number }) => {
	if(RocketManager.isRocketType(data.entityUid)) {
        Entity.setVelocity(data.entityUid, 0, data.speed, 0);
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

Translation.addTranslation("message.galacticraft.rider_notification", {
	en: "Rocket control:\n    1. To launch the rocket, click on the player icon on the height indicator.\n    2. To exit the rocket, press space.\n    3. To check fuel, hold the background of the height indicator.",
	ru: "Управление ракетой:\n    1. Для взлёта ракеты нажмите на иконку игрока на индикаторе высоты.\n    2. Для выхода из ракеты нажмите пробел.\n    3. Чтобы узнать топливо, удерживайте фон индикатора высоты."
});

Translation.addTranslation("message.galacticraft.rocket_launch_need_time", {
	en: "Please, wait a few seconds before the next launch.",
	ru: "Пожалуйста, подождите несколько секунд перед следующим запуском."
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

	export function addCallback(name: "Galacticraft:RocketFlightCompleted", func: (rocketEntity: RocketEntity) => void);

	export function addCallback(name: "Galacticraft:RocketFlightCancelled", func: (rocketEntity: RocketEntity) => void);
}