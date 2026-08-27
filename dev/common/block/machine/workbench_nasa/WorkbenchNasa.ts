declare namespace WorkbenchNasaRecipeFactory {
    interface Schema {
        inputSlots: string[],
        outputSlots: string[],
        ui: UI.IWindow,
        screenName: string
    }
}

class WorkbenchNasaRecipeFactory extends RecipeModule.FormedFactory {
    protected schemas: Map<string, WorkbenchNasaRecipeFactory.Schema> = new Map();
    protected uiCache: Record<string, UI.IWindow> = {};

    public registerSchema(item: ItemInstance, inputSlots: string[], outputSlots: string[], ui: UI.IWindow, screenName: string): void {
        this.schemas.set(ItemStack.toString(item), { inputSlots, outputSlots, ui, screenName });
        this.uiCache[screenName] = ui;
    }

    public getSchemaUIByScreenName<T extends UI.IWindow>(screenName: string): Nullable<T> {
        return this.uiCache[screenName] as T || null;
    }
}

class WorkbenchNasa extends MachineBlock implements IBlockModel, IPlaceCallback, IDestroyCallback {
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

    @SubscribeEvent
    public static onItemUseLocal(coords: Callback.ItemUseCoordinates, item: ItemInstance, block: Tile | BlockState, playerUid: number): void {
        if(block.id != BlockList.WORKBENCH_NASA.id) {
            return;
        }

        ItemContainer.registerScreenFactory("galacticraft.workbench_nasa", (container, screenName) => {
		    return RecipeModule.getFactory<WorkbenchNasaRecipeFactory>("workbench_nasa").getSchemaUIByScreenName(screenName);
	    });
    }

    public getModel(): BlockModel {
        return new BlockModel(__dir__ + "resources/assets/models/block/", "rocket_workbench_top", "rocket_workbench_top", 1);
    }
}

RecipeModule.registerFactory("workbench_nasa", new RecipeModule.FormedFactory()).registerRecipesFrom(__dir__ + "resources/assets/recipes/workbench_nasa");