namespace UIHelper {
    export namespace Machine {
        export function setEnergyStatus(tile: CommonTileEntity & MachineTile) {
            if(tile.data.energy >= tile.getEnergyCapacity()) {
                tile.container.setText("status", Translation.translate("message.galacticraft.status.energy_full"))
            } else if(tile.data.energy <= 0) {
                tile.container.setText("status", Translation.translate("message.galacticraft.status.no_energy"))
            };
        };
        export function setEnergyDisplay(tile: CommonTileEntity & MachineTile) {
            tile.container.setText("energy_display", "gJ: " + tile.data.energy + "/" + tile.getEnergyCapacity());
        }
    };
};

Translation.addTranslation("message.galacticraft.status.full", {
    en: "Status: full",
    ru: "Статус: заполнен",
});

Translation.addTranslation("message.galacticraft.status.waiting", {
    en: "Status: waiting",
    ru: "Статус: ожидание",
});

Translation.addTranslation("message.galacticraft.status.no_energy", {
    en: "Status: no energy",
    ru: "Статус: нет энергии",
});

Translation.addTranslation("message.galacticraft.status.working", {
    en: "Status: work",
    ru: "Статус: работает"
});