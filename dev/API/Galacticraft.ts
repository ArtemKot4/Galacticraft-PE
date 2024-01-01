class Galacticraft {
  //public static readonly MODID = "galacticraft:";
  public static onInitialize = () => {
    Game.message(String(Ballone.IDList))
  };
  public static onTick = () => {
    OxygenTick();
  };

}

Callback.addCallback("LevelDisplayed", () => {
  Galacticraft.onInitialize();
});

Callback.addCallback("LocalTick", () => {
  Galacticraft.onTick();
});