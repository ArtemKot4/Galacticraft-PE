function startRain(coords) {

   
      Particles.addParticle(
        rain,
        coords.x + randomInt(-20,20),
        coords.y + 30,
        coords.z + randomInt(-20,20),
        0,
        -2,
        0
      );
      // if(source.getLightLevel(x,y,z)<=4){
      //  Particles.addParticle(star,posx,posy,0.5,0,-0.1,0)
      // }
      }
  