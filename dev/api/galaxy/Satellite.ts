abstract class Satellite extends Planet {
    public getName(): string {
        return "";
    };

    public getLocalizedName(): string {
        return Translation.translate(`galacticraft.satellite.${this.getName()}`);
    };
}