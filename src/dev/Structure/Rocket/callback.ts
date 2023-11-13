let rocket; 

Callback.addCallback("EntityInteract", function (entity, player, coords) {
    if (
      Entity.getTypeName(entity) == GCRocket.get(true) &&
      Entity.getSneaking(Player.getLocal()) == false
    ) {
         rocket=entity;
      GC_FLAG.ROCKET = true;
      Game.message(
        Translation.translate(
          "You are in a rocket, make sure you put on a spacesuit, loaded and refueled the rocket"
        )
      );
  
           
     
      if (__config__.getBool("Gameplay.Special_Effects") == true) {
        if (Entity.getPosition(entity)) {
          Particles.addParticle(
            rocket_particle,
            this.x + 0.5,
            this.y - 1,
            this.z + 0.5,
            Math.random() / 20,
            Math.random() / 20,
            Math.random() / 20
          );
        }
      }
    }
  
    if (
      Entity.getSneaking(Player.get()) &&
      Entity.getTypeName(entity) == GCRocket.get(true)
    ) {
      // let window = getWindow
      // (BlockID.Pad_Normal,
      //     rocketFuel);
      rocket_storage.openAs(rocketFuel);
    };
    GC_FLAG.ROCKET = true;
  });
  
  var fuel: number = 0;
  
  var rocketActive: boolean = false;

  Callback.addCallback("EntityDeath", function (entity, player, coords: any) {
    if (Entity.getTypeName(entity) == GCRocket.get(true)) {
      Entity.setCarriedItem(Player.get(),GCRocket.get(),1,0)
  
    }
  });

  
  Callback.addCallback("ItemUse", function (coords,item,block,isExternal,player) {
    if (block.id == GCRocket.getPadding()) {
      var region = BlockSource.getDefaultForActor(player);

 

      region.spawnEntity(coords.x, coords.y, coords.z, GCRocket.get(true));

      Entity.setCarriedItem(player, item.id, item.count - 1, item.data);
   
    }
  });

  var timer = GC_TIMER;
  Callback.addCallback("LocalTick", function () {
    for(let i in GC_LIST.ROCKET){
    if (Entity.getTypeName(rocket) && GC_FLAG.ROCKET==true) {
        
           if(World.getThreadTime()%20==0){
           
           if(timer.ROCKET_START <= 10 && timer.ROCKET_START > -1){  
            Game.message(""+timer.ROCKET_START)
            timer.ROCKET_START--; }else{
                           
           }
           if(timer.ROCKET_START<=0&&timer.ROCKET_BEGIN==false){
            timer.ROCKET_BEGIN=true;
           }
        if(GC_TIMER.ROCKET_FLY>=400){
          GC_FLAG.ROCKET=false;
          timer.ROCKET_BEGIN=false;
          timer.ROCKET_START=10;
        }  
          }
        };
           if(timer.ROCKET_BEGIN==true){
            let pos = Entity.getPosition(rocket)
            Entity.addPosition(rocket, pos.x, pos.y + 0.1, pos.z);
                           
                          
                           
                            timer.ROCKET_FLY++;        
           
           }
        
      }
  });