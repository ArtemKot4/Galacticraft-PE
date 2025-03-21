class BasicSolarPanel extends MachineBlock implements IPlaceCallback, IDestroyCallback {
    public constructor() {
        super("basic_solar_panel", [
            {
                name: "block.galacticraft.basic_solar_panel",
                texture: [
                    ["machine", 0],
                    ["solar_basic", 0],
                    ["solar_basic", 1],
                    ["solar_basic", 1],
                    ["Machine Output", 0],
                    ["Machine Output", 0],
                ],
                inCreative: true
            },
            {
                name: "block.galacticraft.basic_solar_panel",
                texture: [
                    ["machine", 0],
                    ["solar_basic", 0],
                    ["solar_basic", 1],
                    ["solar_basic", 1],
                    ["Machine Output", 0],
                    ["Machine Output", 0],
                ],
                inCreative: false
            },
            {
                name: "block.galacticraft.basic_solar_panel",
                texture: [
                    ["machine", 0],
                    ["solar_basic", 0],
                    ["solar_basic", 1],
                    ["solar_basic", 1],
                    ["Machine Output", 0],
                    ["Machine Output", 0],
                ],
                inCreative: false
            },
        ]);
    };

    public getHint(): string {
        return "4 gJ/ s";
    };

    public onPlace(coords: Callback.ItemUseCoordinates, item: ItemStack, block: Tile, player: number, region: BlockSource): void | Vector {
        region.setBlock(coords.relative.x, coords.relative.y, coords.relative.z, this.getID(), block.data);
        region.setBlock(coords.relative.x, coords.relative.y + 1, coords.relative.z, BlockID["solar_panel_gc"], 0);
    };

    public onDestroy(coords: Callback.ItemUseCoordinates, block: Tile, player: number): void {
        const region = BlockSource.getDefaultForActor(player);
        region.destroyBlock(coords.x, coords.y, coords.z, true);
        region.destroyBlock(coords.x, coords.y + 1, coords.z, false);
    };

    public getTileEntity(): CommonTileEntity {
        return new SolarPanelTile();
    };
};