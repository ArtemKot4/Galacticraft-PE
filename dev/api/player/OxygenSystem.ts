class OxygenSystem {
    // room vector cache это переменная, которая будет хранить векторы комнат (первая, вторая точка) у ближайших механизмов-заполнителей
    public static roomVectorCache: Record<number, [from: Vector3, to: Vector3][]> = {};

    public static isOxygenOK(playerUid: number, inventory: PlayerGearInventory, celestialBody: CelestialBody, oxygen: [number, number]): boolean {
        if(playerUid in this.roomVectorCache && this.roomVectorCache[playerUid].length > 0) {
            return this.roomVectorCache[playerUid].some(([from, to]) => Vector3.inRange(Entity.getPosition(playerUid), from, to));
        }
        if(celestialBody.hasOxygen()) {
            return true;
        }
        if(!inventory.hasGearNeeded()) {
            return false;
        }
        return (oxygen[0] + oxygen[1]) > 0;
    }

    public static updateScaleFor(client: NetworkClient, close: boolean, oxygen?: [number, number]): void {
        client.send("packet.galacticraft.update_gear_inventory_scale_for_client", { oxygen: oxygen, close: close })
        return;
    }

    public static calculate(playerUid: number): void {
        const celestialBody = Galacticraft.getCelestialBodyByID(Entity.getDimension(playerUid));
        if(celestialBody == null) {
            return;
        }
        const inventory = PlayerManager.getInventory(playerUid);
        const oxygen = inventory.getOxygenAmountSeparated();
        const client = Network.getClientForPlayer(playerUid);

        if(client != null) {
            const close = !inventory.hasGearNeeded();
            if(close == true && inventory.sendedClosePacket == false) {
                inventory.sendedClosePacket = true;
                this.updateScaleFor(client, true);
            }
            if(inventory.sendedClosePacket == true && close == false) {
                inventory.sendedClosePacket = false;
            }
            if(inventory.sendedClosePacket == false && close == false) {
                this.updateScaleFor(client, false, oxygen);
            }
        }

        if(!OxygenSystem.isOxygenOK(playerUid, inventory, celestialBody, oxygen)) {
            Entity.damageEntity(playerUid, 1);
            return;
        } else {
            if(!PlayerWrapper.isCreative(playerUid)) {
                inventory.decreaseOxygen(1);
            }
        }
    }
}