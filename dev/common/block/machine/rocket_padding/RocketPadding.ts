interface IRocketPadding {
    readonly id: number;
    isCenterBlock(coords: Vector, block: Tile): boolean;    
    getRadius(): number;
    getRocketTiers(): number[];
}

class RocketPadding extends RotatableBlock implements IRocketPadding, IClickCallback, IDestroyCallback, IPlaceCallback {
    /**
     * Texture will be applied for all blocks of `in future - full, now - 9` area
     */

    public constructor(stringID: string, texture: string);
    
    /**
     * Count of variations should be as count of full padding area 
     */

    public constructor(stringID: string, variationList: Block.BlockVariation[]);
    
    public constructor(stringID: string, variationsOrTexture: Block.BlockVariation[] | string) {
        super(stringID, typeof variationsOrTexture == "string" ? (() => {
        const variations = [];

        for(let i = 0; i <= 9; i++) { 
            variations.push({
                inCreative: false,
                name: "block.galacticraft." + stringID,
                texture: [[variationsOrTexture, 0]]
            });
        }
        return variations;
    })() : variationsOrTexture);
        Item.addToCreative(this.id, 1, 0);
        this.setShapes();
    }   

    public getShapeHeight(data: number, row: number, area: number, center: number) {
        if(data == center) {
            return 4 / 16;
        }
        return 3 / 16;
    }

    /**
     * Passes area by radius - indentation of middle by x and z
     */

    public passArea(callback: (data: number, row: number, area: number, center: number) => void): void {
        const radius = this.getRadius();
        const row = Math.floor(radius * 3);
        const area = row * 3;
        const center = Math.round(area / 2);

        for(let data = 0; data <= area; data++) {
            callback(data, row, area, center);
        }
    }

    public setShapes(): void {
        this.passArea((data, row, area, center) => {
            Block.setShape(this.id, 0, 0, 0, 1, this.getShapeHeight(data, row, area, center), 1,data);
        });
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
      
        if(!RocketPadding.isCenter(this, coords, block, region)) {
            return;
        }
        if(RocketManager.findRocketEntityByPaddingCoords(coords, Entity.getDimension(playerUid)) != null) {
            return;
        }
        const rocket = RocketManager.findRocketTypeByItemID(item.id);

        if(rocket != null && this.getRocketTiers().includes(rocket.tier)) {
            const extra = item.extra || new ItemExtraData();
            const entityID = region.spawnEntity(coords.x + 0.5, coords.y + 0.2, coords.z + 0.5, rocket.entityType);
            if(entityID == -1) {
                Network.getClientForPlayer(playerUid).sendMessage(Native.Color.RED + Translation.translate("message.galacticraft.broken_load_of_resources"))
                return;
            }
            new PlayerUser(playerUid).decreaseCarriedItem(1);
            RocketManager.addRocketEntity(rocket, entityID, extra.getInt("fuelAmount", 0), extra.getInt("slotCount", 0));
        }
    }

    public destroy(coords: Vector, playerUid: number): void {
        const rocketEntity = RocketManager.findRocketEntityByPaddingCoords(coords, Entity.getDimension(playerUid));
        if(rocketEntity != null) {
            rocketEntity.destroy();
        }
        RocketPadding.breakAll(this, coords, BlockSource.getDefaultForActor(playerUid), playerUid);
    }

    public onDestroy(coords: Callback.ItemUseCoordinates, block: Tile, playerUid: number): void {
        const centerCoords = RocketPadding.findCenter(this, coords, BlockSource.getDefaultForActor(playerUid));
        if(centerCoords != null) {
            this.destroy(centerCoords, playerUid);
        }
        // if(this.isCenterBlock(coords, block)) {
        //     this.destroy(coords, playerUid);
        //     return;
        // }
        // const region = BlockSource.getDefaultForActor(playerUid);
        // RocketPadding.passRadius(this.getRadius(), coords, (x, z) => {
        //     const currentCoords = new Vector3(x, coords.y, z);
        //     const currentBlock = region.getBlock(currentCoords.x, currentCoords.y, currentCoords.z) as BlockState;

        //     if(RocketPadding.isCenter(this, this.getRadius(), currentCoords, currentBlock, region)) {
        //         this.destroy(currentCoords, playerUid);
        //         return true;
        //     }
        // });
    }

