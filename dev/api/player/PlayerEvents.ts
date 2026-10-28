class PlayerEvents {
    @SubscribeEvent
    public static onServerPlayerLoaded(playerUid: number) {
        if(!PlayerManager.has(playerUid)) {
            PlayerManager.set(playerUid);
        }
    }

    @SubscribeEvent
    public static onLevelDisplayed(): void {
        ItemContainer.registerScreenFactory("galacticraft.frequency.player", (container, screenName) => {
            if(screenName == "gear_inventory") {
                return GearInventoryUI;
            }
            if(screenName == "oxygen_bars") {
                return //...
            }
            return new UI.Window(); //заглушка
        });
    }

    @SubscribeEvent
    public static onNativeGuiChanged(screenName: string, lastScreenName: string): void {
        if(screenName == EScreenName.IN_GAME_PLAY_SCREEN) {
            GearInventoryOpenButtonUI.open();
        } else {
            GearInventoryOpenButtonUI.close();
        }
    }
}
