class SolarPanelTile extends ElectricMachine.TileEntity {
    protected generateRate = 200;
    public solarTier = 1;
    public override defaultValues = {
        energy: 0,
        solarStrength: 0,
        scanCooldown: 0,
        currentAngle: 77.5,
        targetAngle: 77.5
    };
    public override data: typeof this.defaultValues & { disabled: boolean };

    public override getScreenByName(): UI.IWindow {
        return BasicSolarPanelUI;
    }

    public override onInit(): void {
        this.data.solarStrength ??= 0;
        this.data.scanCooldown ??= 0;
        this.data.currentAngle ??= 77.5;
        this.data.targetAngle ??= 77.5;
        StorageInterfaceHelper.addSlotInputPolicyFromContainer(this.blockID, "battery_slot_charge");
        StorageInterfaceHelper.addSlotOutputPolicyFromContainer(this.blockID, "battery_slot_charge");
        const lastRedstone = (this as any).redstone;
        this.redstone = (params: Callback.RedstoneSignalParams) => {
            if(typeof lastRedstone == "function") {
                lastRedstone.call(this, params);
            }
            this.updateDisabledStatus();
        };
    }

    public updateDisabledStatus(): void {
        if(this.data.disabled != true) {
            return;
        }
        const status = this.getStatusText();
        if(status != this.lastStatusDisplay) {
            this.lastStatusDisplay = status;
            this.container.setText("status_display", status);
        }
    }

    public getBatteryChargeRate(): number {
        return 200;
    }

    protected lastSunscale = -1;
    protected lastEnergyDisplay = "";
    protected lastStatusDisplay = "";
    protected lastGeneratingDisplay = "";
    protected lastBoostDisplay = "";

    public getCelestialAngle(worldTime?: number): number {
        if(worldTime === undefined) {
            worldTime = World.getWorldTime();
        }
        let f = (worldTime % 24000) / 24000 - 0.25;

        if(f < 0) {
            f += 1;
        }
        if(f > 1) {
            f -= 1;
        }
        const f1 = 1 - (Math.cos(f * Math.PI) + 1) / 2;
        const vanilla = f1 + (f - f1) / 3;
        const angle = vanilla - 0.7845194 < 0 ? 1 - 0.7845194 : -0.7845194;

        return ((vanilla + angle) * 360 + 12.5) % 360;
    }

    public isDaytime(celestialAngle?: number, worldTime?: number): boolean {
        if(celestialAngle == null) {
            celestialAngle = this.getCelestialAngle();
        }
        if(worldTime == null) {
            worldTime = World.getWorldTime();
        }
        return worldTime % 24000 < 12000 && (celestialAngle < 180.5 || celestialAngle > 359.5);
    }

    public getSolarBoost(): number {
        const body = Galacticraft.getCelestialBodyByID(this.dimension);
        const sunEnergy = body != null && body.getSunEnergy ? body.getSunEnergy() : 0;
        return 1 + sunEnergy / 100;
    }

    public updateAngle(celestialAngle?: number, daytime?: boolean, weatherClear?: boolean): void {
        if(celestialAngle == null) {
            celestialAngle = this.getCelestialAngle();
        }
        if(daytime == null) {
            daytime = this.isDaytime(celestialAngle);
        }
        if(weatherClear == null) {
            weatherClear = this.isWeatherClear();
        }
        if(!daytime || !weatherClear) {
            this.data.targetAngle = 77.5 + 180;
        } else if(this.solarTier == 1) {
            this.data.targetAngle = 77.5;
        } else if(celestialAngle > 27.5 && celestialAngle < 152.5) {
            const difference = this.data.targetAngle - celestialAngle + 12.5;
            this.data.targetAngle -= difference / 20;
        } else if(celestialAngle <= 27.5 || celestialAngle > 270) {
            this.data.targetAngle = 15;
        } else {
            this.data.targetAngle = 140;
        }
        this.data.currentAngle += (this.data.targetAngle - this.data.currentAngle) / 20;
    }

    public getGenerate(celestialAngle?: number, boost?: number): number {
        if(this.data.disabled == true) {
            return 0;
        }
        if(celestialAngle === undefined) {
            celestialAngle = this.getCelestialAngle();
        }
        if(boost === undefined) {
            boost = this.getSolarBoost();
        }
        const difference = (180 - Math.abs((this.data.currentAngle + 12.5) % 180 - celestialAngle)) / 180;
        return Math.floor(0.01 * difference * difference * (this.data.solarStrength * (Math.abs(difference) * 500)) * boost);
    }

