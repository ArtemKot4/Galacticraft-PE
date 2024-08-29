type rocket_capacity = 18 | 36 | 54;

const modelList = [];

abstract class Rocket {
  public static descriptor: {
    tier: int;
    texture: string;
    model: RenderMesh;
    transferList: string[];
    scale?: number;
  }[] = [];

  public item: GItem;

  public readonly scale: number = 1;
  protected readonly transferList: string[];

  public readonly tier: int;
  public readonly texture: string;
  public readonly model: string;

  public registerTooltip() {
    Item.registerNameOverrideFunction(
      this.item.getID(),
      (item, translation, name) => {
        const data = Native.Color.BLUE + Translation.translate(name);

        if (item.extra && item.extra.getBoolean("creative", false)) {
          data.concat(
            Native.Color.RED,
            "\n",
            Translation.translate("tooltip.creative_rocket")
          );
        } else {
          data.concat(
            "\n",
            Native.Color.GRAY,
            Translation.translate("tooltip.capacity_rocket"),
            " " + item.extra.getInt("capacity", 0)
          );
        }

        return data;
      }
    );
  }

  public addRocketsWithStorage() {
    [18, 36, 54].forEach((v) => {
      const extra = new ItemExtraData();
      extra.putInt("capacity", v);
      Item.addToCreative(this.item.getID(), 1, 0, extra);
    });
  }

  public addCreativeRocket() {
    const extra = new ItemExtraData();

    extra.putBoolean("creative", true);
    extra.putInt("capacity", 54 satisfies rocket_capacity);

    Item.addToCreative(this.item.getID(), 1, 0, extra);
  }

  public setRotatableModel() {
    const model = Modeller.constructRenderMesh(this.model, {
      scale: [0.15, 0.15, 0.15],
      translate: [0.4, -0.15, 0.4],
    });

    model.rotate(-0.5, 0, 0);

    ItemModel.getForWithFallback(this.item.getID(), 0).setUiModel(
      model,
      "models/" + this.texture
    );
    modelList.push(model);
  }

  public build(importParams: Partial<RenderMesh.ImportParams>) {
    this.item = new GItem("rocket_tier_" + this.tier, 1);

    this.setRotatableModel();
    this.addCreativeRocket();
    this.addRocketsWithStorage();
    this.registerTooltip();

    Rocket.descriptor.push({
      tier: this.tier,
      texture: this.texture,
      model: Modeller.constructRenderMesh(this.model, {
        ...importParams,
        translate: [0.5, 0, 0.5],
      }),
      scale: this.scale || 1,
      transferList: this.transferList,
    });
  }

  public getWithCapacity(
    player: int,
    capacity?: rocket_capacity,
    data: int = 0
  ) {
    let extra: Nullable<ItemExtraData> = null;

    if (typeof capacity === "number") {
      extra = new ItemExtraData();
      extra.putInt("capacity", capacity);
    }

    return new ItemStack(this.item.getID(), 1, data || 0, extra);
  }

  public static get(item: ItemInstance) {
    const obj = {} as IRocketDescriptor;

    const container = JSON.parse(item.extra.getSerializable("container"));
    obj.container = container ?? new ItemContainer();

    if (!item.extra) {
      return obj;
    }

    if (item.extra.getBoolean("creative")) {
      obj.capacity = 54 satisfies rocket_capacity;
      obj.fuel = -1;
      return obj;
    }

    const capacity = item.extra.getInt("capacity");
    const fuel = item.extra.getInt("fuel", 0);

    if (typeof capacity === "number") {
      obj.capacity = capacity;
    }

    obj.fuel = fuel;
    return obj;
  }

  constructor(
    transferList: string[],
    tier: int,
    texture: string,
    model?: string,
    scale: int = 1,
    importParams: Partial<RenderMesh.ImportParams> = { scale: [1, 1, 1] }
  ) {
    const planetList = Rocket.descriptor.find((v) => v.tier === tier - 1);

    if (planetList !== undefined) {
      transferList.concat(planetList.transferList);
    }

    this.tier = tier;
    this.texture = texture;
    this.model = model || texture;
    this.scale = scale;
    this.build(importParams);
  }
}

class RocketTier_1 extends Rocket {
  constructor() {
    super(["earth", "moon", "station"], 1, "rocket_tier_1");
  }
}

class RocketTier_2 extends Rocket {
  constructor() {
    super(["station, mars"], 2, "rocket_tier_2");
  }
}

class RocketTier_3 extends Rocket {
  constructor() {
    super(["venus"], 3, "rocket_tier_3");
  }
}

const Rocket1 = new RocketTier_1();

const Rocket2 = new RocketTier_2();

const Rocket3 = new RocketTier_3();

/*
Saver.addSavesScope(
  "scope.galacticraft.rocket_list",
  function read(scope) {
    RocketManager.data = scope?.rocket_data || new Map();
  },
  function save() {
    return { rocket_data: RocketManager.data };
  }
);

Callback.addCallback("LevelDisplayed", () => {
  RocketManager?.data?.forEach((v) => {
    v?.animation?.load();
  });
});
*/

// Callback.addCallback("LocalTick", () => {
//   for (const i in modelList) {
//     modelList[i].rotate(0.01, 0.01, 0);
//   }
// });

Translation.addTranslation("message.galacticraft.fuel_invalid", {
  ru: "Недостаточно топлива!",
  en: "Fuel is small!",
});
