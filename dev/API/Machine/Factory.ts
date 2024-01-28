/**
 * Класс для регистрации рецептов;
 */
type count = int;

class Factory {
  /** 
   * {...Factory: {recipes: {...slot_ -> index: values}}} 
   */
  public static factoriesList: {} = {}; 
   /**
    * {recipes: {result: int | {...result_ -> index : int},...slot_ -> index: values}}
    */
  public list: any = {}; 
  protected readonly name: string;
  public build(
    description: {
      machine: (typeof BlockID)[string];
      slots: { input: count; output: count; recipes?: [] };
    },
    pushToAll?: boolean
  ) {
    const assign = ObjectAssign(this.list, description, { recipes: [] });
    //  if(pushToAll) Factory.factoriesList[this.name] = assign;
  }
  constructor(name = "unknown factory") {
    this.name = name;
  }
  public set(...ids) {
    const list = this.list;
    if (ids.length > list.slots.input)
      throw new Error(
        "Invalid count of ids! Ids must include only slots count"
      );

    list.recipes[ids[0]] = {};
    for (const i in ids) {
      let slots = Number(i) == 0 ? "slots_" + 1 : "slots_" + i;
      ObjectAssign(list.recipes[ids[0]], { result: ids[0], [slots]: ids[i] }); // result = number || Object -> includes {...result_ -> (index starts from 0): int}
    }
  }
  public getInput() {
    // TODO: дописать реализацию
  }
  public getOutput(index?) {
    //index need if result is object
    const list = this.list.recipes;
    let result;
    for (const i in list) {
      result =
        (list instanceof Object) && (Object.keys(list).length > 1) ?
         list[i]["result"]["result_" + index] :
           list[i]["result"];
    }
    return result;
  }
}
const CompressorFactory = new Factory("compressor").build({
  machine: BlockID["compressor"],
  slots: { input: 9, output: 1 },
});

