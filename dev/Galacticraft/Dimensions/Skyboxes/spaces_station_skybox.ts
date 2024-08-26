namespace Atmosphere {
    // WATERMESH.addVertex(-6 / 16, 0, -6 / 16, 0, 0);
    // WATERMESH.addVertex(6 / 16, 0, -6 / 16, 1, 0);
    // WATERMESH.addVertex(-6 / 16, 0, 6 / 16, 0, 1);
  
    // WATERMESH.addVertex(6 / 16, 0, -6 / 16, 1, 0);
    // WATERMESH.addVertex(-6 / 16, 0, 6 / 16, 0, 1);
    // WATERMESH.addVertex(6 / 16, 0, 6 / 16, 1, 1); 
    //z 6 / 16


 class StationSky extends Sky {
  public static createBox(scale, rotation, texture): Animation.Base {
    const pos = Player.getPosition();
    const mesh = new RenderMesh();


 const _pos = (8 / 16) as number
 
     //clouds
//  mesh.addVertex(-_pos, 50, -_pos, 0.5, 0); 
//  mesh.addVertex(_pos, 50, -_pos, 1, 0); 
//  mesh.addVertex(-_pos, 50, _pos, 0.5, 1); 
 
//  mesh.addVertex(_pos, 50, -_pos, 1, 0); 
//  mesh.addVertex(-_pos, 50, _pos, 0.5, 1); 
//  mesh.addVertex(_pos, 50, _pos, 1, 1);

 //earth
 mesh.addVertex(- _pos, 0, -_pos, 0, 0); 
 mesh.addVertex(_pos, 0, -_pos, 1, 0); 
 mesh.addVertex(-_pos, 0, _pos, 0, 1); 
 
 mesh.addVertex(_pos, 0, -_pos, 1, 0); 
 mesh.addVertex(-_pos, 0, _pos, 0, 1); 
 mesh.addVertex(_pos, 0, _pos, 1, 1); 
 


    mesh.scale(scale, 0, scale);

    mesh.rotate(0, 0, 0, 0, 0, rotation || 0);

    const animation = new Animation.Base(pos.x, pos.y, pos.z);

    animation.describe({
      mesh: mesh,
      skin: "environment/" + texture + ".png",
    });

    animation.setSkylightMode();

    return animation;
  };

 }

  function StationUpdatable() {

    return {
      planet: StationSky.createBox(350, 0, "earth"), //"earth"
      update: function () {
      
        if (
          sec(5) &&
          Entity.getDimension(Player.getLocal()) !== SpacesStation.getPlanet()
        ) {
          this.remove = true;
        }

        const pos = Entity.getPosition(Player.getLocal());
       if(Player.getFlying() === false) Entity.setVelocity(
          Player.get(),
          Player.getVelocity().x * 1.15,
          Player.getVelocity().y * 1.15,
          Player.getVelocity().z * 1.15
        );
        
        return StationSky.setupPosition(
          this.planet,
          pos.x,
          pos.y - 100,
          pos.z
        );
      },
    };
  };


Callback.addCallback("LevelDisplayed", () => {
  if(Entity.getDimension(Player.getLocal()) === SpacesStation.getPlanet()) {
    Updatable.addLocalUpdatable(StationUpdatable());
    if(Flags.station === false) {

    Player.setPosition(0, 100, 0);

      World.setBlock(0, 99, 0, BlockID["spaces_station_block"], 0);
      World.setBlock(0, 98, 0, BlockID["tin_decoration_block"], 0);
      World.setBlock(1, 98, 0, BlockID["tin_decoration_block"], 0);
      World.setBlock(-1, 98, 0, BlockID["tin_decoration_block"], 0);

      World.setBlock(1, 98, 1 ,BlockID["tin_decoration_block"], 0);
      World.setBlock(-1, 98, -1, BlockID["tin_decoration_block"], 0);

      World.setBlock(1, 98, -1, BlockID["tin_decoration_block"], 0);
      World.setBlock(-1, 98, 1, BlockID["tin_decoration_block"], 0);

      World.setBlock(0, 98, -1, BlockID["tin_decoration_block"], 0);
      World.setBlock(0, 98, 1, BlockID["tin_decoration_block"], 0);

      Flags.station = true;
  }
};

Callback.addCallback("PlayerChangedDimension", function (player, from, to) {
  const dimension = Entity.getDimension(player);
  alert("Да, это станция!");
  if(dimension === SpacesStation.getPlanet()) {
     Updatable.addLocalUpdatable(StationUpdatable())
}})

});

Saver.addSavesScope("Station",
    function read(scope){
        if(scope && scope.Flags){Flags = scope.Flags}
    },
    function save(){
        return {
            Flags: Flags
        }
    }
);

  };



































