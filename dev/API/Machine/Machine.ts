abstract class MachineBlock extends GalacticraftBlock {
    public constructor(id: string, variationList: Block.BlockVariation[]) {
        super(id, variationList);

        ICRender.getGroup("rf-wire").add(BlockID[id], -1),
            ICRender.getGroup("ic-wire").add(BlockID[id], -1),
            ICRender.getGroup("gj-wire").add(BlockID[id], -1),
            ICRender.getGroup("gj-improved-wire").add(BlockID[id], -1),
            ICRender.getGroup("bt-wire").add(BlockID[id], -1),
            ICRender.getGroup("fc-wire").add(BlockID[id], -1);

        if (this.isWrenchable()) {
            Block.registerPlaceFunctionForID(this.id, (coords, item, block, player, region) => {
                if (Utils.getItemTags(item.id).includes("wrench")) {
                    region.setBlock(coords.x, coords.y, coords.z, block.id, block.data >= 4 ? 1 : block.data++);
                    return;
                }

                const func = Block.getPlaceFunc(block.id);

                if (func) {
                    func(coords, item, block, player, region);
                }
            });
        }
    }

    public canRotate(): boolean {
        return true;
    }

    public isWrenchable(): boolean {
        return true;
    }
}

abstract class Machine extends CommonTileEntity implements EnergyModule {
    public override useNetworkItemContainer = true;

    public getScreenByName(): UI.StandartWindow {
        return new UI.StandardWindow();
    };

    public override data = {
        energy: 0
    };
    
    public getCapacity(): number {
        return 5000;
    };

    public energyTick(type: string, src: EnergyTileNode): void {
        let output = Math.min(1, this.data.energy);
        this.data.energy += src.add(output) - output;
    };

    public energyReceive(type: string, amount: number, voltage: number): number {
        const add = Math.min(Math.min(amount, this.getCapacity() / 2), this.getCapacity() - this.data.energy);
        this.data.energy += add;
        return add;
    };
};
