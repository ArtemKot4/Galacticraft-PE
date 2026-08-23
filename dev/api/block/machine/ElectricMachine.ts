declare namespace ElectricMachine {
    type batteryAction = "charge" | "discharge";

    interface BatterySlotDescriptor {
        slotName: string,
        action: batteryAction 
    }

    interface TileEntity extends MachineTile {
        data: { energy: number }
        batterySlotChecks: Set<string>
        getCapacity(): number;
    }

    const enum Type {
        RECEIVER,
        EXTRACTOR
    }

    interface BatterySlotPolicy {
        (id: number, amount: number, type: Nullable<ElectricMachine.batteryAction>): boolean;
    }
}

function ElectricMachine(type: ElectricMachine.Type, ...batterySlotDescriptors: ElectricMachine.BatterySlotDescriptor[]) {
    return function<T extends new (...args: any[]) => MachineBlock>(target: T): T {
        return class extends target {
            public constructor(...args: any[]) {
                super(...args);
                this.setWireConnecting();

                const tileEntity = TileEntity.getPrototype(this.id); 
                if(tileEntity == null) {
                    throw new ReferenceError("ElectricMachine does not can don't contain tile entity prototype");
                }
                const { battery_slot_charge, battery_slot_discharge, energy_bar, energy_icon } = tileEntity.getScreenByName().getContent().elements;
                if(battery_slot_charge != null) {
                    batterySlotDescriptors.push({ slotName: "battery_slot_charge", action: "charge" });
                }
                if(battery_slot_discharge != null) {
                    batterySlotDescriptors.push({ slotName: "battery_slot_discharge", action: "discharge" });
                }
                this.addEnergyFunctions();
                EnergyTileRegistry.addEnergyTypeForId(this.id, Galacticraft.EnergyTypes.JOULE);
                this.injectInitElectricUpdated();

                if(batterySlotDescriptors.length > 0 || (energy_bar != null && energy_icon != null)) {
                    this.injectTickElectricUpdated();
                }
            }

            public isValidBatteryForCharge(id: number, amount: number): boolean {
                if(!ChargeItemRegistry.isValidItem(id, Galacticraft.EnergyTypes.JOULE.name, 0)) {
                    return false;
                }
                return amount < ChargeItemRegistry.getMaxCharge(id, Galacticraft.EnergyTypes.JOULE.name);
            }

            public isValidBatteryForDischarge(id: number, amount: number): boolean {
                if(!ChargeItemRegistry.isValidItem(id, Galacticraft.EnergyTypes.JOULE.name, 0)) {
                    return type != null;
                }
                return amount > 0;
            }

            public setEnergySlot(tileEntity: ElectricMachine.TileEntity, { slotName, action }: ElectricMachine.BatterySlotDescriptor): void {
                let policy: ElectricMachine.BatterySlotPolicy;
                if(action == "charge") {
                    policy = (id, amount, type) => this.isValidBatteryForCharge(id, amount);
                } else {
                    policy = (id, amount, type) => this.isValidBatteryForDischarge(id, amount);
                }

                tileEntity.container.setSlotAddTransferPolicy(slotName, (container, str, id, count, data, extra) => {
                    if(!extra) {
                        return 0;
                    }
                    const isBattery = policy(id, ChargeItemRegistry.getEnergyStored(new ItemStack(id, count, data, extra)), extra.getString("battery.special_type") as ElectricMachine.batteryAction);
                    if(isBattery == true) {
                        tileEntity.batterySlotChecks.add(slotName + ":" + action);
                        return count;
                    }
                    return 0;
                });

                tileEntity.container.setSlotGetTransferPolicy(slotName, (container, str, id, count) => {
                    tileEntity.batterySlotChecks.delete(slotName + ":" + action);
                    return count;
                });
            }

            public setWireConnecting(): void {
                ICRender.getGroup("galacticraft.machine_energy_connecting_0").add(this.id, 0);
                ICRender.getGroup("galacticraft.machine_energy_connecting_1").add(this.id, 1);
                ICRender.getGroup("galacticraft.machine_energy_connecting_2").add(this.id, 2);
                ICRender.getGroup("galacticraft.machine_energy_connecting_3").add(this.id, 3);
            }

            public injectInitElectricUpdated(): void {
                const tilePrototype = TileEntity.getPrototype(this.id) as ElectricMachine.TileEntity;
                const lastInit = tilePrototype.init;
                const block = this;

                tilePrototype.init = function(this: ElectricMachine.TileEntity) {
                    this.data.energy = this.data.energy || 0;

                    if(batterySlotDescriptors.length > 0) {
                        this.batterySlotChecks ??= new Set();
                        for(const descriptor of batterySlotDescriptors) {
                            block.setEnergySlot(this, descriptor);
                            const slot = this.container.getSlot(descriptor.slotName);
                            const amount = slot.extra && slot.extra.getInt("energy") || 0;
                            if(
                                descriptor.action == "charge" && block.isValidBatteryForCharge(slot.id, amount) ||
                                descriptor.action == "discharge" && block.isValidBatteryForDischarge(slot.id, amount)
                            ) {
                                this.batterySlotChecks.add(descriptor.slotName + ":" + descriptor.action);
                            }
                        }
                    }
                    lastInit.call(this);
                    return;
                }
            }

            public chargeBattery(tileEntity: ElectricMachine.TileEntity, slotName: string): boolean {
                const slot = tileEntity.container.getSlot(slotName);
                if(!ChargeItemRegistry.isValidItem(slot.id, Galacticraft.EnergyTypes.JOULE.name, 0) || !slot.extra) {
                    return true;
                }
                const amount = ChargeItemRegistry.getEnergyStored(slot, Galacticraft.EnergyTypes.JOULE.name);
                const capacity = ChargeItemRegistry.getMaxCharge(slot.id, Galacticraft.EnergyTypes.JOULE.name); 

                if(amount >= capacity) {
                    return true;
                }
                if(tileEntity.data.energy <= 0) {
                    return false;
                }
                const added = ChargeItemRegistry.addEnergyTo(slot, Galacticraft.EnergyTypes.JOULE.name, tileEntity.data.energy >= 100 ? 100 : tileEntity.data.energy, 0);
                tileEntity.container.setSlot(slotName, slot.id, slot.count, Item.getMaxDamage(slot.id) - ((amount + added) / capacity) * 100, slot.extra.putInt("energy", amount + added));
                tileEntity.data.energy -= added;
            }

            public dischargeBattery(tileEntity: ElectricMachine.TileEntity, slotName: string): boolean {
                const slot = tileEntity.container.getSlot(slotName);
                if(!slot.extra) {
                    return true;
                }
                const capacity = tileEntity.getCapacity();
                if(tileEntity.data.energy >= capacity) {
                    return false;
                }
                const type = slot.extra.getString("battery.special_type") as GalacticraftItem.BatteryParams["type"];
                if(type != null) {
                    let count;
                    switch(type) {
                        case "infinity": count = capacity - tileEntity.data.energy; break;
                        case "atomic": count = 10; break;
                        default: throw `ElectricMachine: Unknown special type of battery: "${type}"`;
                    }
                    tileEntity.data.energy = Math.min(capacity, tileEntity.data.energy + count);
                    return false;
                }
                const amount = ChargeItemRegistry.getEnergyStored(slot, Galacticraft.EnergyTypes.JOULE.name);
                if(amount == 0) {
                    return true;
                }
                const canAdd = capacity - tileEntity.data.energy;
                let add = amount < 100 ? amount : 100;
                let added = canAdd < add ? canAdd : add;
                tileEntity.data.energy += added;
                tileEntity.container.setSlot(slotName, slot.id, slot.count, Item.getMaxDamage(slot.id) - ((amount - added) / capacity) * 100, slot.extra.putInt("energy", amount - added));
            }

            public injectTickElectricUpdated(): void {
                const block = this;
                const tilePrototype = TileEntity.getPrototype(this.id) as ElectricMachine.TileEntity;
                const lastTick = tilePrototype.tick;

                tilePrototype.tick = function(this: ElectricMachine.TileEntity) {
                    lastTick.call(this);
                    this.container.setScale("energy_bar", this.data.energy / this.getCapacity());
                    this.container.setScale("energy_icon", this.data.energy / 1);

                    if(this.batterySlotChecks && this.batterySlotChecks.size == 0) {
                        return;
                    }
                    this.batterySlotChecks.forEach((value) => {
                        const [slotName, action] = value.split(":", 2);
                        if(
                            action == "charge" && block.chargeBattery(this, slotName) === true || 
                            action == "discharge" && block.dischargeBattery(this, slotName) === true
                        ) {
                            this.batterySlotChecks.delete(slotName + ":" + action);
                        }
                        this.container.validateSlot(slotName);
                    });
                    this.container.sendChanges();
                    return;
                }
            }

            public isValidEnergySide(data: number, side: number): boolean {
                return (
                    data == 0 && side == 4 ||
                    data == 1 && side == 5 ||
                    data == 2 && side == 3 ||
                    data == 3 && side == 2
                );
            }

            public addEnergyFunctions(): void {
                const block = this;
                const tilePrototype = TileEntity.getPrototype(this.id) as ElectricMachine.TileEntity;

                if(!("canReceiveEnergy" in tilePrototype)) {
                    if(type == ElectricMachine.Type.RECEIVER) {
                        tilePrototype.canReceiveEnergy = function(side , type) {
                            return block.isValidEnergySide(this.blockSource.getBlockData(this.x, this.y, this.z), side);
                        }
                    } else {
                        tilePrototype.canReceiveEnergy = function(this: ElectricMachine.TileEntity) {
                            return false;
                        }
                    }
                }
                if(!("canExtractEnergy" in tilePrototype)) {
                    if(type == ElectricMachine.Type.EXTRACTOR) {
                        tilePrototype.canExtractEnergy = function(this: ElectricMachine.TileEntity, side, type) {
                            return block.isValidEnergySide(this.blockSource.getBlockData(this.x, this.y, this.z), side);
                        }
                    } else {
                        tilePrototype.canExtractEnergy = function() {
                            return false;
                        }
                    }
                }
                if(type == ElectricMachine.Type.RECEIVER) {
                    tilePrototype.energyTick = function() {};
                    tilePrototype.energyReceive = function(type: string, amount: number, voltage: number): number {
                        const add = Math.min(amount, this.getCapacity() - this.data.energy);
                        this.data.energy += type == Galacticraft.EnergyTypes.JOULE.name ? add : add / 2;
                        return add;
                    }
                } else {
                    tilePrototype.energyTick = function(type: string, src: EnergyTileNode) {
                        const output = Math.min(this.data.energy, this.getCapacity());
                        this.data.energy += src.add(output) - output;
                    }
                } 
                
                tilePrototype.getCapacity = tilePrototype.getCapacity || function() {
                    return 16000;
                }
            }
        } as T;
    }
}