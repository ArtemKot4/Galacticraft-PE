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

      
  
  
class VWeatherEvent extends DimensionEvent {
    public override dimension = 2008;
    public active = false; 
    public timer = 0;
    public times = [20, 8, 14, 10, 17]; 
    public rain (): void {
        const random = this.times[Math.floor(Math.random() * this.times.length)];
        let randomCopy = 0;
           let timer = this.timer;        
      if (this.secondTimer(60)) {
          timer == randomCopy && !!this.active ? this.active = true : this.active = false;
           timer == randomCopy ? timer = 0 : timer += 1;
           
           Game.message("До дождя: " + this.time + "/" + randomCopy)
             };
           if(!!this.active && timer == 0) {
              if(timer == 0) randomCopy = random;
              startRain(Entity.getPosition(this.player));
              Game.message("Дождь идёт!")
           };
          
        }
    
    
   public lightningBolt(): void {
       const blockSource = BlockSource.getDefaultForActor(this.player);
       const pos = Entity.getPosition(this.player);
       if(blockSource.getLightLevel(pos.x, pos.y, pos.z) <=5) return;
       if(this.secondTimer(60*3)) {
       Entity.spawn(pos.x + randomInt(-20, -5), pos.y, pos.z, 93); 
        Entity.spawn(pos.x, pos.y, pos.z + randomInt(20, 5), 93);
   }
 };
  public override onTick(): void {
       if(Player.getDimension() !== this.dimension) return;
        
        if(this.secondTimer(0.5)) {
            this.rain()
        this.lightningBolt();
    };
};
}
const WeatherEvent = new VWeatherEvent();