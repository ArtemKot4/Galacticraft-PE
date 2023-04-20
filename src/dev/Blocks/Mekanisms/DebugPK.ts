var pkbmesh = new RenderMesh(); 
pkbmesh.setBlockTexture("DebugPK",0); 
pkbmesh.importFromFile(__dir__+"/models/DebugComp.obj","obj",null); 
IDRegistry.genBlockID("computer_b"); 
Block.createBlock("computer_b", [ 
 {name: "Computer", texture: [["DebugPK", 0],["DebugPK", 1],["DebugPK", 2],["DebugPK", 3],["DebugPK", 4],["DebugPK", 5]], inCreative: true} 
]); 
var pkbrender= new ICRender.Model(); 
pkbrender.addEntry(new BlockRenderer.Model(pkbmesh)); 
BlockRenderer.setStaticICRender(BlockID.computer_b,0,pkbrender);