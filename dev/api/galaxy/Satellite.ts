abstract class Satellite extends Planet {
    public getLocalizedName(): string {
        return Translation.translate(`galacticraft.satellite.${this.getName()}`);
    };

    public static isStation(satellite: Satellite): satellite is Station {
        return satellite instanceof Station;
    };
};