    public isCenterBlock(coords: Vector, block: Tile): boolean {
        return block.id == this.id && block.data == Math.round((this.getRadius() * 3 * 3) / 2);
    }

    public place(coords: Callback.ItemUseCoordinates, item: ItemStack, block: Tile, player: number, region: BlockSource): void {
        if(block.id == this.id || region.getBlockID(coords.x, coords.y + 1, coords.z) != 0) {
            return;
        }
        region.setBlock(coords.x, coords.y + 1, coords.z, this.id, 0);

        RocketPadding.passRadius(this, new Vector3(coords.x, coords.y + 1, coords.z), (findX, findZ) => {
            const currentCoords = new Vector3(findX, coords.y + 1, findZ);
            const currentBlock = region.getBlock(currentCoords.x, currentCoords.y, currentCoords.z) as BlockState;

            if(currentBlock.id != this.id) {
                return;
            }
            if(RocketPadding.isCenter(this, currentCoords, currentBlock, region)) {
                region.setBlock(currentCoords.x, currentCoords.y, currentCoords.z, this.id, 5);
                let counter = 0;

                RocketPadding.passRadius(this, currentCoords, (x, z) => {
                    ++counter;
                    if(region.getBlockData(x, currentCoords.y, z) == 0) {
                        region.setBlock(x, currentCoords.y, z, this.id, counter); 
                    }
                });
                return false;
            }
        });
    }

    public static findCenter(rocketPadding: IRocketPadding, coords: Vector, region: BlockSource): Vector {
        if(RocketPadding.isCenter(rocketPadding, coords, region.getBlock(coords.x, coords.y, coords.z), region)) {
            return coords;
        }
        let foundCoords: Nullable<Vector> = null;
        
        RocketPadding.passRadius(rocketPadding, coords, (x, z) => {
            const currentCoords = new Vector3(x, coords.y, z);
            const currentBlock = region.getBlock(currentCoords.x, currentCoords.y, currentCoords.z) as BlockState;

            if(RocketPadding.isCenter(rocketPadding, currentCoords, currentBlock, region)) {
                foundCoords = currentCoords;
                return true;
            }
        });
        return foundCoords;
    }

    /**
     * You need return false to stop pass
     */

    public static passRadius(rocketPadding: IRocketPadding, coords: Vector, action: (x: number, z: number) => boolean | void): boolean {
        const radius = rocketPadding.getRadius();

        for(let x = -radius; x <= radius; x++) {
            for(let z = -radius; z <= radius; z++) {
                if(action(coords.x + x, coords.z + z) === false) {
                    return false;
                }
            }
        }
        return true;
    }

    public static breakAll(rocketPadding: IRocketPadding, coords: Vector, region: BlockSource, playerUid?: Nullable<number>): number {
        let count = 0;
        this.passRadius(rocketPadding, coords, (x, z) => {
            region.destroyBlock(x, coords.y, z, false);
            count++;
            if(playerUid != null) {
                new PlayerActor(playerUid).addItemToInventory(region.getBlockID(x, coords.y, z), 1, 0, null, true);
            }
        });
        return count;
    }

    public static isCenter(rocketPadding: IRocketPadding, coords: Vector, block: Tile, region: BlockSource): boolean {
        if(rocketPadding.isCenterBlock(coords, block)) {
            return true;
        }
        let counter = 0;

        return RocketPadding.passRadius(rocketPadding, coords, (x, z) => {
            const block = region.getBlock(x, coords.y, z) as BlockState;
            if(rocketPadding.isCenterBlock(new Vector3(x, coords.y, z), block)) {
                return true;
            }
            if(block.id != rocketPadding.id || (block.data != ++counter && block.data != 0)) {
                return false;
            }
        });
    }
}