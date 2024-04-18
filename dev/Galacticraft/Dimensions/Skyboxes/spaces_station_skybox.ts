namespace Atmosphere {

  function StationUpdatable() {

    return {
      planet: Sky.createBox(100, Math.PI / 2, "earth"),
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
          pos.x + 50,
          pos.y - 100,
          pos.z - 50
        );
      },
    };
  };


Callback.addCallback("LevelDisplayed", () => {
  if(Entity.getDimension(Player.getLocal()) === SpacesStation.getPlanet()) {
    if(Flags.station === false) {
    const pos = Player.getPosition();
    Player.setPosition(0, 100, 0);

      World.setBlock(pos.x, pos.y - 1, pos.z, BlockID["spaces_station_block"], 0);
      World.setBlock(pos.x, pos.y - 2, pos.z, BlockID["tin_decoration_block"], 0);
      World.setBlock(pos.x + 1, pos.y - 2, pos.z, BlockID["tin_decoration_block"], 0);
      World.setBlock(pos.x - 1, pos.y - 2, pos.z, BlockID["tin_decoration_block"], 0);

      World.setBlock(pos.x + 1, pos.y - 2, pos.z  + 1, BlockID["tin_decoration_block"], 0);
      World.setBlock(pos.x - 1, pos.y - 2, pos.z - 1, BlockID["tin_decoration_block"], 0);

      World.setBlock(pos.x + 1, pos.y - 2, pos.z - 1, BlockID["tin_decoration_block"], 0);
      World.setBlock(pos.x - 1, pos.y - 2, pos.z + 1, BlockID["tin_decoration_block"], 0);

      World.setBlock(pos.x, pos.y - 2, pos.z - 1, BlockID["tin_decoration_block"], 0);
      World.setBlock(pos.x, pos.y - 2, pos.z + 1, BlockID["tin_decoration_block"], 0);

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
