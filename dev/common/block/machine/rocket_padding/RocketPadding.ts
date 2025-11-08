class RocketPadding extends MachineBlock implements IClickCallback, IDestroyCallback {
    public constructor() {
        super("rocket_padding_gc", [{
            inCreative: true,
            name: "block.galacticraft.rocket_padding",
            texture: [["rocket_padding", 0]]
        }]);

        this.getGroup().add(this.id, 0);
        const [model, shape] = this.getModelByCondition();
        BlockRenderer.setStaticICRender(this.id, -1, model);
        BlockRenderer.setCustomCollisionAndRaycastShape(this.id, -1, shape);
    }   

    public override getStates(): (string | number)[] {
        return ["fuel", "rocket_entity"];
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

    public getGroup(): ICRender.Group {
        return ICRender.getGroup("galacticraft.rocket_padding");
    }

    public getModelByCondition(): [ICRender.Model, ICRender.CollisionShape] {
        const group = this.getGroup();
        const modelBottom = new BlockRenderer.Model(0, 0, 0, 1, 3 / 16, 1, this.id, 0);
        const modelTop = new BlockRenderer.Model(0, 3 / 16, 0, 1, 5 / 16, 1, this.id, 0);
        const render = new ICRender.Model();
        const shape = new ICRender.CollisionShape();
        const condition = ICRender.AND(
            ICRender.BLOCK(-1, 0, 0, group, false),
            ICRender.BLOCK(0, 0, -1, group, false),
            ICRender.BLOCK(0, 0, 1, group, false),
            ICRender.BLOCK(1, 0, 0, group, false),
            ICRender.BLOCK(-1, 0, 1, group, false),
            ICRender.BLOCK(1, 0, -1, group, false),
            ICRender.BLOCK(1, 0, 1, group, false),
            ICRender.BLOCK(-1, 0, -1, group, false)
        );
        shape.addEntry().addBox(0, 0, 0, 1, 3 / 16, 1);
        shape.addEntry().setCondition(condition).addBox(0, 3 / 16, 0, 1, 5 / 16, 1);
        render.addEntry(modelBottom);
        render.addEntry(modelTop)
        .setCondition(condition);

        return [render, shape];
    } 

    public onClick(coords: Callback.ItemUseCoordinates, item: ItemStack, block: Tile, playerUid: number): void {
        const region = BlockSource.getDefaultForActor(playerUid);
        if(!RocketPadding.isCenter(this.getRadius(), coords, block, region)) {
            return;
        }
        alert("запуск")
        const rocket = RocketManager.getRocketByItemID(item.id);
        const playerSneaking = Entity.getSneaking(playerUid);
        const blockState = region.getExtraBlock(coords.x, coords.y, coords.z);
        const entityID = blockState.getNamedStates().get("rocket_entity");
        alert("блокстейт: " + entityID);
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

    public onDestroy(coords: Callback.ItemUseCoordinates, block: Tile, player: number): void {
        const region = BlockSource.getDefaultForActor(player);
        if(RocketPadding.isCenter(this.getRadius(), coords, block, region)) {
            return RocketPadding.breakAll(this.getRadius(), coords, region, true);
        }
    }

    public static forEachAtRadius(radius: number, coords: Vector, callback: (x: number, z: number) => boolean | void): boolean {
        for(let x = -radius; x <= radius; x++) {
            for(let z = -radius; z <= radius; z++) {
                if(callback(coords.x + x, coords.z + z) == false) {
                    return false;
                }
            }
        }
        return true;
    }

    public static breakAll(radius: number, coords: Vector, region: BlockSource, drop: boolean): void {
        this.forEachAtRadius(radius, coords, (x, z) => region.destroyBlock(x, coords.y, z, drop));
    }

    public static isCenter(radius: number, coords: Vector, block: Tile, region: BlockSource): boolean {
        return this.forEachAtRadius(radius, coords, (x, z) => {
            const newBlock = region.getBlock(x, coords.y, z);
            return newBlock.id == block.id && block.data == newBlock.data;
        });
    }
}