class RocketEvents {
	@SubscribeEvent
	public static onEntityInteract(entity: number, playerUid: number, coords: Vector): void {
		if(RocketManager.isRocketType(entity)) {
			let rocketEntity = RocketManager.getRocketEntity(entity);

			if(rocketEntity == null) {
				rocketEntity = RocketManager.addRocketEntity(RocketManager.getRocketTypeByEntity(entity), entity, 0, 0);
			}
			if(Entity.getSneaking(playerUid) == true) {
				rocketEntity.openContainer(playerUid);
			} else {
				if(rocketEntity.isTaken()) {
					Game.prevent();
					return;
				}
				rocketEntity.sit(playerUid);	
			}
		}
	}

	@SubscribeEvent
	public static onEntityHurt(attackerUid: number, entityUid: number, damageValue: number, damageType: Entity.DamageSource, armorReducesDamage: boolean) {
		const rocket = RocketManager.getRocketEntity(entityUid);
		if(rocket != null) {
			Game.prevent();
			rocket.destroy();
		}
	}

	@SubscribeEvent
    public static onNativeGuiChanged(screenName: string): void {
        if(screenName == EScreenName.IN_GAME_PLAY_SCREEN) {
            if(RocketTimer.value != -1 && !RocketTimer.UI.isOpened()) {
                RocketTimer.UI.open();
            }
        } else {
            RocketTimer.UI.close();
			RocketHeightIndicatorUI.close();
        }
    }

	@SubscribeEvent
	public static onLevelLeft() {
		RocketManager.rocketEntities = {};
	}

	@SubscribeEvent
	public static onServerLevelLoaded() {
		for(const id in RocketManager.rocketEntities) {
			const entity = RocketManager.rocketEntities[id] = RocketEntity.from(RocketManager.rocketEntities[id]);
			entity.loadIfNeed();
			Network.sendServerMessage("Rocket " + entity.getEntityUid() + " is valid" + entity.isValid());
		}
	}
}