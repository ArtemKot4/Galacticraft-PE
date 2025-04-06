class Battery extends GalacticraftItem {
    public static list: Record<number, Battery> = {};

    public capacityDisplay: string;

    public constructor(stringID: string, texture: IItemTextureDescription, public capacity: number, public speed: number = 7) {
        super(stringID, texture, null);

        ChargeItemRegistry.registerItem(
            this.id,
            "galacticraft_joule",
            capacity,
            20,
            1,
            true
        );

        Battery.list[this.id] = this;

        if(capacity == -1) {
            this.capacityDisplay = Translation.translate("message.galacticraft.infinity");
            this.onNameOverride = (item, translation, name) => Translation.translate(name) + "\n" + this.capacityDisplay;
        } else {
            this.onNameOverride = (item, translation, name) => Translation.translate(name) + "\n" + EColor.GRAY + "gJ: " + item.extra != null ? item.extra.getInt("energy", 0) : 0 + " / " + this.capacity;
        };

        Item.registerNameOverrideFunction(this.id, this.onNameOverride);
    };

    public onNameOverride?(item: ItemInstance, translation: string, name: string);
    
    public static chargeMachine(tile: CommonTileEntity & MachineTile, batterySlot: string) {
        const slot = tile.container.getSlot(batterySlot);

        if(slot.id in Battery.list) {
            const battery = Battery.list[slot.id];
            if(World.getThreadTime() % battery.speed === 0) {
                if(battery.capacity === -1) {
                    tile.data.energy = Math.min(tile.getEnergyCapacity(), tile.data.energy);
                    return;
                };
                tile.data.energy += ChargeItemRegistry.getEnergyFromSlot(slot, "galacticraft_joule", 1, 1);
            };
        };
    };
};