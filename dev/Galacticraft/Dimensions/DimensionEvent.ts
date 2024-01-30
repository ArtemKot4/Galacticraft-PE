abstract class DimensionEvent {
    public dimension: int = 0,
    public player = Player.get();
    public onTick(player, dimension): void;
    public secondTimer = (time) => World.getThreadTime() % ((time * 20) || 20) == 0;
     {
        
    };
}