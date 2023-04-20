var standStation = true;

const AIR_SPACES = Block.createSpecialType({
    lightopacity:15,
    destroytime: -1
    
});

IDRegistry.genBlockID("space_air");
Block.createBlock("space_air",[{name: "Space Air", texture: [["Black", 0]], inCreative: false} ],AIR_SPACES);

var Spaces = new CustomBiome ("Spaces")
.setSkyColor(android.graphics.Color.rgb(0, 0, 0))
 .setCoverBlock(BlockID.space_air, 0)
 .setSurfaceBlock(BlockID.space_air, 0)
 .setFillingBlock(BlockID.space_air, 0);
var SpacesStation = new Dimensions.CustomDimension("SpacesStation", 2010);
SpacesStation.setSkyColor(.0, .0, .0);
SpacesStation.setFogColor(.0, .0, .0);
SpacesStation.setGenerator(Dimensions.newGenerator({
    biome: Spaces.id,
    layers: [

    { minY: 0,
      	maxY: 1,
      	material: {base: BlockID.space_air,surface: {
                id: BlockID.space_air,
                data: 0,
                width: 1
            },
            cover: BlockID.space_air}}]

}));
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

IDRegistry.genBlockID("spaces_station_block");
Block.createBlock("spaces_station_block",[{name: "Spaces Station", texture: [["space_station_side", 0],["space_station_top",0],["space_station_side",0]], inCreative: true} ],STONE);

SpacesCraft.addSHIFTtext(BlockID.spaces_station_block,Translation.translate("Central block of space station"));

Callback.addCallback('ItemUse', function (coords, item, block, is, player) {
    if (block.id == BlockID.spaces_station_block) {
        Dimensions.transfer(player, SpacesStation.id);
    }

});