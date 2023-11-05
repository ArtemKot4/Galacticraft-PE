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

//функция на частицы

function particle (type,x,y,z,vx?,vz?){
  if(vx!=undefined&&vz!=undefined){
  Particles.addParticle(
    type,
    x,
    y,
    z,
    vx || 0,
    vz || 0,
    0
  );
}}

//функция на частицы дождя

function startRain(coords): void {

  for(var n = -32;n<=32;n++){
  
   
   
    particle(rain_venus,coords.x+n,coords.y+5,coords.z+randomInt(-32,32),0.05,-0.1);
    particle(rain_venus,coords.x + randomInt(-32,32),coords.y+5,coords.z+n,0.05,-0.1);
    
    particle(spouticle,coords.x+n,coords.y-1.8,coords.z+randomInt(-32,32),+0,0.1);
    particle(spouticle,coords.x + randomInt(-32,32),coords.y-1.8,coords.z+n,+0,0.1);
    }

      }

      
  
  
//работа дождя в локальном тике

  Callback.addCallback("LocalTick", (container) => {
    var pos = Player.getPosition();
    if (Player.getDimension() == Venus.id) {
      if (
        World.getThreadTime() % 8 == 0 &&
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
  