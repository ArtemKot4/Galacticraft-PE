
class Ballone extends GItem {
  public id: string;
  public storage: int;
  public static IDList: any[] = [];

  constructor(
    id: string,

    storage: int
  ) {
    const strid = "oxygentank_" + id + "full";
    super(strid, 1, strid, strid,0, false);
    this.storage = storage;
    Ballone.IDList.push([ItemID[this.id], storage]);
    this.description(String(Item.getMaxDamage(ItemID[id]) + storage))
  }
  public static onTick(cont) {
    const bal_1 = cont.getSlot("Ballone1");
const bal_2 = cont.getSlot("Ballone2");

    if (!Equi.isOpened()) return;
    for (const i in Ballone.IDList) {
      const O = Ballone.IDList[i];
      if ((bal_1.id != O[0] || bal_2.id != O[0]) && checkDimension(20)) {
        Oxygen.damage();
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