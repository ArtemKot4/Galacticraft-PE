namespace Atmosphere {
  export class StationSkybox extends Sky {
    public static EARTH = Sky.createBox(100, Math.PI / 2, "earth");
  }

  function position(coord) {
    return coord > 0 ? 0.05 : -0.05;
};

  function StationUpdatable() {
    return {
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
          position(pos.x),
          position(pos.y),
          position(pos.z)
        );
        
        return Sky.setupPosition(
          StationSkybox.EARTH,
          pos.x + 50,
          pos.y - 100,
          pos.z - 50
        );
      },
    };
  }
  Callback.addCallback("PlayerChangedDimension", (player, from, to) => {
    if (Entity.getDimension(player) === SpacesStation.getPlanet()) {
      const pos = Player.getPosition();
      World.setBlock(pos.x, pos.y, pos.z, BlockID["spaces_station_block"], 0);
      alert("Да, это станция!");
      Updatable.addUpdatable(StationUpdatable());
    }
  });
}
