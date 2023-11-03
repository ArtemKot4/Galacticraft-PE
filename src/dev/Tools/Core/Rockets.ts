var SPC_b1 = new UI.Container();
var SPC_b2 = new UI.Container();
var SPC_b3 = new UI.Container();
var InterFace = new UI.Container();
var rocket_storage = new UI.Container();

let rocketFuel = new UI.StandartWindow({
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

var rocketgui = new UI.Window({
  location: {
    x: 1000 / 2 - 80,
    y: 273,
    width: 48,
    height: 24,
  },
  drawing: [],
  elements: {
    exit: {
      type: "button",
      text: "Спешиться",
      x: 0,
      y: 0,
      bitmap: "SPC.SPC_button",
      bitmap2: "SPC.SPC_button2",
      scale: 250,
      clicker: {
        onClick: function () {
          SPC_b1.close();
          SPC_b2.close();
          SPC_b3.close();
          let window = getWindow(BlockID.rocket_padding, rocketFuel);
          rocket_storage.openAs(window);
        },
      },
    },
  },
});

var nextvariant = new UI.Window({
  location: {
    x: 1000 / 2 - 80,
    y: 313,
    width: 660,
    height: 24,
  },
  drawing: [],
  elements: {
    next: {
      type: "button",
      text: "варианты",
      x: 0,
      y: 0,
      bitmap: "SPC.SPC_nextleft",
      bitmap2: "SPC.SPC_nextleftPRESSED",
      scale: 2.1,
      clicker: {
        onClick: function () {
          SPC_b1.close();
          SPC_b2.close();
          SPC_b3.close();
        },
      },
    },
  },
});

IDRegistry.genItemID("rocket_tier_1");
Item.createItem(
  "rocket_tier_1",
  "Rocket Tier 1",
  {
    name: "rocket_tierik1",
    meta: 0,
  },
  {
    stack: 1,
    isTech: true,
  }
);
Translation.addTranslation("Rocket Tier 1", {
  ru: "Ракета 1-го уровня",
});

Item.registerUseFunction(
  "rocket_tier_1",
  function (coords, item, block, player) {
    if (block.id == BlockID.rocket_padding_completed) {
      var region = BlockSource.getDefaultForActor(player);

      //  var place = coords.relative;

      region.spawnEntity(coords.x, coords.y, coords.z, "galacticraft:rocket_1");

      Entity.setCarriedItem(player, item.id, item.count - 1, item.data);
      // Game.message("§7Ракета первого уровня успешно состыкована с посадочной площадкой")
    }
  }
);

/*Callback.addCallback("ItemUse", function (coords, item, block) {
	if(block.id === BlockID.rocket_1_tier){
		Player.setPosition(coords.x, coords.y + 2, coords.z);
	SPC_b1.openAs(wrum);
		SPC_b2.openAs(exit);
	SPC_b3.openAs(rocketgui);
		Player.addEffect(Player.get(), Native.PotionEffect.movementSlowdown, 100000, 100000000);
		Player.setFlyingEnabled(true);
		Player.setFlying(true);
		Game.message("§c§lВы находитесь в ракете,убедитесь что вы надели скафандр,загрузили и заправили ракету.")
	}
 });*/

Callback.addCallback("EntityInteract", function (entity, player, coords) {
  if (
    Entity.getTypeName(entity) == "galacticraft:rocket_1<>" &&
    Entity.getSneaking(Player.getLocal()) == false
  ) {
    alert("DEBUG");
    Game.message(
      Translation.translate(
        "You are in a rocket, make sure you put on a spacesuit, loaded and refueled the rocket"
      )
    );

    Entity.addVelocity(entity, coords.x, (coords.y = 0.1), coords.z);
    // Entity.addPosition(entity, coords.x , coords.y+0.1, coords.z);
    if (__config__.getBool("Gameplay.Special_Effects") == true) {
      if (Entity.getPosition(entity)) {
        Particles.addParticle(
          rocket_particle,
          this.x + 0.5,
          this.y - 1,
          this.z + 0.5,
          Math.random() / 20,
          Math.random() / 20,
          Math.random() / 20
        );
      }
    }
  }

  if (
    Entity.getSneaking(Player.get()) &&
    Entity.getTypeName(entity) == "galacticraft:rocket_1<>"
  ) {
    // let window = getWindow
    // (BlockID.Pad_Normal,
    //     rocketFuel);
    rocket_storage.openAs(rocketFuel);
  }
});

var fuel: number = 0;

var rocketActive: boolean = false;

Callback.addCallback("EntityAdded", function (entity, player, coords) {
  if (Entity.getTypeName(entity) == "galacticraft:rocket_1<>") {
    rocketActive = true;
    alert("Успешно");
  }
});

Callback.addCallback("EntityDeath", function (entity, player, coords: any) {
  if (Entity.getTypeName(entity) == "galacticraft:rocket_1<>") {
    rocketActive = false;
    fuel = 0;

    // BlockSource.getDefaultForActor(player).spawnDroppedItem(coords.x,coords.y,coords.z,ItemID.bucket_of_fuel,1,0);
  }
});
