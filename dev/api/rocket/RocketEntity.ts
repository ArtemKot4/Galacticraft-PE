/**
 * Class, describes behavior of a rocket. Extend to change default behavior
 */
class RocketEntity {
	/**
	 * Coords of padding
	 */
	public paddingCoords: Vector;
	/**
	 * Entity ID of the rocket in the world
	 */

	public entity: number;

	/**
	 * Unique identifier of player who launched rocket
	 */

	public rider: number;

	/**
	 * Current launch {@link ELaunchPhase phase}
	 */

	public launchPhase: ELaunchPhase;

	/**
	 * Whether rocket was already launched
	 */

	public launched: boolean;

	/**
	 * Number of current countdown
	 */

	public timer: number;

	/**
	 * Item container of the rocket
	 */

	public readonly container: ItemContainer;

	/**
	 * {@link BlockSource} for the rocket
	 */

	public readonly blockSource: BlockSource;

	/**
	 * Start height of the rocket
	 */

	public readonly startHeight: number;

	/**
	 * Fuel amount
	 */

	public fuel: number;

	/**
	 * Slot count of the rocket
	 */

	public readonly slotCount: number;

	public constructor(public rocket: Rocket, entity: number, fuel: number, slotCount: number, container?: ItemContainer) {
		this.entity = entity;
		const coords = Entity.getPosition(entity);
		this.paddingCoords = new Vector3(Math.floor(coords.x), Math.floor(coords.y), Math.floor(coords.z));
		this.slotCount = slotCount;
		this.launched = false;
		this.launchPhase = ELaunchPhase.PRE_LAUNCH;
		this.timer = this.rocket.getTimerMax();
		this.blockSource = BlockSource.getDefaultForDimension(this.getDimension());
		
		if(container == null) {
			this.container = new ItemContainer();
			this.container.setGlobalSlotSavingEnabled(true);
			this.container.setClientContainerTypeName("galacticraft.rocket:" + entity);
				
			Network.sendToAllClients("packet.galacticraft.register_rocket_screen_factory", {
				entity,
				fuelCapacity: this.rocket.getFuelCapacity(),
				slotCount: slotCount,
			});
		} else {
			this.container = container;
		}
		this.fuel = fuel || 0;
		this.startHeight = this.getPosition().y;

		
	}

	/**
	 * Method to get entity position in the world
	 * @returns {@link Vector}
	 */

	public getPosition(): Vector {
		const pos = Entity.getPosition(this.entity);
		return { x: pos.x + 0.5, y: pos.y, z: pos.z + 0.5 };
	}

	/**
	 * Method to get entity dimension
	 */

	public getDimension(): number {
		return Entity.getDimension(this.entity);
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
		const capacity = this.rocket.getFuelCapacity();

		if(this.fuel < capacity) {
			const result = Math.min(amount, capacity - this.fuel);
			this.fuel = this.fuel + result;

			return result;
		} else {
			return 0;
		}
	}

	/**
	 * Method to add fuel by player
	 * @param player player unique identifier
	 * @returns boolean, whether fuel was added
	 */

	public addFuelBy(player: number): boolean {
		return false;
		//throw new java.lang.UnsupportedOperationException();
	}

	/**
	 * Method to add velocity to the rocket
	 */

