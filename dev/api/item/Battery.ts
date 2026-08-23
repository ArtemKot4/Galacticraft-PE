declare namespace GalacticraftItem {
    export type BatteryParams = Partial<Pick<IElectricItem, 'energy' | 'tier' | 'canProvideEnergy'>> & Omit<IElectricItem, 'energy' | 'tier' | 'canProvideEnergy'> & { type?: "atomic" | "infinity" };
}

class Battery extends GalacticraftItem implements INameOverrideCallback {
    public constructor(stringID: string, texture: IItemTextureDescription, public batteryParams: GalacticraftItem.BatteryParams = {}) {
        super(stringID, texture);
        this.applyParams();
    }

    public applyParams() {
        if("type" in this.batteryParams) {
            Item.addToCreative(this.id, 1, 0 ,new ItemExtraData().putString("battery.special_type", this.batteryParams.type));
        } else {
            this.batteryParams.tier = 0;
            this.batteryParams.energy = Galacticraft.EnergyTypes.JOULE.name;
            this.batteryParams.canProvideEnergy = true;
            this.batteryParams.maxCharge ??= 15000;
            ChargeItemRegistry.registerItem(this.id, this.batteryParams as IElectricItem, false);
            Item.setMaxDamage(this.id, this.batteryParams.maxCharge);
            Item.addToCreative(this.id, 1, this.batteryParams.maxCharge, new ItemExtraData().putInt("energy", 0));
            Item.addToCreative(this.id, 1, 0, new ItemExtraData().putInt("energy", this.batteryParams.maxCharge));
        }
    }

    public override inCreative(): boolean {
        return false;
    }

    public override getMaxStack(): number {
        return 1;
    }

    public onNameOverride(item: ItemInstance, translation: string, name: string): void | string {
        const extra = item.extra || new ItemExtraData();
        const type = extra.getString("battery.special_type") as GalacticraftItem.BatteryParams["type"];
        if(!type && item.data == ChargeItemRegistry.getMaxCharge(item.id, Galacticraft.EnergyTypes.JOULE.name)) {
            return Translation.translate("item.galacticraft.discharged_battery");
        }
        const amount = extra.getInt("energy");
        let color = "";
        let header = Translation.translate(name);
        let display: string;

        switch(type) {
            case "atomic": {
                color = Native.Color.GOLD;
                display = "10 gJ / T"; 
                break;
            }
            case "infinity": {
                color = Native.Color.DARK_PURPLE;
                display = Translation.translate("message.galacticraft.infinity") + " gJ / T"; 
                break;
            }
            default: {
                display = amount + " / " + ChargeItemRegistry.getMaxCharge(item.id, Galacticraft.EnergyTypes.JOULE.name) + " gJ";
            }
        }
        return color + header + "\n" + Native.Color.WHITE + display;
    }
}