function ElectricMachine(type: EElectricMachineType) {
    return function<T extends new (...args: any[]) => MachineBlock>(target: T): T {
        return class extends target {
            public constructor(...args: any[]) {
                super(...args);
                EnergyTileRegistry.addEnergyTypeForId(this.id, Galacticraft.EnergyTypes.JOULE);
                this.setWireConnecting();

                if(TileEntity.getPrototype(this.id) == null) {
                    throw new ReferenceError("ElectricMachine does not can contain tile entity prototype");
                }
                this.addEnergyFunctions();
                this.addScalesBehavior();
            }

            public setWireConnecting(): void {
                ICRender.getGroup("galacticraft.machine_energy_connecting_0").add(this.id, 0);
                ICRender.getGroup("galacticraft.machine_energy_connecting_1").add(this.id, 1);
                ICRender.getGroup("galacticraft.machine_energy_connecting_2").add(this.id, 2);
                ICRender.getGroup("galacticraft.machine_energy_connecting_3").add(this.id, 3);
            }

            public addEnergyFunctions(): void {
                const tilePrototype = TileEntity.getPrototype(this.id) as MachineTile;

                if(!("energyReceive" in tilePrototype)) {
                    tilePrototype.canReceiveEnergy = function() {
                        return type == EElectricMachineType.RECEIVER;
                    }
                }
                if(!("canExtractEnergy" in tilePrototype)) {
                    tilePrototype.canExtractEnergy = function() {
                        return type == EElectricMachineType.EXTRACTOR;
                    }
                }
                if(type == EElectricMachineType.RECEIVER) {
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
                if("setupContainer" in tilePrototype) {
                    const lastSetupContainer = tilePrototype.setupContainer;
            
                    tilePrototype.setupContainer = function() {
                        this.data.energy = this.data.energy || 0;
                        lastSetupContainer.call(this);
                        return;
                    }
                }
                
                tilePrototype.getCapacity = tilePrototype.getCapacity || function() {
                    return 5000;
                }
            }

            public addScalesBehavior(): void {
                const tilePrototype = TileEntity.getPrototype(this.id) as MachineTile;
                const ui = tilePrototype.getScreenByName(null, tilePrototype.container);
                
                if(ui == null) {
                    return;
                }
                if("onUpdate" in tilePrototype) {
                    const elements = ui.getContent().elements;
                    if("energy_bar" in elements && "energy_icon" in elements) {
                        const lastOnUpdate = tilePrototype.onUpdate;
                        tilePrototype.onUpdate = function() {
                            this.container.setScale("energy_bar", this.data.energy / this.getCapacity());
                            this.container.setScale("energy_icon", this.data.energy / 1);
                            lastOnUpdate.call(this);
                            return;
                        }
                    }
                }
            }
        } as T;
    }
}

enum EElectricMachineType {
    RECEIVER,
    EXTRACTOR,
    CONSUMER = RECEIVER,
    GENERATOR = EXTRACTOR
}