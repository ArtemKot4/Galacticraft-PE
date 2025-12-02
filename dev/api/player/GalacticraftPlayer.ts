enum ECallback {
    GC_ON_FREQUENCY_CHANGED = "gc_onFrequencyChanged"
}

namespace Galacticraft {
    export class PlayerObject {
        public static list: Record<number, PlayerObject> = {};
        public frequencyContainer: ItemContainer;

        private constructor(public playerUid: number) {
            this.frequencyContainer = new ItemContainer();
            this.frequencyContainer.setGlobalSlotSavingEnabled(true);
        }

        public static create(playerUid: number): boolean {
            if(playerUid in this.list) {
                return false;
            }
            this.list[playerUid] = new PlayerObject(playerUid);
            return true;
        }
    }

    Network.addClientPacket("packet.galacticraft.register_frequency_screen_factory", () => {
        ItemContainer.registerScreenFactory("galacticraft.frequency.player:" + Player.getLocal(), (container, screenName) => {
            if(screenName == "frequency_container") {
                return //...
            }
            if(screenName == "oxygen_bars") {
                return //...
            }
        });
    });

    export class PlayerEvents {
        @SubscribeEvent
        public onServerPlayerLoaded(playerUid: number) {
            
        }
        @SubscribeEvent
        public gc_onFrequencyChanged(playerUid: number, previousItem: ItemInstance, currentItem: ItemInstance) {

        }
    }
}
