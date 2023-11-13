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
//пакет для частиц

Network.addClientPacket("gc:particle", function (packetData: any) {
  Particles.addParticle(
    packetData.type,
    packetData.x,
    packetData.y, 
    packetData.z,
    packetData.vx,
    packetData.vy,
    packetData.vz
  );
});


//функция на частицы

function particle (type,x,y,z,vx?,vy?,vz?){
  vx = vx || 0;
  vy = vy || 0;
  vz = vz || 0;
  var players = Network.getConnectedPlayers();
  for (var i in players) {
    var client = Network.getClientForPlayer(players[i]);
    if (client) {
      client.send("gc:particle", {
        p: type,
        x: x,
        y: y,
        z: z,
        vx: vx,
        vy: vy,
        vz: vz,
      });
}else {
  Debug.message("[Error] Failed spawn particle");
}}}

//функция на частицы дождя

function startRain(coords): void {
 
  for(var n = -16;n<=16;n++){
    particle(spouticle,coords.x+randomInt(-5,5),coords.y-1.5,coords.z+randomInt(-5,5),+0,0.1);
   
   
    particle(rain_venus,coords.x+n,coords.y+5,coords.z+randomInt(-16,16),0.05,-0.1);
    particle(rain_venus,coords.x + randomInt(-16,16),coords.y+5,coords.z+n,0.05,-0.1);
    
   
 
    
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
  