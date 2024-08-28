

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
  const players = Network.getConnectedPlayers();
  for (const i in players) {
    const client = Network.getClientForPlayer(players[i]);
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
      



const spouticle = Particles.registerParticleType({
    texture: "sulphuric_particle",
    render: 2,
    size: [1, .5],
    lifetime: [30, 70],
    collision: true,

    animators: {
        alpha: {
            fadeIn: 1, fadeOut: 2
        },
        size: {
            fadeOut: 0, fadeIn: 0, start: 0.2, end: 0
        }
    }
});

const rocket_particle = Particles.registerParticleType({
  texture: "rocket_particle",
  render: 2,
  size: [5.4, 5.8],
  lifetime: [2, 5],
  collision: true,

  animators: {
      alpha: {
        start: 1, end: 0.3
      },
      size: {
          start: 1, end: 0.2
      }
  }
});


const collecticle = Particles.registerParticleType({
    texture: "collector_particle_2",
    render: 2,
    size: [0.1, 0.1],
    lifetime: [30, 50],


    animators: {
        alpha: {
            fadeIn: .1, fadeOut: .2
        },
        size: {
            fadeOut: 0, fadeIn: 0, start: 0.2, end: 0
        }
    }
});


const rain_venus = Particles.registerParticleType({
    texture: "rain_venus",
    render: 2,
    size: [8,8],
    lifetime: [50,50],
   // collision: true,
    animators: {
        alpha: {
           fadeIn: 0, fadeOut: 1
        },
   
    },
  });

  const smoke_particle = Particles.registerParticleType({
    texture: "smoke_particle",
    render: 0,
    size: [1, .5],
    lifetime: [50, 100],
    collision: false,

    animators: {
        alpha: {
            fadeIn: 1, fadeOut: 2
        },
        size: {
            fadeOut: 0, fadeIn: 0, start: 0.2, end: 0
        }
    }
});

enum ESpaceParticle {
 SPOUT = spouticle,
 COLLECTOR = collecticle,
 VENUS_RAIN = rain_venus,
 SMOKE = smoke_particle,
 ROCKET_PARTICLE = rocket_particle
}

