namespace Atmosphere {

  function StationUpdatable() {

    return {
      planet: Sky.createBox(350, Math.PI / 2, "earth"),
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
        
        return Sky.setupPosition(
          this.planet,
          pos.x + 175,
          pos.y - 100,
          pos.z - 175
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
