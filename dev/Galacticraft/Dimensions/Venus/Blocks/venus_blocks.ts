IDRegistry.genBlockID("venus_rock_0");
Block.createBlock("venus_rock_0",[{name: "Venus Rock 0", texture: [["Venus Rock 0", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Venus Rock 0",{
ru: "Горячий венерианский камень"
})









IDRegistry.genBlockID("venus_rock_1");
Block.createBlock("venus_rock_1",[{name: "Venus Rock venus_rock_1", texture: [["Venus Rock 1", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Venus Rock 1",{
ru: "Твёрдый венерианский камень"
})

IDRegistry.genBlockID("venus_rock_2");
Block.createBlock("venus_rock_2",[{name: "Venus Rock 2", texture: [["Venus Rock 2", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Venus Rock 2",{
ru: "Вулканический венерианский камень"
})


IDRegistry.genBlockID("venus_rock_3");
Block.createBlock("venus_rock_3",[{name: "Venus Rock 3", texture: [["venus_rock", 3]], inCreative: true} ],STONE);
Translation.addTranslation("Venus Rock 3",{
ru: "Пемза"
})



new GBlock("venus_spout", 
[{name: "Venus Spout", 
texture:
   [["Venus Rock 0", 0],
   ["spout",0],
   ["Venus Rock 0",0]],
 inCreative: true} ],STONE).info("Can be found on Venus, hot and scalding")

Translation.addTranslation("Venus Spout",{
ru: "§aВенерианский гейзер",
en: "§aVenus Spout"
})



TileEntity.registerPrototype(BlockID.venus_spout,{
	useNetworkItemContainer: true,
	defaultValues:{
	    spout: 0
	},
    tick: function(){
        
        for(var i = 0;i<7;i++){
            
      if(
    this.blockSource.getBlockId
    (
        this.x,
        this.y-i,
        this.z)==
        BlockID.sulphuric_acid_still ){
         this.data.spout=0}else{this.data.spout=1}}
         

        if(
            this.data.spout==0
          ){
         if(__config__.getBool("Gameplay.Special_Effects")==true){
Particles.addParticle(
      spouticle,
      this.x + 0.5,
      this.y + 1.1, 
      this.z + 0.5,
        0.1,
        0.3,
        0.1);}

var player = Network.getConnectedPlayers()
for(var p in player){
if(
     Entity.getPosition(Number(player[i])).y==this.blockSource.getBlockId(this.x,this.y+1,this.z))
{
        Entity.setFire
        (
          Number(player[i]),40,true
            )
    }
}
	}},
	click: function(item,id,count,data,coords){
  }    
  
  });






var Venusmesh = new RenderMesh(); 
Venusmesh.setBlockTexture("VenusT",0); 
Venusmesh.importFromFile(__dir__+"/resources/models/Venus.obj","obj",null); 
IDRegistry.genBlockID("charged_venus"); 
Block.createBlock("charged_venus", [ 
 {name: "A little Venus", texture: [["VenusT", 0],["VenusT", 1],["VenusT", 2],["VenusT", 3],["VenusT", 4],["VenusT", 5]], inCreative: true} 
]); 
Translation.addTranslation("A little Venus",{
ru: "< Венера >"
});
var Venusrender = new ICRender.Model(); 
Venusrender.addEntry(new BlockRenderer.Model(Venusmesh)); 
BlockRenderer.setStaticICRender(BlockID.charged_venus,0,Venusrender);


Block.registerDropFunction("venus_spout", function(coords, blockID){
    return [[BlockID.venus_rock_0, 1, 0]] 
});