type name = string;
namespace Atmosphere {
  export interface ISkyObject {
    texture: string;
    rotation?: int;
    size: int;
  }

  export abstract class Sky {
    public static createBox(scale, rotation, texture): Animation.Base {
      const pos = Player.getPosition();
      const mesh = new RenderMesh();
      const size = scale;
      mesh.addVertex(0, 0, 0, 0, 0);
      mesh.addVertex(0, 0, size, size, 0);
      mesh.addVertex(0, size, 0, 0, 1);
      mesh.addVertex(0, 0, size, 1, 0);
      mesh.addVertex(0, size, 0, 0, 1);
      mesh.addVertex(0, size, size, 1, 1);
      mesh.rotate(0, 0, 0, 0, 0, rotation || 0.5);

      const animation = new Animation.Base(pos.x, pos.y, pos.z);

      animation.describe({
        mesh: mesh,
        skin: "environment/" + texture + ".png",
      });

      animation.setIgnoreLightMode();

      return animation;
    };

    public static createStandartSky(texture?, ...skyboxes) {
         const mesh = new RenderMesh();
        // mesh.addVertex()
    };

   public static createSkybox(mesh = new RenderMesh(), texture?) {
    const pos = Player.getPosition();
    const size = 200;
    //const mesh = new RenderMesh();
    mesh.addVertex(0, 0, 0, 0, 0);
    mesh.addVertex(0, 0, size, size, 0);
    mesh.addVertex(0, size, 0, 0, 1);
    mesh.addVertex(0, 0, size, 1, 0);
    mesh.addVertex(0, size, 0, 0, 1);
    mesh.addVertex(0, size, size, 1, 1);

    mesh.addVertex(0, 0, 0, 0, 0);
    mesh.addVertex(100, 0, size, size, 0);
    mesh.addVertex(100, size, 0, 0, 1);
    mesh.addVertex(100, 0, size, 1, 0);
    mesh.addVertex(100, size, 0, 0, 1);
    mesh.addVertex(100, size, size, 1, 1);

    
    // mesh.addVertex(0, 0, 0, 0, 0);
    // mesh.addVertex(0, 0, 0, size, 0);
    // mesh.addVertex(0, 0, 0, 0, 1);
    // mesh.addVertex(0, 0, 0, 1, 0);
    // mesh.addVertex(0, 0, 0, 0, 1);
    // mesh.addVertex(0, 0, 0, 1, 1);

    const animation = new Animation.Base(pos.x, pos.y, pos.z);
    animation.describe({
      mesh: mesh,
      skin: "environment/" + (texture || "stars")+ ".png",
    });
   }

    constructor(dimension: int) {}

    static setupPosition(box: Animation.Base, x, y, z) {
      const skybox = box;
      skybox.setPos(x, y, z);
      skybox.load();
    };
    static update(): void {}
  }
};


Callback.addCallback("ItemUse", (coords, item, block) => {
     if(item.id === VanillaItemID.book) {
      Atmosphere.Sky.createSkybox();
     }
})