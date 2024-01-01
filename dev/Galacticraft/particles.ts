
var spouticle = Particles.registerParticleType({
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


var rocket_particle = Particles.registerParticleType({
    texture: "sulphuric_particle",
    render: 0,
    size: [1, .5],
    lifetime: [30, 50],
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

var collecticle = Particles.registerParticleType({
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


var rain_venus = Particles.registerParticleType({
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