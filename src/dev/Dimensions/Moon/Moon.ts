
var moon_plains = new CustomBiome ("moon_plains")
.setSkyColor(android.graphics.Color.rgb(1, 0, 0))
.setCoverBlock(BlockID.moon_top_side, 0)
.setSurfaceBlock(BlockID.lunar_middle, 0)
.setFillingBlock(BlockID.lunar_stone, 0);
var Moon = new Dimensions.CustomDimension("Moon", 2000);
Moon.setSkyColor(.0, .0, .0);
Moon.setFogColor(.0, .0, .0);
Moon.setGenerator(Dimensions.newGenerator({
    biome: moon_plains.id,
    layers: [

    {
        minY: 0,
        maxY: 128,
         yConversion: [[1, -0.99], [0.5, -.99], [.9, -0.99], [0.4, -.4], [0, 0.8]
        ],
        material: {
            base: BlockID.lunar_stone,
            surface: {
                id: BlockID.lunar_middle,
                data: 0,
                width: 4
            },
            cover: BlockID.moon_top_side
        },
        noise: {
            octaves: {
               count: 4,
               scale: 160,
               weight: 1.5
            },
        }     
    },{ minY: 0,
      	maxY: 1,
      	material: {base: 7}}]

}));
Callback.addCallback('ItemUse', function (coords, item, block, is, player) {
if(Entity.getCarriedItem(player).id == 0 && block.id == BlockID.computer_c) {
Dimensions.transfer(player, Moon.id); 

 }
});

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId) { 
 if (dimensionId != Moon.id) return; 
 UniqueGen.generateOreInDimension(BlockID.ore_tin_moon, 0, chunkX, chunkZ, random, { 
 veinCounts: __config__.getFloat("Fossils.Moon.tin"), 
 minY:2, 
 maxY:65, 
 size: randomInt(4, 7), 
 mode: true, 
 check: [BlockID.lunar_stone] 
 }); 
});

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId) { 
 if (dimensionId != Moon.id) return; 
 UniqueGen.generateOreInDimension(BlockID.ore_copper_moon, 0, chunkX, chunkZ, random, { 
 veinCounts: __config__.getFloat("Fossils.Moon.copper"), 
 minY:2, 
 maxY:65, 
 size: randomInt(3,10), 
 mode: true, 
 check: [BlockID.lunar_stone] 
 }); 
});

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId) { 
 if (dimensionId != Moon.id) return; 
 UniqueGen.generateOreInDimension(BlockID.moonore_sapphire, 0, chunkX, chunkZ, random, { 
 veinCounts: __config__.getFloat("Fossils.Moon.sapphire"), 
 minY:2, 
 maxY:30, 
 size: randomInt(3, 5), 
 mode: true, 
 check: [BlockID.lunar_stone] 
 }); 
});

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId) {
 if (dimensionId != Moon.id) return; 
 UniqueGen.generateOreInDimension(BlockID.moonore_cheese, 0, chunkX, chunkZ, random, { 
 veinCounts: __config__.getFloat("Fossils.Moon.cheese"), 
 minY:2, 
 maxY:65, 
 size: randomInt(4, 9), 
 mode: true, 
 check: [BlockID.lunar_stone] 
 }); 
});

// const DIR = __dir__+"assets/structure/";
// StructureLoader.load(DIR+"DungeMoon.struct", "DungeMoon");

// Callback.addCallback("StructureLoadOne", function(){
// 	StructurePiece.register(StructurePiece.getDefault({
// 		type: "default",
// 		dimension: Moon.id,
// 		name: "Dungeon Moon",
// 		chance: 400,
// 		distance: 150,
// 		offset: {x: 30,},
// 		structure: new Structure.advanced("DungeMoon"),
// 	}))});
	
	/*	var SkyBox = new RenderMesh(); 
SkyBox.setBlockTexture(
    "stairs_sky",
    0); 
SkyBox.importFromFile(__dir__+"/models/basic_block.obj","obj", {
    translation: [0.5,0,0.5], 
    scale: 1});
    */
//	Callback.addCallback('DimensionLoaded', function (dimensionId) {
    
/*var BoxSky = new Animation.Base(
    Entity.getPosition(Player.get()).x,
    Entity.getPosition(Player.get()).y,
    Entity.getPosition(Player.get()).z
    )
    BoxSky.describe({mesh: SkyBox, scale: 1, skin:"stairs_sky"}) 
*/


        //BoxSky.load() }//else{ BoxSky.destroy()};});



// StructureLoader.load(DIR+"moon_crater.struct", "moon_crater");

// Callback.addCallback("StructureLoadOne", function(){
// 	StructurePiece.register(StructurePiece.getDefault({
// 		type: "default",
// 		dimension: Moon.id,
// 		name: "moon_crater",
// 		chance: 2,
// 		distance: 50,
// 		isSet: false,
// 		offset: {y: 1},
// 		white_list_blocks:true,
// 		blocks: [BlockID.moon_top_side],
// 		structure: new Structure.advanced("moon_crater"),
		
// 	}))});
	
var a = new IPlanet("Moonj", ["Name",3771], 
 [ {
    minY: 0,
    maxY: 128,
     yConversion: [[1, -0.99], [0.5, -.99], [.9, -0.99], [0.4, -.4], [0, 0.8]
    ],
    material: {
        base: BlockID.lunar_stone,
        surface: {
            id: BlockID.lunar_middle,
            data: 0,
            width: 4
        },
        cover: BlockID.moon_top_side
    },
    noise: {
        octaves: {
           count: 4,
           scale: 160,
           weight: 1.5
        },
    }     
},{ minY: 0,
    maxY: 1,
    material: {base: 7}}],
    [.0,.0,.0]
)


Callback.addCallback('ItemUse', function (coords, item, block, is, player) {
    if(item.id==VanillaItemID.diamond) {
    Dimensions.transfer(player, 3771); 
    alert("Сработало?")
    alert(JSON.stringify(a.getPlanet()))
    alert(a.getPlanet())
     }
     if(item.id==VanillaItemID.emerald){
        IPlanet.transfer(3771)
     }
    });