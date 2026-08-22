class FuelLoaderTile extends MachineTile {
    public override defaultValues = {
        centerPaddingX: 0,
        centerPaddingY: 0,
        centerPaddingZ: 0
    };
    public override data: typeof this.defaultValues & { energy: number };

    public rocket: RocketEntity;

    public override getScreenByName(screenName?: string, container?: ItemContainer): UI.IWindow {
        return FuelLoaderUI;
    }

    public definePaddingCenter(): boolean {
        let successfull = false;
        const coords = { x: this.x, y: this.y, z: this.z };
        RocketPadding.passRadius(BlockList.ROCKET_PADDING, coords, (x, z) => {
            if(x == this.x && z == this.z) {
                return true;
            }
            const center = RocketPadding.findCenter(BlockList.ROCKET_PADDING, { x, y: this.y, z }, this.blockSource);
            if(center != null) {
                this.data.centerPaddingX = center.x;
                this.data.centerPaddingY = center.y;
                this.data.centerPaddingZ = center.z;
                successfull = true;
                return false;
            }
        });
        return successfull;
    }

    public getTransferEnergy(): number {
        return 5;
    }

    public transferFuel(): void {
        this.data.energy -= this.getTransferEnergy();

        const rocket = this.getRocketEntity();
        const amount = this.liquidStorage.getAmount("fuel");
        const add = amount >= 5 ? 5 : amount;
        const added = rocket.addFuel(add);
        this.liquidStorage.setAmount("fuel", amount - added);
    }

    public getRocketEntity(): Nullable<RocketEntity> {
        return RocketManager.findRocketEntityByPaddingCoords({ x: this.data.centerPaddingX, y: this.data.centerPaddingY, z: this.data.centerPaddingZ }, this.dimension);
    }

    public getPaddingCenterCoords(): Vector {
        return { x: this.data.centerPaddingX, y: this.data.centerPaddingY, z: this.data.centerPaddingZ };
    }

    public isValidPadding(): boolean {
        return BlockList.ROCKET_PADDING.isCenterBlock(this.getPaddingCenterCoords(), this.blockSource.getBlock(this.data.centerPaddingX, this.data.centerPaddingY, this.data.centerPaddingZ));
    }

    public validatePadding(): void {
        if(!this.isValidPadding()) {
            this.definePaddingCenter();
        }
    }

    public override onInit(): void {
        this.validatePadding();
    }

    public override onTick(): void {
        if(!this.isValidPadding() || this.data.energy < this.getTransferEnergy()) {
            return;
        }
        if(this.liquidStorage.getAmount("fuel") <= 0) {
            return;
        }
        const rocket = this.getRocketEntity();
        if(rocket == null) {
            return;
        }
        if(rocket.fuel < rocket.rocketType.getFuelCapacity()) {
            this.transferFuel();
        }
    }
}