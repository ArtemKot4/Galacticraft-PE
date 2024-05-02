interface IRocketButtonDescriptor extends Omit<Vector, "z"> {
  name: string;
  bitmap: string;
  bitmap2: string;
  scale: int;
}

abstract class RocketButtonBuilder {
  public button_container = new UI.Container();
  public ButtonUIObject = {
    location: {
      x: 1000 / 2 - 65,
      y: 310,
      width: 250,
      height: 200,
    },
    drawing: [
      { type: "background", color: android.graphics.Color.argb(0, 0, 0, 0) },
    ],
    elements: {},
  };

  constructor(public position: Vector, public player: int) {}
  protected createButton(
    descriptor: IRocketButtonDescriptor,
    onClick: (player, rocket_pos: Vector) => void
  ) {
    this.ButtonUIObject.elements[descriptor.name] = {
      type: "button",
      x: descriptor.x,
      y: descriptor.y,
      scale: descriptor.scale,
      bitmap: descriptor.bitmap,
      bitmap2: descriptor.bitmap2,

      clicker: {
        onClick(position, container) {
          return onClick(this.player, this.position);
        },
      },
    };
  }
  /**Must launched after building all buttons */
  public build(): UI.Window {
    return new UI.Window(this.ButtonUIObject as UI.WindowContent);
  }
}
