abstract class SpaceSystem implements ILocalizeable {
    public planets: Record<string, IPlanet> = {};

    public getName(): string {
        return "";
    };

    public getLocalizedName(): string {
        return Translation.translate(`galacticraft.space_system.${this.getName()}`);
    };
};