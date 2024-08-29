interface IRocketDescriptor {
  fuel: int;
  tier: int;
  animation: Animation.Base;
  container?: ItemContainer;
  capacity?: int;
}

abstract class RocketManager {
  protected constructor() {}

  public static data: Map<Vector, IRocketDescriptor> = new Map();
  public static create(
    item: ItemInstance,
    pos: Vector,
    tier: int,
    animation?: Animation.Base
  ): void {
    if (!this.isValid(pos)) {
      let obj = {
        tier,
        animation: animation || RocketAnimator.createAnimation(pos, tier),
      } as IRocketDescriptor;

      RocketManager.data.set(pos, Object.assign(obj, Rocket.get(item)));
    }
  }
  public static get(pos: Vector): IRocketDescriptor {
    return RocketManager.data.get(pos);
  }
  public static isValid(pos: Vector): boolean {
    return !!RocketManager.data.get(pos);
  }
  public static updateFuel(pos: Vector, fuel: int): void {
    if (this.isValid(pos)) {
      RocketManager.data.get(pos).fuel = fuel;
    }
  }
  public static getTierForID(id: int) {
    let item = IDRegistry.getIdInfo(id).split(":")[1];
    if (!item.startsWith("item_rocket_tier")) {
      return null;
    }
    return Number(item.split("_")[3]);
  }
  public static clear(pos: Vector) {
    return RocketManager.data.delete(pos);
  }

  public static start(animator: RocketAnimator, pos: Vector, player: int) {
    const current = RocketManager.get(pos);

    if (!current) {
      throw new java.lang.RuntimeException(
        "rocket can't be started: rocket from this position is not defined"
      );
    }

    let timer = 5; //TODO: replace to 20;
    let box = null;

    const currentCelestialBody = CelestialBody.get(Entity.getDimension(player));

    if (currentCelestialBody !== undefined) {
      box = Atmosphere.Sky.createBox(100, 0, currentCelestialBody);
    }

    Entity.setPosition(player, pos.x + 0.5, pos.y + 2.7, pos.z + 0.5);

    const updatable = {
      launchCountdown(player: int, timer: int) {
        Commands.exec("/title @a title §4" + timer);
      },

      touchPlayer(player: int) {
        Entity.setVelocity(player, 0, 0, 0);
        Entity.setPosition(player, pos.x + 0.5, pos.y + 2.6, pos.z + 0.5);
        return;
      },

      finish(player: int) {
        Entity.setVelocity(player, 0, 0, 0);
        Player.setFlying(true);
        box?.destroy();
        animator.clear();
        RocketManager.clear(pos);
        this.remove = true;
      },

      update() {
        const loc = Entity.getPosition(player);

        if (World.getThreadTime() % 20 === 0 && timer > -1) {
          this.launchCountdown(player, timer);
          timer--;
        }

        if (timer > -1) {
          this.touchPlayer(player);
        }

        if (timer <= -1) {
          Entity.setPosition(player, pos.x + 0.5, loc.y, pos.z + 0.5);
          Entity.setVelocity(player, 0, 0.8, 0);
          if (!animator.isLinked) {
            animator.initLink(player);
          }

          Particles.addParticle(
            ESpaceParticle.ROCKET_PARTICLE,
            loc.x,
            loc.y - 1.6,
            loc.z,
            0,
            -0.09,
            0
          );
        }

        if (box !== null && loc.y > 350) {
          Atmosphere.Sky.setupPosition(box, loc.x, loc.y - 100, loc.z);
        }

        if (loc.y > 600) {
          CelestialBorder.initCelestials(player, current.tier);
          CelestialBorder.open();
          this.finish(player);
        }
      },
    } satisfies Updatable;
    Updatable.addUpdatable(updatable);
    return;
  }
}

class RocketAnimator {
  public animation: Animation.Base;
  public isLinked: boolean = false;
  public static createAnimation(pos: Vector, tier: int) {
    const validData = Rocket.descriptor.find((v) => v.tier === tier);

    if (!validData) {
      throw new java.lang.RuntimeException(
        "rocket is not valid, animation can't be initialized into RocketAnimator"
      );
    }

    const animation = new Animation.Base(pos.x - 0.5, pos.y + 0.3, pos.z - 0.5);

    animation.describe({
      mesh: validData.model,
      skin: "items-opaque/" + validData.texture + ".png",
      scale: validData.scale,
    });

    animation.setInterpolationEnabled(true);
    return animation;
  }
  constructor(public pos: Vector) {
    const animation = RocketManager.get(pos).animation;
    if (!animation) {
      throw new java.lang.RuntimeException("animation is not defined");
    }
    this.animation = animation;
  }
  public initialize() {
    this.animation.load();
  }
  public clear() {
    this.animation.destroy();
  }
  public setLink(bool: boolean) {
    return (this.isLinked = bool);
  }
  public initLink(player: int) {
    if (this.isLinked) {
      return;
    }

    let start = 0;

    Threading.initThread("galacticraft.rocket_link", () => {
      try {
        while (this.animation instanceof Animation.Base) {
          start += 0.001;
          this.animation.transform().translate(0, start, 0);
          this.animation.updateRender();
          java.lang.Thread.sleep(1000 / 500);
        }
      } catch (e) {
        Game.message(e);
      }
    });

    this.isLinked = true;
  }
}

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
        if (item.extra && !item.extra.getBoolean("creative", false)) {
          return (
            Native.Color.BLUE +
            Translation.translate(name) +
            "\n" +
            Native.Color.GRAY +
            Translation.translate("tooltip.capacity_rocket") +
            " " +
            item.extra.getInt("capacity", 0)
          );
        }
        return (
          Native.Color.BLUE +
          Translation.translate(name) +
          Native.Color.RED +
          "\n" +
          Translation.translate("tooltip.creative_rocket")
        );
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
      scale: [0.2, 0.2, 0.2],
      translate: [0.3, 0, 0.3],
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

    if (!item.extra) {
      return obj;
    }

    if (item.extra.getBoolean("creative")) {
      obj.capacity = 54 satisfies rocket_capacity;
      obj.fuel = -1;
      return obj;
    }

    const container = JSON.parse(item.extra.getSerializable("container"));
    const capacity = item.extra.getInt("capacity");
    const fuel = item.extra.getInt("fuel", 0);

    if (typeof capacity === "number") {
      obj.capacity = capacity;
    };
    
    obj.container = container ?? new ItemContainer();
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

    if(planetList !== undefined) {
      transferList.concat(planetList.transferList);
    };
    
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
    super(
      ["station, mars"],
      2,
      "rocket_tier_2",
    );
  }
}

class RocketTier_3 extends Rocket {
  constructor() {
    super(
      ["venus"],
      3,
      "rocket_tier_3",
    );
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
