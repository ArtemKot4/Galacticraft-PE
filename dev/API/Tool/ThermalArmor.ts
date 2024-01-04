class Thermal {
  public id: string;
  public texture: string;
  public data: string[] = []
  constructor(id: string, texture: string) {
    this.id = id
    this.texture = texture;
    this.data.push(texture)
  };
  public static visual = () => {
    const mesh = new RenderMesh();
    const render = new ActorRenderer();
  }
  public create = () => {

     new GItem("thermal_helmet" + this.id, 1);
     new GItem("thermal_chestplate" + this.id, 1);
     new GItem("thermal_leggings" + this.id, 1);
     new GItem("thermal_boots" + this.id, 1);
}
}