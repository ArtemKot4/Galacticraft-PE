class DeconstructorTile extends ElectricMachine.TileEntity {
    protected processTime = 250;
    protected extractRate = 75;
    protected salvageChance = 0.75;
    public override defaultValues = {
        energy: 0,
        progress: 0
    };
    public override data: typeof this.defaultValues;

    public readonly outputSlots: string[] = MathHelper.range(1, 10).map(v => "output_slot_" + v);

    public getSalvageItems(): Set<number> {
        return new Set([
            ItemList.HEAVY_PLATING.id,
            ItemList.COMPRESSED_STEEL.id,
            ItemList.COMPRESSED_BRONZE.id,
            ItemList.COMPRESSED_COPPER.id,
            ItemList.COMPRESSED_TIN.id,
            ItemList.COMPRESSED_ALUMINUM.id,
            ItemList.COMPRESSED_IRON.id,
            ItemList.COMPRESSED_METEORIC_ITEM.id,
            ItemList.INGOT_METEORIC_IRON.id,
            ItemList.STEEL_POLE.id,
            ItemList.INGOT_COPPER.id,
            ItemList.INGOT_TIN.id,
            ItemList.INGOT_ALUMINUM.id,
            VanillaItemID.iron_ingot,
            VanillaItemID.gold_ingot,
            VanillaItemID.gold_nugget,
            VanillaItemID.diamond
        ]);
    }

    public getNasaRecipeIngredients(itemId: number): Nullable<{ id: number, count: number }[]> {
        const factory = RecipeModule.getFactory<RecipeModule.WorkbenchNasaFactory>("workbench_nasa");

        if(factory == null) {
            return null;
        }
        for(const recipe of factory.storage) {
            if(recipe.output == null) {
                continue;
            }
            for(const outputSlot in recipe.output) {
                const output = recipe.output[outputSlot];

                if(output.id != itemId || output.count != 1) {
                    continue;
                }
                const result: { id: number, count: number }[] = [];

                for(const inputSlot in recipe.input) {
                    const stack = recipe.input[inputSlot];

                    if(stack != null && stack.id != 0) {
                        result.push({ id: stack.id, count: stack.count || 1 });
                    }
                }
                return result.length > 0 ? result : null;
            }
        }
        return null;
    }

    public getEngineRecipeIngredients(itemId: number): Nullable<{ id: number, count: number }[]> {
        let recipes = Recipes.getWorkbenchRecipesByResult(itemId, 1, 0);

        if(recipes == null || recipes.size() == 0) {
            recipes = Recipes.getWorkbenchRecipesByResult(itemId, 1, -1);
        }
        if(recipes == null || recipes.size() == 0) {
            return null;
        }
        const array = recipes.toArray();

        if(array.length == 0) {
            return null;
        }
        const entries = array[0].getSortedEntries();
        const result: { id: number, count: number }[] = [];

        for(let i = 0; i < entries.length; i++) {
            const entry = entries[i];

            if(entry.id != 0) {
                result.push({ id: entry.id, count: 1 });
            }
        }
        return result.length > 0 ? result : null;
    }

    public getReverseRecipe(itemId: number): Nullable<{ id: number, count: number }[]> {
        return this.getNasaRecipeIngredients(itemId) || this.getEngineRecipeIngredients(itemId);
    }

    public collectSalvage(itemId: number, doneId: number, depth: number): { id: number, count: number }[] {
        if(depth > 10) {
            return [];
        }
        if(this.getSalvageItems().has(itemId)) {
            return [{ id: itemId, count: 1 }];
        }
        const recipe = this.getReverseRecipe(itemId);

        if(recipe == null) {
            return [];
        }
        let result: { id: number, count: number }[] = [];

        for(const ingredient of recipe) {
            if(ingredient.id == doneId) {
                continue;
            }
            const sub = this.collectSalvage(ingredient.id, itemId, depth + 1);

            for(const entry of sub) {
                result.push({ id: entry.id, count: entry.count * ingredient.count });
            }
        }
        return result;
    }

    public squashSalvage(items: { id: number, count: number }[]): { id: number, count: number }[] {
        const result: { id: number, count: number }[] = [];

        for(const item of items) {
            const existing = result.find((entry) => entry.id == item.id);
            if(existing != null) {
                existing.count += item.count;
            } else {
                result.push({ id: item.id, count: item.count });
            }
        }
        return result;
    }

    public addToOutput(out: { id: number, count: number }): void {
        let remaining = out.count;
        const maxStack = Item.getMaxStackSize(out.id);

        for(const slotName of this.outputSlots) {
            const slot = this.container.getSlot(slotName);

            if(!slot.isEmpty() && slot.id == out.id && slot.count < maxStack) {
                const add = Math.min(maxStack - slot.count, remaining);
                this.container.setSlot(slotName, slot.id, slot.count + add, slot.data, slot.extra);
                remaining -= add;
            } else if(slot.isEmpty()) {
                const add = Math.min(maxStack, remaining);
                this.container.setSlot(slotName, out.id, add, 0);
                remaining -= add;
            }
            if(remaining <= 0) {
                return;
            }
        }
        if(remaining > 0) {
            World.drop(this.x + 0.5, this.y + 1, this.z + 0.5, out.id, remaining, 0);
        }
    }

    public deconstruct(): void {
        const input = this.container.getSlot("input_slot");
        let salvage = this.squashSalvage(this.collectSalvage(input.id, -1, 0));

        for(const entry of salvage) {
            let count = 0;
            for(let i = 0; i < entry.count; i++) {
                if(Math.random() < this.salvageChance) {
                    count++;
                }
            }
            if(count > 0) {
                this.addToOutput({ id: entry.id, count: count });
            }
        }
        const nextCount = input.count - 1;

        if(nextCount > 0) {
            this.container.setSlot("input_slot", input.id, nextCount, input.data, input.extra);
        } else {
            this.container.setSlot("input_slot", 0, 0, 0, null);
        }
    }

    public override getScreenByName(): UI.IWindow {
        return DeconstructorUI;
    }

    public override onInit(): void {
        this.data.progress ??= 0;
        const data = StorageInterface.data[this.blockID] ??= { slots: {}, classType: StorageInterface.TileEntityInterface };
        data.slots["input_slot"] ??= { input: true } as SlotData;
        for(const slotName of this.outputSlots) {
            data.slots[slotName] ??= { output: true } as SlotData;
        }
        for(const slotName of this.outputSlots) {
            this.container.setSlotAddTransferPolicy(slotName, () => 0);
        }
    }

    public override onTick(): void {
        this.container.validateAll();
        StorageInterface.checkHoppers(this);
        const input = this.container.getSlot("input_slot");

        if(this.data.disabled == true || input.isEmpty()) {
            this.data.progress = 0;
            this.container.setScale("progress_scale", 0);
            return;
        }
        if(this.getEnergy(Galacticraft.EnergyTypes.JOULE.name) < this.extractRate) {
            this.data.progress = 0;
            this.container.setScale("progress_scale", 0);
            return;
        }
        this.decreaseEnergy(this.extractRate, Galacticraft.EnergyTypes.JOULE.name);
        this.data.progress++;

        if(this.data.progress >= this.processTime) {
            this.data.progress = 0;
            this.deconstruct();
        }
        this.container.setScale("progress_scale", this.data.progress / this.processTime);
        this.container.sendChanges();
    }
}

@ElectricMachine({
    [Galacticraft.EnergyTypes.JOULE.name]: {
        type: ElectricMachine.Type.RECEIVER,
        batteryManager: ElectricMachine.DEFAULT_BATTERY_MANAGERS.ENERGY_BATTERY_MANAGER,
        energyKey: "energy",
        capacity: 16000,
        maxReceive: 75
    }
})
class Deconstructor extends MachineBlock {
    public static tile = new DeconstructorTile();

    public constructor() {
        super("deconstructor_gc", [{
            name: "tile.galacticraft.deconstructor",
            texture: [
                ["machine_item_output_gc", 0],
                ["machine_item_input_gc", 0],
                ["machine_gc", 0],
                ["deconstructor", 0],
                ["machine_input_gc", 0],
                ["machine_gc", 0]
            ],
            inCreative: true
        }]);
    }

    public override getTileEntity(): CommonTileEntity {
        return Deconstructor.tile;
    }
}
