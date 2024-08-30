interface IRocketDescriptor {
    fuel: int;
    tier: int;
    animation: RocketAnimator;
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
      animation?: RocketAnimator
    ): void {
      if (!this.isValid(pos)) {
        const obj = {
          tier,
          animation: new RocketAnimator(pos, tier),
        } as IRocketDescriptor;
  
        RocketManager.data.set(pos, Object.assign(obj, Rocket.get(item)));
        RocketManager.get(pos).animation.initialize();
        return;
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
        RocketManager.get(pos).animation.clear();
        RocketManager.data.delete(pos);
        return;
    }
  
    public static start(pos: Vector, player: int) {
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
          current.animation.clear();
          RocketManager.clear(pos);
          this.remove = true;
        },
  
        update() {
          const loc = Entity.getPosition(player);

          if(current.fuel < 250 && current.fuel >= 0) {
            Commands.exec(
              "/title @a title §4" + Translation.translate("message.galacticraft.fuel_invalid")
              );
              this.remove = true;
              return;
          };

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

            if (!current.animation.isLinked) {
              current.animation.initLink(player);
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
  