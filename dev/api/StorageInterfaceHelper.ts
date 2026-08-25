namespace StorageInterfaceHelper {
    function addSlotPolicy(id: number, slotName: string, type: "input" | "output"): SlotData {
        const data = StorageInterface.data[id] ??= { slots: {}, classType: StorageInterface.TileEntityInterface };
        const slot = data.slots[slotName] ??= {} as SlotData;
        slot[type] = true;

        if(type == "input") {
            slot.isValid = function({ id, count, data, extra }, side, tileEntity) {
                const policy = tileEntity.container.getAddTransferPolicy(slotName);
                if(policy != null) {
                    return (
                        tileEntity.container.getSlot(slotName).count + count <= Item.getMaxStackSize(id) && 
                        policy.transfer(tileEntity.container, slotName, id, count, data, extra, 0) > 0
                    );
                }
                return false;
            }
        } else {
            slot.canOutput = function({ id, count, data, extra }, side, tileEntity) {
                return true;
            }
        }
        return slot;
    }

    export function addSlotInputPolicyFromContainer(id: number, slotName: string): void {
        addSlotPolicy(id, slotName, "input");
    }

    export function addSlotOutputPolicyFromContainer(id: number, slotName: string): void {
        addSlotPolicy(id, slotName, "output");
    }

    Callback.addCallback("PostLoaded", () => {
        StorageInterface.checkHoppers = function(tileEntity) {
            if(World.getThreadTime() % 8 > 0) {
                return false;
            }
            const storage = StorageInterface.getInterface(tileEntity);
            for(let side = 1; side < 6; side++) {
                const dir = StorageInterface.getRelativeCoords(tileEntity, side);
                const block = tileEntity.blockSource.getBlock(dir.x, dir.y, dir.z);
                if(block.id == 154 && block.data == side + Math.pow(-1, side)) {
                    const hopper = StorageInterface.getStorage(tileEntity.blockSource, dir.x, dir.y, dir.z);
                    return StorageInterface.extractItemsFromStorage(storage, hopper, side, 1) > 0;
                }
            }
            if(tileEntity.blockSource.getBlockId(tileEntity.x, tileEntity.y - 1, tileEntity.z) == 154) {
                const hopper = StorageInterface.getStorage(tileEntity.blockSource, tileEntity.x, tileEntity.y - 1, tileEntity.z);
                return StorageInterface.extractItemsFromStorage(hopper, storage, 0, 1) > 0;
            }
        }
    });
}

declare namespace StorageInterface {
    export function checkHoppers(tileEntity: TileEntity): boolean;
}