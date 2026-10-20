const ENERGY_STORAGE_DEBUG = false;

function energyStorageFillTextures(level: number, blue: boolean): any[][] {
    const clamped = Math.max(0, Math.min(16, level));
    let module: any;
    if(blue) {
        module = ["energy_storage_module_b" + clamped, 0];
    }
    else {
        module = ["energy_storage_module", clamped];
    }
    return [
        [blue ? "machine_blue_gc" : "machine_gc", 0],
        [blue ? "machine_blue_gc" : "machine_gc", 0],
        module,
        module,
        [blue ? "machine_input_blue_gc" : "machine_input_gc", 0],
        [blue ? "machine_output_blue_gc" : "machine_output_gc", 0]
    ];
}

// Rotation permutations for engine block data 0..3 (same table as IndustrialCraft2 TileRenderer, same engine).
function energyStorageRotatedTextures(textures: any[][], data: number): any[][] {
    switch(data & 3) {
        case 0: return [textures[0], textures[1], textures[3], textures[2], textures[5], textures[4]];
        case 2: return [textures[0], textures[1], textures[4], textures[5], textures[3], textures[2]];
        case 3: return [textures[0], textures[1], textures[5], textures[4], textures[2], textures[3]];
        default: return textures;
    }
}

function createEnergyStorageClient(blue: boolean): any {
    const refresh = function(client: any): void {
        const blockData = client.blockData;
        // ES-008: regiune client indisponibila -> blockData = -1; nu picta o rotatie falsa.
        if(!(blockData >= 0)) {
            return;
        }
        const level = client.networkData.getInt("fill_level");
        const data = blockData & 3;
        if(level === client.lastLevel && data === client.lastData) {
            return;
        }
        client.lastLevel = level;
        client.lastData = data;
        const render = new ICRender.Model();
        render.addEntry(BlockRenderer.createTexturedBlock(energyStorageRotatedTextures(energyStorageFillTextures(level, blue), data)));
        BlockRenderer.mapAtCoords(client.x, client.y, client.z, render);
        if(ENERGY_STORAGE_DEBUG) {
            Logger.Log("client render level=" + level + " data=" + data + " @" + client.x + "," + client.y + "," + client.z, "GC-ES");
        }
    };
    return {
        lastLevel: -1,
        lastData: -1,
        load: function(): void {
            if(ENERGY_STORAGE_DEBUG) {
                Logger.Log("client load @" + this.x + "," + this.y + "," + this.z, "GC-ES");
            }
            this.lastLevel = -1;
            this.lastData = -1;
            refresh(this);
        },
        tick: function(): void {
            refresh(this);
        }
    };
}

class EnergyStorageTile extends ElectricMachine.TileEntity {
    protected maxExtractRate = 300;
    protected applyAntiDrain = true;
    public override defaultValues = {
        energy: 0,
        lastEnergy: 0,
        fillLevel: -1
    };
    public override data: typeof this.defaultValues;
    public networkData: any;

    public override getScreenByName(): UI.IWindow {
        return EnergyStorageUI;
    }

    public override onInit(): void {
        StorageInterface.data[this.blockID] ??= { slots: {}, classType: StorageInterface.TileEntityInterface };
        this.data.lastEnergy = this.getEnergy(Galacticraft.EnergyTypes.JOULE.name);
        this.data.fillLevel = -1;
        this.updateFillLevel();
    }

    public override onTick(): void {
        const energy = this.getEnergy(Galacticraft.EnergyTypes.JOULE.name);
        if(this.applyAntiDrain && this.data.lastEnergy - energy > this.maxExtractRate - 1) {
            this.setEnergy(Math.max(0, energy - 25), Galacticraft.EnergyTypes.JOULE.name);
        }
        this.data.lastEnergy = this.getEnergy(Galacticraft.EnergyTypes.JOULE.name);
        this.updateFillLevel();
    }

    protected getFillLevel(): number {
        const capacity = this.getCapacity ? this.getCapacity(Galacticraft.EnergyTypes.JOULE.name) : 0;
        if(!(capacity > 0)) {
            return 0;
        }
        const energy = this.getEnergy(Galacticraft.EnergyTypes.JOULE.name);
        return Math.max(0, Math.min(16, Math.floor((energy + 49) * 16 / capacity)));
    }

