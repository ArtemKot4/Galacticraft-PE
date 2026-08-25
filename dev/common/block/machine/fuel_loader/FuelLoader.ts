@ElectricMachine(ElectricMachine.Type.RECEIVER)
@LiquidMachine(
    { liquidName: "fuel", action: "add" }, 
)
class FuelLoader extends MachineBlock implements INeighbourChangeCallback {
    public constructor() {
        super("fuel_loader_gc", [{
            name: "tile.galacticraft.fuel_loader",
            texture: [
                ["machine_gc", 0], 
                ["machine_gc", 0], 
                ["machine_gc", 0], 
                ["fuel_loader_gc", 0], 
                ["machine_input_gc", 0], 
                ["machine_fuel_input_gc", 0]
            ],
            inCreative: true
        }]);
    }

    public onNeighbourChange({ x, y , z }: Vector, block: Tile, changedCoords: Vector, region: BlockSource): void {
        const tileEntity = TileEntity.getTileEntity(x, y, z, region) as FuelLoaderTile;
        if(tileEntity != null) {
            tileEntity.validatePadding();
        }
    }

    public override getTileEntity(): MachineTile {
        return new FuelLoaderTile();
    }
}