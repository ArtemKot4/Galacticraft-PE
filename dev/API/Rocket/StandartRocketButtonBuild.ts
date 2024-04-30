
class StandartRocketButtonBuild extends RocketButtonBuilder {
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

    public openRocketUIBehaviour(UI: RocketStorageUIBuilder) {

    }

    constructor(position: Vector, player: int, storage_ui: RocketStorageUIBuilder) {
      super(position, player);
      const sit = this.createButton({
        name: "sit_button",
        x: 0, y: 10,
        bitmap: "butdeact",
        bitmap2: "butact",
        scale: 1000
      }, this.sitButtonBehavior);
      Game.message(JSON.stringify(this.ButtonUIObject))
      const result_ui = this.build();
      this.button_container.openAs(result_ui);
    }
  }
  
  