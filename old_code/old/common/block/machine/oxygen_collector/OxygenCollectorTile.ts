class OxygenCollectorTile extends Generator {
    public data = {
        energy: 0,
        oxygen: 0,
        shift: -this.getRadius(),
        multiplier: 0
    };

    public canExtractEnergy(side: number, type: string): boolean {
        if(type === EnergyTypes.OB.name) return true;
    };

    public canReceiveEnergy(side: number, type: string): boolean {
        if(type !== EnergyTypes.OB.name) return true;
    };

    public getRadius(): number {
        return 3;
    };

    public getOxygenCapacity(): number {
        return 5000;
    };

    public changeShift(): void {
        const amount = this.data.shift + 1;
        const radius = this.getRadius();
        if(amount > radius) {
            this.data.shift = -radius;
            return;
        };
        this.data.shift = Math.max(-radius, amount);
    };

    public setMultipliers(): void {
        const radius = this.getRadius();
        let x = this.x - this.data.shift;
        let leaves = 0;
        for(let i = -radius; i <= radius; i++) {
            for(let k = 0; k <= radius; k++) {
                const blockID = this.blockSource.getBlockID(x, this.y + i, this.z + k);
                if(TagRegistry.getBlockTags(blockID).includes("leaves")) {
                    leaves++;
                };
            };
        };
        if(this.data.shift <= -radius) {
            this.data.multiplier = leaves;
            return;
        }; 
        this.data.multiplier += leaves;
    };

    public getScreenByName(): UI.StandartWindow {
        return OxygenCollectorUI;
    };

    public onTick() {
        const energyCapacity = this.getEnergyCapacity();
        const oxygenCapacity = this.getOxygenCapacity();

        this.container.sendChanges();
        this.container.setScale("oxygen_scale", this.data.oxygen / oxygenCapacity);
        this.container.setScale("energy_bar", this.data.energy / energyCapacity);
        this.container.setScale("oxygen_icon", this.data.oxygen / (oxygenCapacity / 4));
        this.container.setScale("energy_icon", this.data.energy / (energyCapacity / 4));
        this.container.setText("oxygen_display", "oB: " + this.data.oxygen + " / " + oxygenCapacity);
        
        if(this.data.energy < 250) return;
        if(World.getThreadTime() % 20 === 0) {
            this.changeShift();
            this.setMultipliers();
            this.data.energy = Math.max(0, this.data.energy - 250);
        };
        
        this.data.oxygen = Math.min(this.getOxygenCapacity(), this.data.oxygen + this.data.multiplier / 2);
    };

    public getLocalTileEntity(): LocalTileEntity {
        return new LocalOxygenCollectorTile();
    };
};