	public fly(client: NetworkClient, speed: number): void {
		Entity.setVelocity(this.entity, 0, speed, 0);
		if(client) {
			client.send("packet.galacticraft.rocket_velocity_set", {
				entity: this.entity,
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
	 * @param color {@link EColor color}
	 */

	public cancel(client: NetworkClient, message: string, color?: EColor): void {
		this.launched = false;
		this.timer = this.rocket.getTimerMax();

		if(client != null) {
			client.sendMessage((color || "") + Translation.translate(message));
		}
	}

	/**
	 * Method to check if rocket has valid rider
	 * @returns boolean
	 */

	public isValidRider(): boolean {
		return Entity.getRider(this.entity) == this.rider;
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
			return this.cancel(client, "message.galacticraft.rocket_empty", EColor.RED);
		}

		RocketTimer.sendFor(client, this.timer);
		this.timer--;
	}

	public packRocketPadding(): void {
		const padding = RocketManager.getRocketByEntity(this.entity).getRocketPadding();
		const slotName = this.findEmptySlot();
		const count = RocketPadding.breakAll(padding.getRadius(), this.paddingCoords, this.blockSource, slotName == null ? this.rider : null);
		
		if(slotName != null) {
			this.container.setSlot(slotName, padding.id, count, 0);
			this.container.validateAll();
			this.container.sendChanges();
			alert("площадка упакована в слот номер " + slotName + "")
		}
	}

	public returnRiderBack(player: number) {
		Entity.rideAnimal(this.entity, player);
		this.rider = player;
	}
	/**
	 * Method to launch rocket with launchPhases
	 * @param player player unique identifier
	 */

	public launch(player: number): void {
		const client = Network.getClientForPlayer(player);

		if(this.fuel < this.rocket.getMinFuelAmount()) {
			return client.sendMessage(Translation.translate("message.galacticraft.not_enough_rocket_fuel"));
		}

		if(this.launched == false) {
			this.launched = true;
			// let starBrightness = 0;

			let body = false;

			const finalHeight = this.rocket.getFinalHeight();
			const self = this;
			let lastRider = this.rider;

			Updatable.addUpdatable({
				update() {
					const pos = self.getPosition();

					if(World.getThreadTime() % 20 == 0) {
						const client = Network.getClientForPlayer(Number(lastRider));
						if(self.launchPhase == ELaunchPhase.PRE_LAUNCH) {
							if(self.countdown(client) == ELaunchPhase.FLY) {
								self.fly(client, self.rocket.getFlySpeed());
								self.fuel -= self.rocket.getMinFuelAmount();
								self.packRocketPadding();
							};
							return;
						}
						if(self.isValidRider()) {
							lastRider = self.rider;
							client.send("packet.galacticraft.setViewPerspective", { perspective: 2 });
						} else if(lastRider != null) {
							client.send("packet.galacticraft.setViewPerspective", { perspective: 0 });
							lastRider = null;
						}
					}
					if(World.getThreadTime() % 10 == 0) {
						// if(!self.isValidRider() && self.launchPhase == ELaunchPhase.FLY) {
						// 	self.returnRiderBack(player);
						// }
						// if(pos.y >= finalHeight / 4) {
						// 	starBrightness = Math.min(1, starBrightness += 0.003);
						// 	//.setStarBrightness(starBrightness);
						// }
						if(self.launched == false || self.launchPhase == ELaunchPhase.LANDING) {
							return (this.remove = true);
						}
						if(self.launchPhase == ELaunchPhase.FLY) {
							if(pos.y >= finalHeight / 2 && body == false) {
								body = true;
							}
							if(pos.y >= finalHeight) {
								//dimension.resetStarBrightness();
								client.send("packet.galacticraft.setViewPerspective", { perspective: 0 });
								return self.stop();
							}
							self.fly(client, self.rocket.getFlySpeed());
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
		Entity.setMobile(this.entity, false);
		this.fuel = Math.max(0, this.fuel - this.rocket.getMinFuelAmount());
		this.launchPhase = ELaunchPhase.LANDING;
		//GalaxyMap.openFor(rocket, player);
	}

	/**
	 * Method to destroy rocket data and drop container
	 */

	public destroy(entity?: number): void {
		const pos = Entity.getPosition(entity || this.entity);
		Game.message(JSON.stringify(pos) + " -> debug");

		const item = new ItemStack(this.rocket.id);
		const extra = new ItemExtraData();
		extra.putInt("fuelAmount", this.fuel);
		extra.putInt("slotCount", this.slotCount || 0);

		this.blockSource.spawnDroppedItem(pos.x + 0.5, pos.y + 0.5, pos.z + 0.5, item.id, item.count || 1, item.data || 0, extra);
		this.container.dropAt(this.blockSource, pos.x, pos.y, pos.z);
		Entity.remove(entity || this.entity);

		RocketManager.deleteRocketEntity(entity || this.entity);
	}

	/**
	 * Method to open container
	 * @param player player unique identifier
	 */

	public openContainer(player: number): void {
		const client = Network.getClientForPlayer(player);
		if(client != null) {
			this.container.setScale("fuel_scale", this.fuel / this.rocket.getFuelCapacity());
			this.container.sendChanges();
			this.container.openFor(client, "fuel_storage");
		}
	}

	public static from(rocketEntity: RocketEntity): RocketEntity {
		return new RocketEntity(rocketEntity.rocket, rocketEntity.entity, rocketEntity.fuel, rocketEntity.slotCount, rocketEntity.container);
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
}

Network.addClientPacket("packet.galacticraft.register_rocket_screen_factory", (data: { entity: number; fuelCapacity: number; slotCount: number }) => {
	const window = RocketEntity.buildContainerUI(data.slotCount);

	ItemContainer.registerScreenFactory("galacticraft.rocket:" + data.entity, (container, screenName) => {
		if(screenName == "fuel_storage") {
			return window;
		}
	});
});

Network.addClientPacket("packet.galacticraft.rocket_velocity_set", (data: {entity: number; speed: number}) => {
	if(RocketManager.isRocket(data.entity)) {
        Entity.setVelocity(data.entity, 0, data.speed, 0);
    }
});

Network.addClientPacket("packet.galacticraft.set_view_perspective", (data: { perspective: number }) => {
	Player.resetViewPerspective();
	Player.setViewPerspective(data.perspective);
	//Player.setFov(data.perspective == 2 ? 70 : 120);
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
	ru: "Хранилище ракеты",
});
