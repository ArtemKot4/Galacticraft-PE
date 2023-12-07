type name = string;
class Sky {
  public description: { texture: string };
  public dimension: int;
  public objectMove: name;
  public render: ActorRenderer;
  constructor(
    dimension: int,
    description: { texture: string },
    objectMove: name
  ) {
    dimension = this.dimension;
    description = this.description;
    objectMove = this.objectMove;
    this.render = new ActorRenderer();
    const players = Network.getConnectedPlayers();
    for (var i in players) {
      const skyMesh = new RenderMesh();
      skyMesh.addVertex(16, 16, 16);
      this.render.addPart("sky_" + this.dimension, "head", skyMesh);
      const skyBox = new AttachableRender(players[i])
        .setRenderer(this.render)
        .setTexture(this.description.texture);
    }
  }
}
