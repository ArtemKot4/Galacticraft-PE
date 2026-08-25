class WorkbenchNasa extends MachineBlock implements IBlockModel, IPlaceCallback, IDestroyCallback, IClickCallback {
    public bottomData = 0;
    public topData = 1;

    public constructor() {
        super("workbench_nasa", [{
            name: "block.galacticraft.workbench_nasa",
            texture: [
                ["cargo_pad", 0],
                ["cargo_pad", 0],
                ["workbench_nasa_side", 0],
                ["workbench_nasa_side", 0],
                ["workbench_nasa_side", 0],
                ["workbench_nasa_side", 0]
            ],
            inCreative: true
        }, {
            name: "block.galacticraft.workbench_nasa",
            texture: [
                ["assembly",0],
                ["assembly", 0],
                ["assembly", 0],
                ["assembly", 0],
                ["assembly", 0],
                ["assembly", 0]
            ],
            inCreative: false
        }]);
    }

    public place(coords: Callback.ItemUseCoordinates, item: ItemStack, block: Tile, playerUid: number, region: BlockSource): void {
         if(region.getBlockID(coords.x, coords.y + 1, coords.z) != 0 || region.getBlockID(coords.x, coords.y + 2, coords.z) != 0) {
            return;
        }
        region.setBlock(coords.x, coords.y + 1, coords.z, this.id, 0);
        region.setBlock(coords.x, coords.y + 2, coords.z, this.id, 1);
    }

    public onDestroy(coords: Callback.ItemUseCoordinates, { data }: Tile, playerUid: number): void {
        const blockSource = BlockSource.getDefaultForActor(playerUid);
        for(const y of [0, data == this.bottomData ? this.topData : -this.topData]) {
            blockSource.destroyBlock(coords.x, coords.y + y, coords.z, y == this.bottomData);
        }
    }

    public onClick(coords: Callback.ItemUseCoordinates, item: ItemStack, block: Tile, player: number): void {
        
    }

    public getModel(): BlockModel {
        return new BlockModel(__dir__ + "resources/assets/models/block/", "rocket_workbench_top", "rocket_workbench_top", 1);
    }
}

FormedRecipeFactory.register("workbench_nasa").addRecipesFrom(__dir__ + "resources/assets/recipes/workbench_nasa");

