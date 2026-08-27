class MachineWrench extends GalacticraftItem implements IItemUseCallback {
    public constructor() {
        super("machine_wrench_gc");
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

    public onItemUse(coords: Callback.ItemUseCoordinates, item: ItemStack, block: Tile, player: number): void {
        if(Entity.getSneaking(player) == false) {
            return;
        }
        const tileEntity = TileEntity.getTileEntity(coords.x, coords.y, coords.z);
        if(tileEntity instanceof MachineTile) {
            tileEntity.blockSource.setBlock(tileEntity.x, tileEntity.y, tileEntity.z, block.id, this.defineNewData(block.data));
            //alert("перестроено")
            //EnergyGridBuilder.rebuildWireGrid(tileEntity.blockSource, coords.x, coords.y, coords.z); //работает так себе, надо искать более надёжное решение
        }
    }
}