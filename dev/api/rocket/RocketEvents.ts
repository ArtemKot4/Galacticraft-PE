class RocketEvents {
	// @SubscribeEvent
	// public static onEntityAdded(entity: number) {
	// 	if(RocketManager.isRocket(entity) && !RocketManager.hasRocketEntity(entity)) {
	// 		RocketManager.addRocketEntity(RocketManager.getRocketByEntity(entity), entity, 0, 0);
	// 	}
	// }

	@SubscribeEvent
	public static onEntityInteract(entity: number, player: number, coords: Vector): void {
		if(RocketManager.isRocketType(entity)) {
			let rocketEntity = RocketManager.getRocketEntity(entity);

			if(rocketEntity == null) {
				rocketEntity = RocketManager.addRocketEntity(RocketManager.getRocketByEntity(entity), entity, 0, 0);
			}
			if(Entity.getSneaking(player) == true) {
				Game.prevent();
				//RocketEntity.registerScreenFactoryOnClientSide(rocketEntity, Network.getClientForPlayer(player));
				rocketEntity.openContainer(player);
			} else {
				rocketEntity.rider = player;
				rocketEntity.sit(player);
				Network.getClientForPlayer(player).send("packet.galacticraft.set_rocket_view_perspective", [true]);
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