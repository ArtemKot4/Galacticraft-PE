enum ECallback {
    GC_FREQUENCY_CHANGED = "Galacticraft:FrequencyChanged"
}

class PlayerGearInventory {
    public static MAX_OXYGEN_CAPACITY = 5400;
    public static slots: string[] = [ "oxygen_tank_left", "oxygen_tank_right", "oxygen_mask", "oxygen_gear", "shield_controller", "frequency_module",  "parachute"]
    public container: ItemContainer;
    protected cachedGearNeeded: boolean;
    public sendedClosePacket: boolean = false;

    public constructor(public playerUid: number, container?: ItemContainer) {
        if(container != null) {
            this.container = container;
            return;
        }
        this.container = new ItemContainer();
        this.container.setGlobalSlotSavingEnabled(true);
        this.container.setClientContainerTypeName("galacticraft.frequency.player");
        this.setPolicies();
    }

    public setPolicies(): void {
        this.container.setGlobalAddTransferPolicy((container, slotName, id, count, data, extra) => {
            const stack = new ItemStack(id, count, data, extra);
            this.makeCacheGearNeeded(slotName, stack);
            const valid = this.isValidItemForSlot(slotName, stack);
            
            if(valid == true) {
                Callback.invokeCallback("Galacticraft:FrequencyChanged", slotName, stack);
                return 1;
            }
            return 0;
        });
        this.container.setGlobalGetTransferPolicy((container, slotName, id, count) => {
            this.makeCacheGearNeeded(slotName, ItemStack.EMPTY);
            return count;
        });
    }

    public isValidItemForSlot(slotName: string, stack: ItemInstance): boolean {
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
            slotName == "oxygen_mask" && stack.id == ItemList.OXYGEN_MASK.id ||
            slotName == "oxygen_gear" && stack.id == ItemList.OXYGEN_GEAR.id ||
            slotName == "shield_controller" && stack.id == ItemList.SHIELD_CONTROLLER.id
        );
    }

    public makeCacheGearNeeded(slotName: string, stack: ItemInstance): void {
        let slots = new Set<string>();
        slots.add("oxygen_mask");
        slots.add("oxygen_gear");
        let needed = true;

        slots.forEach((currentSlotName) => {
            if(!this.isValidItemForSlot(currentSlotName, currentSlotName == slotName ? stack : this.container.getSlot(currentSlotName))) {
                needed = false;
            }
        });
        this.cachedGearNeeded = needed;
    }

    public getOxygenAmountFromStack(stack: ItemInstance): number {
        return (
            ChargeItemRegistry.getEnergyStored(stack, Galacticraft.EnergyTypes.OXYGEN.name) ||
            (stack.extra != null && stack.extra.getString(ElectricMachine.DEFAULT_BATTERY_MANAGERS.OXYGEN_BATTERY_MANAGER.getSpecialTypeKey()) ? PlayerGearInventory.MAX_OXYGEN_CAPACITY / 2 : 0)
        );
    }

    public getOxygenAmountSeparated(): [number, number] {
        return [
            this.getOxygenAmountFromStack(this.container.getSlot("oxygen_tank_left")),
            this.getOxygenAmountFromStack(this.container.getSlot("oxygen_tank_right"))
        ]
    }

    public hasGearNeeded(): boolean {
        return this.cachedGearNeeded;
    }

    public decreaseOxygen(count: number): void {
        const left = this.container.getSlot("oxygen_tank_left");
        const right = this.container.getSlot("oxygen_tank_right");

        const leftStored = ChargeItemRegistry.getEnergyStored(left, Galacticraft.EnergyTypes.OXYGEN.name);
        const rightStored = ChargeItemRegistry.getEnergyStored(right, Galacticraft.EnergyTypes.OXYGEN.name);
        let remaining = 0;

        if(rightStored > 0) {
            const set = rightStored - count; 
            ChargeItemRegistry.setEnergyStored(right, Math.max(0, set));
            remaining = set < 0 ? Math.abs(set) : 0;
            this.container.setSlot("oxygen_tank_right", right.id, right.count, right.data, right.extra);
        }
        if((rightStored <= 0 || remaining > 0) && leftStored > 0) {
            ChargeItemRegistry.setEnergyStored(left, Math.max(0, Math.max(0, leftStored - (remaining > 0 ? remaining : count))));
            this.container.setSlot("oxygen_tank_left", left.id, left.count, left.data, left.extra);
        }
    }

    public equipFromHand(playerUid: number): boolean {
        const item = Entity.getCarriedItem(playerUid);
        if(ItemStack.isEmpty(item)) {
            return false;
        }
        for(const slot of PlayerGearInventory.slots) {
            if(this.container.getSlot(slot).isEmpty() && this.isValidItemForSlot(slot, item)) {
                this.container.setSlot(slot, item.id, 1, 0);
                PlayerWrapper.decreaseCarriedItem(playerUid, 1);
                this.makeCacheGearNeeded(slot, item);
                return true; 
            }
        }
        return false;
    }

    @NetworkClientPacket("packet.galacticraft.update_gear_inventory_scale_for_client")
    public static update_scale_for_client(data: { close?: boolean, oxygen: [number, number] }): void {
        if(RuntimeData.local.screenName != EScreenName.IN_GAME_PLAY_SCREEN || GearInventoryUI.isOpened()) {
            if(OxygenTanksUI.isOpened()) {
                OxygenTanksUI.close();
            }
            return;
        }
        if(data.close == true) {
            OxygenTanksUI.close();
            return;
        }
        if(!OxygenTanksUI.isOpened()) {
            OxygenTanksUI.open();
        }
        const elements = OxygenTanksUI.getElements();
        elements.get("oxygen_tank_left").setBinding("value", data.oxygen[0] / (PlayerGearInventory.MAX_OXYGEN_CAPACITY / 2));
        elements.get("oxygen_tank_right").setBinding("value", data.oxygen[1] / (PlayerGearInventory.MAX_OXYGEN_CAPACITY / 2));
        return;
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