    public override onTick(): void {
        const worldTime = World.getWorldTime();
        const celestialAngle = this.getCelestialAngle(worldTime);
        const daytime = this.isDaytime(celestialAngle, worldTime);
        const weatherClear = this.isWeatherClear();
        const boost = this.getSolarBoost();

        this.updateAngle(celestialAngle, daytime, weatherClear);

        if(this.data.scanCooldown > 0) {
            this.data.scanCooldown--;
        } else {
            this.data.scanCooldown = 20;
            this.data.solarStrength = (daytime && weatherClear) ? this.scanSolarStrength() : 0;
        }
        const generated = this.getGenerate(celestialAngle, boost);

        if(generated > 0) {
            this.addEnergy(generated, Galacticraft.EnergyTypes.JOULE.name);
        }
        const sunscale = this.data.solarStrength / 9;
        if(sunscale != this.lastSunscale) {
            this.lastSunscale = sunscale;
            this.container.setScale("sunscale", sunscale);
        }
        const display = Math.floor(this.getEnergy(Galacticraft.EnergyTypes.JOULE.name)) + " gJ";
        if(display != this.lastEnergyDisplay) {
            this.lastEnergyDisplay = display;
            this.container.setText("energy_display", display);
        }
        const status = this.getStatusText(generated, daytime, weatherClear);
        if(status != this.lastStatusDisplay) {
            this.lastStatusDisplay = status;
            this.container.setText("status_display", status);
        }
        const generating = generated > 0 ? "Generating: " + generated + " gJ/t" : "Not Generating";
        if(generating != this.lastGeneratingDisplay) {
            this.lastGeneratingDisplay = generating;
            this.container.setText("generating_display", generating);
        }
        const boostDisplay = "Boost: " + (Math.round((boost - 1) * 1000) / 10) + "%";
        if(boostDisplay != this.lastBoostDisplay) {
            this.lastBoostDisplay = boostDisplay;
            this.container.setText("boost_display", boostDisplay);
        }
    }

    public isWeatherClear(): boolean {
        const weather = World.getWeather();
        return weather == null || (weather.rain == 0 && weather.thunder == 0);
    }

    public canGenerate(): boolean {
        if(this.data.disabled == true) {
            return false;
        }
        if(!this.isDaytime()) {
            return false;
        }
        return this.isWeatherClear();
    }

    public getStatusText(generated?: number, daytime?: boolean, weatherClear?: boolean): string {
        if(this.data.disabled == true) {
            return "Status: Disabled";
        }
        if(daytime === undefined) {
            daytime = this.isDaytime();
        }
        if(weatherClear === undefined) {
            weatherClear = this.isWeatherClear();
        }
        if(!daytime || !weatherClear) {
            return "Status: Blocked";
        }
        if(generated === undefined) {
            generated = this.getGenerate();
        }
        if(generated > 0) {
            return "Status: Collecting Energy";
        }
        return "Status: Idle";
    }

    public scanSolarStrength(): number {
        const visible = this.solarTier == 1 ? this.blockSource.canSeeSky(this.x, this.y + 1, this.z) : this.scanAdvancedRay(0, 0);

        return visible ? 9 : 0;
        /*
        let strength = 0;

        for(let x = -1; x <= 1; x++) {
            for(let z = -1; z <= 1; z++) {
                const visible = this.solarTier == 1 ? this.blockSource.canSeeSky(this.x + x, this.y + 1, this.z + z) : this.scanAdvancedRay(x, z);

                if(visible) {
                    strength++;
                }
            }
        }
        return strength;
        */
    }

    public scanAdvancedRay(x: number, z: number): boolean {
        const radians = (this.data.currentAngle - 77.5) / 57.29577951308232;
        const sinA = -Math.sin(radians);
        const cosA = Math.abs(Math.cos(radians));

        for(let d = 0; d < 100; d++) {
            const y = this.y + 3 + Math.floor(d * cosA);

            if(y > 255) {
                continue;
            }
            const bx = this.x + x + (d * sinA < 0 ? Math.ceil(d * sinA) : Math.floor(d * sinA));
            const id = this.blockSource.getBlockID(bx, y, this.z + z);

            if(id != 0 && this.isSolarRayBlocker(id)) {
                return false;
            }
        }
        return true;
    }


    public isSolarRayBlocker(id: number): boolean {
        if(Block.isSolid(id) == false) {
            return false;
        }
        const material = ToolAPI.getBlockMaterialName(id);

        return material != "glass" && material != "plant" && material != "fibre" && material != "_ice";
    }
}

class AdvancedSolarPanelTile extends SolarPanelTile {
    public override solarTier = 2;

    public override getScreenByName(): UI.IWindow {
        return AdvancedSolarPanelUI;
    }

    public override getBatteryChargeRate(): number {
        return 500;
    }
}