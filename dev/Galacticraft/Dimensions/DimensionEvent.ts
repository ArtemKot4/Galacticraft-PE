abstract class DimensionEvent {
    public static abstract dimension: PLANETS = PLANETS.EARTH,
    public static player = Player.get();
    public static abstract onTick(player, dimension): void;
    public static secondTimer = (time) => World.getThreadTime() % ((time * 20) || 20) == 0;
     {
        
    };
};

enum PLANETS = {
    EARTH: 0 = 0,
    SPACE_STATION: 27,
    MOON: 28 = 28,
    MARS: 29 = 29,
    VENUS: 31 = 31,
    ASTEROIDS: 7 = 7,
}