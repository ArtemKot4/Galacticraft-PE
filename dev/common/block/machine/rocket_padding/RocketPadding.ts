class RocketPadding extends MachineBlock implements IClickCallback, IDestroyCallback, IPlaceCallback {
    public constructor() {
        super("rocket_padding_gc", (() => {
            const variations = [];

            for(let i = 0; i <= 9; i++) {
                variations.push({
                    inCreative: false,
                    name: "block.galacticraft.rocket_padding",
                    texture: [["rocket_padding", 0]]
                });
            }
            return variations;
        })());
        Item.addToCreative(this.id, 1, 0);
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
        const rocket = RocketManager.findRocketByItemID(item.id);

        if(!rocket) {
            const rocketEntity = RocketManager.findRocketEntityByPaddingCoords(coords, Entity.getDimension(playerUid));
            if(rocketEntity == null) {
                return;
            }
            rocketEntity.destroy();
        } else if(this.getRocketTiers().includes(rocket.tier)) {
            const extra = item.extra || new ItemExtraData();
            const entityID = region.spawnEntity(coords.x + 0.5, coords.y + 0.3, coords.z + 0.5, rocket.entityType);
            if(entityID == -1) {
                Network.getClientForPlayer(playerUid).sendMessage(Native.Color.RED + Translation.translate("message.galacticraft.broken_load_of_resources"))
                return;
            }
            new PlayerUser(playerUid).decreaseCarriedItem(1);
            RocketManager.addRocketEntity(rocket, entityID, extra.getInt("fuelAmount", 0), extra.getInt("slotCount", 0));
        }
    }

    public onDestroy(coords: Callback.ItemUseCoordinates, block: Tile, playerUid: number): void {
        const region = BlockSource.getDefaultForActor(playerUid);
        
        RocketPadding.forEach(this.getRadius(), coords, (x, z) => {
            const currentCoords = new Vector3(x, coords.y, z);

            if(RocketPadding.isCenter(this.getRadius(), currentCoords, this.id, region)) {
                const rocketEntity = RocketManager.findRocketEntityByPaddingCoords(currentCoords, Entity.getDimension(playerUid));
                if(rocketEntity != null) {
                    rocketEntity.destroy();
                }
                RocketPadding.breakAll(this.getRadius(), currentCoords, region, playerUid);
            }
        })
    }

    public place(coords: Callback.ItemUseCoordinates, item: ItemStack, block: Tile, player: number, region: BlockSource): void {
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

    public static breakAll(radius: number, coords: Vector, region: BlockSource, playerUid?: Nullable<number>): number {
        let count = 0;
        this.forEach(radius, coords, (x, z) => {
            region.destroyBlock(x, coords.y, z, false);
            count++;
            if(playerUid != null) {
                new PlayerActor(playerUid).addItemToInventory(region.getBlockID(x, coords.y, z), 1, 0, null, true);
            }
        });
        return count;
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

Translation.addTranslation("message.galacticraft.broken_load_of_resources", {
    en: "Guess, import of resources and behavior was failed. Please, add resources and behavior with yourself.",
    ru: "Где-то произошла ошибка при импорте ресурсов и поведения. Пожалуйста, добавьте ресурсы и поведение самостоятельно."
});