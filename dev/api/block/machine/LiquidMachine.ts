declare namespace LiquidMachine {
    type slotAction = "get" | "add";

    interface LiquidDescriptor {
        liquidName: string; 
        
        /**
         * If your UI have "{@link liquidName}_liquid_slot" element, will be defined automatically
         */
        slotName?: string;
        action: slotAction;
        /**
         * @default 12000
         */
        liquidCapacity?: number;
        /**
         * Energy
         * @default 50
         */
        requireEnergy?: number;
        /**
         * If your UI have "{@link liquidName}_liquid_scale" element, will be defined automatically
         */
        scaleName?: string;
    }
    
    interface TileEntity extends MachineTile {
        liquidSlotChecks: LiquidDescriptor[]
    }

    interface SlotPolicy {
        (tileEntity: LiquidMachine.TileEntity, item: ItemInstance): boolean;
    }
}

/**
 * Decorator for make your any tile as liquid machine
 * @param descriptors your descriptors
 */
function LiquidMachine(...descriptors: LiquidMachine.LiquidDescriptor[]) {
    return function<T extends new (...args: any[]) => MachineBlock>(target: T): T {
        return class extends target {
            public policies: Record<string, LiquidMachine.SlotPolicy> = {};

            public constructor(...args: any[]) {
                super(...args);
                this.addPipesConnecting();
                const tileEntity = TileEntity.getPrototype(this.id); 
                
                if(tileEntity == null) {
                    throw new ReferenceError("LiquidMachine does not can contain tile entity prototype");
                }
                const getSlots = new Set<string>();
                const addSlots = new Set<string>();
                const elements = tileEntity.getScreenByName().getContent().elements;

                for(const descriptor of descriptors) {
                    descriptor.liquidCapacity ??= 12000;
                    descriptor.requireEnergy ??= 50;
                    if(!("slotName" in descriptor) && (descriptor.liquidName + "_liquid_slot") in elements) {
                        descriptor.slotName = descriptor.liquidName + "_liquid_slot";
                    }
                    if(!("scaleName" in descriptor) && (descriptor.liquidName + "_liquid_scale") in elements) {
                        descriptor.scaleName = descriptor.liquidName + "_liquid_scale";
                    }
                    this.addLiquidItemPolicy(descriptor);
                    if(descriptor.action == "add") {
                        if(getSlots.has(descriptor.slotName)) {
                            throw new GalacticraftException(`Cannot add get action for slot "${descriptor.slotName}" with add action`);
                        }
                        addSlots.add(descriptor.slotName);
                    } else {
                        if(addSlots.has(descriptor.slotName)) {
                            throw new GalacticraftException(`Cannot add add action for slot "${descriptor.slotName}" with get action`);
                        }
                        getSlots.add(descriptor.slotName);
                    }
                }
                this.injectInit();
                this.injectTick();
            }

            public addPipesConnecting(): void {
                ICRender.getGroup("galacticraft.machine_liquid_connecting_0").add(this.id, 0);
                ICRender.getGroup("galacticraft.machine_liquid_connecting_1").add(this.id, 1);
                ICRender.getGroup("galacticraft.machine_liquid_connecting_2").add(this.id, 2);
                ICRender.getGroup("galacticraft.machine_liquid_connecting_3").add(this.id, 3);
            }

            public addLiquidItemPolicy(descriptor: LiquidMachine.LiquidDescriptor): void {
                let policy: LiquidMachine.SlotPolicy = null;

                if(descriptor.action == "add") {
                    policy = (tileEntity, item) => this.completeLiquidCheck(tileEntity, descriptor, this.isValidNotEmpty(item, descriptor.liquidName));
                } else {
                    policy = (tileEntity, item) => {
                        return this.completeLiquidCheck(tileEntity, descriptor, this.isValidEmpty(item, descriptor.liquidName));
                    };
                }
                this.policies[descriptor.slotName] = policy;
            }

            public isValidEmpty({ id, data, extra }: ItemInstance, liquidName: string, canCanisterHavePartial: boolean = true): boolean {
                if(LiquidRegistry.getFullItem(id, data, liquidName) != null) {
                    return true;
                }
                return CanisterLiquidRegistry.getLiquids(id).includes(liquidName) && (!extra || CanisterLiquidRegistry.getCurrentLiquidAmount(extra) < (canCanisterHavePartial && CanisterLiquidRegistry.getCurrentLiquid(extra) == liquidName ? CanisterLiquidRegistry.getCapacity(id) : 1));
            }

            public isValidNotEmpty({ id, data, extra }: ItemInstance, liquidName: string): boolean {
                const bucket = LiquidRegistry.getEmptyItem(id, data);
                if(bucket != null && bucket.liquid == liquidName) {
                    return true;
                }
                const amount = CanisterLiquidRegistry.getCurrentLiquidAmount(extra);
                return CanisterLiquidRegistry.getCurrentLiquid(extra) == liquidName && amount > 0;
            }

            public completeLiquidCheck(tileEntity: LiquidMachine.TileEntity, descriptor: LiquidMachine.LiquidDescriptor, success: boolean): boolean {
                if(success == true) {
                    tileEntity.liquidSlotChecks.push(descriptor);
                } else tileEntity.liquidSlotChecks = tileEntity.liquidSlotChecks.filter((v) => v.slotName != descriptor.slotName);
                return success;
            }

            public injectInit(): void {
                const tileEntity = TileEntity.getPrototype(this.id) as LiquidMachine.TileEntity;
                const lastInit = tileEntity.init;
                const policies = this.policies;
                const block = this;

                tileEntity.init = function(this: LiquidMachine.TileEntity) {
                    this.liquidSlotChecks = [];
                    lastInit.call(this);
                    
                    for(const descriptor of descriptors) {
                        this.liquidStorage.setLimit(descriptor.liquidName, descriptor.liquidCapacity);
                        const slot = this.container.getSlot(descriptor.slotName);
                        if(descriptor.action == "add" && block.isValidNotEmpty(slot, descriptor.liquidName)) {
                            this.liquidSlotChecks.push(descriptor);
                        }
                        else if(descriptor.action == "get" && block.isValidEmpty(slot, descriptor.liquidName)) {
                            this.liquidSlotChecks.push(descriptor);
                        }
                    }
                    
                    for(const slotName in policies) {
                        const lastPolicy = this.container.getAddTransferPolicy(slotName);

                        this.container.setSlotAddTransferPolicy(slotName, (container, str, id, count, data, extra, time) => {
                            if(lastPolicy != null && lastPolicy(container, str, id, count, data, extra, time) == 0) {
                                return 0;
                            }
                            return policies[slotName](this, { id, count, data, extra }) ? count : 0;
                        });
                    }
                }
            }

            public addLiquid(tileEntity: LiquidMachine.TileEntity, descriptor: LiquidMachine.LiquidDescriptor): boolean {
                const slot = tileEntity.container.getSlot(descriptor.slotName);
                const amount = tileEntity.liquidStorage.getAmount(descriptor.liquidName);
                const itemLiquidCount = CanisterLiquidRegistry.getCurrentLiquidAmount(slot.extra);
                
                if(itemLiquidCount != null && CanisterLiquidRegistry.getCurrentLiquid(slot.extra) == descriptor.liquidName && amount < descriptor.liquidCapacity) {
                    const canAdd = descriptor.liquidCapacity - amount;
                    let setItemAmount = 0;
                    let setStorageAmount = 0;

                    if(canAdd >= itemLiquidCount) {
                        setStorageAmount = amount + itemLiquidCount;
                    } else {
                        setItemAmount = itemLiquidCount - canAdd;
                        setStorageAmount = amount + canAdd;
                    }
                    slot.extra.putInt("liquid.amount", setItemAmount);
                    tileEntity.container.setSlot(descriptor.slotName, slot.id, slot.count, slot.data, slot.extra);
                    tileEntity.liquidStorage.setAmount(descriptor.liquidName, setStorageAmount);
                    return true;
                }
                const bucketCapacity = CanisterLiquidRegistry.getCapacity(slot.id, slot.data);
                
                if(bucketCapacity != null) {
                    const emptyItem = LiquidRegistry.getEmptyItem(slot.id, slot.data);
                    if(emptyItem == null) {
                        throw new GalacticraftException("LiquidMachine: cannot find empty bucket for: \"" + IDRegistry.getNameByID(slot.id) + "\"");
                    }
                    tileEntity.container.setSlot(descriptor.slotName, emptyItem.id, slot.count, emptyItem.data);
                    tileEntity.liquidStorage.setAmount(descriptor.liquidName, Math.min(descriptor.liquidCapacity, amount + bucketCapacity));
                    return true;
                } else {
                    throw new GalacticraftException("LiquidMachine: unknown bucket \"" + IDRegistry.getNameByID(slot.id) + "\"");
                }
            }

            public takeLiquid(tileEntity: LiquidMachine.TileEntity, descriptor: LiquidMachine.LiquidDescriptor): boolean {
                const slot = tileEntity.container.getSlot(descriptor.slotName);
                const amount = tileEntity.liquidStorage.getAmount(descriptor.liquidName);
                const fullItem = LiquidRegistry.getFullItem(slot.id, slot.data, descriptor.liquidName); 
                let capacity: number;

                if(fullItem != null) {
                    capacity = CanisterLiquidRegistry.getCapacity(fullItem.id, fullItem.data);
                    if(amount >= capacity) {
                        tileEntity.container.setSlot(descriptor.slotName, fullItem.id, slot.count, fullItem.data);
                        tileEntity.liquidStorage.setAmount(descriptor.liquidName, amount - capacity);
                        return true;
                    }
                } 
                else if(CanisterLiquidRegistry.getLiquids(slot.id).includes(descriptor.liquidName)) {
                    const itemLiquidCount = CanisterLiquidRegistry.getCurrentLiquidAmount(slot.extra) || 0; //нужно будет Capacity в Amount, иначе не совсем понятно
                    slot.extra ??= new ItemExtraData();
                    capacity = CanisterLiquidRegistry.getCapacity(slot.id);
                    // if(itemLiquidCount >= capacity) {
                    //     return false;
                    // }
                    const canAdd = capacity - itemLiquidCount;
                    let add = 0;
                    if(amount >= canAdd) {
                        add = canAdd;
                    } else {
                        add = amount;   
                    }

                    slot.extra.putString("liquid.name", descriptor.liquidName);
                    slot.extra.putInt("liquid.amount", itemLiquidCount + add);
                    tileEntity.container.setSlot(descriptor.slotName, slot.id, slot.count, slot.data, slot.extra);
                    tileEntity.liquidStorage.setAmount(descriptor.liquidName, amount - add);
                    return CanisterLiquidRegistry.getCurrentLiquidAmount(slot.extra) >= capacity;
                } else {
                    throw new GalacticraftException("LiquidMachine: unknown empty bucket \"" + IDRegistry.getNameByID(slot.id) + "\"");
                }
                return false;
            }

            public injectTick() {
                const tileEntity = TileEntity.getPrototype(this.id) as LiquidMachine.TileEntity;
                const lastTick = tileEntity.tick;
                const scaleDescriptors = descriptors.filter(descriptor => "scaleName" in descriptor);
                const block = this;

                tileEntity.tick = function(this: LiquidMachine.TileEntity) {
                    lastTick.call(this);
                    
                    if(this.liquidSlotChecks.length > 0) {
                        let failed = [];
                        for(const descriptor of this.liquidSlotChecks) {
                            const slot = this.container.getSlot(descriptor.slotName);

                            if((this.data.energy || 0) >= descriptor.requireEnergy) {
                                this.data.energy -= descriptor.requireEnergy;

                                if(descriptor.action == "add") {
                                    if(block.isValidNotEmpty(slot, descriptor.liquidName) && !block.addLiquid(this, descriptor)) {
                                        failed.push(descriptor);
                                    };
                                } else {
                                    if(block.isValidEmpty(slot, descriptor.liquidName) && !block.takeLiquid(this, descriptor)) {
                                        failed.push(descriptor);
                                    }
                                }
                                this.container.validateSlot(descriptor.slotName);
                            }
                        }
                        this.liquidSlotChecks = failed;
                    }

                    for(const { liquidName, liquidCapacity, scaleName } of scaleDescriptors) {
                        this.container.setScale(scaleName, this.liquidStorage.getAmount(liquidName) / liquidCapacity);
                    }
                    this.container.sendChanges();
                    return;
                }
            }
        }
    }
} // разрабатывать мод тяжело, так что буду рад получить именно ваш лайк на репозиторий :)


// while(amount < descriptor.liquidCapacity && itemLiquidCount > 0) {
//     itemLiquidCount = CanisterLiquidRegistry.getCurrentLiquidCapacity(slot.extra);

//     this.liquidStorage.setAmount(descriptor.liquidName, amount + 1);
//     slot.extra.putInt("liquid.amount", itemLiquidCount - 1);
//     this.container.setSlot(descriptor.slotName, slot.id, slot.count, slot.data, slot.extra)
// }