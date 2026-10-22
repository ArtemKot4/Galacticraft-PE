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
                ElectricMachine.Provider.injectRedstone(tilePrototype, configs);
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
                    this.data.disabled ??= false;
                    this.data.disableCooldown ??= 0;
                    this.data.poweredByTier ??= 1;
                    if(Object.keys(config.batteryDescriptors).length > 0) {
                        for(const slotName in config.batteryDescriptors) {
                            const action = config.batteryDescriptors[slotName];
                            config.batteryManager.setSlotPolicy(this, slotName, action);
                            config.batteryManager.validateCache(this, slotName, action);
                        }
                    }
                }
                if(this.openListenerRegistered != true) {
                    this.openListenerRegistered = true;
                    this.container.addServerOpenListener(function(container) {
                        container.markAllSlotsDirty();
                        container.sendChanges();
                    });
                }
                lastInit.call(this);
                return;
            }
        }

        export function injectTick(tilePrototype: ElectricMachine.ITileEntity, configs: { [energyType: string]: ElectricMachine.Config }): void {
            const lastTick = tilePrototype.tick;

            tilePrototype.tick = function(this: ElectricMachine.ITileEntity) {
                if(this.data.disableCooldown > 0) {
                    this.data.disableCooldown--;
                }
                if(this.data.disabled == true) {
                    return;
                }
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

        export function injectRedstone(tilePrototype: ElectricMachine.ITileEntity, configs: { [energyType: string]: ElectricMachine.Config }): void {
            const redstoneConfigs = Object.keys(configs).filter((energyType) => configs[energyType].redstoneControl);

            if(redstoneConfigs.length == 0) {
                return;
            }
            const cooldown = Math.max(...redstoneConfigs.map((energyType) => configs[energyType].redstoneCooldown));

            tilePrototype.redstone = function(this: ElectricMachine.ITileEntity, params: Callback.RedstoneSignalParams) {
                this.data.disabled = params.power > 0;
                this.data.disableCooldown = this.data.disabled ? cooldown : 0;
            }

            tilePrototype.isDisabled = function(this: ElectricMachine.ITileEntity): boolean {
                return this.data.disabled == true;
            }
        }

        export function addEnergyFunctions(tilePrototype: ElectricMachine.ITileEntity, configs: { [energyType: string]: ElectricMachine.Config }): void {
            tilePrototype.canReceiveEnergy = function(side , type) {
                if(type in configs) {
                    const config = configs[type];
                    return (config.type == ElectricMachine.Type.RECEIVER || config.type == ElectricMachine.Type.STORAGE) && config.isValidEnergyInputSide.call(this, side);
                }
                return false;
            }

            tilePrototype.canExtractEnergy = function(side, type) {
                if(type in configs) {
                    const config = configs[type];
                    return (config.type == ElectricMachine.Type.EXTRACTOR || config.type == ElectricMachine.Type.STORAGE) && config.isValidEnergySide.call(this, side);
                }
                return false;
            }

            tilePrototype.canEmitEnergy = function(side, type) {
                if(type in configs) {
                    const config = configs[type];
                    return (config.type == ElectricMachine.Type.EXTRACTOR || config.type == ElectricMachine.Type.STORAGE) && config.isValidEnergySide.call(this, side);
                }
                return false;
            }

            tilePrototype.energyReceive = function(this: ElectricMachine.ITileEntity, type: string, amount: number, voltage: number): number {
                if(this.data.disabled == true) {
                    return 0;
                }
                if(type in configs) {
                    const config = configs[type];
                    if(config.type == ElectricMachine.Type.EXTRACTOR) {
                        return 0;
                    }
                    if("energyReceive" in config) {
                        return config.energyReceive.call(this, type, amount, voltage);
                    }
                    const accepted = config.maxReceive != null ? Math.min(amount, config.maxReceive) : amount;
                    const add = Math.min(accepted, this.getCapacity(type) - this.data[config.energyKey]);
                    this.addEnergy(add, type);
                    // ES-011: nu propaga valori negative/NaN in energy-net (add pre-clamp).
                    return add > 0 ? add : 0;
                }
                return 0;
            }

            tilePrototype.energyTick = function(this: ElectricMachine.ITileEntity, type: string, src: EnergyTileNode) {
                if(this.data.disabled == true || !(type in configs)) {
                    return;
                }
                const config = configs[type];
                if(config.type == ElectricMachine.Type.EXTRACTOR || config.type == ElectricMachine.Type.STORAGE) {
                    let output = Math.min(this.data[config.energyKey], this.getCapacity(type));
                    if(config.maxExtract != null) {
                        output = Math.min(output, config.maxExtract);
                    }
                    this.addEnergy(src.add(output) - output, type);
                }
            } 
            
            tilePrototype.getCapacity = function(this: ElectricMachine.TileEntity, energyType: string) {
                return energyType in configs ? configs[energyType].capacity : 0;
            }

            tilePrototype.getEnergyStorage = function(this: ElectricMachine.ITileEntity): number {
                let storage = 0;
                for(const type in configs) {
                    storage += this.getCapacity(type);
                }
                return storage;
            }

            tilePrototype.rebuildGrid = function(this: ElectricMachine.ITileEntity): void {
                if(this.energyNode == null) {
                    return;
                }
                this.energyNode.resetConnections();
                EnergyGridBuilder.buildGridForTile(this);
            };

            tilePrototype.addEnergy = function(this: ElectricMachine.ITileEntity, amount, type): number {
                if(!isFinite(amount)) {
                    return 0;
                }
                const capacity = this.getCapacity(type);
                const energy = this.data[configs[type].energyKey] || 0;
                const next = Math.max(0, Math.min(capacity, energy + amount));
                this.data[configs[type].energyKey] = next;
                return next - energy;
            }

            tilePrototype.decreaseEnergy = function(this: ElectricMachine.ITileEntity, amount, type): void {
                if(!isFinite(amount)) {
                    return;
                }
                this.data[configs[type].energyKey] = Math.max(0, this.getEnergy(type) - amount);
            }


            tilePrototype.setEnergy = function(this: ElectricMachine.ITileEntity, count, type): void {
                if(!isFinite(count)) {
                    count = 0;
                }
                this.data[configs[type].energyKey] = Math.max(0, Math.min(count, this.getCapacity(type)));
            }

            tilePrototype.getEnergy = function(this: ElectricMachine.ITileEntity, type): number {
                return this.data[configs[type] && configs[type].energyKey] || 0;
            }

            tilePrototype.getPowerTier = function(this: ElectricMachine.ITileEntity): number {
                return this.data.poweredByTier || 1;
            }
        }

        export function setConfigDefaults(config: ElectricMachine.Config, energyType: string, tilePrototype: ElectricMachine.ITileEntity): void {
            config.capacity ??= 16000;
            config.batteryDescriptors ??= {};
            config.redstoneControl ??= true;
            config.redstoneCooldown ??= 10;

            const screen = tilePrototype.getScreenByName();
            const content = screen != null ? screen.getContent() : null;

            config.onTick ??= function() {
                const energy = this.data[config.energyKey];
                const ratio = energy / this.getCapacity(energyType);
                this.bindingCache ??= {};
                if(this.bindingCache[config.energyKey] != ratio) {
                    this.bindingCache[config.energyKey] = ratio;
                    if(content != null && config.energyKey + "_bar" in content.elements) {
                        this.container.setScale(config.energyKey + "_bar", ratio);
                    }
                    if(content != null && config.energyKey + "_icon" in content.elements) {
                        this.container.setScale(config.energyKey + "_icon", energy);
                    }
                }
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
            config.isValidEnergyInputSide ??= config.isValidEnergySide;
            config.setWireConnecting ??= function() {
                ICRender.getGroup("galacticraft.machine_energy_connecting_0").add(this.id, 0);
                ICRender.getGroup("galacticraft.machine_energy_connecting_1").add(this.id, 1);
                ICRender.getGroup("galacticraft.machine_energy_connecting_2").add(this.id, 2);
                ICRender.getGroup("galacticraft.machine_energy_connecting_3").add(this.id, 3);
            }
            config.batteryManager.energyKey ??= config.energyKey;
            config.batteryManager.energyType ??= energyType;
            const defaultSlots = config.batteryManager.getDefaultContainerSlots();
            
            if(defaultSlots != null && content != null) {
                for(const slotName in defaultSlots) {
                    if(slotName in content.elements) {
                        config.batteryDescriptors[slotName] = defaultSlots[slotName];
                    }
                }
            }
        }
    }
}