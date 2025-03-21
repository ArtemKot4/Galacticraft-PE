// namespace Atmosphere {
//   export class VWeatherEvent extends DimensionEvent {
//     public static override dimension = Venus.getPlanet();
//     public static active = false;
//     public static timer: any = 20;
//     public static times = [20, 8, 14, 10, 17];
//     public static rain_timer = 0;
//     public static randomCopy = 20;
//     public static particle(coords): void {
//       for (let n = -16; n <= 16; n++) {
//         particle(
//           spouticle,
//           coords.x + randomInt(-5, 5),
//           coords.y - 1.5,
//           coords.z + randomInt(-5, 5),
//           +0,
//           0.1
//         );

//         particle(
//           rain_venus,
//           coords.x + n,
//           coords.y + 5,
//           coords.z + randomInt(-16, 16),
//           0.05,
//           -0.1
//         );
//         particle(
//           rain_venus,
//           coords.x + randomInt(-16, 16),
//           coords.y + 5,
//           coords.z + n,
//           0.05,
//           -0.1
//         );
//       }
//     }
//     public static rain(): void {
//       const random = this.times[Math.floor(Math.random() * this.times.length)];
//       let timer = VWeatherEvent.timer;
//       Game.message("До дождя: " + timer + "/" + this.randomCopy);

//       if (this.secondTimer(60)) {
//         timer != this.randomCopy ? (timer += 1) : (timer = false);
//       }

//       if (timer === false) {
//         this.rain_timer++;
//         this.rain();

//         timer = 0;
//       }

//       if (this.rain_timer >= 100) {
//         this.randomCopy = this.times[random];
//         this.rain_timer = 0;
//         timer = 0;
//       }
//     }

//     public static lightningBolt(pos, blockSource): void {
    
//       if (blockSource.getLightLevel(pos.x, pos.y, pos.z) <= 5) return;
//       if (this.secondTimer(60 * 3)) {
//         Entity.spawn(pos.x + randomInt(-20, -5), pos.y, pos.z, 93);
//         Entity.spawn(pos.x, pos.y, pos.z + randomInt(20, 5), 93);
//       }
//     }
//     public static override onTick(): void {
//         const blockSource = BlockSource.getDefaultForActor(Player.getLocal());
//         const pos = Entity.getPosition(Player.getLocal());

//       if (Player.getDimension() !== VWeatherEvent.dimension) return;

//       if (VWeatherEvent.secondTimer(0.5)) {
//         VWeatherEvent.rain();
//         VWeatherEvent.lightningBolt(pos, blockSource);
//       }
//     }
//   }
// }
