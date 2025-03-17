class GalacticraftItem extends BasicItem {
    public constructor(stringID: string, texture: IItemTextureDescription, params?: Item.ItemParams) {
        super(stringID, texture, params);

        if("getHint" in this) {
            GalacticraftItem.setHint(this.id, this.getHint());
        };
    };

    public getHint?(): string;

    public static setHint(id: number, hint: string) {
        Item.registerNameOverrideFunction(id, (item, translation, name) => {
            let text = Translation.translate(name) + "\n§7";
            if(Entity.getSneaking(Player.getLocal())) {
                text += hint;
            } else {
                text += Translation.translate("Press SHIFT for view information");
            };

            return Translation.translate(name);
        });
    };

    public getName(): string {
        return "item.galacticraft." + this.id;
    };
};
