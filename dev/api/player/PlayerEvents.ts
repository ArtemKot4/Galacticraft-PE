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

        // RecipeModule.factories.forEach((factory, key) => {
        //     Game.message("\n\n\"" + key + "\": ");
        //     let index = 1;

        //     for(const recipe of factory.getRecipes()) {
        //         Game.message("  " + index++ + ". " + JSON.stringify(recipe));
        //     }
        // });

        Game.message("UI.getScreenHeight(): " + UI.getScreenHeight());
        Game.message("UI.getRelativeScreenHeight(): " + UI.getScreenRelativeHeight());
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
            PlayerEvents.openInventoryButton();
        } else {
            GearInventoryOpenButtonUI.close();
            OxygenTanksUI.close();
        }
    }

    @SubscribeEvent
    public static onCustomWindowOpened(window: UI.IWindow): void {
        if(PlayerEvents.isStandardWindow(window)) {
            GearInventoryOpenButtonUI.close();
        }
    }

    @SubscribeEvent
    public static onCustomWindowClosed(window: UI.IWindow): void {
        if(RuntimeData.local.screenName == EScreenName.IN_GAME_PLAY_SCREEN && PlayerEvents.isStandardWindow(window)) {
            PlayerEvents.openInventoryButton();
        }
    }

    @SubscribeEvent
    public static onServerPlayerTick(playerUid: number): void {
        if(World.getThreadTime() % 20 != 0) {
            return;
        }
        OxygenSystem.calculate(playerUid);
    }

    public static isStandardWindow(window: UI.IWindow): window is UI.StandardWindow | UI.StandartWindow {
        const content = window.getContent();
        return "standard" in content || "standart" in content;
    }

    public static openInventoryButton(): void {
        GearInventoryOpenButtonUI.close();
        const size = GearInventoryOpenButtonUI.getLocation().width;
        GearInventoryOpenButtonUI.content.elements["button"].y = -(size + 4.78);
        GearInventoryOpenButtonUI.open();

        Threading.initThread("galacticraft:gear_inventory_open_button_ui.open_animation", () => {
            while(true) {
                const y = GearInventoryOpenButtonUI.content.elements["button"].y;
                if(!GearInventoryOpenButtonUI.isOpened() && y >= 4.78) {
                    break;
                }
                GearInventoryOpenButtonUI.content.elements["button"].y = Math.min(4.78, y + 0.48);
                GearInventoryOpenButtonUI.forceRefresh();
                java.lang.Thread.sleep(2);
            }
        });
    }
}
// ? debug
Callback.addCallback("ItemUse", (c, i, b, isE, p) => {
    if(i.id == VanillaItemID.bone) {
        Dimensions.transfer(p, Entity.getDimension(p) == EDimension.OVERWORLD ? Galacticraft.getCurrentGalaxy().getPlanet(EDimension.OVERWORLD).satellites[0] : EDimension.OVERWORLD);
    }
});