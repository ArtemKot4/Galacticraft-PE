class CoalGenerator extends MachineBlock {
    public constructor() {
        super("coal_generator", [{
            name: "Coal Generator", texture: [["Machine", 0], ["Machine", 0], ["Machine", 0], ["Coal Generator", 0], ["Machine Output", 0], ["Machine Output", 0]], inCreative: true
        }, {
            name: "Coal Generator", texture: [["Machine", 0], ["Machine", 0], ["Machine", 0], ["Coal Generator", 0], ["Machine Output", 0], ["Machine Output", 0]], inCreative: false
        }, {
            name: "Coal Generator", texture: [["Machine", 0], ["Machine", 0], ["Machine", 0], ["Coal Generator", 0], ["Machine Output", 0], ["Machine Output", 0]], inCreative: false
        }]);
    };

    public canRotate(): boolean {
        return true;
    };

    public getHint(): string {
        return "4 gJ/ s";
    };

    public getTileEntity(): CommonTileEntity {
        return new CoalGeneratorTile();
    };
};

const CoalFactory = new RecipeFactory();
CoalFactory.set({
    "coal_slot": {
        id: VanillaItemID.coal, count: 1, data: 0, extra: null
    },
    "power": 3000
});


CoalFactory.set({
    "coal_slot": {
        id: VanillaItemID.stick, count: 1, data: 0, extra: null
    },
    "power": 150
});

class LocalCoalGeneratorTile extends LocalTileEntity {
    public onTick(): void {
        const active = this.networkData.getBoolean("active", false);

        if(active) {
            Particles.addParticle(
                EParticleType.FLAME, this.x + 0.5,
                this.y + 0.5,
                this.z + 0.5,
                Math.random() / 20,
                Math.random() / 20,
                Math.random() / 20
            );
    
            Particles.addParticle(
                EParticleType.CLOUD, this.x + 0.5,
                this.y + 0.5,
                this.z + 0.5,
                Math.random() / 20,
                Math.random() / 20,
                Math.random() / 20
            );
        };
    };
};

class CoalGeneratorTile extends Generator {
    public data = {
        energy: 0,
        burningMax: 3000,
        burning: 0,
        active: false
    };

    public getCapacity(): number {
        return 3000;
    };

    public static setLogic(slotName: name, tile: CommonTileEntity & Machine): void {
        if(tile.data.energy >= tile.getCapacity()) { 
            tile.data.active = false; 
            tile.data.burning = 0;
            return;
        };

        const slot = tile.container.getSlot(slotName);
        const recipe = CoalFactory.get(tile.container, slotName);

        if(recipe != null) {
            tile.data.burning += tile.data.burningMax;
            tile.container.setSlot(slotName, slot.id, slot.count-1, slot.data);
            tile.data.active = true;
        };

        if(
            tile.data.burning === tile.data.burningMax && 
            tile.data.active && 
            tile.data.energy <= tile.getCapacity()
        ) { 
            tile.data.energy += 1;
        };
    };

    public onTick(): void {
        this.container.sendChanges();
        this.container.validateAll();

        CoalGeneratorTile.setLogic("coal_slot", this);

        this.container.setScale("progress_scale", this.data.energy / this.getCapacity());
        this.container.setText("EnergyText", "gJ :" + this.data.energy + " / " + this.getCapacity());

        if(this.data.energy > 0) {
            this.container.setText("Status", Translation.translate("Status: working"));
        } else {
            this.container.setText("Status", Translation.translate("Status: fuel empty"));
        };

        if(this.data.energy >= this.getCapacity()) {
            this.container.setText("Status", Translation.translate("Status: storage full"));
        };

        this.networkData.putBoolean("active", this.data.active);
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
