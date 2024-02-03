abstract class DimensionEvent {
    public static 
    abstract dimension: PLANETS = PLANETS.EARTH,
    public static player = Player.get();
    public static abstract onTick(player, dimension): void;
    public static secondTimer = (time) => World.getThreadTime() % ((time * 20) || 20) == 0;
     {
        
    };
};

const PLANETS = {
    EARTH: 0 = 0
}