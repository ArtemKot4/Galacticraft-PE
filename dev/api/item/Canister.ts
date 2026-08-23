class Canister extends GalacticraftItem implements IIconOverrideCallback, INameOverrideCallback {
    public emptyTexture;
    public emptyName = "item.galacticraft.empty_liquid_canister";

    public getLiquids(): string[] {
        return ["oil", "fuel"];
    }

    public getCapacity(): number {
        return 1000;
    }

    public constructor() {
        const texture = { name: "empty_liquid_canister", meta: 0 };
        super("canister_gc", texture);
        this.emptyTexture = texture;
        const liquids = this.getLiquids();
        const capacity = this.getCapacity();
        CanisterLiquidRegistry.createFor(this.id, liquids);
        Item.setMaxDamage(this.id, capacity);
        Item.addToCreative(this.id, 1, capacity);

        for(const liquidName of liquids) {
            const extra = new ItemExtraData();
            extra.putString("liquid.name", liquidName);
            Item.addToCreative(this.id, 1, 0, extra);
        }
    }

    public override inCreative(): boolean {
        return false;
    }

    public override getMaxStack(): number {
        return 1;
    }

    public getMeta(amount: number): number {
        if(amount >= 1000) {
            return 6;
        } 
        if(amount >= 900) {
            return 5;
        }
        if(amount >= 750) {
            return 4;
        }
        if(amount >= 500) {
            return 3;
        }
        if(amount >= 250) {
            return 2;
        } 
        if(amount > 0) {
            return 1;
        }
        return 0;
    }

    public onIconOverride({ id, data, extra }: ItemInstance, isModUi: boolean): void | Item.TextureData {
        const meta = this.getMeta(Item.getMaxDamage(id) - data);
        if(!extra || meta == 0) {
            return this.emptyTexture;
        }
        return { name: `${CanisterLiquidRegistry.getCurrentLiquid(extra)}_canister_partial`, meta: meta };
    }

    public onNameOverride({ id, data, extra }: ItemInstance, translation: string, name: string): void | string {
        const liquidName = CanisterLiquidRegistry.getCurrentLiquid(extra);
        const amount = Item.getMaxDamage(id) - data;
        if(!liquidName || data == Item.getMaxDamage(id)) {
            return Native.Color.GRAY + Translation.translate(this.emptyName);
        }
        return Translation.translate(`item.galacticraft.${liquidName}_liquid_canister`) + "\n" + Translation.translate("message.galacticraft.canister_liquid_amount") + amount + " mB";
    }
}