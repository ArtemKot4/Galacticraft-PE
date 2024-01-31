class VWeatherEvent extends DimensionEvent {
    public static override dimension = PLANETS.VENUS;
    public static active = false; 
    public static timer = 0;
    public static times = [20, 8, 14, 10, 17];
     public rain_timer;
    public static randomCopy = 0;
    public static particle (coords): void {
        for(let n = -16;n<=16;n++) {
            particle(
          spouticle,
coords.x + randomInt(-5,5),coords.y-1.5,
    coords.z + randomInt(-5,5),  +0,
0.1);
   
particle(rain_venus,coords.x+n,coords.y+5,coords.z+randomInt(-16,16),0.05,-0.1);
    particle(rain_venus,coords.x + randomInt(-16,16),coords.y+5,coords.z+n,0.05,-0.1);
    
    }
    }
    public static rain (): void {
        const that = VWeatherEvent;
        const random = this.times[Math.floor(Math.random() * this.times.length)];
        
           let timer = VWeatherEvent.timer;        
      if (that.secondTimer(60)) {
          if(timer == that.randomCopy && !that.active) that.active = true;
           timer == that.randomCopy ? 
           timer = 0 : timer += 1;
           
           Game.message("До дождя: " + this.time + "/" + randomCopy)
             };
           if(!!that.active) {
              if(timer == 0) that.randomCopy = random;
              that.particle(Entity.getPosition(that.player));
        if(that.rain_timer == ~~(that.randomCopy / 3)){
            that.active = false; that.rain_timer = 0;
            
            }
              Game.message("Дождь идёт!")
           };
          
        }
    
    
   public static lightningBolt(): void {
       const that = VWeatherEvent;
       const blockSource = BlockSource.getDefaultForActor(that.player);
       const pos = Entity.getPosition(that.player);
       if(blockSource.getLightLevel(pos.x, pos.y, pos.z) <=5) return;
       if(that.secondTimer(60 * 3)) {
       Entity.spawn(pos.x + randomInt(-20, -5), pos.y, pos.z, 93); 
        Entity.spawn(pos.x, pos.y, pos.z + randomInt(20, 5), 93);
   }
 };
  public static override onTick(): void {
       if(Player.getDimension() !== VWeatherEvent.dimension) return;
        
     if(VWeatherEvent.secondTimer(0.5)) {
            VWeatherEvent.rain()
        VWeatherEvent.lightningBolt();
    };
};
}
