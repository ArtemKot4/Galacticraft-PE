abstract class WeatherEvent {
    /**
     * First number is probability, in percents, second is time in ticks 
     */
    abstract getProbabilityByTime(): [number, number];
    /**
     * In ticks
     */
    abstract getDuration(): number[];
}