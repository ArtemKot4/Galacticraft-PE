/**
 * Class, describes behavior of a rocket. Extend to change default behavior
 */
class RocketEntity {
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

	public container: ItemContainer;

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

	public slotCount: number;

	public constructor(public rocket: Rocket, entity: number, fuel: number, slotCount: number) {
		this.entity = entity;
		this.slotCount = slotCount;
		this.launched = false;
		this.launchPhase = ELaunchPhase.PRE_LAUNCH;
		this.timer = this.rocket.getTimerMax();
		this.container = new ItemContainer();
		this.blockSource = BlockSource.getDefaultForDimension(this.getDimension());
		this.container.setGlobalSlotSavingEnabled(true);
		this.container.setClientContainerTypeName("galacticraft.rocket:" + entity);

		this.fuel = fuel || 0;
		this.startHeight = this.getPosition().y;

		Network.sendToAllClients("packet.galacticraft.register_rocket_screen_factory", {
			entity,
			fuelCapacity: this.rocket.getFuelCapacity(),
			slotCount: slotCount,
		});
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
		throw new java.lang.UnsupportedOperationException();
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

	public findEmptySlot(): string {
		for(let i = 1; i <= this.slotCount; i++) {
			if(this.container.getSlot(String(i)).isEmpty()) {
				return String(i);
			}
		}
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
			RocketTimer.sendFor(client, -1);
			return this.cancel(client, "message.galacticraft.rocket_empty", EColor.RED);
		}

		RocketTimer.sendFor(client, this.timer);
		this.timer--;
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

			let body = false;
			let packedPadding = false;

			const height = this.rocket.getFinalHeight();
			const self = this;

			Updatable.addUpdatable({
				update() {
					if(World.getThreadTime() % 20 == 0) {
						if(self.launched == false || self.launchPhase == ELaunchPhase.LANDING) {
							return (this.remove = true);
						}

						if(self.launchPhase == ELaunchPhase.PRE_LAUNCH) {
							self.countdown(client);
							return;
						}

						if(self.launchPhase == ELaunchPhase.FLY) {
							const pos = self.getPosition();

							if(pos.y >= height / 2 && body == false) {
								body = true;
							}

							if(pos.y >= self.startHeight + 5 && !packedPadding) {
								//const paddingCoords = self.findRocketPadding();
								//if (paddingCoords != null) {
									//RocketManager.packRocketPadding(paddingCoords);
									packedPadding = true;
								//}
							}

							if(pos.y >= height) {
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
		extra.putInt("amount", this.fuel);
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
					standard: true,
				},
				background: {
					standard: true,
				},
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

Network.addClientPacket("packet.galacticraft.register_rocket_screen_factory", (data: {entity: number; fuelCapacity: number; slotCount: number}) => {
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
