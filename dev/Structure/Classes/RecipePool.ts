/**
 * Класс для регистрации рецептов;
 * new Factory({input: int, output: string | int})
 */
class Factory {
  private recipe = [];
  public slots: { input: int; output: string };
  constructor(slots) {
    this.slots = slots;
  }
  public setRecipe(obj: {}): void {
    this.recipe.push(obj); //{result, slot_...}
  }

  public input(container: ItemContainer): boolean {
    for (var i in this.recipe) {
      let recipe = this.recipe[i];
      for (var s = 1; s < this.slots.input; s++) {
        if (recipe["slot_" + s] != container.getSlot("slot_" + i).id) {
          return false;
        }
      }
    }
    return true;
  }
  public output(container: ItemContainer, count: int) {
    for (var i in this.recipe) {
      let recipe = this.recipe[i];
      for (let c = 1; c <= count; c++) {
        if (recipe["result"] != container.getSlot("slot_" + c).id) {
          return false;
        }
      }
    }
    return true;
  }
  public minus(container: ItemContainer) {
    for (var i in this.recipe) {
      const recipe = this.recipe[i];
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
      }
    }
  }
  public result(container: ItemContainer) {
    for (var i in this.recipe) {
      const recipe = this.recipe[i];
      let result = container.getSlot(this.slots.output);
      if (result.count < 64) {
        container.setSlot(
          this.slots.output,
          recipe.result,
          result.count++,
          result.data,
          result.extra
        );
      }
    }
  }
}

const compressor = new Factory({ input: 9, output: "result_slot" });
compressor.setRecipe({
  result: VanillaItemID.coal,
  slot_1: VanillaItemID.arrow,
  slot_2: VanillaItemID.arrow,
  slot_3: VanillaItemID.arrow,
  slot_4: VanillaItemID.arrow,
  slot_5: VanillaItemID.arrow,
  slot_6: VanillaItemID.arrow,
  slot_7: VanillaItemID.arrow,
  slot_8: VanillaItemID.arrow,
  slot_9: VanillaItemID.arrow,
});
