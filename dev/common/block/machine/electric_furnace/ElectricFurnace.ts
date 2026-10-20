const furnaceOreLikeCache: Record<number, boolean> = {};
const furnaceIngotLikeCache: Record<number, boolean> = {};

function isFurnaceOreLike(id: number): boolean {
    const cached = furnaceOreLikeCache[id];

    if(cached !== undefined) {
        return cached;
    }
    const name = IDRegistry.getNameByID(id) || "";
    const result = id == VanillaBlockID.iron_ore || id == VanillaBlockID.gold_ore || id == VanillaBlockID.quartz_ore
        || name.includes("ore") || name.includes("raw") || name.includes("shard") || name.includes("quartz");

    furnaceOreLikeCache[id] = result;
    return result;
}

function isFurnaceIngotLike(id: number): boolean {
    const cached = furnaceIngotLikeCache[id];

    if(cached !== undefined) {
        return cached;
    }
    const name = IDRegistry.getNameByID(id) || "";
    const result = id == VanillaItemID.iron_ingot || id == VanillaItemID.gold_ingot || name.includes("ingot");

    furnaceIngotLikeCache[id] = result;
    return result;
}

class ElectricFurnaceTile extends ElectricMachine.TileEntity {
    protected processTime = 130;
    protected tier = 1;
    protected extractRate = 45;
    public override defaultValues = {
        energy: 0,
        progress: 0
    };
    public override data: typeof this.defaultValues;

    // F1: cache local al rețetei (doar primitive; invalidat prin semnătura inputului, verificată în fiecare tick).
    protected cacheValid = false;
    protected cachedInputId = 0;
    protected cachedInputData = 0;
    protected cachedHasResult = false;
    protected cachedResultId = 0;
    protected cachedResultCount = 0;
    protected cachedResultData = 0;

    public override getScreenByName(): UI.IWindow {
        return ElectricFurnaceUI;
    }

    public override onInit(): void {
        this.data.progress ??= 0;
        const data = StorageInterface.data[this.blockID] ??= { slots: {}, classType: StorageInterface.TileEntityInterface };
        data.slots["input_slot"] ??= { input: true } as SlotData;
        data.slots["battery_slot_discharge"] ??= { input: true } as SlotData;
        data.slots["result_slot"] ??= { output: true } as SlotData;
        data.slots["result_slot_2"] ??= { output: true } as SlotData;
    }

    public getProcessTime(): number {
        if(this.tier < 2) {
            return this.processTime;
        }
        return Math.max(1, Math.floor(this.processTime / this.getPowerTier()));
    }

    public getInputSlot(): ItemStack {
        return this.container.getSlot("input_slot");
    }

    public getFurnaceResult(): Nullable<ItemInstance> {
        const input = this.getInputSlot();

        if(input.isEmpty() || input.count <= 0) {
            this.cacheValid = false;
            return null;
        }
        if(this.cacheValid && this.cachedInputId == input.id && this.cachedInputData == input.data) {
            return this.cachedHasResult
                ? { id: this.cachedResultId, count: this.cachedResultCount, data: this.cachedResultData }
                : null;
        }
        let result = Recipes.getFurnaceRecipeResult(input.id, input.data);

        if(result != null && result.id == VanillaItemID.coal && result.data == 1) {
            result = { id: VanillaItemID.charcoal, count: result.count, data: 0 };
        }

        this.cacheValid = true;
        this.cachedInputId = input.id;
        this.cachedInputData = input.data;
        this.cachedHasResult = result != null;
        if(result != null) {
            this.cachedResultId = result.id;
            this.cachedResultCount = result.count;
            this.cachedResultData = result.data;
        }
        return result;
    }

    public canOutput(result: ItemInstance, count: number = result.count): boolean {
        const first = this.container.getSlot("result_slot");

        if(this.tier == 1) {
            if(first.isEmpty()) {
                return count <= Item.getMaxStackSize(result.id);
            }
            return first.id == result.id && (first.count + count) <= Item.getMaxStackSize(result.id);
        }
        const second = this.container.getSlot("result_slot_2");
        let space = 0;
        if(first.isEmpty()) {
            space += Item.getMaxStackSize(result.id);
        } else if(first.id == result.id) {
            space += Item.getMaxStackSize(result.id) - first.count;
        }
        if(second.isEmpty()) {
            space += Item.getMaxStackSize(result.id);
        } else if(second.id == result.id) {
            space += Item.getMaxStackSize(result.id) - second.count;
        }
        return space >= count;
    }

    public shouldDoubleResult(input: ItemInstance, result: ItemInstance): boolean {
        if(this.tier < 2) {
            return false;
        }
        return isFurnaceIngotLike(result.id) && isFurnaceOreLike(input.id);
    }

