var cmd = [];
function commandRegistry(description: string, action: () => void,msg?: string) {
  cmd.push({ description: description, action: action,msg: msg });
}

commandRegistry("dimensions start rain",()=>{
    Callback.addCallback("LocalTick",()=>{
        if(World.getThreadTime()%20==0&&Player.getDimension()==Venus.id){
      var a = 0;
      a++
     
      if(a<=20){
         startRain(Player.getPosition())
         Game.message(""+ a + "секунд прошло")
      }
      if(a>20){
        Game.message(""+ a + " : Дождик закончился")
      }
    }
})
})

Callback.addCallback("NativeCommand", (command) => {
  for (var i in cmd) {
    if (command == "/gc:" + cmd[i].description) {
        Game.prevent();
      cmd[i].action();
      if(cmd[i].msg!=undefined){
        Game.message(Translation.translate(cmd[i].msg))
    }
    }
   
  }
});
