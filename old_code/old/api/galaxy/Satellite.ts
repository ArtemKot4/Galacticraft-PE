abstract class Satellite extends Planet {
    public getLocalizedName(): string {
        return Translation.translate(`galacticraft.satellite.${this.getName()}`);
    };

    public static isStation(satellite: IPlanet): satellite is Station {
        return satellite instanceof Station;
    };
};