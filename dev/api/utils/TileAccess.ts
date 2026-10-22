namespace TileAccess {
    export const MAX_OPEN_DISTANCE = 10;

    export function getPlayerPosition(player: any): any {
        if(player == null) {
            return null;
        }
        try {
            if(typeof player == "number") {
                const entityApi: any = Entity;
                return entityApi.getPosition(player);
            }
            if(typeof player.getPosition == "function") {
                return player.getPosition();
            }
            if(typeof player.getUid == "function") {
                const entityApi: any = Entity;
                return entityApi.getPosition(player.getUid());
            }
        } catch(error) {
            return null;
        }
        return null;
    }

    export function isPlayerInRange(player: any, coords: any, maxDistance: number = MAX_OPEN_DISTANCE): boolean {
        if(player == null || coords == null) {
            return true;
        }
        const position = getPlayerPosition(player);
        if(position == null) {
            Logger.Log("TileAccess: player position cannot be resolved, access denied (fail-closed)", "DEBUG");
            return false;
        }
        const dx = coords.x - position.x;
        const dy = coords.y - position.y;
        const dz = coords.z - position.z;
        return dx * dx + dy * dy + dz * dz <= maxDistance * maxDistance;
    }
}
