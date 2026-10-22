declare namespace GalacticraftItem {
    export type BatteryParams = Partial<Pick<IElectricItem, 'energy' | 'tier' | 'canProvideEnergy'>> & Omit<IElectricItem, 'energy' | 'tier' | 'canProvideEnergy'> & { type?: "atomic" | "infinity" };
}

class Battery extends GalacticraftItem implements INameOverrideCallback {
    public constructor(stringID: string, texture: IItemTextureDescription, public batteryParams: GalacticraftItem.BatteryParams = {}) {
        // BasicItem.create() calls getMaxStack() DURING super(), before parameter properties are assigned.
        // Stack must be resolved here, from the local parameter, to avoid reading uninitialized this.batteryParams.
        super(stringID, texture, { stack: "type" in batteryParams ? 1 : 4 } as any);
        this.applyParams();
    }

    public getEnergyType(): string {
        return Galacticraft.EnergyTypes.JOULE.name;
    }

    public getSpecialTypeKey(): string {
        return "battery.special_type";
    }

    public applyParams() {
        if("type" in this.batteryParams) {
            Item.addToCreative(this.id, 1, 0 ,new ItemExtraData().putString(this.getSpecialTypeKey(), this.batteryParams.type));
        } else {
            this.batteryParams.tier ??= 1;
            this.batteryParams.energy = this.getEnergyType();
            this.batteryParams.canProvideEnergy = true;
            this.batteryParams.maxCharge ??= 15000;
            this.batteryParams.transferLimit ??= 200;
            ChargeItemRegistry.registerItem(this.id, this.batteryParams as IElectricItem, false);
            Item.setMaxDamage(this.id, 100);
            Item.addToCreative(this.id, 1, this.batteryParams.maxCharge, new ItemExtraData().putInt("energy", 0));
            Item.addToCreative(this.id, 1, 0, new ItemExtraData().putInt("energy", this.batteryParams.maxCharge));
        }
    }

    public override inCreative(): boolean {
        return false;
    }

    public override getMaxStack(): number {
        return this.batteryParams != null && "type" in this.batteryParams ? 1 : 4;
    }

    public getEmptyName(): string {
        return "item.galacticraft.discharged_battery";
    }

    public onNameOverride(item: ItemInstance, translation: string, name: string): void | string {
        const extra = item.extra || new ItemExtraData();
        const type = extra.getString(this.getSpecialTypeKey()) as GalacticraftItem.BatteryParams["type"];
        const amount = extra.getInt("energy");
        if(!type && amount <= 0) {
            return Translation.translate(this.getEmptyName());
        }
        let color = "";
        let header = Translation.translate(name);
        let display: string;

        switch(type) {
            case "atomic": {
                color = Native.Color.GOLD;
                display = "10 / T"; 
                break;
            }
            case "infinity": {
                color = Native.Color.GREEN;
                display = Translation.translate("message.galacticraft.infinity") + " / T"; 
                break;
            }
            default: {
                display = amount + " / " + ChargeItemRegistry.getMaxCharge(item.id, this.getEnergyType()) + " T";
            }
        }
        return color + header + "\n" + Native.Color.WHITE + display;
    }
}