@SerializeableStorage({ "scopeName": "galacticraft.player_storage" })
class PlayerManager {
    public static data: Record<number, PlayerGearInventory> = {};

    public static has(playerUid: number): boolean {
        return playerUid in this.data;
    }

    public static set(playerUid: number): void {
        this.data[playerUid] = new PlayerGearInventory(playerUid);
    }

    public static openInventoryFor(playerUid: number): void {
        const client = Network.getClientForPlayer(playerUid);
        if(client != null) {
            const playerData = this.data[playerUid];
            if(playerData != null) {
                playerData.container.openFor(client, "gear_inventory");
            }
        }
    }

    @NetworkServerPacket("packet.galacticraft.send_open_inventory_request")
    public static sendOpenInventoryRequest(client: NetworkClient, data: {}): void {
        PlayerManager.openInventoryFor(client.getPlayerUid());
    }
}