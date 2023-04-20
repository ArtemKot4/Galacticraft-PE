var pkdmesh = new RenderMesh(); 
pkdmesh.setBlockTexture("PlanetPK",0); 
pkdmesh.importFromFile(__dir__+"/models/PKPlanet.obj","obj",null); 
IDRegistry.genBlockID("computer_d"); 
Block.createBlock("computer_d", [ 
 {name: "Computer", texture: [["PlanetPK", 0],["PlanetPK", 1],["PlanetPK", 2],["PlanetPK", 3],["PlanetPK", 4],["PlanetPK", 5]], inCreative: true} 
]); 
var pkdrender= new ICRender.Model(); 
pkdrender.addEntry(new BlockRenderer.Model(pkdmesh)); 
BlockRenderer.setStaticICRender(BlockID.computer_d,0,pkdrender);