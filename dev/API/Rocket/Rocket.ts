interface IRocketDescriptor {
  fuel: int;
  tier: int;
  animation: Animation.Base;
  player?: int;
}

abstract class RocketManager {
  protected constructor() {}
  public static visualList: {
    tier: int;
    texture: string;
    model: RenderMesh;
    scale?: number;
  }[] = [];
  public static tierList: int[] = [];
  public static data: Map<Vector, IRocketDescriptor> = new Map();
  public static create(
    pos: Vector,
    tier: int,
    animation?: Animation.Base
  ): void {
    if (!this.isValid(pos)) {
      RocketManager.data.set(pos, {
        fuel: 0,
        tier,
        animation: animation || RocketAnimator.createAnimation(pos, tier),
      });
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
    let timer = 20;
    let box = null;
    const currentCelestialBody = CelestialBody.get(Entity.getDimension(player));
    if (currentCelestialBody !== undefined) {
      box = Atmosphere.Sky.createBox(100, 0, currentCelestialBody);
    }
    Entity.setPosition(player, pos.x + 0.5, pos.y + 2.7, pos.z + 0.5);
    animator.setLink(true);
    animator.initLink(player);
    const updatable = {
      launchCountdown(player: int, timer: int) {
        Commands.exec("/title @a title §4" + timer);
        if (timer === 0) {
          RocketManager.get(pos).player = player;
        }
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
          Entity.setVelocity(player, 0, 0.6, 0);
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
  protected isLinked: boolean = false;
  public static createAnimation(pos: Vector, tier: int) {
    const validData = RocketManager.visualList.find((v) => v.tier === tier);
    if (!validData) {
      throw new java.lang.RuntimeException();
    }
    const animation = new Animation.Base(pos.x - 0.5, pos.y + 0.3, pos.z - 0.5);
    animation.describe({
      mesh: validData.model,
      skin: "terrain-atlas/" + validData.texture + ".png",
      scale: validData.scale,
    });
    return animation;
  }
  constructor(public pos: Vector) {
    const animation = RocketManager.get(pos).animation;
    if (!animation) {
      throw new java.lang.RuntimeException(
        "RocketAnimator: animation is not defined"
      );
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
    Threading.initThread("galacticraft.rocket_link", () => {
      try {
        while (this.isLinked === true) {
          this.animation.setPos(
            this.pos.x - 0.5,
            Entity.getPosition(player).y - 2.1,
            this.pos.z - 0.5
          );
          this.animation.refresh();
          java.lang.Thread.sleep(1000 / 1000000);
        }
      } catch (e) {
        Game.message(e);
      }
    });
  }
}

abstract class Rocket {
  public transferList: string[];
  public tier: int;
  public item: GItem;
  public texture: string;
  public model: string;
  public scale: number;
}

class RocketTier_1 extends Rocket {
  public transferList: string[] = ["moon", "station", "earth"];
  public tier: number = 1;
  public texture: string = "GalacticraftCore/rocket_tier_1";
  public model: string = "rocket_tier_1";
  constructor(
    importParams: Partial<RenderMesh.ImportParams> = { scale: [1, 1, 1] }
  ) {
    super();
    this.item = new GItem("rocket_tier_" + this.tier, 1);
    RocketManager.tierList[this.tier] = this.tier;
    RocketManager.visualList.push({
      tier: this.tier,
      texture: this.texture,
      model: Modeller.constructRenderMesh(this.model, {
        ...importParams,
        translate: [0.5, 0, 0.5],
      }),
      scale: this.scale || 1,
    });
  }
}

const Rocket1 = new RocketTier_1();
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
