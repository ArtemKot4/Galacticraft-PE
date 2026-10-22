class RocketNetworkPackets {
	@NetworkServerPacket("packet.galacticraft.open_rocket_container_for")
	public static openRocketContainerFor(client: NetworkClient, data: {}): void {
		const playerUid = client.getPlayerUid();
		const rocketEntity = RocketManager.findRocketEntityByRiderUid(playerUid);
		if(rocketEntity != null) {
			rocketEntity.openContainer(playerUid);
		}
	}

	@NetworkServerPacket("packet.galacticraft.launch_rocket")
	public static launchRocket(client: NetworkClient, data: {}): void {
		const rocketEntity = RocketManager.findRocketEntityByRiderUid(client.getPlayerUid());
		if(rocketEntity == null) {
			return;
		}
		const launchRequested = !rocketEntity.getLaunchState();

		if(launchRequested && !rocketEntity.isValidRider()) {
			return;
		}
		rocketEntity.changeLaunch(launchRequested);
	}

	@NetworkClientPacket("packet.galacticraft.send_height_indicator")
	public static sendHeightIndicator(data: { height: number }): void {
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
			RocketHeightIndicatorUI.getElements().get("player").setPosition(RocketHeightIndicatorUI.content.elements["player"].x, 10100 - (data.height * 100) * 80);
		}
	}

	@NetworkClientPacket("packet.galacticraft.set_celestial_renderer")
	public static setCelestialRenderer(data: { entityUid: number, textureName: string, textureResolution: number, shouldRender: boolean, size?: number, heightOffset?: number }): void {
		data.size ??= 100;
		data.heightOffset ??= -100;
		const cache = RocketEntity.celestialRenderingCache[data.entityUid] ??= {} as ICelestialRenderingCache;
		const render = cache.render = new ActorRenderer()
			.addPart("body")
			.endPart()
			.addPart("celestial_body", "body", (() => {
				const mesh = new RenderMesh();
				mesh.setNormal(0, 1, 0);
				mesh.addVertex(-data.size, data.heightOffset, -data.size, 0, 0);
				mesh.addVertex(data.size, data.heightOffset, -data.size, 1, 0);
				mesh.addVertex(-data.size, data.heightOffset, data.size, 0, 1);
				mesh.addVertex(data.size, data.heightOffset, -data.size, 1, 0);
				mesh.addVertex(-data.size, data.heightOffset, data.size, 0, 1);
				mesh.addVertex(data.size, data.heightOffset, data.size, 1, 1);
				return mesh;
			})())
			.setTextureSize(data.textureResolution, data.textureResolution)
			.setTexture(data.textureName)
			.endPart();
		cache.attachable = new AttachableRender(data.entityUid).setRenderer(render); 
		if(data.shouldRender == false) {
			render.getPart("celestial_body").clear();
		}
	}

	@NetworkClientPacket("packet.galacticraft.register_rocket_screen_factory")
	public static registerRocketScreenFactory(data: { entityUid: number, slotCount: number }): void {
		const window = RocketEntity.buildContainerUI(data.slotCount);

		ItemContainer.registerScreenFactory("galacticraft.rocket:" + data.entityUid, (container, screenName) => {
			return window;
		});
	}

	@NetworkClientPacket("packet.galacticraft.set_rocket_velocity")
	public static setRocketVelocity(data: { entityUid: number; speed: number }): void {
		if(RocketManager.isRocketType(data.entityUid)) {
        	Entity.setVelocity(data.entityUid, 0, data.speed, 0);
    	}
	}

	@NetworkClientPacket("packet.galacticraft.set_rocket_view_perspective")
	public static setRocketViewPerspective(data: { set: boolean }): void {
		if(data.set == true) {
			Player.setViewPerspective(2);
			return;
		}
		Player.setViewPerspective(0);
		Player.resetViewPerspective();
	}
}