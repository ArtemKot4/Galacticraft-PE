var Sunmesh = new RenderMesh(); 
Sunmesh.setBlockTexture("sunT",0); 
Sunmesh.importFromFile(__dir__+"/models/Sun.obj","obj",null); 
IDRegistry.genBlockID("charged_sun"); 
Block.createBlock("charged_sun", [ 
 {name: "A little Sun", texture: [["sunT", 0],["sunT", 1],["sunT", 2],["sunT", 3],["sunT", 4],["sunT", 5]], inCreative: true} 
]); 
Translation.addTranslation("A little Sun",{
ru: "< Солнце >"
});
var Sunrender = new ICRender.Model(); 
Sunrender.addEntry(new BlockRenderer.Model(Sunmesh)); 
BlockRenderer.setStaticICRender(BlockID.charged_sun,0,Sunrender);