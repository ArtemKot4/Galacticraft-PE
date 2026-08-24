namespace StorageInterfaceHelper {
    function addSlotPolicy(id: number, slotName: string, type: "input" | "output"): SlotData {
        const data = StorageInterface.data[id] ??= { slots: {} };
        const slot = data.slots[slotName] ??= {} as SlotData;
        slot[type] = true;

        if(type == "input") {
            slot.isValid = function({ id, count, data, extra }, side, tileEntity) {
                const policy = tileEntity.container.getAddTransferPolicy(slotName);
                if(policy != null) {
                    return policy.transfer(tileEntity.container, slotName, id, count, data, extra, 0) > 0;
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
}