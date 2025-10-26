namespace Atmosphere {
  export abstract class DimensionEvent {
    public static dimension: int = 0;
    public static player = Player.get();
    public static onTick(player, dimension): void {}
    public static secondTimer = (time) =>
      World.getThreadTime() % (time * 20 || 20) == 0;
  }
}
