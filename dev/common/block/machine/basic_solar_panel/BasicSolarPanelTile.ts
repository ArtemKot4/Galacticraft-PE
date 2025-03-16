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
