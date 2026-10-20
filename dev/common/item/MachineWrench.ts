class MachineWrench extends GalacticraftItem implements IItemUseCallback {
    public static rotatableBlocks: Nullable<Set<number>> = null;

    public static isRotatableBlock(blockId: number): boolean {
        if(MachineWrench.rotatableBlocks == null) {
            MachineWrench.rotatableBlocks = new Set([
                BlockList.COAL_GENERATOR.id,
                BlockList.COMPRESSOR.id,
                BlockList.ELECTRIC_COMPRESSOR.id,
                BlockList.ADVANCED_COMPRESSOR.id,
                BlockList.CIRCUIT_FABRICATOR.id,
                BlockList.REFINERY.id,
                BlockList.OXYGEN_COLLECTOR.id,
                BlockList.FUEL_LOADER.id,
                BlockList.ELECTRIC_FURNACE.id,
                BlockList.ARC_FURNACE.id,
                BlockList.ENERGY_STORAGE.id,
                BlockList.CLUSTER_STORAGE.id,
                BlockList.BASIC_SOLAR.id,
                BlockList.ADVANCED_SOLAR.id,
                BlockList.MAGNETIC_TABLE.id,
                BlockList.DECONSTRUCTOR.id
            ]);
        }
        return MachineWrench.rotatableBlocks.has(blockId);
    }

    public constructor() {
        super("machine_wrench_gc");
        Item.setMaxDamage(this.id, 256);
    }

    public override getMaxStack(): number {
        return 1;
    }

    public override getTexture(): IItemTextureDescription {
        return { name: "machine_wrench_gc", meta: 0 };
    }

    public defineNewData(data: number): number {
        if(data < 3) {
            return data + 1;
        }
        return 0;
    }

    public damageItem(item: ItemStack, player: number): void {
        const actor = new PlayerActor(player);
        const slot = actor.getSelectedSlot();
        const carried = actor.getInventorySlot(slot);
        if(carried.id != item.id) {
            return;
        }
        if(carried.data >= 255) {
            actor.setInventorySlot(slot, 0, 0, 0, null);
            return;
        }
        actor.setInventorySlot(slot, carried.id, carried.count, carried.data + 1, carried.extra);
    }

    public onItemUse(coords: Callback.ItemUseCoordinates, item: ItemStack, block: Tile, player: number): void {
        if(Entity.getSneaking(player) == true) {
            return;
        }
        const tileEntity = TileEntity.getTileEntity(coords.x, coords.y, coords.z);
        if(tileEntity != null && MachineWrench.isRotatableBlock(block.id)) {
            tileEntity.blockSource.setBlock(tileEntity.x, tileEntity.y, tileEntity.z, block.id, this.defineNewData(block.data));
            const rebuildGrid = (tileEntity as any).rebuildGrid;

            if(typeof rebuildGrid == "function") {
                rebuildGrid.call(tileEntity);
            }
            this.damageItem(item, player);
        }
    }
}