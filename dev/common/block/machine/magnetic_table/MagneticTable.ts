class MagneticTableTile extends CommonTileEntity {
    public override defaultValues = {
        resultId: 0,
        resultCount: 0,
        resultData: 0,
        memory: null as Nullable<{ id: number, data: number }[]>,
        paidItems: 0,
        paidId: 0,
        paidData: 0
    };
    public override data: typeof this.defaultValues;

    public readonly matrixSlots: string[] = ["slot_0", "slot_1", "slot_2", "slot_3", "slot_4", "slot_5", "slot_6", "slot_7", "slot_8"];
    public readonly returnSlots: string[] = ["container_slot_0", "container_slot_1", "container_slot_2", "container_slot_3", "container_slot_4", "container_slot_5", "container_slot_6", "container_slot_7", "container_slot_8"];

    public override getScreenByName(): UI.IWindow {
        return MagneticTableUI;
    }

    public override getScreenName(player?: PlayerActor, coords?: Vector3): string {
        return TileAccess.isPlayerInRange(player, coords) ? "main" : null;
    }

    public override onInit(): void {
        this.data.resultId ??= 0;
        this.data.resultCount ??= 0;
        this.data.resultData ??= 0;
        this.data.memory ??= null;
        this.data.paidItems ??= 0;
        this.data.paidId ??= 0;
        this.data.paidData ??= 0;
        const slots: Record<string, SlotData> = {};
        for(let index = 0; index < this.matrixSlots.length; index++) {
            const slotIndex = index;
            slots[this.matrixSlots[slotIndex]] = {
                input: true,
                side: "up",
                isValid: (item: ItemInstance, side: number, tileEntity: TileEntity) => {
                    if(side != 1) {
                        return false;
                    }
                    return (tileEntity as MagneticTableTile).matchesTarget(slotIndex, item.id, item.data || 0);
                }
            } as SlotData;
        }
        slots["result_slot"] = {
            output: true,
            canOutput: (item: ItemInstance, side: number, tileEntity: TileEntity) => {
                return (tileEntity as MagneticTableTile).canExtractResult();
            }
        } as SlotData;
        for(const slotName of this.returnSlots) {
            slots[slotName] = {
                output: true,
                canOutput: (item: ItemInstance, side: number) => side == 0
            } as SlotData;
        }
        StorageInterface.createInterface(this.blockID, { slots }, MagneticTableStorage);
        this.container.setWorkbenchFieldPrefix("slot_");
        this.container.setSlotAddTransferPolicy("result_slot", () => 0);
        for(const slotName of this.returnSlots) {
            this.container.setSlotAddTransferPolicy(slotName, () => 0);
        }

        this.container.setSlotGetTransferPolicy("result_slot", (container, str, id, count) => {
            const current = this.container.getSlot("result_slot");

            if(current.id != id || current.count < count) {
                return 0;
            }
            return this.payForTake(count) ? count : 0;
        });
    }

    public getTargets(): Nullable<{ id: number, data: number }>[] {
        const targets: Nullable<{ id: number, data: number }>[] = [];
        const hasValidRecipe = Recipes.getRecipeResult(this.container) != null;

        for(let index = 0; index < this.matrixSlots.length; index++) {
            const slot = this.container.getSlot(this.matrixSlots[index]);

            if(slot.id != 0) {
                targets.push({ id: slot.id, data: slot.data });
            } else if(hasValidRecipe || this.data.memory == null) {
                targets.push(null);
            } else {
                targets.push(this.data.memory[index] || null);
            }
        }
        return targets;
    }

    public matchesTarget(index: number, id: number, data: number): boolean {
        const target = this.getTargets()[index];

        return target != null && target.id == id && target.data == data;
    }

    public countTargets(id: number, data: number): number {
        let count = 0;

        for(const target of this.getTargets()) {
            if(target != null && target.id == id && target.data == data) {
                count++;
            }
        }
        return count;
    }

    protected learnMemoryFromMatrix(): void {
        const memory: ({ id: number, data: number } | null)[] = [];

        for(const slotName of this.matrixSlots) {
            const slot = this.container.getSlot(slotName);

            memory.push(slot.id != 0 ? { id: slot.id, data: slot.data } : null);
        }
        this.data.memory = memory;
    }

    public payForTake(count: number): boolean {
        let paid = this.data.paidItems || 0;

        while(paid < count) {
            const snapshot: { id: number, count: number, data: number }[] = [];

            for(const slotName of this.matrixSlots) {
                const slot = this.container.getSlot(slotName);

                snapshot.push({ id: slot.id, count: slot.count, data: slot.data });
            }
            const crafted = Recipes.provideRecipeForPlayer(this.container, "", -1);

            if(crafted == null || crafted.count <= 0) {
                break;
            }
            this.collectReturnedContainers(snapshot);
            if(paid == 0) {
                this.data.paidId = crafted.id;
                this.data.paidData = crafted.data >= 0 ? crafted.data : 0;
            }
            paid += crafted.count;
            this.learnMemoryFromMatrix();
        }
        if(paid < count) {
            this.data.paidItems = paid;
            if(paid <= 0) {
                this.resetPaidState();
            }
            return false;
        }
        paid -= count;
        this.data.paidItems = paid;
        if(paid <= 0) {
            this.resetPaidState();
            this.lastSignature = "";
        }
        return true;
    }

    protected resetPaidState(): void {
        this.data.paidItems = 0;
        this.data.paidId = 0;
        this.data.paidData = 0;
    }

    protected getContainerItem(id: number, data: number): Nullable<{ id: number, data: number }> {
        if(id == VanillaItemID.milk_bucket || id == VanillaItemID.water_bucket || id == VanillaItemID.lava_bucket) {
            return { id: VanillaItemID.bucket, data: 0 };
        }
        if(typeof LiquidRegistry != "undefined" && typeof LiquidRegistry.getEmptyItem == "function") {
            const empty = LiquidRegistry.getEmptyItem(id, data);

            if(empty != null && empty.id != null) {
                return { id: empty.id, data: empty.data || 0 };
            }
        }
        if(typeof LiquidItemRegistry != "undefined" && typeof LiquidItemRegistry.getEmptyStack == "function") {
            const empty = LiquidItemRegistry.getEmptyStack({ id: id, count: 1, data: data, extra: null });

            if(empty != null && empty.id != null) {
                return { id: empty.id, data: empty.data || 0 };
            }
        }
        return null;
    }

    protected addReturnedContainer(id: number, data: number): void {
        const maxStack = Item.getMaxStackSize(id);

        for(const slotName of this.returnSlots) {
            const slot = this.container.getSlot(slotName);

            if(slot.id == id && slot.data == data && slot.count < maxStack) {
                this.container.setSlot(slotName, id, slot.count + 1, data, slot.extra);
                return;
            }
        }
        for(const slotName of this.returnSlots) {
            const slot = this.container.getSlot(slotName);

            if(slot.id == 0) {
                this.container.setSlot(slotName, id, 1, data, null);
                return;
            }
        }
        World.drop(this.x + 0.5, this.y + 1, this.z + 0.5, id, 1, data);
    }

    protected collectReturnedContainers(snapshot: { id: number, count: number, data: number }[]): void {
        for(let index = 0; index < this.matrixSlots.length; index++) {
            const before = snapshot[index];

            if(before.count <= 0) {
                continue;
            }
            const current = this.container.getSlot(this.matrixSlots[index]);

            if(current.count != before.count - 1) {
                continue;
            }
            const containerItem = this.getContainerItem(before.id, before.data);

            if(containerItem != null) {
                this.addReturnedContainer(containerItem.id, containerItem.data);
            }
        }
    }

    public canExtractResult(): boolean {
        return (this.data.paidItems || 0) > 0 || Recipes.getRecipeResult(this.container) != null;
    }

    protected lastSignature: string = "";

    public override onTick(): void {
        StorageInterface.checkHoppers(this);
        let signature = "";
        for(const slotName of this.matrixSlots) {
            const slot = this.container.getSlot(slotName);
            signature += slot.id + ":" + slot.count + ":" + slot.data + "|";
        }
        if(signature != this.lastSignature) {
            this.lastSignature = signature;
            const result = Recipes.getRecipeResult(this.container);
            const current = this.container.getSlot("result_slot");
            const paid = this.data.paidItems || 0;
            let displayId = 0;
            let displayCount = 0;
            let displayData = 0;

            if(paid > 0) {
                displayId = this.data.paidId || 0;
                displayCount = paid;
                displayData = this.data.paidData || 0;
            } else if(result != null) {
                displayId = result.id;
                displayCount = result.count;
                displayData = result.data;
            }
            if(displayId == 0) {
                if(current.id != 0) {
        for(const slotName of this.returnSlots) {
            const slot = this.container.getSlot(slotName);

            if(slot.id != 0 && slot.count > 0) {
                new PlayerActor(playerUid).addItemToInventory(slot.id, slot.count, slot.data, slot.extra || null, true);
            }
            this.container.setSlot(slotName, 0, 0, 0);
        }
        this.container.setSlot("result_slot", 0, 0, 0);
                }
            } else if(current.id != displayId || current.count != displayCount || current.data != displayData) {
                this.container.setSlot("result_slot", displayId, displayCount, displayData);
            }
        }
        this.container.sendChanges();
    }

    @ContainerEvent
    public clearGrid(packetData: {}, connectedClient: NetworkClient): void {
        const playerUid = connectedClient.getPlayerUid();

        for(const slotName of this.matrixSlots) {
            const slot = this.container.getSlot(slotName);

            if(slot.id == 0) {
                continue;
            }
            if(slot.count > 0) {
                new PlayerActor(playerUid).addItemToInventory(slot.id, slot.count, slot.data, slot.extra || null, true);
            }
            this.container.setSlot(slotName, 0, 0, 0);
        }
        this.container.setSlot("result_slot", 0, 0, 0);
        this.resetPaidState();
        this.data.memory = null;
        this.lastSignature = "";
        this.container.sendChanges();
    }
}

