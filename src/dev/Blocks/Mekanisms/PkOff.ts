var pkamesh = new RenderMesh(); 
pkamesh.setBlockTexture("PkOf",0); 
pkamesh.importFromFile(__dir__+"/models/PkOff.obj","obj",null); 
IDRegistry.genBlockID("computer_a"); 
Block.createBlock("computer_a", [ 
 {name: "Computer", texture: [["PkOf", 0],["PkOf", 1],["PkOf", 2],["PkOf", 3],["PkOf", 4],["PkOf", 5]], inCreative: true} 
]); 
var pkarender= new ICRender.Model(); 
pkarender.addEntry(new BlockRenderer.Model(pkamesh)); 
BlockRenderer.setStaticICRender(BlockID.computer_a,0,pkarender);
TileEntity.registerPrototype(BlockID.computer_a,{getGuiScreen:function(){return PKOffUI}});


let PKOffUI = new UI.StandartWindow({ standard: {
    header: {
        text: {
            text: Translation.translate("Electric Compressor")
        },
    },
    inventory: {
        standard: true
    },
    background: {
        standard: true
    }
},drawing:[
    {type: "bitmap", x: 340, y:25, bitmap: "InterFon",scale:2.4
    },{type: "bitmap", x:840,y:315, bitmap:"Ram",scale:3.8}],elements:{buttonoff:{type:"button",x:352,y:350,scale:5.2, bitmap:"PKOf"},chestslot:{type: "button",x:422,y:350,scale:2.5, bitmap:"PressedChest",clicker:{onClick:function(){alert("Обесточено");}}},debugslot:{type:"button",x:492,y:350,scale:2.5, bitmap:"PressedPlanet",clicker:{onClick:function(){alert("Обесточено");}}},PlanetsMonik:{type:"button",x:360,y:120,scale:3.5, bitmap:"DaTuiPravEtoPlanetui",clicker:{onClick:function(){alert("Обесточено");}}},text:{type:"text", x: 360,y:45,size:15,text:" Здравствуйте,в данный момент я выключен,"},text1:{type:"text",x: 360,y:59,size:15,text:" прошу включить меня"}}});
