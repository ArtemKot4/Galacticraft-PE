abstract class BasicCable {
    abstract getDefaultID(): string;
    abstract getGroupName(): string;
    abstract getEnergyType(): EnergyType;
    abstract getEnergyProvideAmount(): number;

    public getCableWidth(): number {
        return 2 / 8;
    };

    public getSoundType(): Block.Sound {
        return "stone";
    };

    public registerAll(): void {
        const type = this.getEnergyType();
        const provide = this.getEnergyProvideAmount();
        for(const color of Galacticraft.PAINT_COLORS) {
            const id = this.getDefaultID() + "_" + color;
            IDRegistry.genBlockID(id);
            Block.createBlock(id, [
                {
                    name: `block.galacticraft.${id}`,
                    texture: [[id, 0]],
                    inCreative: false,
                },
            ]);
            TileRenderer.setupWireModel(BlockID[id], 0, this.getCableWidth(), this.getGroupName());
            type.registerWire(BlockID[id], provide);
            Block.registerClickFunctionForID(BlockID[id], this.onClick.bind(this));
            com.zhekasmirnov.innercore.api.NativeBlock.setSoundType(BlockID[id], this.getSoundType());
        };
    };

    public onClick(coords: Callback.ItemUseCoordinates, item: ItemInstance, block: Tile, player: number) {
        const user = new PlayerUser(player);
        for (const color of Galacticraft.PAINT_COLORS) {
            if (item.id === VanillaItemID[color + "_dye"]) {
                try {
                    Particles.addParticle(EParticleType.CLOUD, coords.x + 0.5, coords.y + 0.5, coords.z + 0.5, 0, 0.01, 0);
                    BlockSource.getDefaultForActor(player).setBlock(coords.x, coords.y, coords.z, BlockID[this.getDefaultID() + "_" + color], 0);
                    if(!Utils.isCreativePlayer(player)) {
                        user.decreaseCarriedItem(1);
                    }
                    return;
                } catch {
                    Particles.addParticle(EParticleType.CRIT, coords.x + 0.5, coords.y + 0.5, coords.z + 0.5, 0, 0.01, 0);
                    Game.tipMessage(MathHelper.randomFrom(Native.Color.GREEN, Native.Color.RED) + Translation.translate("gc.message.cable.painting_warning"));
                }
            }
        }
    }
};

class ImprovedAluminumWire extends BasicCable {
    public getDefaultID(): string {
        return "improved_aluminum_wire";
    };

    public getGroupName(): string {
        return "gc.wire";
    };

    public getEnergyType(): EnergyType {
        return EnergyTypes.GJ;
    };

    public getEnergyProvideAmount(): number {
        return 200;
    };

    public getSoundType(): Block.Sound {
        return "cloth";
    };
};

class OxygenPipe extends BasicCable {
    public getDefaultID(): string {
        return "pipe_oxygen";
    };

    public getGroupName(): string {
        return "gc.oxygen-pipe";
    };

    public getEnergyType(): EnergyType {
        return EnergyTypes.OB;
    };

    public getEnergyProvideAmount(): number {
        return 400;
    };

    public getSoundType(): Block.Sound {
        return "glass";
    };
};

namespace Galacticraft {
    export const IMPROVED_ALUMINUM_WIRE = new ImprovedAluminumWire();
    export const OXYGEN_PIPE = new OxygenPipe();

    IMPROVED_ALUMINUM_WIRE.registerAll();
    OXYGEN_PIPE.registerAll();
    
    Item.addToCreative(BlockID["improved_aluminum_wire_gray"], 1, 0);
    Item.addToCreative(BlockID["pipe_oxygen_gray"], 1, 0);
};

