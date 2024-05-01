
class StandartRocketButtonBuild extends RocketButtonBuilder {
  public storage_ui: RocketStorageUIBuilder = new RocketStorageUIBuilder(500);

    public sitButtonBehavior(player: int, rocket_pos: Vector) {
      Game.message("Клик!")
      const obj = {
       inRocket: false,
       update() {
     return Entity.setPosition(this.player, rocket_pos.x, Entity.getPosition(this.player).y, rocket_pos.z);
       }
      };
        return Updatable.addUpdatable(obj)
    };

    public openRocketUIBehaviour(player: int, rocket_pos: Vector) {
      const client = Network.getClientForPlayer(player);
        return this.storage_ui.openFor(client);
    }
    constructor(position: Vector, player: int, storage_ui: RocketStorageUIBuilder) {
      super(position, player);

      const sit_button = this.createButton({
        name: "sit_button",
        x: 0, y: 0,
        bitmap: "butdeact",
        bitmap2: "butact",
        scale: 3
      }, this.sitButtonBehavior);

      const storage_button = this.createButton({
        name: "storage_button",
        x: 0, y: 125,
        bitmap: "butdeact",
        bitmap2: "butact",
        scale: 3,
      }, this.openRocketUIBehaviour)


      Game.message(JSON.stringify(this.ButtonUIObject))
      const result_ui = this.build();
      this.button_container.openAs(result_ui);
    }
  }
  
  