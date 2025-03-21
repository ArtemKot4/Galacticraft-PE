class CoalGeneratorTile extends Generator {
    public data = {
        energy: 0,
        burningMax: 3000,
        burning: 0,
        active: false
    };

    public getEnergyCapacity(): number {
        return 3000;
    };

    public static setBurning(slotName: string, tile: CommonTileEntity & MachineTile): void {
        if(tile.isFullEnergy()) { 
            tile.data.active = false; 
            tile.data.burning = 0;
            return;
        };

        const slot = tile.container.getSlot(slotName);
        const recipe = RecipeFactory.get("coal_generator").getRecipe(tile.container, slotName);

        if(recipe != null) {
            tile.container.setSlot(slotName, slot.id, slot.count - 1, slot.data);
            
            tile.data.burning += tile.data.burningMax;
            tile.data.active = true;
        };

        if(
            tile.data.burning === tile.data.burningMax && 
            tile.data.active && 
            tile.data.energy <= tile.getEnergyCapacity()
        ) { 
            tile.data.energy += 1;
        };
    };

    public onTick(): void {
        const capacity = this.getEnergyCapacity();
        this.container.sendChanges();
        this.container.validateAll();
        this.container.setScale("progress_scale", this.data.energy / capacity);
        this.container.setText("EnergyText", "gJ :" + this.data.energy + " / " + capacity);

        UIHelper.Machine.setEnergyStatus(this);
        CoalGeneratorTile.setBurning("coal_slot", this);
        
        this.networkData.putBoolean("active", this.data.active);
        this.networkData.sendChanges();
    };

    public getLocalTileEntity(): LocalTileEntity {
        return new LocalCoalGeneratorTile();
    };

    public getScreenByName(): UI.StandardWindow {
        return CoalGeneratorUI;
    };
};

// StorageInterface.createInterface(BlockID.coal_generator, {
//     slots: {
//         "coalSlot": {
//             input: true,
//             side: "down",
//             isValid: function (item, side) {
//                 return SpacesMachine.getCoal();
//             }
//         },
//     }
// });
