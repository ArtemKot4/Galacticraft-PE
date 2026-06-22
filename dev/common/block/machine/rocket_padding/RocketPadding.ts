class RocketPadding extends MachineBlock implements IClickCallback, IDestroyCallback, IPlaceCallback {
    public constructor() {
        super("rocket_padding_gc", (() => {
            const variations = [];

            for(let i = 0; i <= 9; i++) {
                variations.push({
                    inCreative: true,
                    name: "block.galacticraft.rocket_padding",
                    texture: [["rocket_padding", 0]]
                });
            }
            return variations;
        })());

        ICRender.getGroup(this.stringID).add(this.id, -1);

        for(let i = 0; i <= 9; i++) {
            let height = 3 / 16;

            if(i == 5) {
                height = 5 / 16;
            }
            Block.setShape(this.id, 0, 0, 0, 1, height, 1, i);
        }
    }   

    public override canRotate(): boolean {
        return true;
    }
    /**
     * Radius is indentation of middle by x and z
     */
    public getRadius(): number {
        return 1;
    }

    public getRocketTiers(): number[] {
        return [1, 2, 3];
    }

    public onClick(coords: Callback.ItemUseCoordinates, item: ItemStack, block: Tile, playerUid: number): void {
        const region = BlockSource.getDefaultForActor(playerUid);
      
        if(!RocketPadding.isCenter(this.getRadius(), coords, block.id, region)) {
            return;
        }
        alert("запуск")
        const rocket = RocketManager.getRocketByItemID(item.id);
        const playerSneaking = Entity.getSneaking(playerUid);
        const blockState = region.getExtraBlock(coords.x, coords.y, coords.z);
        const entityID = blockState.getNamedStates().get("rocket_entity");
        //alert("блокстейт: " + entityID);
        if(playerSneaking == true) {
            if(entityID == 0) {
                alert("нет такой ракеты")
                return;
            }
            const rocketEntity = RocketManager.getRocketEntity(entityID);
            if(rocketEntity != null) {
                const playerActor = new PlayerActor(playerUid);
                playerActor.addItemToInventory(rocket.id, 1, 0, 
                    new ItemExtraData()
                    .putInt("rocket.fuel", rocketEntity.fuel)
                    .putInt("rocket.slot_count", rocketEntity.slotCount), 
                    true
                );
                
                for(const i in rocketEntity.container.slots) {
                    const slot = rocketEntity.container.slots[i];
                    playerActor.addItemToInventory(slot.id, slot.count, slot.data, slot.extra, true);
                }
                RocketManager.deleteRocketEntity(entityID);
                
                alert("ракета удалена")
            }
        } else {
            if(!rocket) {
                return;
            }
            if(entityID == 0) {
                alert("ракета добавлена")
                RocketManager.addRocketEntity(rocket, region.spawnEntity(coords.x + 0.5, coords.y + 1, coords.z + 0.5, rocket.getEntityType()), 0, item.extra != null ? item.extra.getInt("rocket.slot_amount", 0) : 0);
            }
        }
    }

    public onDestroy(coords: Callback.ItemUseCoordinates, block: Tile, playerUid: number): void {
        const region = BlockSource.getDefaultForActor(playerUid);
        
        RocketPadding.forEach(this.getRadius(), coords, (x, z) => {
            const currentCoords = new Vector3(x, coords.y, z);

            if(RocketPadding.isCenter(this.getRadius(), currentCoords, this.id, region)) {
                RocketPadding.breakAll(this.getRadius(), currentCoords, region, playerUid);
            }
        })
    }

    public onPlace(coords: Callback.ItemUseCoordinates, item: ItemStack, block: Tile, player: number, region: BlockSource): Vector | void {
        Game.prevent();
        if(block.id == this.id || region.getBlockID(coords.x, coords.y + 1, coords.z) != 0) {
            return;
        }
        region.setBlock(coords.x, coords.y + 1, coords.z, this.id, 0);

        RocketPadding.forEach(this.getRadius(), new Vector3(coords.x, coords.y + 1, coords.z), (findX, findZ) => {
            const currentCoords = new Vector3(findX, coords.y + 1, findZ);

            if(region.getBlockID(currentCoords.x, currentCoords.y, currentCoords.z) != this.id) {
                return;
            }

            if(RocketPadding.isCenter(this.getRadius(), currentCoords, this.id, region)) {
                region.setBlock(currentCoords.x, currentCoords.y, currentCoords.z, this.id, 5);
                let counter = 0;

                RocketPadding.forEach(this.getRadius(), currentCoords, (x, z) => {
                    ++counter;
                    if(region.getBlockData(x, currentCoords.y, z) == 0) {
                        region.setBlock(x, currentCoords.y, z, this.id, counter); 
                    }
                });
                return false;
            }
        });
    }

    public static forEach(radius: number, coords: Vector, action: (x: number, z: number) => boolean | void): boolean {
        for(let x = -radius; x <= radius; x++) {
            for(let z = -radius; z <= radius; z++) {
                if(action(coords.x + x, coords.z + z) == false) {
                    return false;
                }
            }
        }
        return true;
    }

    public static breakAll(radius: number, coords: Vector, region: BlockSource, playerUid?: Nullable<number>): void {
        this.forEach(radius, coords, (x, z) => {
            region.destroyBlock(x, coords.y, z, false)
            if(playerUid != null) {
                new PlayerActor(playerUid).addItemToInventory(region.getBlockID(x, coords.y, z), 1, 0, null, true);
            }
        });
    }

    public static isCenter(radius: number, coords: Vector, blockID: number, region: BlockSource): boolean {
        if(region.getBlockID(coords.x, coords.y, coords.z) == blockID && region.getBlockData(coords.x, coords.y, coords.z) == 5) {
            return true;
        }

        return this.forEach(radius, coords, (x, z) => {
            const block = region.getBlock(x, coords.y, z) as BlockState;
            if(block.id != blockID || block.data != 0) {
                return false;
            }
        });
    }
}