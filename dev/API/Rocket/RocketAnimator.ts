
class RocketAnimator {
    public animation: Animation.Base;
    public isLinked: boolean = false;
  
    constructor(public pos: Vector, public tier: int) {
      const validData = Rocket.descriptor.find((v) => v.tier === tier);
  
      if (!validData) {
        throw new java.lang.RuntimeException(
          "rocket is not valid, animation can't be initialized into RocketAnimator"
        );
      }
  
      const animation = this.animation = new Animation.Base(pos.x - 0.5, pos.y + 0.3, pos.z - 0.5);
  
      animation.describe({
        mesh: validData.model,
        skin: "models/" + validData.texture + ".png",
        scale: validData.scale,
      });
  
      animation.setInterpolationEnabled(true);
    }
    public initialize() {
      return this.animation.load();
    }
    public clear() {
      return this.animation.destroy();
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