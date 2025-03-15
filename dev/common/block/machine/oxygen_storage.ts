class OxygenStorage extends MachineStorage {
    defaultValues = { energy: 0, energy_max: 2500000 };
    onTick(): void {
        let slot1 = this.container.getSlot("slot1");

        this.container.setScale("scala", this.data.energy / 2500000);
        this.container.setScale("o2", this.data.energy / 100);
        this.container.setText("OXYGEN", "Oxygen: " + this.data.energy + " / " + this.getCapacity());
    }
}

TileEntity.registerPrototype(BlockID.oxygen_storage_module,new OxygenStorage(OxygenStorageUI));
﻿
﻿EnergyTileRegistry.addEnergyTypeForId(BlockID.oxygen_storage_module, OB);