    protected updateFillLevel(): void {
        const level = this.getFillLevel();
        if(level !== this.data.fillLevel) {
            this.data.fillLevel = level;
            if(this.networkData != null) {
                this.networkData.putInt("fill_level", level);
                this.networkData.sendChanges();
                if(ENERGY_STORAGE_DEBUG) {
                    Logger.Log("server level=" + level + " @" + this.x + "," + this.y + "," + this.z, "GC-ES");
                }
            }
        }
    }

    public client = createEnergyStorageClient(false);
}

class ClusterStorageTile extends EnergyStorageTile {
    protected override maxExtractRate = 1800;
    protected override applyAntiDrain = false;

    public override getScreenByName(): UI.IWindow {
        return ClusterStorageUI;
    }

    public override client = createEnergyStorageClient(true);
}

@ElectricMachine({
    [Galacticraft.EnergyTypes.JOULE.name]: {
        type: ElectricMachine.Type.STORAGE,
        batteryManager: ElectricMachine.DEFAULT_BATTERY_MANAGERS.ENERGY_BATTERY_MANAGER,
        energyKey: "energy",
        capacity: 500000,
        maxExtract: 300,
        maxReceive: 750,
        isValidEnergyInputSide: function(this: ElectricMachine.ITileEntity, side: number): boolean {
            const data = this.blockSource.getBlockData(this.x, this.y, this.z);
            return (
                data == 0 && side == 5 ||
                data == 1 && side == 4 ||
                data == 2 && side == 2 ||
                data == 3 && side == 3
            );
        }
    }
})
class EnergyStorage extends MachineBlock {
    public static tile = new EnergyStorageTile();

    public constructor() {
        super("energy_storage_gc", [{
            name: "tile.galacticraft.energy_storage",
            texture: [
                ["machine_gc", 0],
                ["machine_gc", 0],
                ["energy_storage_module", 16],
                ["energy_storage_module", 16],
                ["machine_input_gc", 0],
                ["machine_output_gc", 0]
            ],
            inCreative: true
        }]);
    }

    public override getTileEntity(): CommonTileEntity {
        return EnergyStorage.tile;
    }
}

@ElectricMachine({
    [Galacticraft.EnergyTypes.JOULE.name]: {
        type: ElectricMachine.Type.STORAGE,
        batteryManager: ElectricMachine.DEFAULT_BATTERY_MANAGERS.ENERGY_BATTERY_MANAGER,
        energyKey: "energy",
        capacity: 2500000,
        maxExtract: 1800,
        maxReceive: 4500,
        isValidEnergyInputSide: function(this: ElectricMachine.ITileEntity, side: number): boolean {
            const data = this.blockSource.getBlockData(this.x, this.y, this.z);
            return (
                data == 0 && side == 5 ||
                data == 1 && side == 4 ||
                data == 2 && side == 2 ||
                data == 3 && side == 3
            );
        }
    }
})
class ClusterStorage extends MachineBlock {
    public static tile = new ClusterStorageTile();

    public constructor() {
        super("cluster_storage_gc", [{
            name: "tile.galacticraft.cluster_storage",
            texture: [
                ["machine_blue_gc", 0],
                ["machine_blue_gc", 0],
                ["energy_storage_module_b16", 0],
                ["energy_storage_module_b16", 0],
                ["machine_input_blue_gc", 0],
                ["machine_output_blue_gc", 0]
            ],
            inCreative: true
        }]);
    }

    public override getTileEntity(): CommonTileEntity {
        return ClusterStorage.tile;
    }
}

Callback.addCallback("PostLoaded", function(): void {
    const targets: [string, boolean][] = [["energy_storage_gc", false], ["cluster_storage_gc", true]];
    for(const [stringID, blue] of targets) {
        //@ts-ignore IDRegistry is an engine global
        const id = IDRegistry.genBlockID(stringID);
        if(!(id > 0)) {
            continue;
        }
        for(let data = 0; data < 4; data++) {
            const render = new ICRender.Model();
            render.addEntry(BlockRenderer.createTexturedBlock(energyStorageRotatedTextures(energyStorageFillTextures(0, blue), data)));
            BlockRenderer.enableCoordMapping(id, data, render);
        }
    }
});
