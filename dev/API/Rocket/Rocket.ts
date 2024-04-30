interface IRocketModelData {
  model: string;
  texture: string;
  importParams?: RenderMesh.ImportParams;
}

function ModelBuilder(
  model: string,
  importParams: RenderMesh.ImportParams = {
    noRebuild: false,
    invertV: false,
    translate: [0.5, 0, 0.5],
  }
) {
  const mesh = new RenderMesh();
  mesh.importFromFile(
    __dir__ + "/resources/models/" + model + ".obj",
    "obj",
    importParams
  );
  return mesh;
}

class Rocket {
  public animationBuilder(
    position: Vector,
    texture,
    model,
    importParams: RenderMesh.ImportParams = {
      noRebuild: false,
      invertV: false,
      translate: [0.5, 0, 0.5],
    }
  ) {
    const animation = new Animation.Base(position.x, position.y, position.z);
    animation.describe({
      mesh: ModelBuilder(model, importParams),
      skin: texture,
    });
    return animation;
  }

  constructor(public id, public model_data: IRocketModelData) {}
}

//new Rocket("rocket_1", "rocket_padding", 500);
