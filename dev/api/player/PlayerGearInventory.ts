enum ECallback {
    GC_FREQUENCY_CHANGED = "Galacticraft:FrequencyChanged"
}

class PlayerGearInventory {
    public container: ItemContainer;

    public constructor(public playerUid: number) {
        this.container = new ItemContainer();
        this.container.setGlobalSlotSavingEnabled(true);
        this.container.setClientContainerTypeName("galacticraft.frequency.player");
        this.container.setGlobalAddTransferPolicy((container, slotName, id, count, data, extra) => {
            const stack = new ItemStack(id, count, data, extra);
            const valid = this.isValidItemForSlot(slotName, stack);
            if(valid == true) {
                Callback.invokeCallback("Galacticraft:FrequencyChanged", slotName, stack);
                return 1;
            }
            return 0;
        });
    }

    public isValidItemForSlot(slotName: string, stack: ItemStack): boolean {
        if(slotName.includes("oxygen_tank")) {
            const amount = ChargeItemRegistry.getEnergyStored(stack);
            
            if(ElectricMachine.DEFAULT_BATTERY_MANAGERS.OXYGEN_BATTERY_MANAGER.isValidItemForDischarge(stack, amount)) {
                return true;
            }
        }
        if(slotName.includes("thermal")) { // not implemented
            return false;
        }
        if(slotName == "parachute" /*&& id ==*/ /*ItemList.PARACHUTE*/) { // not implemented
            return false;
        }
        return (
            slotName == "frequency_module" && stack.id == ItemList.FREQUENCY_MODULE.id ||
            slotName == "glass" && stack.id == ItemList.OXYGEN_MASK.id ||
            slotName == "oxygen_gear" && stack.id == ItemList.OXYGEN_GEAR.id ||
            slotName == "shield_controller" && stack.id == ItemList.SHIELD_CONTROLLER.id
        );
    }
}

// need transfer to Fireflies
function generatePlayerInventoryBase(x: number, y: number, size: number, hotbar: {
    space: number
} | true, transformator?: (offsetX: number, offsetY: number, index: number) => Partial<UI.IInvSlotElement>): UI.ElementSet {
    const elements: UI.ElementSet = {};
    let yEnd = 3 + (hotbar != null ? 1 : 0);

    for(let yOffset = 0; yOffset < yEnd; yOffset++) {
        for(let xOffset = 0; xOffset < 9; xOffset++) {
            const index = (yOffset * 9) + xOffset;
            let element: UI.UIInvSlotElement = {
                type: "invSlot",
                x: x + (xOffset * size),
                y: y + (yOffset * size) + (yOffset == 3 ? ((hotbar && (hotbar as Scriptable).space) ?? 15) : 0),
                size: size,
                index: index
            }
            elements["slot_" + index] = element;

            if(transformator != null) {
                Object.assign(element, transformator(yOffset, xOffset, index));
            }
        }
    }
    return elements;
}

// Callback.addCallback("ModsLoaded", () => {
//     GearInventoryOpenButton.open();
// })

// // ? debug
// Callback.addCallback("ItemUseLocal", (c, i, b, p) => {
//     if(i.id == VanillaItemID.stick) {
//         //if(Entity.get*Sneaking(p) == false) {
//             gearInventoryOpenButton.open();
//             //gearInventory.open();
//         //}

//     }
// })

