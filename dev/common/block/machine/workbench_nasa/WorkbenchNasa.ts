declare namespace WorkbenchNasaRecipeFactory {
    interface Schema {
        inputSlots: string[],
        outputSlots: string[],
        ui: UI.IWindow,
        screenName: string
    }
}

namespace RecipeModule {
    export class WorkbenchNasaFactory extends RecipeModule.FormedFactory {
        protected schemas: Map<string, WorkbenchNasaRecipeFactory.Schema> = new Map();
        protected uiCache: Record<string, UI.IWindow> = {};

        public override registerRecipe(obj: IDefaultRecipe<Record<string, ItemInstance>, Record<string, ItemInstance>>): this {
            for(const key in obj.input) {
                if(Array.isArray(obj.input[key])) {
                    let i = 1;
                    for(const instance of obj.input[key]) {
                        obj.input[key + "_" + i++] = instance;
                    }
                    delete obj.input[key];
                }
            }
            super.registerRecipe(obj);
            return this;
        } 

        public registerSchema(name: string, item: ItemInstance, inputSlots: string[], outputSlots: string[], ui: UI.IWindow): this {
            this.schemas.set(ItemStack.toString(item), { inputSlots, outputSlots, ui, screenName: name });
            this.uiCache[name] = ui;
            return this;
        }

        public getSchemaUIByScreenName<T extends UI.IWindow>(screenName: string): Nullable<T> {
            return this.uiCache[screenName] as T || null;
        }
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
		    return RecipeModule.getFactory<RecipeModule.WorkbenchNasaFactory>("workbench_nasa").getSchemaUIByScreenName(screenName);
	    });
        Network.sendToServer("packet.galacticraft.workbench_nasa.open_ui", {});
    }

    public getModel(): BlockModel {
        return new BlockModel(__dir__ + "resources/assets/models/block/", "rocket_workbench_top", "rocket_workbench_top", 1);
    }
}

Network.addServerPacket("packet.galacticraft.workbench_nasa.open_ui", (client, data) => {
    const container = new ItemContainer();
    container.setClientContainerTypeName("galacticraft.workbench_nasa");
    container.addServerCloseListener((container, client) => {
        for(const slotName in container.slots) {
            const { id, count, data, extra } = container.getSlot(slotName);
            if(id != 0) {
                new PlayerActor(client.getPlayerUid()).addItemToInventory(id, count, data, extra, true);
            }
        }
    });

    container.openFor(client, "rocket_tier_1");
});

RecipeModule.registerFactory("workbench_nasa", new RecipeModule.WorkbenchNasaFactory())
.registerRecipesFrom(__dir__ + "resources/assets/recipes/workbench_nasa")
.registerSchema("rocket_tier_1", new ItemStack(), 
[
    "nose_cone",
    "plate_1","plate_2","plate_3","plate_4",
    "plate_5", "plate_6", "plate_7", "plate_8",
    "fin_1", "fin_2", "fin_3", "fin_4",
    "engine"
], ["result_slot"], WorkbenchNasaRocketTier1UI);