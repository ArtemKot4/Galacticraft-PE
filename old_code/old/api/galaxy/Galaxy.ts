abstract class Galaxy implements ILocalizeable {
    public systems: Record<string, SpaceSystem> = {};

    public getName(): string {
        return "";
    };

    public getLocalizedName(): string {
        return Translation.translate(`galacticraft.galaxy.${this.getName()}`);
    };
};