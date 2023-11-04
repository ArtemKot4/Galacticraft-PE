Callback.addCallback("LocalTick", (container) => {
  var pos = Player.getPosition();
  if (Player.getDimension() == Venus.id) {
    if (
      World.getThreadTime() % 20 == 0 &&
      weather_rain == true &&
      timer_weather <= 60
    ) {
       
      startRain(pos);
    }
    if (World.getThreadTime() % 20 == 0) {
      if (timer_weather <= 60 && weather_rain == true) {
      
        timer_weather++;
      }
      if (timer_weather >= 60) {
        weather_rain = false;
        timer_weather_start = 0;
        timer_weather = 0;
        
      }
      if (timer_weather_start >= 15 && weather_rain == false) {
        weather_rain = true;
        timer_weather_start = 0;
       
      }
    }

    if (World.getThreadTime() % 1200 == 0) {
      if (weather_rain == false&&weather_rule.rain==true) {
        timer_weather_start++;
        Game.message("" + timer_weather_start + " / 15 до дождя");
      }
      Entity.spawn(pos.x + randomInt(-20, -5), pos.y, pos.z, 93);
      Entity.spawn(pos.x, pos.y, pos.z + randomInt(20, 5), 93);
    }
  }
});

Saver.addSavesScope(
  "Fuel",
  function read(scope): void {
    rocket_storage = scope ? scope.storageRocket : UI.Container;
  },
  function save() {
    return {
      StorageRocket: rocket_storage,
    };
  }
);