class MagneticTableStorage extends StorageInterface.TileEntityInterface {
    public override getSlot(name: string): ItemInstance {
        const slot = super.getSlot(name);

        if(name == "result_slot") {
            return { id: slot.id, count: slot.count, data: slot.data, extra: slot.extra };
        }
        return slot;
    }

    public override setSlot(name: string, id: number, count: number, data: number, extra?: ItemExtraData): void {
        if(name == "result_slot") {
            const current = this.container.getSlot("result_slot");
            const delta = current.count - count;

            if(delta > 0 && !(this.tileEntity as MagneticTableTile).payForTake(delta)) {
                return;
            }
        }
        super.setSlot(name, id, count, data, extra);
    }

    public override addItem(item: ItemInstance, side: number = -1, maxCount: number = 64): number {
        const tile = this.tileEntity as MagneticTableTile;
        let maxItemSlots = tile.countTargets(item.id, item.data || 0);

        if(maxItemSlots == 0) {
            return 0;
        }
        let count = 0;

        for(const name of this.getInputSlots(side)) {
            const slot = this.container.getSlot(name);

            if(slot.id == item.id && slot.data == (item.data || 0) && slot.count < Item.getMaxStackSize(item.id)) {
                count += this.addItemToSlot(name, item, maxCount - count);
                maxItemSlots--;
                if(item.count == 0 || count >= maxCount || maxItemSlots <= 0) {
                    break;
                }
            }
        }
        if(item.count > 0 && maxItemSlots > 0 && count < maxCount) {
            count += super.addItem(item, side, maxCount - count);
        }
        return count;
    }
}

class MagneticTable extends MachineBlock {
    public static tile = new MagneticTableTile();

    public constructor() {
        super("magnetic_table", [{
            name: "tile.galacticraft.magnetic_table",
            texture: [
                ["crafting_table_base1", 0],
                ["crafting_table_top1", 0],
                ["crafting_table_side1", 0],
                ["crafting_table_side1", 0],
                ["crafting_table_side1", 0],
                ["crafting_table_side1", 0]
            ],
            inCreative: true
        }]);
    }

    public override getTileEntity(): CommonTileEntity {
        return MagneticTable.tile;
    }
}
