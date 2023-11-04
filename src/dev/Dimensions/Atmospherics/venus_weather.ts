let weather_rain:boolean = false;
let timer_weather:number = 0;
let timer_weather_start:number = 0;
let weather_rule = {
  rain: true,
  lightning_bolt: true,
  meteorite_fall: true,
}
function startRain(coords): void {
  for(var i = 0;i<6;i++){
  


      Particles.addParticle(
        rain_venus,
        coords.x + i,
        coords.y + 4,
        coords.z,
        0.05,
        -0.1,
        0
      );

      Particles.addParticle(
        rain_venus,
        coords.x - i,
        coords.y + 4,
        coords.z,
        0.05,
        -0.1,
        0
      );

      Particles.addParticle(
        rain_venus,
        coords.x,
        coords.y + 4,
        coords.z + i,
        0.05,
        -0.1,
        0
      );

      Particles.addParticle(
        rain_venus,
        coords.x,
        coords.y + 4,
        coords.z - i,
        0.05,
        -0.1,
        0
      );

      Particles.addParticle(
        rain_venus,
        coords.x,
        coords.y + 4,
        coords.z,
        0.05,
        -0.1,
        0
      );

      Particles.addParticle(
        rain_venus,
        coords.x - i,
        coords.y + 4,
        coords.z + i,
        0.05,
        -0.1,
        0
      );

      Particles.addParticle(
        rain_venus,
        coords.x + i,
        coords.y + 4,
        coords.z - i,
        0.05,
        -0.1,
        0
      );


      }    
  }
  