/*
  namespace Atmosphere {
    // WATERMESH.addVertex(-6 / 16, 0, -6 / 16, 0, 0);
    // WATERMESH.addVertex(6 / 16, 0, -6 / 16, 1, 0);
    // WATERMESH.addVertex(-6 / 16, 0, 6 / 16, 0, 1);
  
    // WATERMESH.addVertex(6 / 16, 0, -6 / 16, 1, 0);
    // WATERMESH.addVertex(-6 / 16, 0, 6 / 16, 0, 1);
    // WATERMESH.addVertex(6 / 16, 0, 6 / 16, 1, 1); 
    //z 6 / 16


 class StationSky extends Sky {
  public static createBox(scale, rotation, texture): Animation.Base {
    const pos = Player.getPosition();
    const mesh = new RenderMesh();


 const _pos = (8 / 16) as number
 
     //clouds
//  mesh.addVertex(-_pos, 50, -_pos, 0.5, 0); 
//  mesh.addVertex(_pos, 50, -_pos, 1, 0); 
//  mesh.addVertex(-_pos, 50, _pos, 0.5, 1); 
 
//  mesh.addVertex(_pos, 50, -_pos, 1, 0); 
//  mesh.addVertex(-_pos, 50, _pos, 0.5, 1); 
//  mesh.addVertex(_pos, 50, _pos, 1, 1);

 //earth
 mesh.addVertex(- _pos, 0, -_pos, 0, 0); 
 mesh.addVertex(_pos, 0, -_pos, 1, 0); 
 mesh.addVertex(-_pos, 0, _pos, 0, 1); 
 
 mesh.addVertex(_pos, 0, -_pos, 1, 0); 
 mesh.addVertex(-_pos, 0, _pos, 0, 1); 
 mesh.addVertex(_pos, 0, _pos, 1, 1); 
 


    mesh.scale(scale, 0, scale);

    mesh.rotate(0, 0, 0, 0, 0, rotation || 0);

    const animation = new Animation.Base(pos.x, pos.y, pos.z);

    animation.describe({
      mesh: mesh,
      skin: "environment/" + texture + ".png",
    });

    animation.setSkylightMode();

    return animation;
  };

 }

  function runThread() {
     const box = StationSky.createBox(350, 0, "earth");
     Threading.initThread("thread.galacticraft.station_skybox", () => {
      while(true) {
        if(Entity.getDimension(Player.getLocal()) !== SpacesStation.getPlanet()) {
          return;
        };
        const pos = Entity.getPosition(Player.getLocal());
        StationSky.setupPosition(
          box,
          pos.x,
          pos.y - 100,
          pos.z
        );
       // java.lang.Thread.sleep(10);
        // if(Player.getFlying() === false) {
        //   const vector = Entity.getLookVector(Player.getLocal());
        //   Entity.setVelocity(Player.getLocal(), vector.x, vector.y, vector.z);
        // }
      }
     })
    };
  


Callback.addCallback("LevelDisplayed", () => {
  runThread();
  if(Entity.getDimension(Player.getLocal()) === SpacesStation.getPlanet()) {
    if(Flags.station === false) {

    Player.setPosition(0, 100, 0);

      World.setBlock(0, 99, 0, BlockID["spaces_station_block"], 0);
      World.setBlock(0, 98, 0, BlockID["tin_decoration_block"], 0);
      World.setBlock(1, 98, 0, BlockID["tin_decoration_block"], 0);
      World.setBlock(-1, 98, 0, BlockID["tin_decoration_block"], 0);

      World.setBlock(1, 98, 1 ,BlockID["tin_decoration_block"], 0);
      World.setBlock(-1, 98, -1, BlockID["tin_decoration_block"], 0);

      World.setBlock(1, 98, -1, BlockID["tin_decoration_block"], 0);
      World.setBlock(-1, 98, 1, BlockID["tin_decoration_block"], 0);

      World.setBlock(0, 98, -1, BlockID["tin_decoration_block"], 0);
      World.setBlock(0, 98, 1, BlockID["tin_decoration_block"], 0);

      Flags.station = true;
  }
};

Callback.addCallback("PlayerChangedDimension", function (player, from, to) {
  const dimension = Entity.getDimension(player);
  alert("Да, это станция!");
  if(dimension === SpacesStation.getPlanet()) {
 runThread();
}})

});

Saver.addSavesScope("Station",
    function read(scope){
        if(scope && scope.Flags){Flags = scope.Flags}
    },
    function save(){
        return {
            Flags: Flags
        }
    }
);

  };
*/