IMPORT("ChargeItem");

const Battery = function(id: string, count: int | "infinite", strength?: int, 
custom?: string): void {
  const item = new GItem(id, 1).info(
    (typeof count === "number") ? (item, name) => 
     name + "\n" + "gJ: " + item.data + " / " + count : 
     (item, name) => name + "\n§7" + (custom ?? ("Infinity" + "§6⚡")),
﻿);
    (count == "infinite") ? battery.setInfinite(ItemID[id], strength || 0) : 
 ChargeItemRegistry.registerItem(ItemID[id], "GalacticraftJoule",
  count, 20, 1, true);
      return item;
 };