interface IRocketDescriptor {
  fuel: int;
  tier: int;
  animation: Animation.Base;
}

namespace Modeller {
  export function constructRenderMesh(
    model: string,
    texture?: string,
    importParams?: Partial<RenderMesh.ImportParams>
  ) {
    const mesh = new RenderMesh();
    mesh.importFromFile(
      __dir__ + "/resources/models/" + (model || texture) + ".obj",
      "obj",
      Object.assign(
        {
          translate: [0, 0, 0], //[0.5, 0, 0.5],
          scale: [1, 1, 1],
          invertV: false,
          noRebuild: false,
        },
        importParams || ({} as any)
      )
    );
    return mesh;
  }
}

namespace RocketModeller {
  export const ROCKET_MESH_TIER_1 =
    Modeller.constructRenderMesh("rocket_tier_1");
  export const ROCKET_MESH_TIER_2 =
    Modeller.constructRenderMesh("rocket_tier_2");
  export const ROCKET_MESH_TIER_3 =
    Modeller.constructRenderMesh("rocket_tier_3");
  export function createAnimation(
    mesh: RenderMesh,
    texture: string,
    pos: Vector
  ) {
    const animation = new Animation.Base(pos.x + 0.5, pos.y, pos.z + 0.5);
    animation.describe({
      mesh,
      skin: "terrain-atlas/" + texture + ".png",
    });
    return animation;
  }
}

abstract class RocketManager {
  public static tierList: int[] = [];
  public static data: Map<Vector, IRocketDescriptor> = new Map();
  public static create(pos: Vector, tier: int, animation: Animation.Base) {
    if (RocketManager.data.get(pos) === undefined) {
      RocketManager.data.set(pos, { fuel: 0, tier, animation });
    }
  }
  public static get = (pos) => RocketManager.data.get(pos);
  public static isValid(pos: Vector) {
    return RocketManager.data.get(pos) !== undefined;
  }
  public static updateFuel(pos: Vector, fuel: int) {
    if (this.isValid(pos)) {
      RocketManager.data.get(pos).fuel = fuel;
    }
  }
  public static getTierForID(id: int) {
    let item = IDRegistry.getIdInfo(id).split(":")[0];
    Game.message(item);

    if (!item.startsWith("rocket_tier")) {
      return null;
    }
    Game.message(item.split("_")[2]);
    return Number(item.split("_")[2]);
  }
}

class Rocket {
  public transferList: string[];
  public tier: int;
  public item: GItem;
  constructor() {
      this.item = new GItem("rocket_tier_" + this.tier, 1);
      RocketManager.tierList[this.tier] = this.tier;
  }
}

class RocketTier_1 extends Rocket {
 public tier: number = 0;
}

const Rocket1 = new RocketTier_1();