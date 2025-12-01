interface IAtmosphereProperties {
    /**
     * Gravity, in percents
     */
    getGravity(): Nullable<number>;
    getMeteoriteProbability(): number;
    /**
     * Day length, in minutes
     */
    getDayLength(): Nullable<number>;
    /**
     * Pressure, in percents
     */
    getPressure(): number;
    /**
     * If has not oxygen, player will get damage without equipment
     */
    hasOxygen(): boolean;
    getTemperature(): number;
    /**
     * Events, which will be called when player at the planet
     */
    getWeatherEvents(): Nullable<WeatherEvent[]>;
    getWindLevel(): number;
    /**
     * Sun energy, in percents
     */
    getSunEnergy(): number;
    getMobIDsWithProbability(): Record<number, string>;
    /**
     * @default false
     */
    showStarsAlways?(): boolean;
    /**
     * @default false
     */
    hideSkyboxes?(): boolean;
    hideClouds?(): boolean;
}