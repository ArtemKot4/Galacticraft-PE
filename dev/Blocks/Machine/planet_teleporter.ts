IDRegistry.genBlockID("creative_teleporter");
Block.createBlockWithRotation("creative_teleporter",[{name: "Teleporter To Planets", texture:
 [["Machine", 0],["Machine", 0],["Oxygen Compressor Back", 0],["TeleporterPlanets", 0],
 ["Machine", 0],["Machine", 0]], inCreative: true} ]);
Translation.addTranslation("Teleporter To Planets",{
ru: "Телепортер на другие планеты(креативный)"
});

TileEntity.registerPrototype(BlockID.creative_teleporter,{useNetworkItemContainer: true,
	getScreenName(){return "main";},
	getScreenByName(){return SpacesMap},});
let closse = 0
let groupp = new UI.WindowGroup();
//1е окно
let SpacesMap = new UI.Window({location:{
    x:280,
    y:1000,
    width:1000,
    height:1000
},params:{},
drawing:[
    {type: "bitmap", x: 0, y:0, bitmap: "background_spacemap",scale:1.0
    },{type:"bitmap",x: 280,y:60,bitmap:"Solar",scale:1.0},{type:"bitmap", x:450,y:10, bitmap:"Sol",scale:2.0},
    {type: "bitmap",x: 240,y:95,bitmap: "earth",scale:0.6},{type: "bitmap",x: 240,y: 145,bitmap: "moon",scale: 3.2},
    {type:"bitmap",x: 240,y: 195,bitmap: "space_station",scale: 2.0},
    {type:"bitmap",x: 240,y: 245, bitmap:"mars",scale:2.0},{type: "bitmap",x: 240,y: 295,bitmap: "venus",scale:2.5}],
    elements:{but1:{type:"button",x:40,y:300,scale:2.1, bitmap:"spacemap_linia",bitmap2:"pressedlinia"},
    but2:{type: "button",x:40,y:350,scale:2.1, bitmap:"spacemap_linia",bitmap2:"pressedlinia",clicker:
    {onClick:function(){Dimensions.transfer(Player.get(), 0);}}},but3:{type:"button",x:40,y:400,scale:2.1, bitmap:"spacemap_linia",bitmap2:"pressedlinia",clicker:{onClick:function(){alert("Обесточено");}}},but4:{type:"button",x:40,y:250,scale:2.1, bitmap:"spacemap_linia",bitmap2:"pressedlinia",clicker:{onClick:function(){
    Dimensions.transfer(Player.get(), Mars.getPlanet());}}},but5:{type:"button",x:40,y:200,scale:2.1, bitmap:"spacemap_linia",bitmap2:"pressedlinia",clicker:{onClick:function(){alert("Обесточено");}}},
    but6:{type:"button",x:40,y:150,scale:2.1, bitmap:"spacemap_linia",bitmap2:"pressedlinia", clicker:{onClick:function(){
      Dimensions.transfer(Player.get(), Moon.getPlanet());}}}
    ,but7:{type:"button",x:40,y:100,scale:2.1, bitmap:"spacemap_linia",bitmap2:"pressedlinia",clicker:{onClick:function(){alert("Обесточено");}}},catalog:{type:"button",x:40,y:32,scale:2.4, bitmap:"catalog",bitmap2:"catalogpressed",clicker:{onClick:function(){alert("Обесточено");}}},catalog2:{type:"button",x:660,y:32,scale:2.4, bitmap:"Catalogg",bitmap2:"cataloggpressed",clicker:{onClick:function(){alert("Обесточено");}}},close:{type: "closeButton", x:800, y:100, global: true, bitmap: "exit", bitmap2: "exitpressed", scale:1.9},//текстик
    text1:{type:"text",x:40,y:30,scale:2.1,text:"Test"}
    }});

    var pkdmesh = new RenderMesh(); 
    pkdmesh.setBlockTexture("PlanetPK",0); 
    pkdmesh.importFromFile(__dir__+"/resources/models/PKPlanet.obj","obj",null); 
    IDRegistry.genBlockID("computer_d"); 
    Block.createBlock("computer_d", [ 
     {name: "Computer", texture: [["PlanetPK", 0],["PlanetPK", 1],["PlanetPK", 2],["PlanetPK", 3],["PlanetPK", 4],["PlanetPK", 5]], inCreative: true} 
    ]); 
    var pkdrender= new ICRender.Model(); 
    pkdrender.addEntry(new BlockRenderer.Model(pkdmesh)); 
    BlockRenderer.setStaticICRender(BlockID.computer_d,0,pkdrender);
    
    var pkamesh = new RenderMesh(); 
    pkamesh.setBlockTexture("PkOf",0); 
    pkamesh.importFromFile(__dir__+"/resources/models/PkOff.obj","obj",null); 
    IDRegistry.genBlockID("computer_a"); 
    Block.createBlock("computer_a", [ 
     {name: "Computer", texture: [["PkOf", 0],["PkOf", 1],["PkOf", 2],["PkOf", 3],["PkOf", 4],["PkOf", 5]], inCreative: true} 
    ]); 
    var pkarender= new ICRender.Model(); 
    pkarender.addEntry(new BlockRenderer.Model(pkamesh)); 
    BlockRenderer.setStaticICRender(BlockID.computer_a,0,pkarender);
    
    var pkbmesh = new RenderMesh(); 
    pkbmesh.setBlockTexture("DebugPK",0); 
    pkbmesh.importFromFile(__dir__+"/resources/models/DebugComp.obj","obj",null); 
    IDRegistry.genBlockID("computer_b"); 
    Block.createBlock("computer_b", [ 
     {name: "Computer", texture: [["DebugPK", 0],["DebugPK", 1],["DebugPK", 2],["DebugPK", 3],["DebugPK", 4],["DebugPK", 5]], inCreative: true} 
    ]); 
    var pkbrender= new ICRender.Model(); 
    pkbrender.addEntry(new BlockRenderer.Model(pkbmesh)); 
    BlockRenderer.setStaticICRender(BlockID.computer_b,0,pkbrender);

var pkcmesh = new RenderMesh(); 
pkcmesh.setBlockTexture("PKStorage",0); 
pkcmesh.importFromFile(__dir__+"/resources/models/PKChest.obj","obj",null); 
IDRegistry.genBlockID("computer_c"); 
Block.createBlock("computer_c", [ 
 {name: "Computer", texture: [["PKStorage", 0],["PKStorage", 1],["PKStorage", 2],["PKStorage", 3],["PKStorage", 4],["PKStorage", 5]], inCreative: true} 
]); 
var pkcrender= new ICRender.Model(); 
pkcrender.addEntry(new BlockRenderer.Model(pkcmesh)); 
BlockRenderer.setStaticICRender(BlockID.computer_c,0,pkcrender);