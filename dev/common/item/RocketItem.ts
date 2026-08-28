class RocketItem extends GalacticraftItem implements INameOverrideCallback {
    public onNameOverride({ extra }: ItemInstance, translation: string, name: string): void | string {
        let header = Translation.translate(name) + Native.Color.GRAY;
        if(!extra) {
            return header;
        }
        const fuel = extra.getInt("fuelAmount", 0);
        const slotCount = extra.getInt("slotCount", 0);
        header += "\n" + Translation.translate("galacticraft.message.fuel_count_in_rocket") + fuel;
        
        if(slotCount > 0) {
            header += "\n" + Translation.translate("galacticraft.message.slot_count_in_rocket") + slotCount;
        }
        return header;
    }
}

Translation.addTranslation("galacticraft.message.fuel_count_in_rocket", {
    en: "Fuel amount: ",
    ru: "Количество топлива: "
});

Translation.addTranslation("galacticraft.message.slot_count_in_rocket", {
    en: "Storage size: ",
    ru: "Размер хранилища: "
});