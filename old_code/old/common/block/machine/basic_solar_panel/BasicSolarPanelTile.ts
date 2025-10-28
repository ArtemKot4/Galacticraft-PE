class SolarPanelTile extends Generator {
    public override defaultValues = {
        energy: 0
    }
    
    public getEnergyCapacity(): number {
        return 5000;
    }

    public onTick(): void {
        this.container.sendChanges();
        this.container.validateAll();

        const capacity = this.getEnergyCapacity();
        const light = this.blockSource.getLightLevel(this.x, this.y + 1, this.z);

        this.container.setScale("sun_scale", this.data.energy / 10);
        this.container.setScale("energy_bar", this.data.energy / capacity);
        this.container.setScale("energy_icon", this.data.energy / 100);
        this.container.setText("energy_display", "Sj :" + this.data.energy + " / " + capacity);

        UIHelper.Machine.setEnergyStatus(this);

        if(light >= 2) {
            this.container.setText("light_level_display", Translation.translate("message.galacticraft.status.lightlevel_enough"));
        }

        if(World.getThreadTime() % 1 == 0 && light == 15 && this.data.energy != capacity) {
            this.data.energy += 1;
        }

        if(World.getThreadTime() % 60 == 0 && light <= 1 && this.data.energy <= 1) {
            if(__config__.getBool("difficulty.machine.panel_discharging") == true) {
                this.data.energy -= 1;
            }

            this.container.setText("light_level_display", Translation.translate("message.galacticraft.status.lightlevel_not_enough"));
        }
    }

    public onDestoryTile(): boolean {
        this.blockSource.setBlock(this.x, this.y + 1, this.z, 0, 0);
        return false;
    }

    public getScreenByName(): UI.StandartWindow {
        return BasicSolarPanelUI;
    }
}

Translation.addTranslation("message.galacticraft.status.lightlevel_enough", {
    en: "Light level: enough",
    ru: "Уровень освещения: достаточно",
});

Translation.addTranslation("message.galacticraft.status.lightlevel_not_enough", {
    en: "Light level: not enough",
    ru: "Уровень освещения: недостаточно",
});
