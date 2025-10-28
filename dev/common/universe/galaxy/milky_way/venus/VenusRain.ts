class VenusRain extends WeatherEvent {
    public static instance = new VenusRain();

    public override getProbabilityByTime(): [number, number] {
        return [(20*60*5), 80];
    }

    public override getDuration(): number[] {
        return [(20*60)*5, (20*60)*10, (20*60)*15];
    }

    public override onCall(): void {
        
    }
}