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

interface IRocketButtonDescriptor extends Omit<Vector, "z"> {
  name: string;
  bitmap: string;
  bitmap2: string;
  scale: int;
}

class RocketButtonBuilder {
  public playerInRocket: boolean = false;
  public storage_container = new UI.Container();
  public ButtonUIObject = {
    location: {
      x: 1000 / 2 - 80,
      y: 273,
      width: 100,
      height: 50,
    },
    drawing: [],
    elements: {},
  };

  constructor(public position: Vector, public player: int) {}
  protected buildButton(
    descriptor: IRocketButtonDescriptor,
    onClick: (player, rocket_pos: Vector) => void
  ) {
    this.ButtonUIObject.elements[descriptor.name] = {
      type: "button",
      x: descriptor.x,
      y: descriptor.y,
      clicker: {
        onClick(position, container) {
          return onClick(this.player, this.position);
        },
      },
    };
  };
  /** must launced after building all buttons */
  public build(): UI.Window {
    return new UI.Window(this.ButtonUIObject);
  }
}

class RocketStorageUIBuilder {
  
}