class Canister extends GalacticraftItem implements IIconOverrideCallback, INameOverrideCallback {
    public emptyTexture;
    public emptyName = "item.galacticraft.empty_liquid_canister";

    public getLiquids(): string[] {
        return ["oil", "fuel"];
    }

    public constructor() {
        const texture = { name: "empty_liquid_canister", meta: 0 };
        super("canister_gc", texture, {
            isTech: false,
            stack: 1
        });
        this.emptyTexture = texture;

        const liquids = this.getLiquids();
        CanisterLiquidRegistry.createFor(this.id, liquids);

        for(const liquidName of liquids) {
            const extra = new ItemExtraData();
            extra.putString("liquid.name", liquidName);
            extra.putInt("liquid.amount", 1000);
            Item.addToCreative(this.id, 1, 0, extra);
        }
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

    public onIconOverride({ extra }: ItemInstance, isModUi: boolean): void | Item.TextureData {
        const meta = this.getMeta(CanisterLiquidRegistry.getCurrentLiquidAmount(extra));
        if(meta == 0) {
            return this.emptyTexture;
        }
        return { name: `${CanisterLiquidRegistry.getCurrentLiquid(extra)}_canister_partial`, meta: meta };
    }

    public onNameOverride({ id, data, extra }: ItemInstance, translation: string, name: string): void | string {
        const liquidName = CanisterLiquidRegistry.getCurrentLiquid(extra);
        const amount = CanisterLiquidRegistry.getCurrentLiquidAmount(extra) || 0;
        if(!liquidName || amount == 0) {
            return Translation.translate(this.emptyName);
        }
        return Translation.translate(`item.galacticraft.${liquidName}_liquid_canister`) + "\n" + Translation.translate("message.galacticraft.canister_liquid_amount") + amount + " mB";
    }
}