class CoalRecipeFactory extends ShapedRecipeFactory<{ fuel: ItemInstance, power: number }> {
    public getPath(): string {
        return __dir__ + "resources/recipes/fuel";
    }

    public findPower(container: ItemContainer, slotName: string): number {
        for(const i in this.storage) {
            const obj = this.storage[i];
            const slot = container.getSlot(slotName);
            if(obj.fuel.id == slot.id && slot.count >= obj.fuel.count) {
                return obj.power;
            }
        }
        return 0;
    }

    public link(slotName: string, tile: MachineTile): void {
        if(tile.isFullEnergy()) { 
            tile.data.active = false; 
            tile.data.burning = 0;
            return;
        }

        const slot = tile.container.getSlot(slotName);
        const power = this.findPower(tile.container, slotName);

        if(power > 0) {
            tile.container.setSlot(slotName, slot.id, slot.count - 1, slot.data);
            
            tile.data.burningMax = power;
            tile.data.burning += power;
            tile.data.active = true;
        }
        
        if(tile.data.burning == tile.data.burningMax && tile.data.active == true && tile.data.energy <= tile.getEnergyCapacity()) { 
            tile.data.energy += 1;
        }
    }
}

ShapedRecipeFactory.register("gc:coal_generator", new CoalRecipeFactory());

class CoalGeneratorTile extends Generator {
    public defaultValues = {
        energy: 0,
        burning: 0,
        burningMax: 3000,
        active: false
    }

    public getEnergyCapacity(): number {
        return 3000;
    }

    public onTick(): void {
        const capacity = this.getEnergyCapacity();
        this.container.sendChanges();
        this.container.validateAll();
        this.container.setScale("progress_scale", this.data.energy / capacity);
        this.container.setText("energy_display", "gJ: " + this.data.energy + " / " + capacity);

        UIHelper.Machine.setEnergyStatus(this);
        
        this.networkData.putBoolean("active", this.data.active);
        this.networkData.sendChanges();
        return ShapedRecipeFactory.get<CoalRecipeFactory>("gc:coal_generator").link("coal_slot", this);
    }

    public getLocalTileEntity(): LocalTileEntity {
        return new LocalCoalGeneratorTile();
    }

    public getScreenByName(screenName: string): UI.StandardWindow {
        return CoalGeneratorUI;
    }
}

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
