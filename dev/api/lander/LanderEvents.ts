class LanderEvents {
	@SubscribeEvent
	public static onEntityHurt(attackerUid: number, entityUid: number, damageValue: number, damageType: Entity.DamageSource, armorReducesDamage: boolean): void {
		if(!Entity.isExist(entityUid)) {
			return;
		}
		const typeName = Entity.getTypeName(entityUid);
		const suffixIndex = typeName.indexOf("<");
		const normalizedTypeName = suffixIndex >= 0 ? typeName.substring(0, suffixIndex) : typeName;
		if(normalizedTypeName != "galacticraft:lander_1") {
			return;
		}
		Game.prevent();
		if(Entity.isExist(entityUid)) {
			Entity.remove(entityUid);
		}
	}
}
