class Canister extends GalacticraftItem implements IconOverrideCallback, INameOverrideCallback, ItemUseCallback {
    public static readonly liquidMax: number = 500;
    public static types: string[] = [];

    public constructor() {
        super("canister_gc", {
            name: "canister",
            meta: 0,
        });
        Item.setLiquidClip(this.id, true);
    };

    public inCreative(): boolean {
        return false;
    };

    public onIconOverride(item: ItemInstance, isModUi: boolean): void | Item.TextureData {
        const liquid = (item.extra && item.extra.getString("type")) || "empty";
        const amount = (item.extra && item.extra.getInt("amount")) || 0;

        return {
            name: liquid + "_canister_partial",
            meta: amount,
        };
    };

    public onNameOverride(item: ItemInstance, translation: string, name: string): string | void {
        const amount = (item.extra && item.extra.getInt("amount")) || 0;
        const liquid = (item.extra && item.extra.getString("type")) || "empty";

        return Translation.translate("item.galacticraft." + liquid + "_canister") + EColor.GRAY + Translation.translate("message.galacticraft.filling") + amount + " / " + Canister.liquidMax + " mB";
    };

    public onItemUse(coords: Callback.ItemUseCoordinates, item: ItemStack, block: Tile, player: number): void {
        const region = BlockSource.getDefaultForActor(player);
        let amount = (item.extra && item.extra.getInt("amount")) || 0;
        const liquid = (item.extra && item.extra.getString("type"));
        const liquidType = GalacticraftLiquid.getLiquidTypeByBlock(block);

        if(!liquidType) {
            if(liquid && amount >= Canister.liquidMax) {
                const liquidBlock = GalacticraftLiquid.getLiquidBlock(liquid);
                region.setBlock(coords.relative.x, coords.relative.y, coords.relative.z, liquidBlock);
                Entity.setCarriedItem(player, this.id, 1, 0, null);
            };
        } else {
            if(amount < Canister.liquidMax) {
                amount = Math.min(Canister.liquidMax, amount + 100);
                const extra = new ItemExtraData();

                extra.putString("type", liquidType);
                extra.putInt("amount", amount);
                Entity.setCarriedItem(player, this.id, 1, 0, extra);
            };
        };
        if(!item.extra && LiquidRegistry.getLiquidByBlock(block.id)) return;
    };

    public getItemCategory(): EItemCategory {
        return EItemCategory.TOOL;
    };

    public static add(type: string) {
        if(!GalacticraftLiquid.isValidType(type)) {
            throw new java.lang.RuntimeException("Error in Canister.prototype.add: it is liquid type is not contains in GalacticraftLiquid.prototype.types, because not supports");
        };
        Canister.types.push(type);
    };
};

Callback.addCallback("ModsLoaded", () => {
    for(const type of Canister.types) {
        const extra = new ItemExtraData();
        extra.putString("type", type);
        extra.putInt("amount", Canister.liquidMax);

        Item.addToCreative(ItemList.CANISTER.id, 1, 0, extra);
    };
});

Canister.add("oil");
Canister.add("fuel");