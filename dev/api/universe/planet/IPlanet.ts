interface IPlanet extends IAtmosphereProperties {
    readonly id: number;
    readonly canHasStation?: boolean;
    getIcon(): Nullable<string>;
    satellites: ISatellite[];
}