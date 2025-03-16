class Canister {
    public static readonly liquidMax: number = 500;
    public static readonly list: string[] = [];
    public static readonly item: GalacticraftItem = new (class extends GalacticraftItem implements IconOverrideCallback, INameOverrideCallback {
        public constructor() {
            super("canister_gc", {
                name: "canister",
                meta: 0
            })
        };

        public inCreative(): boolean {
            return false;
        };

        public onIconOverride(item: ItemInstance, isModUi: boolean): void | Item.TextureData {
            const liquid = item.extra && item.extra.getString("type") || "empty";
            const amount = item.extra && item.extra.getInt("amount") || 0;

            return {
                name: liquid + "_canister_partial_",
                meta: amount
            };
        };

        public onNameOverride(item: ItemInstance, translation: string, name: string): string | void {
            const amount = item.extra && item.extra.getInt("amount") || 0;
            const liquid = item.extra && item.extra.getString("type") || "empty";

            return Translation.translate("item.galacticraft." + liquid + "_canister") + EColor.GRAY + Translation.translate("message.galacticraft.filling") + amount + " / " + Canister.liquidMax + " mB"; 
        };

        public getItemCategory(): EItemCategory {
            return EItemCategory.TOOL;
        };
    });

    public constructor(fuel: string) {
        Canister.list.push(fuel);
    };
};

Callback.addCallback("ModsLoaded", () => {
    for(const fuel of Canister.list) {
        const extra = new ItemExtraData();
        extra.putString("type", fuel);
        extra.putInt("amount", Canister.liquidMax);

        Item.addToCreative(Canister.item.id, 1, 0, extra);
    };
});

new Canister("oil");
new Canister("fuel");