    public putResult(result: ItemInstance, doubleResult: boolean): void {
        let count = result.count * (doubleResult ? 2 : 1);
        const maxStack = Item.getMaxStackSize(result.id);
        const first = this.container.getSlot("result_slot");

        if(!first.isEmpty() && first.id == result.id) {
            const add = Math.min(count, maxStack - first.count);
            if(add > 0) {
                this.container.setSlot("result_slot", first.id, first.count + add, first.data, first.extra);
                count -= add;
            }
        } else if(first.isEmpty()) {
            const add = Math.min(count, maxStack);
            this.container.setSlot("result_slot", result.id, add, result.data, first.extra);
            count -= add;
        }
        if(count <= 0) {
            return;
        }
        const second = this.container.getSlot("result_slot_2");
        const secondCount = second.id == result.id ? second.count : (second.isEmpty() ? 0 : -1);

        if(secondCount >= 0) {
            const add = Math.min(count, maxStack - secondCount);
            if(add > 0) {
                this.container.setSlot("result_slot_2", result.id, secondCount + add, result.data, second.extra);
            }
        }
    }

    public override onTick(): void {
        StorageInterface.checkHoppers(this);
        const progressScale = "progress_scale";

        if(this.data.disabled == true) {
            this.data.progress = 0;
            this.container.setScale(progressScale, 0);
            return;
        }
        const result = this.getFurnaceResult();

        if(result == null) {
            this.data.progress = 0;
            this.container.setScale(progressScale, 0);
            return;
        }
        const input = this.getInputSlot();
        const doubleResult = this.shouldDoubleResult(input, result);
        const neededCount = result.count * (doubleResult ? 2 : 1);

        if(!this.canOutput(result, neededCount)) {
            this.data.progress = 0;
            this.container.setScale(progressScale, 0);
            return;
        }
        if(this.getEnergy(Galacticraft.EnergyTypes.JOULE.name) < this.extractRate) {
            this.data.progress = 0;
            this.container.setScale(progressScale, 0);
            return;
        }
        this.decreaseEnergy(this.extractRate, Galacticraft.EnergyTypes.JOULE.name);
        this.data.progress++;

        if(this.data.progress >= this.getProcessTime()) {
            const nextCount = input.count - 1;
            if(nextCount > 0) {
                this.container.setSlot("input_slot", input.id, nextCount, input.data, input.extra);
            } else {
                this.container.setSlot("input_slot", 0, 0, 0, null);
            }
            this.putResult(result, doubleResult);
            this.data.progress = 0;
        }
        this.container.setScale(progressScale, this.data.progress / this.getProcessTime());
        this.container.sendChanges();
    }
}

class ArcFurnaceTile extends ElectricFurnaceTile {
    protected override processTime = 65;
    protected override tier = 2;
    protected override extractRate = 60;

    public override getScreenByName(): UI.IWindow {
        return ArcFurnaceUI;
    }
}

@ElectricMachine({
    [Galacticraft.EnergyTypes.JOULE.name]: {
        type: ElectricMachine.Type.RECEIVER,
        batteryManager: ElectricMachine.DEFAULT_BATTERY_MANAGERS.ENERGY_BATTERY_MANAGER,
        energyKey: "energy",
        capacity: 16000,
        maxReceive: 112.5
    }
})
class ElectricFurnace extends MachineBlock {
    public static tile = new ElectricFurnaceTile();

    public constructor() {
        super("electric_furnace_gc", [{
            name: "tile.galacticraft.electric_furnace",
            texture: [
                ["machine_item_output_gc", 0],
                ["machine_item_input_gc", 0],
                ["machine_gc", 0],
                ["electric_furnace", 0],
                ["machine_input_gc", 0],
                ["machine_gc", 0]
            ],
            inCreative: true
        }]);
    }

    public override getTileEntity(): CommonTileEntity {
        return ElectricFurnace.tile;
    }
}

@ElectricMachine({
    [Galacticraft.EnergyTypes.JOULE.name]: {
        type: ElectricMachine.Type.RECEIVER,
        batteryManager: ElectricMachine.DEFAULT_BATTERY_MANAGERS.ENERGY_BATTERY_MANAGER,
        energyKey: "energy",
        capacity: 25000,
        maxReceive: 150
    }
})
class ArcFurnace extends MachineBlock {
    public static tile = new ArcFurnaceTile();

    public constructor() {
        super("arc_furnace_gc", [{
            name: "tile.galacticraft.arc_furnace",
            texture: [
                ["machine_item_output_blue_gc", 0],
                ["machine_item_input_blue_gc", 0],
                ["machine_blue_gc", 0],
                ["advanced_electric_furnace", 0],
                ["machine_input_blue_gc", 0],
                ["machine_blue_gc", 0]
            ],
            inCreative: true
        }]);
    }

    public override getTileEntity(): CommonTileEntity {
        return ArcFurnace.tile;
    }
}
