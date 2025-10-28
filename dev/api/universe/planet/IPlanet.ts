interface IPlanet extends IAtmosphereProperties, ILocalizeable {
	readonly id: number;
	/**
	 * Method declaring, can be created station of planet or not.
	 */
	canHasStation(): boolean;
	getIcon(): Nullable<string>;
    getOreData(): { ores: Galacticraft.OreData[], stone: number[] };
	satellites?: ISatellite[];
}
