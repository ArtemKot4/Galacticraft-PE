interface IPlanet extends ILocalizeable {
    satellites: Record<string, Satellite>;
    hasStars(): boolean;
    hasDefaultSkyboxes(): boolean;
    getCelestialBody(): CelestialBody;
    addSatellite(satellite: Satellite): void;
    getTier?(): number;
    getDisplayTexture?(): string;
    id: number;
};