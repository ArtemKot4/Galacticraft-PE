interface CelestialBody extends IAtmosphereProperties, ILocalizeable {
    hasStars?: boolean;
	readonly id: number;
	/**
	 * Method declaring, can be created station of planet or not.
	 */
	canHasStation(): boolean;
	getIconPath(): Nullable<string>;
    getOreData(): { ores: Galacticraft.OreData[], stone: number[] };
    /** 
     * Registers sound.
     * @param name sound string identifier
     * @param filePath file path
     */
    getMusicNameAndPath?(): [name: string, path: string];
    addSatellite?(satellite: ISatellite): this;
    
	satellites?: number[];
    stations?: Record<number, Station>;
}
