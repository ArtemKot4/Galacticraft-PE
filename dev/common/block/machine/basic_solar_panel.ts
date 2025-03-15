class SolarPanelTop extends GalacticraftBlock implements IBlockModel {
    public constructor() {
        super("solar_panel_top", [
            {
                name: "block.galacticraft.solar_panel",
                texture: [["solar_basic", 0]],
                inCreative: false
            }
        ]);
    };

    public getModel(): RenderMesh {
        const mesh = RenderHelper.generateMesh(__modelsdir__, "solar_panel", {
            translate: [1.6, 1.6, 1.6],
            invertV: false,
            noRebuild: false,
        });

        mesh.setBlockTexture("solar_panel", 0);

        return mesh;
    };
};

class BasicSolarPanel extends MachineBlock implements IPlaceCallback {
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

    public getTileEntity(): CommonTileEntity {
        return new SolarPanelTile();
    };
};

class SolarPanelTile extends Generator {
    public data = {
        energy: 0,
    };

    public getCapacity(): number {
        return 5000;
    };

    public onTick(): void {
        this.container.sendChanges();
        this.container.validateAll();

        const capacity = this.getCapacity();
        const light = this.blockSource.getLightLevel(this.x, this.y + 1, this.z);

        this.container.setScale("sunscale", this.data.energy / 10);
        this.container.setScale("ENERGYBar", this.data.energy / capacity);
        this.container.setScale("Energy", this.data.energy / 100);
        this.container.setText("EnergyText", "Sj :" + this.data.energy + " / " + capacity);

        if (this.data.energy >= 5000) {
            this.container.setText("Status", Translation.translate("Status: storage full"));
        }

        if (light >= 2) {
            this.container.setText("LightLevel", Translation.translate("Light: normal"));
            this.container.setText("Status", Translation.translate("Status: working"));
        }

        if (World.getThreadTime() % 1 == 0 && light == 15 && this.data.energy != capacity) {
            this.data.energy += 1;
        }

        if (World.getThreadTime() % 60 == 0 && light <= 1 && this.data.energy <= 1) {
            if (__config__.getBool("Difficulty.Machine.PanelDischarging") == true) {
                this.data.energy -= 1;
            };

            this.container.setText("Status", Translation.translate("Status: waiting"));
            this.container.setText("LightLevel", Translation.translate("Light: few"));
        };
    };

    public onDestoryTile(): boolean {
        this.blockSource.setBlock(this.x, this.y + 1, this.z, 0, 0);
        return false;
    };

    public getScreenByName(): UI.StandartWindow {
        return BasicSolarPanelUI;
    };
};
