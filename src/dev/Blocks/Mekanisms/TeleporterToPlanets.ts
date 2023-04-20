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
    Dimensions.transfer(Player.get(), Mars.id);}}},but5:{type:"button",x:40,y:200,scale:2.1, bitmap:"spacemap_linia",bitmap2:"pressedlinia",clicker:{onClick:function(){alert("Обесточено");}}},
    but6:{type:"button",x:40,y:150,scale:2.1, bitmap:"spacemap_linia",bitmap2:"pressedlinia", clicker:{onClick:function(){
      Dimensions.transfer(Player.get(), Moon.id);}}}
    ,but7:{type:"button",x:40,y:100,scale:2.1, bitmap:"spacemap_linia",bitmap2:"pressedlinia",clicker:{onClick:function(){alert("Обесточено");}}},catalog:{type:"button",x:40,y:32,scale:2.4, bitmap:"catalog",bitmap2:"catalogpressed",clicker:{onClick:function(){alert("Обесточено");}}},catalog2:{type:"button",x:660,y:32,scale:2.4, bitmap:"Catalogg",bitmap2:"cataloggpressed",clicker:{onClick:function(){alert("Обесточено");}}},close:{type: "closeButton", x:800, y:100, global: true, bitmap: "exit", bitmap2: "exitpressed", scale:1.9},//текстик
    text1:{type:"text",x:40,y:30,scale:2.1,text:"Test"}
    }});
