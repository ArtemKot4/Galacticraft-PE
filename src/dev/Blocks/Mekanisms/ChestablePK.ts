var pkcmesh = new RenderMesh(); 
pkcmesh.setBlockTexture("PKStorage",0); 
pkcmesh.importFromFile(__dir__+"/models/PKChest.obj","obj",null); 
IDRegistry.genBlockID("computer_c"); 
Block.createBlock("computer_c", [ 
 {name: "Computer", texture: [["PKStorage", 0],["PKStorage", 1],["PKStorage", 2],["PKStorage", 3],["PKStorage", 4],["PKStorage", 5]], inCreative: true} 
]); 
var pkcrender= new ICRender.Model(); 
pkcrender.addEntry(new BlockRenderer.Model(pkcmesh)); 
BlockRenderer.setStaticICRender(BlockID.computer_c,0,pkcrender);