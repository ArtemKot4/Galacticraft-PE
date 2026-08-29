const containersWithSlots = {
    [VanillaBlockID.chest]: 36,
    [VanillaBlockID.barrel]: 36
}; //нужно будет перенести в Fireflies и переделать в более единый вид

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
                ["rocket_workbench_top",0],
                ["rocket_workbench_top", 0],
                ["rocket_workbench_top", 0],
                ["rocket_workbench_top", 0],
                ["rocket_workbench_top", 0],
                ["rocket_workbench_top", 0]
            ],
            inCreative: false
        }]);
        this.registerPackets();

        ItemModel.getForWithFallback(this.id, 0)
        .setModel((() => {
            const mesh = this.getModel().getRenderMesh().clone();
            mesh.scale(0.6, 0.6, 0.6)
            mesh.translate(0.2, -0.1, 0.25)
            return mesh;
        })(), "terrain-atlas/machine/rocket_workbench_top.png");
    }

    public getModel(): BlockModel {
        return new BlockModel(__dir__ + "resources/assets/models/block/", "rocket_workbench_top", "rocket_workbench_top", 1);
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

    public giveItemsBack(container: ItemContainer, recipe: RecipeModule.IDefaultRecipe, playerUid: number): void {
        for(const slotName in container.slots) {
            const { id, count, data, extra } = container.getSlot(slotName);
            if(id != 0 && !(slotName in recipe.output)) {
                new PlayerActor(playerUid).addItemToInventory(id, count, data, extra, true);
            }
        }
    }

    public isValidRecipeItem(item: ItemInstance, slotName: string, schemaName: string): boolean {
        return RecipeModule.getFactory<RecipeModule.WorkbenchNasaFactory>("workbench_nasa").storage
        .filter((recipes) => recipes.schema == schemaName)
        .some(({ input }) => {
            return ItemStack.contains(item, input[slotName] || new ItemStack());
        });
    }

    public findRecipe(container: ItemContainer, slotName: string, item: ItemStack, schemaName: string, schemaData: RecipeModule.WorkbenchNasaSchema): Nullable<RecipeModule.IDefaultRecipe> {
        return RecipeModule.getFactory<RecipeModule.WorkbenchNasaFactory>("workbench_nasa")
        .getRecipe(
            { inputSlots: Array.from(schemaData.inputSlots), outputSlots: Array.from(schemaData.outputSlots), schemaName: schemaName, currentRecipeIndex: "0" }, 
            (getterSlotName) => {
                if(getterSlotName == slotName) {
                    return item;
                }
                return container.getSlot(getterSlotName);
            }
        );
    }

    /**
     * @returns valid recipe if it was found
     */
    public validateResult(container: ItemContainer, slotName: string, item: ItemStack, schemaName: string, schemaData: RecipeModule.WorkbenchNasaSchema, lastRecipe?: RecipeModule.IDefaultRecipe): Nullable<RecipeModule.IDefaultRecipe> {
        const recipe = this.findRecipe(container, slotName, item, schemaName, schemaData);
        if(recipe != null) {
            for(const outputSlotName in recipe.output) {
                const { id, count, data, extra } = recipe.output[outputSlotName];
                container.setSlot(outputSlotName, id, count, data, extra || null);
            }
            return recipe;
        }
        if(lastRecipe != null && item.count < (lastRecipe.input[slotName]?.count || 1)) {
            for(const outputSlotName in lastRecipe.output) {
                container.clearSlot(outputSlotName);
            }
        }
    }

    public completeRecipe(container: ItemContainer, recipe: RecipeModule.IDefaultRecipe, schemaData: RecipeModule.WorkbenchNasaSchema, playerUid: number): void {
        RecipeModule.getFactory<RecipeModule.WorkbenchNasaFactory>("workbench_nasa").getContainerManager().decreaseInputSlots(Array.from(schemaData.inputSlots), recipe, container);
        let slotCount = 0;
        schemaData.chestSlots.forEach((slotName) => {
            const slot = container.getSlot(slotName);
            slotCount += this.getSlotCountFromContainer(slot.id);
            container.setSlot(slotName, slot.id, slot.count - 1, slot.data, slot.extra);
            container.validateSlot(slotName);
        });
        for(const outputSlotName in recipe.output) {
            const outputItem = recipe.output[outputSlotName];
            let extra = outputItem.extra || null;
            if(RocketManager.findRocketTypeByItemID(outputItem.id)) {
                extra ??= new ItemExtraData();
                extra.putInt("slotCount", slotCount);
            }
            new PlayerActor(playerUid).addItemToInventory(outputItem.id, outputItem.count, outputItem.data, extra, true);
            container.setSlot(outputSlotName, outputItem.id, outputItem.count - 1, outputItem.data, extra);
            container.validateSlot(outputSlotName);
        }
    }

    public getSlotCountFromContainer(id: number): number {
        if(id in containersWithSlots) {
            return containersWithSlots[id];
        }
        const tilePrototype = TileEntity.getPrototype(id);
        if(tilePrototype != null) {
            const screen = tilePrototype.getScreenByName() || tilePrototype.getGuiScreen();
            if(screen != null) {
                const elements = screen.getContent().elements;
                return Object.keys(elements).filter(name => {
                    if(elements[name].type != "slot") {
                        return false;
                    }
                    const lower = name.toLowerCase();
                    return !lower.includes("result") && !lower.includes("output");
                }).length;
            }
        }
        return 0;
    }

    public isValidSlotContainer(id: number): boolean {
        return this.getSlotCountFromContainer(id) > 0;
    }

    public setPolicies(container: ItemContainer, lastRecipe: RecipeModule.IDefaultRecipe) {
        const factory = RecipeModule.getFactory<RecipeModule.WorkbenchNasaFactory>("workbench_nasa");
        let schemaName = "rocket_tier_1", schemaData = factory.getSchemaByName(schemaName);

        container.setGlobalAddTransferPolicy((container, slotName, id, count, data, extra, playerUid) => {
            if(schemaData.outputSlots.has(slotName)) {
                return 0;
            }
            if(schemaData.chestSlots.has(slotName) && container.getSlot(slotName).count == 0) {
                return this.isValidSlotContainer(id) ? 1 : 0;
            }
            if(container.getSlot(slotName).count + count > Item.getMaxStackSize(id)) {
                return 0;
            }
            const currentStack = new ItemStack(id, count, data, extra);
            const valid = this.isValidRecipeItem(currentStack, slotName, schemaName);
            if(valid == true) {
                const recipe = this.validateResult(container, slotName, currentStack, schemaName, schemaData, lastRecipe);
                if(recipe != null) {
                    lastRecipe.input = recipe.input, lastRecipe.output = recipe.output;
                }
                return count;
            }
            return 0;
        });
        
        container.setGlobalGetTransferPolicy((container, slotName, id, count, data, extra, playerUid) => {
            if(schemaData.chestSlots.has(slotName)) {
                return count;
            }
            if(schemaData.outputSlots.has(slotName) && count > 0) {
                this.completeRecipe(container, lastRecipe, schemaData, playerUid);
                return 0;
            }
            if(count == 0) {
                this.validateResult(container, slotName, ItemStack.EMPTY, schemaName, schemaData, lastRecipe);
                return 0;
            }
            const currentStack = new ItemStack(id, container.getSlot(slotName).count, data, extra);
            currentStack.decrease(count);
            
            this.validateResult(container, slotName, currentStack, schemaName, schemaData, lastRecipe);
            return count;
        });

        container.setSlotAddTransferPolicy("schema_validator_slot", (container, str, id, count, data, extra, playerUid) => {
            const currentStack = { id, count, data };
            if(factory.hasSchemaOfItem(currentStack)) {
                [schemaName, schemaData] = factory.getSchemaWithEntry(currentStack);
                this.giveItemsBack(container, lastRecipe, playerUid);
                return count;
            }
            return 0;
        });
    }

    public registerPackets(): void {
        Network.addServerPacket("packet.galacticraft.workbench_nasa.open_ui", (client, data) => {
            const container = new ItemContainer();
            const recipe = { input: {}, output: {} } as RecipeModule.IDefaultRecipe;
            container.setClientContainerTypeName("galacticraft.workbench_nasa");
            container.addServerCloseListener((container, client) => {
                this.giveItemsBack(container, recipe, client.getPlayerUid());
            });
            this.setPolicies(container, recipe);
            container.openFor(client, "rocket_tier_1");
        });
    }

    @SubscribeEvent
    public static onItemUseLocal(coords: Callback.ItemUseCoordinates, item: ItemInstance, block: Tile | BlockState, playerUid: number): void {
        if(block.id != BlockList.WORKBENCH_NASA.id) {
            return;
        }

        ItemContainer.registerScreenFactory("galacticraft.workbench_nasa", (container, screenName) => {
		    if(screenName == "scheme_validator") {
                return WorkbenchSchemeValidatorUI;
            }
            return RecipeModule.getFactory<RecipeModule.WorkbenchNasaFactory>("workbench_nasa").getSchemaUIByScreenName(screenName);
	    });
        Network.sendToServer("packet.galacticraft.workbench_nasa.open_ui", {});
    }
}