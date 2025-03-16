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

        this.container.setScale("sun_scale", this.data.energy / 10);
        this.container.setScale("energy_bar", this.data.energy / capacity);
        this.container.setScale("energy_icon", this.data.energy / 100);
        this.container.setText("energy_display", "Sj :" + this.data.energy + " / " + capacity);

        if(this.data.energy >= 5000) {
            this.container.setText("status", Translation.translate("message.galacticraft.status.full"));
        }

        if(light >= 2) {
            this.container.setText("light_level_display", Translation.translate("message.galacticraft.status.lightlevel_enough"));
            this.container.setText("status", Translation.translate("message.galacticraft.status.working"));
        };

        if(World.getThreadTime() % 1 == 0 && light == 15 && this.data.energy != capacity) {
            this.data.energy += 1;
        };

        if(World.getThreadTime() % 60 == 0 && light <= 1 && this.data.energy <= 1) {
            if(__config__.getBool("Difficulty.Machine.PanelDischarging") == true) {
                this.data.energy -= 1;
            };

            this.container.setText("status", Translation.translate("message.galacticraft.status.waiting"));
            this.container.setText("light_level_display", Translation.translate("message.galacticraft.status.lightlevel_not_enough"));
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

Translation.addTranslation("message.galacticraft.status.lightlevel_enough", {
    en: "Light level: enough",
    ru: "Уровень освещения: достаточно"
});

Translation.addTranslation("message.galacticraft.status.lightlevel_not_enough", {
    en: "Light level: not enough",
    ru: "Уровень освещения: недостаточно"
});