IMPORT("ChargeItem");
const infinitybatt = [];

function Battery(id: string, count: int): void;
function Battery(id: string, count: "infinite"): void;
function Battery(id: string, count: "infinite", strength: int, custom?: string): void

function Battery (
  id: string,
  count: int | "infinite",
  strength?: int,
  custom?: string
): void {

 const item = new GItem(id, 1);
 item.info(
    typeof count === "number"
      ? (item, name) =>
          Translation.translate(name) +
          "\n" +
          "gJ: " +
          item.data +
          " / " +
          count
      : (item, name) =>
          Translation.translate(name) + "\n§7" + (custom ?? "Infinity" + "§6⚡")
  );

  this.setInfinite = (num) => {
    infinitybatt.push({
      id: id,
      num: num,
    });
  };

  if(count == "infinite")
     this.setInfinite(ItemID[id], strength || 0)
    else ChargeItemRegistry.registerItem(
        ItemID[id],
        "GalacticraftJoule",
        count,
        20,
        1,
        true
      );
};

Battery.addInfinite = (block, data, slot) => {
  let en = block.getSlot(slot);
  for (const i in infinitybatt) {
    if (en.id == infinitybatt[i].id) {
      if (World.getThreadTime() % infinitybatt[i].num == 0) {
        data.energy += 1;
      }
    }
  }
};
