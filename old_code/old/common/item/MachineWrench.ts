class MachineWrench extends GalacticraftItem {
    public constructor() {
        super("machine_wrench", {
            name: "machine_wrench",
            meta: 0
        });
    };

    public getTags(): string[] {
        return ["wrench"]
    };
};

Translation.addTranslation("item.galacticraft.machine_wrench", {
    en: "Machine wrench",
    ru: "Гаечный ключ"
});