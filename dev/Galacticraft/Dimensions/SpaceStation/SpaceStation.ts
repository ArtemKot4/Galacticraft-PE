var standStation = true;

const AIR_SPACES = Block.createSpecialType({
    lightopacity:15,
    destroytime: -1
    
});

IDRegistry.genBlockID("space_air");
Block.createBlock("space_air",[{name: "Space Air", texture: [["Black", 0]], inCreative: false} ],AIR_SPACES);

var SpacesStation = new IPlanet("spaces",["space_station",2010],[

    { minY: 0,
      	maxY: 1,
      	material: {base: BlockID.space_air,surface: {
                id: BlockID.space_air,
                data: 0,
                width: 1
            },
            cover: BlockID.space_air}}])

/*
   Callback.addCallback('LevelDisplayed', function (dimension,ent) {
if(Entity.getDimension(ent).id==Spaces.id&& standStation == true){
	var spacePosition = Entity.getPosition(ent);
	var region = BlockSource.getDefaultForActor(ent);
    
    region.setBlock(spacePosition.x, spacePosition.y-1, spacePosition.z, BlockID.deco_block);  
    region.setBlock(spacePosition.x-1, spacePosition.y-1, spacePosition.z, BlockID.deco_block);  
    region.setBlock(spacePosition.x, spacePosition.y-1, spacePosition.z-1, BlockID.deco_block);  
    region.setBlock(spacePosition.x-1, spacePosition.y-1, spacePosition.z-1, BlockID.deco_block);  
    region.setBlock(spacePosition.x+1, spacePosition.y-1, spacePosition.z, BlockID.deco_block);  
    region.setBlock(spacePosition.x, spacePosition.y-1, spacePosition.z+1, BlockID.deco_block);  
    region.setBlock(spacePosition.x+1, spacePosition.y-1, spacePosition.z+1, BlockID.deco_block);  
    region.setBlock(spacePosition.x+1, spacePosition.y-1, spacePosition.z-1, BlockID.deco_block);  
    region.setBlock(spacePosition.x-1, spacePosition.y-1, spacePosition.z+1, BlockID.deco_block);  
     region.setBlock(spacePosition.x, spacePosition.y-1, spacePosition.z-2, BlockID.deco_block);  
     region.setBlock(spacePosition.x-2, spacePosition.y-1, spacePosition.z, BlockID.deco_block);  
     region.setBlock(spacePosition.x+2, spacePosition.y-1, spacePosition.z, BlockID.deco_block);  
     region.setBlock(spacePosition.x, spacePosition.y-1, spacePosition.z+2, BlockID.deco_block);  
     region.setBlock(spacePosition.x-2, spacePosition.y-1, spacePosition.z-2, BlockID.deco_block);  
     region.setBlock(spacePosition.x+2, spacePosition.y-1, spacePosition.z+2, BlockID.deco_block);  
     Player.setPosition(coords.x, coords.y-1, coords.z);
}
});*/

/*
Saver.addSavesScope("Station",
    function read(scope){
        if(scope && scope.standStation){standStation = scope.standStation}
    },
    function save(){
        return {
            standStation: standStation
        }
    }
);

*/
new GBlock("spaces_station_block",[{name: "Spaces Station", texture: 
[["space_station_side", 0],
["space_station_top",0],
["space_station_side",0]], inCreative: true} ]
,STONE ).info("Central block of space station")

Callback.addCallback('ItemUse', function (coords, item, block, is, player) {
    if (block.id == BlockID.spaces_station_block) {
        Dimensions.transfer(player, SpacesStation.getPlanet());
    }

});