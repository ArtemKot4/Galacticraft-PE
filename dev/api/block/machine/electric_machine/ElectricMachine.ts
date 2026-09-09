function ElectricMachine(configs: { [energyType: string]: ElectricMachine.Config }) {
    return function<T extends new (...args: any[]) => MachineBlock>(target: T): T {        
        return class extends target {
            public constructor(...args: any[]) {
                super(...args);
                const tilePrototype = TileEntity.getPrototype(this.id) as ElectricMachine.ITileEntity; 
                
                if(tilePrototype == null) {
                    throw new ReferenceError("ElectricMachine does not can don't contain tile entity prototype");
                }
                for(const energyType in configs) {
                    const config = configs[energyType];
                    ElectricMachine.Provider.setConfigDefaults(config, energyType, tilePrototype);
                    config.setWireConnecting.call(this);
                    EnergyTileRegistry.addEnergyTypeForId(this.id, EnergyTypeRegistry.getEnergyType(energyType));
                    
                    for(const slotName in config.batteryDescriptors) {
                        if(config.batteryDescriptors[slotName] == "discharge") {
                            StorageInterfaceHelper.addSlotInputPolicyFromContainer(this.id, slotName);
                        }
                    }
                }
                ElectricMachine.Provider.addEnergyFunctions(tilePrototype, configs);
                ElectricMachine.Provider.injectInit(tilePrototype, configs);
                ElectricMachine.Provider.injectTick(tilePrototype, configs);
            }
        } as T;
    }
}

namespace ElectricMachine {
    export namespace Provider {
        export function injectInit(tilePrototype: TileEntity.TileEntityPrototype, configs: { [energyType: string]: ElectricMachine.Config }): void {
            const lastInit = tilePrototype.init;

            tilePrototype.init = function(this: ElectricMachine.ITileEntity) {
                this.batterySlotChecks ??= new Set();
                for(const energyType in configs) {
                    const config = configs[energyType];
                    this.data[config.energyKey] ??= 0;
                    if(Object.keys(config.batteryDescriptors).length > 0) {
                        for(const slotName in config.batteryDescriptors) {
                            const action = config.batteryDescriptors[slotName];
                            config.batteryManager.setSlotPolicy(this, slotName, action);
                            config.batteryManager.validateCache(this, slotName, action);
                        }
                    }
                }
                lastInit.call(this);
                return;
            }
        }

        export function injectTick(tilePrototype: ElectricMachine.ITileEntity, configs: { [energyType: string]: ElectricMachine.Config }): void {
            const lastTick = tilePrototype.tick;

            tilePrototype.tick = function(this: ElectricMachine.ITileEntity) {
                if(lastTick != null) {
                    lastTick.call(this);
                }
                for(const energyType in configs) {
                    const config = configs[energyType];
                    config.onTick.call(this);
                }

                if(this.batterySlotChecks == null || this.batterySlotChecks.size == 0) {
                    return;
                }
                this.batterySlotChecks.forEach((value) => {
                    const [slotName, action, energyType] = value.split(":", 3);
                    const config = configs[energyType];
                    config.batteryManager.applyFromSlot(this, slotName, action as ElectricMachine.batteryAction);
                });
                return;
            }
        }

        export function addEnergyFunctions(tilePrototype: ElectricMachine.ITileEntity, configs: { [energyType: string]: ElectricMachine.Config }): void {
            tilePrototype.canReceiveEnergy = function(side , type) {
                if(type in configs) {
                    const config = configs[type];
                    return config.type == ElectricMachine.Type.RECEIVER && config.isValidEnergySide.call(this, side);
                }
                return false;
            }

            tilePrototype.canExtractEnergy = function(side, type) {
                if(type in configs) {
                    const config = configs[type];
                    return config.type == ElectricMachine.Type.EXTRACTOR && config.isValidEnergySide.call(this, side);
                }
                return false;
            }

            tilePrototype.energyReceive = function(this: ElectricMachine.ITileEntity, type: string, amount: number, voltage: number): number {
                if(type in configs) {
                    const config = configs[type];
                    if(config.type != ElectricMachine.Type.RECEIVER) {
                        return 0;
                    }
                    if("energyReceive" in config) {
                        return config.energyReceive.call(this, type, amount, voltage);
                    }
                    const add = Math.min(amount, this.getCapacity(type) - this.data[config.energyKey]);
                    this.addEnergy(add, type);
                    return add;
                }
                return 0;
            }

            tilePrototype.energyTick = function(this: ElectricMachine.ITileEntity, type: string, src: EnergyTileNode) {
                if(!(type in configs)) {
                    return;
                }
                const config = configs[type];
                if(config.type == ElectricMachine.Type.EXTRACTOR) {
                    const output = Math.min(this.data[config.energyKey], this.getCapacity(type));
                    this.addEnergy(src.add(output) - output, type);
                }
            } 
            
            tilePrototype.getCapacity = function(this: ElectricMachine.TileEntity, energyType: string) {
                return energyType in configs ? configs[energyType].capacity : 0;
            }

            tilePrototype.addEnergy = function(this: ElectricMachine.ITileEntity, amount, type): number {
                const capacity = this.getCapacity(type);
                const energy = this.data[configs[type].energyKey];
                if((energy + amount) <= capacity) {
                    this.data[configs[type].energyKey] = energy + amount;
                    return amount;
                }
                const canAdd = capacity - energy;
                const add = amount <= canAdd ? amount : canAdd;
                this.data[configs[type].energyKey] += add;
                return add;
            }

            tilePrototype.setEnergy = function(this: ElectricMachine.ITileEntity, count, type): void {
                this.data[configs[type].energyKey] = count;
            }

            tilePrototype.getEnergy = function(this: ElectricMachine.ITileEntity, type): number {
                return this.data[configs[type] && configs[type].energyKey] || 0;
            }
        }

        export function setConfigDefaults(config: ElectricMachine.Config, energyType: string, tilePrototype: ElectricMachine.ITileEntity): void {
            config.capacity ??= 16000;
            config.batteryDescriptors ??= {};

            config.onTick ??= function() {
                const energy = this.data[config.energyKey];
                this.container.setScale("energy_bar", energy / this.getCapacity(energyType));
                this.container.setScale("energy_icon", energy / 1);
                this.container.sendChanges();
            }
            config.isValidEnergySide ??= function(side: number) {
                const data = this.blockSource.getBlockData(this.x, this.y, this.z);
                return (
                    data == 0 && side == 4 ||
                    data == 1 && side == 5 ||
                    data == 2 && side == 3 ||
                    data == 3 && side == 2
                );
            }
            config.setWireConnecting ??= function() {
                ICRender.getGroup("galacticraft.machine_energy_connecting_0").add(this.id, 0);
                ICRender.getGroup("galacticraft.machine_energy_connecting_1").add(this.id, 1);
                ICRender.getGroup("galacticraft.machine_energy_connecting_2").add(this.id, 2);
                ICRender.getGroup("galacticraft.machine_energy_connecting_3").add(this.id, 3);
            }
            config.batteryManager.energyKey ??= config.energyKey;
            config.batteryManager.energyType ??= energyType;
            const defaultSlots = config.batteryManager.getDefaultContainerSlots();
            
            if(defaultSlots != null) {
                const ui = tilePrototype.getScreenByName();
                if(ui != null) {
                    const content = ui.getContent();
                    for(const slotName in defaultSlots) {
                        if(slotName in content.elements) {
                            config.batteryDescriptors[slotName] = defaultSlots[slotName];
                        }
                    }
                }
            }
        }
    }
}