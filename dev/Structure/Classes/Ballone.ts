const bal_1 = Equi.getSlot("Ballone1");
const bal_2 = Equi.getSlot("Ballone2");

class Ballone extends GCItem {
  public id: string;
  public storage: int;
  public static IDList: any[] = [];

  constructor(
    id: string,

    storage: int
  ) {
    const strid = "oxygentank_" + id + "_full";
    super(strid, 1, strid, 0, false);
    this.storage = storage;
    Ballone.IDList.push([ItemID[this.id], storage]);
  }
  public static onTick() {
    if (!Equi.isOpened()) return;
    for (const i in Ballone.IDList) {
      const O = Ballone.IDList[i];
      if ((bal_1.id != O[0] || bal_2.id != O[0]) && checkDimension(20)) {
        damage();
      }
      return (
        O2UI.setScale("O2TWO", Item.getMaxDamage(bal_1.id) / O[1]),
        O2UI.setScale("O2ONE", Item.getMaxDamage(bal_2.id) / O[1])
      );
    }
    if (Game.getGameMode() == 1)
      O2UI.setText("Status", Translation.translate("Infinity"));
  }
}

new Ballone("light", 900);
new Ballone("heavy", 2700);
new Ballone("med", 1800);