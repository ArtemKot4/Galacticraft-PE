class PlayerEvents {
    @SubscribeEvent
    public static onServerPlayerLoaded(playerUid: number): void {
        if(!PlayerManager.hasInventory(playerUid)) {
            PlayerManager.setNewInventory(playerUid);
        }
    }

    @SubscribeEvent
    public static onServerLevelLoaded(): void {
        for(const playerUid in PlayerManager.data) {
            const data = PlayerManager.data[playerUid] = new PlayerGearInventory(Number(playerUid), PlayerManager.data[playerUid].container);
            data.container.setClientContainerTypeName("galacticraft.frequency.player");
            data.setPolicies();
            data.makeCacheGearNeeded(null, null);
        } 
    }

    @SubscribeEvent
    public static onLevelDisplayed(): void {
        ItemContainer.registerScreenFactory("galacticraft.frequency.player", (container, screenName) => {
            if(screenName == "gear_inventory") {
                return GearInventoryUI;
            }
        });
    }

    @SubscribeEvent
    public static onEntityDeath(entityUid: number, attackerUid: number, damageType: Entity.DamageSource): void {
        if(Entity.getType(entityUid) == EEntityType.PLAYER) {
            const inventory = PlayerManager.getInventory(entityUid);
            if(inventory != null) {
                const position = Entity.getPosition(entityUid);
                inventory.container.dropAt(BlockSource.getDefaultForDimension(Entity.getDimension(entityUid)), position.x, position.y, position.z);
            }
        }
    }

    @SubscribeEvent
    public static onItemUseServer(coords: Callback.ItemUseCoordinates, item: ItemInstance, block: Tile | BlockState, playerUid: number): void {
        const inventory = PlayerManager.getInventory(playerUid);
        if(inventory != null) {
            inventory.equipFromHand(playerUid);
        }
    }

    @SubscribeEvent
    public static onNativeGuiChanged(screenName: string, lastScreenName: string): void {
        if(screenName == EScreenName.IN_GAME_PLAY_SCREEN) {
            GearInventoryOpenButtonUI.open();
        } else {
            GearInventoryOpenButtonUI.close();
            OxygenTanksUI.close();
        }
    }

    @SubscribeEvent
    public static onServerPlayerTick(playerUid: number): void {
        if(World.getThreadTime() % 20 != 0) {
            return;
        }
        OxygenSystem.calculate(playerUid);
    }
}
// ? debug
Callback.addCallback("ItemUse", (c, i, b, isE, p) => {
    if(i.id == VanillaItemID.bone) {
        Dimensions.transfer(p, Entity.getDimension(p) == EDimension.OVERWORLD ? Galacticraft.getCurrentGalaxy().getPlanet(EDimension.OVERWORLD).satellites[0] : EDimension.OVERWORLD);
    }
});