Callback.addCallback("LocalTick", function() {
    var planets: any = ["Moon","Mars","Venus","Asteroids"];
    var music: any = ["SpaceRace","MarsS","MimasS","OrbitS"];
if(__config__.getBool("Gameplay.SpacesMusic") && Player.getDimension()!=0)
for(var i in planets && music){
    if (Player.getDimension() == planets[i].id && World.getThreadTime()%18000 == 0) {
        music[i].play();
    }else{
        music[i].stop()
    }};

    // if (Player.getDimension() == Mars.id && World.getThreadTime()%18000 == 0) {
    //     MarsS.play();
    // }else{
    //     MarsS.stop();
    // }

    // if (Player.getDimension() == Venus.id && World.getThreadTime()%18000 == 0) {
    //     MimasS.play();
    // }else{
    //     MimasS.stop();
    // }
    
    // if (Player.getDimension() == Asteroids.id && World.getThreadTime()%18000 == 0) {
    //    OrbitS.play();
    // }}else{
    //     OrbitS.stop();
    // }

    if(Equi.getSlot("Frequency").id==ItemID.frequency_module&&checkDimension(10)||
    Equi.getSlot("Frequency").id==0&&checkDimension(10)){return null}else{
        Commands.exec("/stopsound @a") 
    }
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
