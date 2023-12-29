class Galacticraft {
  public static readonly MODID = "galacticraft:";
  private onInitialize = () => {
    Game.message(String(Ballone.IDList))
  };
  private onTick = () => {
    OxygenTick()
    //   if(Equi.isOpened() && )
  };

  constructor() {
    Callback.addCallback("LevelDisplayed", () => {
      this.onInitialize();
    });

    Callback.addCallback("LocalTick", () => {
      this.onTick();
    });
  }
}
new Galacticraft();
