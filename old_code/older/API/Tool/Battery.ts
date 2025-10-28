IMPORT("ChargeItem");

const infinitybatt = [];

function Battery(id: string, count: int): void {
  const item = new GItem(id, 1);
  Item.registerNameOverrideFunction(id, function (item, name) {
    return Translation.translate(name) + "\n" + "gJ: " + item.data + " / " + count;
  });

  ChargeItemRegistry.registerItem(
    ItemID[id],
    "GalacticraftJoule",
    count,
    20,
    1,
    true
  );
}

function InfiniteBattery(id, strength?: int, custom?: string) {
  const item = new GItem(id, 1);
  item.info("\n§7" + (custom ?? "Infinity" + "§6⚡"));

  infinitybatt.push({
    id: id,
    num: strength,
  });
}

InfiniteBattery.addInfinite = (block, data, slot) => {
  let en = block.getSlot(slot);
  for (const i in infinitybatt) {
    if (en.id == infinitybatt[i].id) {
      if (World.getThreadTime() % infinitybatt[i].num == 0) {
        data.energy += 1;
      }
    }
  }
};
