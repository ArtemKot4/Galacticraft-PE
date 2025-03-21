enum EGalacticraftParticle {
    SPOUT = Particles.registerParticleType({
        texture: "sulphuric_particle",
        render: 2,
        size: [1, 0.5],
        lifetime: [30, 70],
        collision: true,
    
        animators: {
            alpha: {
                fadeIn: 1,
                fadeOut: 2,
            },
            size: {
                fadeOut: 0,
                fadeIn: 0,
                start: 0.2,
                end: 0,
            },
        },
    }),
    COLLECTOR = Particles.registerParticleType({
        texture: "collector_particle_2",
        render: 2,
        size: [0.1, 0.1],
        lifetime: [30, 50],
    
        animators: {
            alpha: {
                fadeIn: 0.1,
                fadeOut: 0.2,
            },
            size: {
                fadeOut: 0,
                fadeIn: 0,
                start: 0.2,
                end: 0,
            },
        },
    }),
    VENUS_RAIN = Particles.registerParticleType({
        texture: "rain_venus",
        render: 2,
        size: [8, 8],
        lifetime: [50, 50],
        // collision: true,
        animators: {
            alpha: {
                fadeIn: 0,
                fadeOut: 1,
            },
        },
    }),
    SMOKE = Particles.registerParticleType({
        texture: "smoke_particle",
        render: 0,
        size: [1, 0.5],
        lifetime: [50, 100],
        collision: false,
    
        animators: {
            alpha: {
                fadeIn: 1,
                fadeOut: 2,
            },
            size: {
                fadeOut: 0,
                fadeIn: 0,
                start: 0.2,
                end: 0,
            },
        },
    }),
    ROCKET_PARTICLE = Particles.registerParticleType({
        texture: "rocket_particle",
        render: 2,
        size: [5.4, 5.8],
        lifetime: [2, 5],
        collision: true,
    
        animators: {
            alpha: {
                start: 1,
                end: 0.3,
            },
            size: {
                start: 1,
                end: 0.2,
            },
        },
    }),
}
