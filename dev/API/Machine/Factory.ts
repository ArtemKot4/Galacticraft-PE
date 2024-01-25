/**
 * Класс для регистрации рецептов;  
 * new Factory([result id], [input ids])
 */
class Factory {
  public recipe = [];
  public slots: { input: int; output: string };
  constructor(slots) {
    this.slots = slots;
  }
  public setRecipe(result, input): void {
    this.recipe.push([result, input]);
  }

  public input(container: ItemContainer): boolean {
    // [[[result], [input]]]
    for (var i in this.recipe) {
      for (var s = 1; s < this.slots.input; s++) {
        if (this.recipe[i][1][s] != container.getSlot("slot_" + s).id) {
          return;
        }
      }
    }
    this.minus(container);
    this.result(container);
  }

  private minus(container: ItemContainer) {
    for (var s; s < this.slots.input; s++) {
      const slot = container.getSlot("slot_" + s);
      slot.count--;
      container.setSlot(
        "slot_" + s,
        slot.id,
        slot.count--,
        slot.data,
        slot.extra
      );
      slot.count--;
    }
  }
  private result(container: ItemContainer) {
    for (var i in this.recipe) {
      const recipe = this.recipe[i];
      let result = container.getSlot(this.slots.output);
      if (result.count < 64) {
        container.setSlot(
          this.slots.output,
          recipe[0][0],
          result.count++,
          result.data,
          result.extra
        );
      }
    }
  }
}

const compressorsj = new Factory({ input: 9, output: "result_slot" });
compressorsj.setRecipe(
  [VanillaItemID.coal], //result
  [
    VanillaItemID.arrow,
    VanillaItemID.arrow,
    VanillaItemID.arrow,
    VanillaItemID.arrow,
    VanillaItemID.arrow,
    VanillaItemID.arrow,
    VanillaItemID.arrow,
    VanillaItemID.arrow,
    VanillaItemID.arrow,
  ]
);
