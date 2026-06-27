class RocketEvents {
	@SubscribeEvent
	public static onEntityInteract(entity: number, playerUid: number, coords: Vector): void {
		if(RocketManager.isRocketType(entity)) {
			let rocketEntity = RocketManager.getRocketEntity(entity);

			if(rocketEntity == null) {
				rocketEntity = RocketManager.addRocketEntity(RocketManager.getRocketByEntity(entity), entity, 0, 0);
			}
			if(Entity.getSneaking(playerUid) == true) {
				Game.prevent();
				rocketEntity.openContainer(playerUid);
			} else {
				Entity.rideAnimal(entity, playerUid);
				rocketEntity.rider = playerUid;
				rocketEntity.sit(playerUid);
				Network.getClientForPlayer(playerUid).send("packet.galacticraft.set_rocket_view_perspective", [true]);
			}
		}
	}

	@SubscribeEvent
	public static onEntityHurt(attackerUid: number, entityUid: number, damageValue: number, damageType: Entity.DamageSource, armorReducesDamage: boolean) {
		const rocket = RocketManager.getRocketEntity(entityUid);
		if(rocket != null) {
			Game.prevent();
			rocket.destroy(entityUid);
		}
	}
}

const ui: UI.Window = (() => {
	const window = new UI.Window({
		drawing: [{
			"type": "background",
			"color": android.graphics.Color.TRANSPARENT
		}],
		elements: {}
	});
	const height = UI.getScreenHeight() / 2 - 300;
	const slotSize = 70;
	const startPoint = 1000 / 2 - (slotSize * 9);
	window.setAsGameOverlay(true);

	for(let i = 0; i < 9; i++) {
		window.content.elements[i] = {
			type: "slot",
			x: startPoint + (slotSize * i),
			y: height,
			size: slotSize
		}
	}
	return window;
})();

let isOpened = false;
Item.registerUseFunctionForID(VanillaItemID.saddle, () => {
	if(!isOpened) {
		ui.open();
		isOpened = true;
	} else {
		ui.close();
		isOpened = false;
	}
});