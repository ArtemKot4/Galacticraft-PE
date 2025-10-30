class RocketPadding extends MachineBlock implements IItemUseCallback, IDestroyCallback {
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

    public getModelByCondition(): ICRender.Model {
        const group = this.getGroup();
        const modelBottom = new BlockRenderer.Model(0, 0, 0, 1, 3 / 16, 1, this.id, 0);
        const modelTop = new BlockRenderer.Model(0, 3 / 16, 0, 1, 5 / 16, 1, this.id, 0);
        const render = new ICRender.Model();

        render.addEntry(modelBottom);
        render.addEntry(modelTop)
        .setCondition(
            ICRender.AND(
                ICRender.BLOCK(-1, 0, 0, group, false),
                ICRender.BLOCK(0, 0, -1, group, false),
                ICRender.BLOCK(0, 0, 1, group, false),
                ICRender.BLOCK(1, 0, 0, group, false),
                ICRender.BLOCK(-1, 0, 1, group, false),
                ICRender.BLOCK(1, 0, -1, group, false),
                ICRender.BLOCK(1, 0, 1, group, false),
                ICRender.BLOCK(-1, 0, -1, group, false)
            )
        );
        return render;
    }

    public constructor() {
        super("rocket_padding", [{
            inCreative: true,
            name: "block.galacticraft.rocket_padding",
            texture: [["rocket_padding", 0]]
        }]);

        this.getGroup().add(this.id, 0);
        BlockRenderer.setStaticICRender(this.id, -1, this.getModelByCondition());
    }    

    public onItemUse(coords: Callback.ItemUseCoordinates, item: ItemStack, block: Tile, player: number): void {
        
    }

    public onDestroy(coords: Callback.ItemUseCoordinates, block: Tile, player: number): void {
        const region = BlockSource.getDefaultForActor(player);
        if(RocketPadding.isCenter(this.getRadius(), coords, block, region)) {
            return RocketPadding.breakAll(this.getRadius(), coords, region, true);
        }
    }

    public static forEachRadius(radius: number, coords: Vector, callback: (x: number, z: number) => boolean | void): boolean {
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
        this.forEachRadius(radius, coords, (x, z) => region.destroyBlock(x, coords.y, z, drop));
    }

    public static isCenter(radius: number, coords: Vector, block: Tile, region: BlockSource): boolean {
        return this.forEachRadius(radius, coords, (x, z) => {
            const newBlock = region.getBlock(x, coords.y, z);
            return newBlock.id == block.id && block.data == newBlock.data;
        });
    }
}