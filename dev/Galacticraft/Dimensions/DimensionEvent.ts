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
    MOON: 4 = 4,
    MARS: 5 = 5,
    VENUS: 6 = 6,
    ASTEROIDS: 7 = 7
}