Callback.addCallback("LocalTick", function() {
if(__config__.getBool("Gameplay.SpacesMusic")){
    if (Player.getDimension() == Moon.id && World.getThreadTime()%18000 == 0) {
        SpaceRace.play();
    }

    if (Player.getDimension() == Mars.id && World.getThreadTime()%18000 == 0) {
        MarsS.play();
    }

    if (Player.getDimension() == Venus.id && World.getThreadTime()%18000 == 0) {
        MimasS.play();
    }
    
    if (Player.getDimension() ==Asteroids.id && World.getThreadTime()%18000 == 0) {
       OrbitS.play();
    }}

    /*if (Player.getDimension() == Vic.id) {

        World.setWorldTime(13300);
    }*/
    if(Equi.getSlot("Frequency").id!=ItemID.frequency_module&&Player.getDimension()!=0&&
    World.getThreadTime()%10==0){Commands.exec("/stopsound @a")}
});

Callback.addCallback("DimensionLoaded", function(dimensionId) {
    if(__config__.getBool("Gameplay.LoadDimensionMusic") && __config__.getBool("Gameplay.SpacesMusic")){
    if (
        dimensionId == Moon.id
    ) {
MimasS.stop();
MarsS.stop();
OrbitS.stop();
        SpaceRace.play()}
    if (
        dimensionId == Mars.id
    ) {
SpaceRace.stop()
MimasS.stop();
OrbitS.stop();
        MarsS.play()}
            if (
        dimensionId == Asteroids.id
    ) {
SpaceRace.stop();
MimasS.stop();
MarsS.stop();
        OrbitS.play();
    }
    if (
        dimensionId == Venus.id
    ) {
SpaceRace.stop();
MarsS.stop();
OrbitS.stop();
        MimasS.play()}};
        if(
            __config__.getBool(
                "Gameplay.SpawnAsteroids"
                ) && dimensionId == 0){
                    Dimensions.transfer(Player.get(), Asteroids.id);
};
    if(Equi.getSlot("Frequency").id!=ItemID.frequency_module&&Player.getDimension()!=0){Game.message(Translation.translate("I don't think I hear anything.I need a high frequency module"))}
});
