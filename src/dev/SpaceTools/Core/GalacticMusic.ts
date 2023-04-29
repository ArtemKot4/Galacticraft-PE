Callback.addCallback("LocalTick", function() {
if(__config__.getBool("Gameplay.SpacesMusic") && Player.getDimension()!=0){
    if (Player.getDimension() == Moon.id && World.getThreadTime()%18000 == 0) {
        SpaceRace.play();
    }else{
        SpaceRace.stop()
    }

    if (Player.getDimension() == Mars.id && World.getThreadTime()%18000 == 0) {
        MarsS.play();
    }else{
        MarsS.stop();
    }

    if (Player.getDimension() == Venus.id && World.getThreadTime()%18000 == 0) {
        MimasS.play();
    }else{
        MimasS.stop();
    }
    
    if (Player.getDimension() == Asteroids.id && World.getThreadTime()%18000 == 0) {
       OrbitS.play();
    }}else{
        OrbitS.stop();
    }

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

        SpaceRace.play()}
    if (
        dimensionId == Mars.id
    ) {


        MarsS.play()}
            if (
        dimensionId == Asteroids.id
    ) {
        OrbitS.play();
    }
    if (
        dimensionId == Venus.id
    ) {
        MimasS.play()}};
        if(
            __config__.getBool(
                "Gameplay.SpawnAsteroids"
                ) && dimensionId == 0){
                    Dimensions.transfer(Player.get(), Asteroids.id);
};
    if(Equi.getSlot("Frequency").id!=ItemID.frequency_module&&Player.getDimension()!=0){
        Game.message(Translation.translate("I don't think I hear anything.I need a high frequency module"))}
});
