class RocketEvents {
	// @SubscribeEvent
	// public static onEntityAdded(entity: number) {
	// 	if(RocketManager.isRocket(entity) && !RocketManager.hasRocketEntity(entity)) {
	// 		RocketManager.addRocketEntity(RocketManager.getRocketByEntity(entity), entity, 0, 0);
	// 	}
	// }

	@SubscribeEvent
	public static onEntityInteract(entity: number, player: number, coords: Vector): void {
		if(RocketManager.isRocket(entity)) {
			let rocket = RocketManager.getRocketEntity(entity);

			if(rocket == null) {
				rocket = RocketManager.addRocketEntity(RocketManager.getRocketByEntity(entity), entity, 0, 0);
			}

			if(Entity.getSneaking(player) == true) {
				Game.prevent();
				if(!rocket.addFuelBy(player)) {
					rocket.openContainer(player);
				}
				Network.getClientForPlayer(player).sendMessage("container hash: " + java.lang.System.identityHashCode(rocket.container) + ", container type name: " + rocket.container.getClientContainerTypeName() + ", id: " + rocket.entity);
			} else {
				rocket.rider = player;
				rocket.launch(player);
				Network.getClientForPlayer(player).send("packet.galacticraft.set_view_perspective", { perspective: 2 });
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