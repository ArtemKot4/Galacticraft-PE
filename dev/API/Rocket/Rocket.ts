class Rocket {
  protected rocket: string;
  protected padding: string;
  public static list = [];
  public static entity = [];
  public fuelcont: UI.Container = new UI.Container();
  public maincont = new UI.Container();
  public values = []; //fuel, isPressed (button)
  public fuelui = new UI.StandartWindow({
    standard: {
      header: {
        text: {
          text: Translation.translate("Хранилище топлива"),
        },
      },
      inventory: {
        standard: true,
      },
      background: {
        standard: true,
      },
    },
    drawing: [
      {
        type: "bitmap",
        x: 500,
        y: 130,
        bitmap: "RocketStorage1",
        scale: 5.4,
      },
    ],
    elements: {
      fuelScale: {
        type: "scale",
        x: 500,
        y: 130,
        bitmap: "RocketStorage2",
        scale: 5.4,
        direction: 1,
      },
    },
  });

  public mainui = new UI.StandartWindow();
  public getEnt(): string {
    return "galacticraft:" + this.rocket + "<>";
  }
  constructor(rocket, padding, fuel) {
    this.rocket = rocket;
    this.padding = padding;
    this.createItem();

  
    this.values.push(fuel, false)

    rocket.list.push({
      entity: this.getEnt(),
      item: ItemID[this.rocket],
      padding: this.padding + "_completed",
      container: [this.fuelcont, this.maincont],
      ui: [this.fuelui, this.mainui],
      values: [this.values]
    });

  }

  public createItem() {
    new GItem(
      this.rocket,
      1,
      Number(this.rocket.slice(this.rocket.length - 1))
    );
  }

  public static getPadding() {
    for (var p in Rocket.list) {
      return Rocket.list[i].padding[p];
    }
  }

  public static onInteract(entity) {
    for (var i in Rocket.list) {
      const r = Rocket.list[i];
      if (Entity.getTypeName(entity) == r["entity"]) {
        alert("rocket.ent:" + r["entity"]);
        Rocket.entity.push(entity);
        // открытие какого-то уи
        Game.message(
          Translation.translate(
            "You are in a rocket, make sure you put on a spacesuit, loaded and refueled the rocket"
          )
        );
        if (Entity.getSneaking(Player.get())) {
          r["container"][0].openAs(r["ui"][0]);
          
        }
      }
    }
  }

  public static onTick() {
    for (var i in Rocket.entity) {
        let ent = Rocket.entity[i];
        let pos = Entity.getPosition(ent);
      for(var i in Rocket.list){
          let rock = Rocket.list[i]
          if(rock["values"][1] != true) return
        let timer = 0;
     
        if(timer > 200) Entity.addPosition(ent, pos.x, pos.y++, pos.z);
        if(timer > 500) /*открытие нужного ui с кнопками*/ timer = 0; return
    };
  }
}
}

//new Rocket("rocket_1", "rocket_padding", 500);
