//набор переменных для дождя

let weather_rain:boolean = false;   //значение работы дождя
let timer_weather:number = 0;       //секундный таймер дождя
let timer_weather_start:number = 0; //минутный таймер дождя

//набор погодных правил

let weather_rule = {
  rain: true,
  lightning_bolt: true,
  meteorite_fall: true,
}

//функция на частицы дождя

function startRain(coords): void {
  for(var с = 0;с<1;с++){
    for(var i = 0;i<6;i++){
      Particles.addParticle(
        rain_venus,
        coords.x + i,
        coords.y + 5,
        coords.z,
        0.05,
        -0.1,
        0
      );

      Particles.addParticle(
        rain_venus,
        coords.x - i,
        coords.y + 5,
        coords.z,
        0.05,
        -0.1,
        0
      );

      Particles.addParticle(
        rain_venus,
        coords.x,
        coords.y + 5,
        coords.z + i,
        0.05,
        -0.1,
        0
      );

      Particles.addParticle(
        rain_venus,
        coords.x,
        coords.y + 5,
        coords.z - i,
        0.05,
        -0.1,
        0
      );

      Particles.addParticle(
        rain_venus,
        coords.x - i,
        coords.y + 5,
        coords.z + i,
        0.05,
        -0.1,
        0
      );

      Particles.addParticle(
        rain_venus,
        coords.x + i,
        coords.y + 5,
        coords.z - i,
        0.05,
        -0.1,
        0
      );
      }

      }    
  }
  
//работа дождя в локальном тике

  Callback.addCallback("LocalTick", (container) => {
    var pos = Player.getPosition();
    if (Player.getDimension() == Venus.id) {
      if (
        World.getThreadTime() % 5 == 0 &&
        weather_rain == true &&
        timer_weather <= 60
      ) { //спаун частиц
         
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
  