interface IPlanet extends IAtmosphereProperties, ILocalizeable {
	readonly id: number;
	/**
	 * Method declaring, can be created station of planet or not.
	 */
	canHasStation(): boolean;
	getIcon(): Nullable<string>;
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
