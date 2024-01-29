abstract class DimensionEvent {
    dimension: int,
    public params = {};
    public onTick(player, dimension): void {
     player = Player.get();
        dimension = Player.getDimension == this.dimension;
    };
}